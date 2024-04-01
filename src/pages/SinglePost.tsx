import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSinglePost } from "../axiosApi/handleAPI";
import "../css/singlePost.css";

const SinglePost = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams(); // Get ID from URL parameter

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetchSinglePost(id);
        const data = response.data.message;
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]); // Re-run effect when ID changes

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="single-post">
      <h2>{post.title}</h2>
      {post.image && (
        <img src={`http://localhost:3000/${post.image.slice(6)}`} />
      )}
      <p>
        <b>{post.detail}</b>
      </p>
    </div>
  );
};

export default SinglePost;
