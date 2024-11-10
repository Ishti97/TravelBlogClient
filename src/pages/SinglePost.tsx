import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSinglePost } from "../axiosApi/handleAPI";
import "../css/singlePost.css";


type Post = {
  categoryId: string,
  id: number,
  title: string,
  image: string,
  authorId: string | number,
  detail: string,
  // Add other properties if you remember them later
};

const SinglePost = () => {
  const [post, setPost] = useState<Post>();
  const { id } = useParams<{ id: string }>(); // Assume the ID is a string // Get ID from URL parameter
  const postId = id ? parseInt(id, 10) : NaN; // Convert to number or fallback to NaN if undefined
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetchSinglePost(postId);
        const data = response?.data.message;
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
