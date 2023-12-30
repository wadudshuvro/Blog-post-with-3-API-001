import React, { useEffect, useState } from 'react'; // React library and hooks
import axios from 'axios'; // Library for making HTTP requests
import { useParams } from 'react-router-dom'; // Hook for accessing URL parameters
import './PostDetails.css'; // Importing the CSS file

// The PostDetails component
function PostDetails() {
  // Using the useState hook to create state variables
  const [post, setPost] = useState({}); // State for the post data
  const [comments, setComments] = useState([]); // State for the comments data
  const [showComments, setShowComments] = useState(false); // State for whether to show the comments

  // Using the useParams hook to get the post ID from the URL
  const { id } = useParams();

  // Using the useEffect hook to fetch the post data when the component mounts
  useEffect(() => {
    // Making a GET request to the JSONPlaceholder API to get the post data
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => {
        // Setting the post data in state
        setPost(response.data);
      });
  }, [id]); // The dependency array. This effect will run again if the id changes.

  // Function to handle showing the comments
  const handleShowComments = () => {
    // Making a GET request to the JSONPlaceholder API to get the comments data
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then(response => {
        // Setting the comments data in state and showing the comments
        setComments(response.data);
        setShowComments(true);
      });
  };

  // The JSX that will be rendered
  return (
    <div className="post-details-container">
      <img src={`https://picsum.photos/seed/${id}/300`} alt="Random" /> {/* Displaying a random image */}
      <h2>{post.title}</h2> {/* Displaying the post title */}
      <p>{post.body}</p> {/* Displaying the post body */}
      <button onClick={handleShowComments}>Show Comments</button> {/* Button to show the comments */}
      {showComments && comments.map(comment => ( // If showComments is true, map over the comments and display them
        <div className="comment" key={comment.id}>
          <h4>{comment.name}</h4> {/* Displaying the comment name */}
          <p>{comment.body}</p> {/* Displaying the comment body */}
        </div>
      ))}
    </div>
  );
}

// Exporting the component so it can be imported and used in other files
export default PostDetails;