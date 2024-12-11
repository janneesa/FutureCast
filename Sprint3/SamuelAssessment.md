# Self-Assessment of Code

## Thoughts after the project

Working on this project has been a rewarding and challenging experience. Collaborating with the group allowed us to leverage each other's strengths, particularly in splitting tasks between frontend and backend development. The ease of communication within the team was a significant advantage, making it straightforward to align on the project’s vision and goals.

Coordinating merge conflicts and ensuring feature compatibility required extra attention. Despite these challenges, the experience fostered growth in both technical skills and teamwork dynamics, and the end product is something we’re proud of.

---

### 1. **Imports and Setup**
```javascript
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Prediction from "../Prediction";
import SearchResult from "./SearchResult";
import Loading from "../Loading";

const API_URL_PREDICTIONS = "/api/predictions/search/";
const API_URL_USERS = "/api/users/search/";
```
- **Imports**: Bring in React hooks, context, and components.
- **Constants**: API endpoints for predictions and user search.

### 2. **Component and State Initialization**
```javascript
function Search() {
  const { user } = useContext(UserContext); // Logged-in user
  const searchWord = useLocation().state?.searchWord || ""; // Search term from URL
  const [predictions, setPredictions] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [loading, setLoading] = useState(false);
```
- **Purpose**: Manage `searchWord`, results, and loading state.

### 3. **Triggering Search**
```javascript
useEffect(() => {
  if (searchWord) performSearch();
}, [searchWord]);
```
- **Logic**: Auto-trigger `performSearch` when `searchWord` changes.

### 4. **Perform Search**
```javascript
const performSearch = async () => {
  setLoading(true);
  try {
    await Promise.all([fetchPredictionsByCategory(), fetchUserProfiles()]);
  } catch (error) {
    console.error("Search error:", error);
  } finally {
    setLoading(false);
  }
};
```
- **Parallel Fetching**: Executes both fetches simultaneously with error handling.

### 5. **Fetch Functions**
```javascript
const fetchPredictionsByCategory = async () => {
  try {
    const res = await fetch(`${API_URL_PREDICTIONS}${searchWord}`);
    if (!res.ok) throw new Error("Failed to fetch predictions");
    setPredictions(await res.json());
  } catch (error) {
    console.error(error);
  }
};

const fetchUserProfiles = async () => {
  try {
    const res = await fetch(`${API_URL_USERS}${searchWord}`);
    if (!res.ok) throw new Error("Failed to fetch users");
    const data = await res.json();
    setUserResults(data.filter((profile) => profile.id !== user?.id));
  } catch (error) {
    console.error(error);
  }
};
```
- **Fetch Predictions**: Retrieves category-based predictions.
- **Fetch Users**: Fetches profiles and filters out the current user.

### 6. **Render Results**
```javascript
if (!user) return <Loading />; // Display loading if user not available

return (
  <div className="p-4 flex flex-col gap-4 items-center">
    {loading && <Loading />}
    {!loading && (
      <>
        {predictions.map((p) => (
          <Prediction key={p.id} {...p} />
        ))}
        {userResults.map((u) => (
          <SearchResult key={u.id} {...u} />
        ))}
        {!predictions.length && !userResults.length && <p>No results found.</p>}
      </>
    )}
  </div>
);
```
- **Loading State**: Shows spinner while fetching data.
- **Conditional Rendering**: Displays results or a "No results" message.
---
- **Category Display**: Displays predictions based on categories using a clickable badge element, allowing users to filter content intuitively.  

```js
{/* Category Display */}
{category && (
  <div
    className="flex items-center text-xs mb-2 text-secondaryText dark:text-darkSecondaryText cursor-pointer"
    onClick={() => handleCategoryClick(category)}
  >
    <span className="ml-0 dark:text-darkSecondaryText bg-background dark:bg-darkBackground rounded-full px-2 py-1">
      {category}
    </span>
  </div>
)}
```  
---

#### `Prediction.jsx`  

- **Modularity**:  
  - Includes a reusable `Category` component to display prediction categories.
  - Handles category clicks through the `handleCategoryClick` method for future extensibility.  

- **Dynamic Styling**:  
  - Adjusts the appearance of the `Category` component based on the theme (`dark` or `light`).  

```jsx
{category && (
  <div
    className="flex items-center text-xs mb-2 text-secondaryText dark:text-darkSecondaryText cursor-pointer"
    onClick={() => handleCategoryClick(category)}
  >
    <span className="ml-0 dark:text-darkSecondaryText bg-background dark:bg-darkBackground rounded-full px-2 py-1">
      {category}
    </span>
  </div>
)}
```

---

#### `predController.js`  

- **Route Implementation**:  
  - Defines the `/predictions/byCategory/:category` route for fetching predictions by category.  

- **Validation**:  
  - Ensures the `category` parameter is present before querying the database.  

- **Error Handling**:  
  - Returns appropriate status codes for invalid input (`400`), not found results (`404`), and server errors (`500`).  

- **Scalability**:  
  - Can easily extend functionality by adding more filters or query parameters.  

```javascript
const getPredictionsByCategory = async (req, res) => {
  const { category } = req.params;
  if (!category) {
    return res.status(400).json({ message: "Invalid category" });
  }

  try {
    const predictions = await Prediction.find({ category });
    if (predictions.length >= 0) {
      res.status(200).json(predictions);
    } else {
      res.status(404).json({ error: "No predictions found for this category" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve predictions" });
  }
};
```
