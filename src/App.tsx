import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Category from "./pages/Category.tsx";
import Missing from "./components/Missing.tsx";

import Edit from "./pages/Edit.tsx";
import Create from "./pages/Create.tsx";
import SinglePost from "./pages/SinglePost";
import Bookmark from "./pages/Bookmark.tsx";

import AdminPanel from "./pages/AdminPanel.tsx";
import PieChart from "./pages/PieChart.tsx";
import { useEffect } from "react";
import { getNewToken } from "./axiosApi/handleAPI.tsx";

const App = () => {
  const checkAuth = async () => {
    const refToken = localStorage.getItem("refreshToken");

    if (refToken !== null) {
      const res = await getNewToken(refToken);

      if (res?.status !== 200) {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userType");

        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>
          {/* Private */}
          <Route path="/" element={<Home />} />

          <Route path="create" element={<Create />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path="post/:id" element={<SinglePost />} />
          <Route path="bookmark" element={<Bookmark />} />

          <Route path="adminpanel" element={<AdminPanel />} />
          <Route path="adminpanel/piechart" element={<PieChart />} />
          <Route path="adminpanel/category" element={<Category />} />
        </Route>

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* No Route */}
        <Route path="*" element={<Missing />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
