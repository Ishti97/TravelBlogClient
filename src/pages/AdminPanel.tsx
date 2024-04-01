import { useState, useEffect } from "react";
import {
  fetchApprovedPosts,
  fetchUnapprovedPosts,
  deletePost,
  approvePost,
} from "../axiosApi/handleAPI";

import { useNavigate } from "react-router-dom";

import "../css/admin.css";

const AdminPanel = () => {
  const [posts, setPosts] = useState([]);
  const [showApproved, setShowApproved] = useState(false);

  useEffect(() => {
    fetchData();
  }, [showApproved]);

  const fetchData = async () => {
    try {
      const res = showApproved
        ? await fetchApprovedPosts()
        : await fetchUnapprovedPosts();
      setPosts(res.data?.allPosts || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleApprove = async (postId: number) => {
    if (window.confirm("Are you sure you want to approve?")) {
      try {
        await approvePost(postId);
        alert("Post approved successfully");
        fetchData();
      } catch (error) {
        console.error("Error approving post:", error);
      }
    }
  };

  const handleDelete = async (postId: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(postId);
        alert("Post deleted successfully");
        fetchData();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/adminpanel/piechart", {
      replace: true,
    });
  };

  const handleCategory = () => {
    navigate("/adminpanel/category", {
      replace: true,
    });
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Blog</h1>
        </div>
        <div className="navbar-right">
          <button onClick={() => setShowApproved(!showApproved)}>
            {showApproved ? "Show Unapproved Posts" : "Show All Posts"}
          </button>
          <button onClick={handleClick}>Go to Pie Chart</button>
          <button onClick={handleCategory}>Category</button>
        </div>
      </nav>
      <h2>{showApproved ? "Approved Posts" : "Unapproved Posts"}</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Detail</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>
                <b>{post.title}</b>
              </td>
              <td>
                <b>{post.detail}</b>
              </td>
              <td>
                <img
                  style={{ height: 50, width: 50 }}
                  src={`http://localhost:3000/${post.image.slice(6)}`}
                />
              </td>
              <td>
                {!showApproved && (
                  <>
                    <button onClick={() => handleDelete(post.id)}>
                      Delete
                    </button>
                    <button onClick={() => handleApprove(post.id)}>
                      Approve
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
