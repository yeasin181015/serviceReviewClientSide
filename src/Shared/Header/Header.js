import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../../Context/AuthProvider";
import { FaUserAlt } from "react-icons/fa";
const Header = () => {
  const { user, setUserName, logout } = useContext(AuthContext);
  // console.log(user);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const checkLogout = await logout();
      setUserName(null);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  console.log(user);
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/" className="no-underline text-black">
            ShireenKitchenette
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Link to="/" className="mr-2 no-underline text-black">
              Home
            </Link>
            <Link to="/blog" className="no-underline text-black">
              Blog
            </Link>
            <Link to="/all-services" className="ml-2 no-underline text-black">
              Services
            </Link>
          </Nav>
          <Nav className="mr-3">
            <Link to="/myreviews" className="no-underline text-black">
              My Reviews
            </Link>
          </Nav>
          <Nav>
            {user?.uid ? (
              <Nav className="flex justify-center items-center">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    className="rounded-full w-10 mr-3"
                  ></img>
                ) : (
                  <FaUserAlt className="mr-3"></FaUserAlt>
                )}
                <span className="mr-2">{user.displayName || user.email}</span>
                <button onClick={handleLogout} style={{ color: "red" }}>
                  Logout
                </button>
              </Nav>
            ) : (
              <Nav>
                <Link to="/login" className="mr-2 no-underline text-black">
                  Login
                </Link>
                <Link to="/register" className="no-underline text-black">
                  Register
                </Link>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
