import { getCategory } from "../axiosApi/handleAPI";
import { useEffect, useState } from "react";

const Menu = ({ onSelectCategory }) => {
  const [contents, setContents] = useState([]);

  const fetchData = async () => {
    const data = await getCategory();
    setContents(data.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {" "}
      <h2>Categories</h2>
      <ul>
        {/* Render "All" option */}
        <li
          key="all"
          onClick={() => onSelectCategory(null)}
          style={{ cursor: "pointer" }}
        >
          All
        </li>
        {/* Render other categories */}
        {contents.map((content, index) => (
          <li
            key={index}
            onClick={() => onSelectCategory(content.id)}
            style={{ cursor: "pointer" }}
          >
            {content.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Menu;
