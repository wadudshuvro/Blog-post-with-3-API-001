// Importing necessary libraries and components
import React, { useEffect, useState } from 'react'; // React library and hooks
import axios from 'axios'; // Library for making HTTP requests
import { Link } from 'react-router-dom'; // Component for creating links for navigation
import './Posts.css'; // Importing the CSS file

// The Posts component
function Posts() {
  // Using the useState hook to create state variable
  const [posts, setPosts] = useState([]); // State for the posts data

  // Using the useEffect hook to fetch the posts data when the component mounts
  useEffect(() => {
    // Making a GET request to the JSONPlaceholder API to get the posts data
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        // Setting the posts data in state
        setPosts(response.data);
      });
  }, []); // The dependency array. This effect will run once when the component mounts.

  // The JSX that will be rendered
  return (
    <div className="posts-container">
      {posts.map((post, index) => ( // Mapping over the posts data and creating a card for each post
        <div className="post-card" key={post.id}>
          <img src={`https://picsum.photos/seed/${index}/200`} alt="Random" /> {/* Displaying a random image */}
          <h2>{post.title}</h2> {/* Displaying the post title */}
          <p>{post.body}</p> {/* Displaying the post body */}
          <Link to={`/posts/${post.id}`}>View More</Link> {/* Link to the post details page */}
        </div>
      ))}
    </div>
  );
}

// Exporting the component so it can be imported and used in other files
export default Posts;