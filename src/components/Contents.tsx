import { useState, useEffect } from "react";
import {
  deletePost,
  fetchApprovedPosts,
  createBookmark,
} from "../axiosApi/handleAPI";
import { useNavigate } from "react-router-dom";
import ListItem from "./ListItem";

const Contents = ({ user, id, filteredPosts }) => {
  const [contents, setContents] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const navigate = useNavigate();
 

  const filteredPostId = filteredPosts;

  const fetchData = async () => {
    const data = await fetchApprovedPosts();
    setContents(data.data.allPosts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (filteredPostId !== null) {
      setFilteredData(
        contents.filter((post) => post.categoryId === filteredPostId)
      );
      setIsFilterActive(true);
    } else {
      setIsFilterActive(false); // Reset filter state
    }
  }, [filteredPostId]);

  const handleDelete = async (postId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      await deletePost(postId);

      alert("Post deleted successfully");

      fetchData(); // Update your state or fetch the updated list of posts
    }
  };

  const handleEdit = (contentId: number, contentDetail: string) => {
    navigate(`/edit/${contentId}`, {
      replace: true,
      state: { contentDetail },
    });
  };

  const handleRead = (contentId: number) => {
    navigate(`/post/${contentId}`);
  };
  const handleBookmark = async (contentId: number, userId: number) => {
    try {
     await createBookmark(contentId, userId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ul>
        {isFilterActive
          ? filteredData.map((content, index) => (
              <ListItem
                key={index}
                content={content}
                handleRead={handleRead}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleBookmark={handleBookmark}
                id={id}
              />
            ))
          : contents.map((content, index) => (
              <ListItem
                key={index}
                content={content}
                handleRead={handleRead}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleBookmark={handleBookmark}
                id={id}
              />
            ))}
      </ul>
    </>
  );
};

export default Contents;
