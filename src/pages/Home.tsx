import Menu from "../components/Menu";
import Contents from "../components/Contents";
import Footer from "../components/Footer";
import Navbar from "../components/Header";
import Landing from "../components/Landing";
import { useEffect, useState } from "react";

import "../css/home.css";

const Home = () => {
  const [auth, setAuth] = useState(false);
  const [type, setType] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");

    if (userId && userType) {
      setAuth(true);
      setType(userType);
      setId(userId);
    } else {
      setAuth(false);
    }
  }, []);

  const [selectedCategoryId, setSelectedCategoryId] = useState(Number);

  // Handle category selection
  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="page-layout">
      <Navbar authorized={auth} user={type} />

      <div className="content">
        {auth ? (
          <>
            <div className="sidebar">
              <Menu onSelectCategory={handleSelectCategory} />
            </div>
            <div className="main-content">
              <Contents
                user={type}
                id={id}
                filteredPosts={selectedCategoryId}
              />
            </div>
          </>
        ) : (
          <Landing />
        )}
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
