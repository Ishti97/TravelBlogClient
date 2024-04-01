import { Link } from "react-router-dom";
import { log_out } from "../axiosApi/handleAPI";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/nav.css";
type Props = {
  authorized: boolean;
  user: string;
};

const Navbar = ({ authorized, user }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/login";

  const handleButtonLogOut = async () => {
    try {
      // Log Out & clear local storage
      await log_out();
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userType");

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error calling log Out:", error);
    }
  };

  const handleButtonCreate = async () => {
    navigate("/create", { replace: true });
  };
  // const handleBookmark = async () => {
  //   navigate("/bookmark", { replace: true});
  // };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Travel Blog</h1>
      </div>
      <div className="navbar-right">
        {authorized ? (
          <>
            {/* <input type="text" placeholder="Search..." /> */}
            <button onClick={handleButtonLogOut}>Logout</button>
            {/* <button onClick={handleBookmark}>Bookmark</button> */}
            {user == "AUTHOR" ? (
              <button onClick={handleButtonCreate}>Create</button>
            ) : null}
          </>
        ) : (
          <>
            <Link to="/register" className="btn-register">
              Register
            </Link>
            <Link to="/login" className="btn-login">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
