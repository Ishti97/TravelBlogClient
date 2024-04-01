import React, { useEffect, useState } from "react";
import { createNewPost, getCategory } from "../axiosApi/handleAPI";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/createPost.css";
const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [authorId, setauthorId] = useState();
  const [categoryId, setCategoryId] = useState();
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const [existingCategory, setExistingCategory] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setauthorId(userId);
    } else {
      setauthorId(null);
    }
  }, []);

  const fetchData = async () => {
    const data = await getCategory();
    setExistingCategory(data.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !detail || !categoryId || !image || authorId === null) {
      setError("Not Fulfilled");
      return;
    }
    try {
      const response = await createNewPost(
        title,
        detail,
        authorId,
        categoryId,
        image
      );
      if (response) {
        console.log(`Create successfully: ${response}`);

        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Create error:");
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>New Post</h2>
        {error && <p>{error}</p>}
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter the title"
          />
        </div>
        <div>
          <label htmlFor="detail">Detail</label>
          <textarea
            id="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            required
            placeholder="Enter the details"
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {existingCategory.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            id="image"
            // accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </>
  );
};

export default CreatePostForm;
