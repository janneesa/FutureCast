# Self-Assessment of Code

### Janne Savinainen

#### UserContext.jsx

- **Avoids Prop Drilling**: Simplifies data sharing across components using Context API.
- **State Persistence**: Uses `localStorage` to retain user data across reloads.
- **Sensitive Data Exclusion**: Passwords are excluded before saving to `localStorage`.

```js
// Create UserContext
export const UserContext = createContext();

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user data to localStorage
  useEffect(() => {
    if (user) {
      const { password, ...userData } = user; // Exclude password
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
```

#### Profile.jsx

- **Component Organization**: Uses subcomponents (`ProfileCard`, `ScoreCard`, `ContentCard`) to maintain clean and modular code.
- **Context Usage**: Retrieves `user` data using `UserContext`, avoiding prop drilling.
- **Prediction Filtering**: Filters predictions based on the logged-in user's ID, ensuring relevance.
- **Conditional Data Fetching**: Ensures predictions are only fetched when a user is available.

```js
function Profile() {
  const { user } = useContext(UserContext);
  const [predictions, setPredictions] = useState([]);

  // Call backend that fetches users predictions.
  const fetchPredictions = async () => {
    const fetchedPredictions = mockData.predictions;
    const userPredictions = fetchedPredictions.filter(
      (prediction) => prediction.userId === user.id
    );
    setPredictions(userPredictions);
  };

  useEffect(() => {
    if (user) {
      fetchPredictions();
    }
  }, [user]);

  if (!user) {
    return <Loading></Loading>; // Fallback UI while user data is being loaded
  }

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <div className="flex flex-col gap-8 justify-center items-center">
            {/* Profile Card */}
            <ProfileCard user={user} />
            {/* Stats */}
            <ScoreCard user={user} />
          </div>
          {/* Predictions and Badges */}
          <div className="flex justify-center">
            <ContentCard predictions={predictions} />
          </div>
        </div>
      </main>
    </div>
  );
}
```

#### AccountSettings.jsx

- Implements a clear validation sequence for password reset, covering common errors like mismatches and invalid formats.

```js
const resetPassword = async () => {
  const validationError = validatePassword(newPassword);
  if (validationError) {
    setPasswordError(validationError);
    return;
  }

  const matchError = checkPasswordMatch(user.id, password);
  if (matchError) {
    setPasswordError(matchError);
    return;
  }

  if (newPassword !== confirmPassword) {
    setPasswordError("Passwords do not match");
    return;
  }

  await uploadNewPassword();
};
```

#### Fallback UI on Several components

- Provides a fallback UI to handle scenarios where user data is not yet available, preventing unnecessary errors.

```js
if (!user) {
  return <Loading></Loading>;
}
```

#### index.css

- I made reusable classes that are easy to use and provide the same look and styling for the whole application.

````css
.input {
  @apply p-2 border border-gray-300 rounded dark:border-darkMutedText dark:bg-darkCard dark:text-darkPrimaryText;
}

.button {
  @apply w-full p-2 bg-primaryButton text-white rounded hover:bg-primaryButton/90 transition text-center dark:bg-darkPrimaryButton dark:hover:bg-darkPrimaryButton/90;
}

.button-secondary {
  @apply w-full p-2 bg-white border border-gray-300 text-primaryText rounded hover:bg-background transition text-center dark:bg-darkSecondaryButton dark:border-darkMutedText dark:text-darkPrimaryText dark:hover:bg-darkBackground;
}

.button-ghost {
  @apply w-full p-2 bg-transparent text-primaryText rounded hover:bg-gray-100 transition text-center dark:text-darkPrimaryText dark:hover:bg-darkMutedText;
}

.button-agree {
  @apply bg-green-500 text-white;
}

.button-disagree {
  @apply bg-red-500 text-white;
}

.link {
  @apply text-sm text-blue-600 hover:underline dark:text-blue-400;
}

.nav-link {
  @apply text-primaryText hover:text-secondaryText dark:text-darkPrimaryText dark:hover:text-darkSecondaryText;
}

.card {
  @apply w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden dark:bg-darkCard;
}

.card-header {
  @apply p-4 pb-0 space-y-1;
}

.card-content {
  @apply p-4;
}
```

#### Improvements

- Few components could benefit from more error handling but at this point when the data comes from MockData.js it is not needed. Once backend gets connected to frontend I will add more error handling.
````
