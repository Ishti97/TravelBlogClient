import { getCategory } from "../axiosApi/handleAPI";
import { useEffect, useState } from "react";

type Category = {
 
  id: number,
  name: string,
};

type ContentsProps = {
  onSelectCategory: Function,
}


const Menu: React.FC<ContentsProps> = ({ onSelectCategory }) => {
  const [contents, setContents] = useState<Category[]>([]);

  const fetchData = async () => {
    const data = await getCategory();
    setContents(data?.data.data);
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
