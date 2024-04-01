import { useEffect } from "react";
import { useState } from "react";
import {
  getCategory,
  deleteCategory,
  createNewCategory,
} from "../axiosApi/handleAPI";
const Category = () => {
  const [contents, setContents] = useState([]);

  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const fetchData = async () => {
    const data = await getCategory();
    setContents(data.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (contentId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      await deleteCategory(contentId);

      alert("Category deleted successfully");

      fetchData(); // Update your state or fetch the updated list of posts
    }
  };

  const handleSubmit = async (name: string) => {
    // e.preventDefault();

    if (!name) {
      setError("Not Fulfilled");
      return;
    }
    try {
      createNewCategory(name);
    } catch (error) {
      console.error("Create error:");
    }
  };

  return (
    <>
      <h1>Categories</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contents.map((content, index) => (
            <tr key={index}>
              <td>{content.name}</td>
              <td>
                <button onClick={() => handleDelete(content.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            placeholder="Enter category"
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default Category;
