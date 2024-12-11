# Self-Assessment of Code

## Few Words

Working on this project has been very fun learning experience. We put a lot of effort in to this project and i belive it shows in the finished product. Communication was very important and i think we managed to keep everyone up to date with efficient scrum meetings and group chat messages. When working on big features we sometimes run into merge problems but we were able to solve all of them. Most of the code that I have created follows best practice in my opinion. Doing self assessments with LLM was helpful but the thing with LLM´s is that they always have ideas for improvement, even if you ask AI to give you simple and clean code that is already the best there is, it can still say the code can be improved when asked. Sometimes the improvements that LLM offer might actually not be that good since the AI might not have understaning of the whole project. All in all i belive the code that me and my group members created follows best practices and is good quality. Few improvements could be made in the future but the end result is still clean and readable code.

## useNotifications.jsx

### Strengths

1. **Separation of Concerns**:

   - The `useNotifications` hook encapsulates the logic for handling user notifications, making it reusable and keeping the component logic clean.

2. **State Management**:

   - The `useState` and `useEffect` hooks are used effectively to manage notifications state and synchronize it with the `user` context.

3. **Error Handling**:

   - Errors during API calls are caught and displayed using `showErrorToast`, ensuring better user feedback.

4. **Context Usage**:

   - Proper integration with `UserContext` to access user data and update the context (e.g., clearing notifications).

### Areas for Improvement

1. **Hardcoded API URLs**:

   - API endpoints are hardcoded, making the code less flexible and harder to adapt to changes in the API structure or environment (e.g., base URL). Consider moving API URLs to a configuration file.

2. **Error Message Granularity**:

   - The error messages displayed to the user are generic (`"Failed to add notification"`). More descriptive messages based on the response body or status code could improve user feedback.

3. **Token Expiry Handling**:

   - The code does not handle token expiration or invalid tokens. Adding logic to check and refresh tokens (if applicable) could improve robustness.

### Overall Impression

The `useNotifications` hook is well-structured and effectively manages notifications within the React context. With minor adjustments for flexibility, error handling, and performance, this code can achieve a high standard of reliability and maintainability.

```js
const useNotifications = () => {
  const { user, setUser } = useContext(UserContext);
  const { showErrorToast, showSuccessToast } = useToast();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user) {
      setNotifications(user.notifications);
    }
  }, [user]);

  const addNotification = async (userId, message) => {
    try {
      const response = await fetch(`/api/users/addNotification/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to add notification");
      }

      const data = await response.json();
      setNotifications((prev) => [...prev, message]);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const clearNotifications = async () => {
    try {
      const response = await fetch(`/api/users/clearNotifications/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to clear notifications");
      }

      const data = await response.json();
      setNotifications([]);
      setUser((prev) => ({ ...prev, notifications: [] }));
      showSuccessToast(data.message);
    } catch (error) {
      showErrorToast(error.message);
    }
  };
```

## useLogin.jsx

### Strengths

1. **Encapsulation**:

   - The `useLogin` hook encapsulates login logic, keeping authentication concerns separate from the component logic and making the code reusable.

2. **User Feedback**:

   - The `showPromiseToast` function provides real-time feedback to the user during login attempts, improving user experience.

3. **Error Handling**:

   - Validation for missing email or password is handled before initiating the API call, reducing unnecessary network requests.
   - Proper error messages are displayed based on the response or exceptions during the login process.

4. **Context and Navigation Integration**:
   - The hook integrates seamlessly with `UserContext` to set the authenticated user and `useNavigate` for redirection after a successful login.

### Areas for Improvement

1. **Hardcoded API URL**:

   - The `/api/users/login` endpoint is hardcoded. Moving API URLs to a centralized configuration file or environment variables would make the codebase more adaptable.

2. **Catch Block Complexity**:

   - The `catch` block uses `showPromiseToast` with a rejected promise, which adds unnecessary complexity. Errors could be handled more simply without wrapping them again in a promise.

3. **Unnecessary Fetch Logic in `then`**:
   - The logic inside the `.then` block of the `fetch` call (e.g., parsing `response.json()` and error handling) could be extracted into a utility function for reusability and cleaner code.

### Overall Impression

The `useLogin` hook is well-structured and handles the login flow effectively, including user feedback and navigation. Improvements in error handling, token management, and validation could further enhance its usability and maintainability.

```js
const useLogin = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { showPromiseToast } = useToast();

  const handleLogin = async (email, password) => {
    if (!email || !password) {
      return showPromiseToast(
        Promise.reject(new Error("Please enter email and password")),
        {
          loading: "Checking credentials...",
          error: "Please enter email and password",
        }
      );
    }

    try {
      const loginPromise = fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setUser({ ...data.user, token: data.token });
          navigate("/app");
          return "Login successful!"; // Success message for toast
        } else {
          throw new Error(data.error || data.message || "Login failed");
        }
      });

      showPromiseToast(loginPromise, {
        loading: "Checking credentials...",
        success: (message) => message,
        error: (error) => error.message,
      });
    } catch (error) {
      showPromiseToast(Promise.reject(error), {
        loading: "Checking credentials...",
        error: error.message,
      });
    }
  };

  return { handleLogin };
};
```

## userController.js const googleAuth

### Strengths

1. **User Lookup and Creation**:

   - The function checks if the user already exists in the database, creating a new user if none is found. This ensures seamless handling of both returning and new users.

2. **Password Management**:

   - A random password is generated for new users that are created with google sign up, which simplifies the signup process and avoids the need for immediate user interaction.

3. **Reusability**:

   - The existing `User.signup` method is utilized for creating new users, promoting code reuse and consistency.

4. **Token Generation**:

   - A token is generated and returned with the user object, facilitating session management for authentication.

5. **Error Handling**:

   - The `try-catch` block ensures that server-side errors are caught and logged, with appropriate feedback sent to the client.

6. **User Preferences**:
   - Default settings for notifications and preferences are provided during user creation, enhancing the user experience for new accounts.

### Areas for Improvement

1. **Error Granularity**:

   - While errors are logged and a general error message is returned, more detailed error responses (e.g., differentiating between database issues and validation errors) could improve debugging and client-side handling.

2. **Hardcoded Default Values**:
   - Default values for settings (e.g., `darkMode: false`) are hardcoded. Moving these to a configuration file or constants would improve maintainability.

### Overall Impression

The `googleAuth` function is well-structured and handles the Google authentication flow effectively. With improvements in input validation, error handling, and token management, this function can achieve a higher standard of security, reliability, and maintainability.

```js
const googleAuth = async (req, res) => {
  const { email, name, username, avatar } = req.body;

  try {
    if (!email || !name) {
      return res.status(400).json({ error: "Email and name are required" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8);

      // Use the existing signup method to create the user
      user = await User.signup(
        name,
        email,
        username,
        randomPassword, // This will be hashed in the signup method
        "", // phone_number
        new Date(), // Use the current date if date_of_birth is unknown
        "", // bio
        [], // followers
        [], // following
        [], // predictions
        [], // successfulPredictions
        0, // predictionScore
        avatar,
        {
          notifications: { email: true, push: true },
          preferences: { darkMode: false },
        } // settings
      );
    }

    // Generate a token and return the user object
    const token = generateToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Google Auth Error:", error.message);
    res.status(500).json({ error: "Failed to authenticate via Google" });
  }
};
```

## RouteGuard.jsx

### Strengths

1. **Protected Route Logic**:

   - The `RouteGuard` component effectively ensures that only authenticated users can access certain routes by checking the `user` context.

2. **User Context Integration**:

   - Both `RouteGuard` and `App` are well-integrated with the `UserContext`, ensuring that user-related state is globally accessible.

3. **Graceful Loading State**:

   - The `isLoading` check in `PrivateRoute` provides a loading fallback, ensuring a smooth user experience while authentication or user data is being fetched.

### Areas for Improvement

1. **Customizable Loading State**:

   - The loading fallback (`<div>Loading...</div>`) is a placeholder. Adding a more polished UI element, like a spinner or skeleton screen, would improve the user experience.

2. **Error Handling**:

   - No error boundary is provided for potential issues during route rendering. Adding an error boundary component would enhance fault tolerance.

3. **Default Route Redirection**:

   - The `Navigate to="/"` in `PrivateRoute` assumes the login screen is always at `/`. Making this redirection configurable would allow greater flexibility.

### Overall Impression

The `PrivateRoute` component and `App` function demonstrate solid design principles for managing routes and protecting private resources. With improvements in user experience, error handling, and route organization, this implementation can achieve better scalability, flexibility, and maintainability.

```js
const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    // Optionally, show a loading spinner or skeleton screen
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
```

```js
<Routes>
  <Route path="/" element={<LoginScreen />}>
    <Route index element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="forgot-password" element={<ForgotPassword />} />
  </Route>

  <Route
    path="/app"
    element={
      <RouteGuard>
        <MainScreen />
      </RouteGuard>
    }
  >
    <Route index element={<Home />} />
    <Route path="home" element={<Home />} />
    <Route path="profile/:userId" element={<MyProfile />} />
    <Route path="search" element={<Search />} />
    <Route path="messages" element={<Messages />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>
```
