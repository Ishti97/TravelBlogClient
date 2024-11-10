import React, { useState } from "react";
import { updatePost } from "../axiosApi/handleAPI";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/editPost.css";
import { useParams } from "react-router-dom";

const EditForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>(); // Assume the ID is a string // Get ID from URL parameter
  const postId = id ? parseInt(id, 10) : NaN; // Convert to number or fallback to NaN if undefined
  const { contentDetail: initialContentDetail } = location.state;

  const [contentDetail, setContentDetail] = useState(initialContentDetail);

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!contentDetail) {
      return;
    }
    try {
      const response = await updatePost(postId, contentDetail);
      if (response) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Edit Post</h2>

        <div>
          <label htmlFor="detail">Detail</label>
          <textarea
            id="detail"
            value={contentDetail}
            onChange={(e) => setContentDetail(e.target.value)}
            required
            placeholder="Enter the details"
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditForm;
