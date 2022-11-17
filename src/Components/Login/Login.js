import React from "react";
import { useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider.js";
import Button from "react-bootstrap/Button";
import { GoogleAuthProvider } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { signInUser, providerLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        //console.log(user);

        const currentUser = {
          uid: user.uid,
        };

        //get jwt token
        fetch("http://localhost:5000/jwt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            //save in local storage
            localStorage.setItem("profile-token", data.token);
            navigate(from, { replace: true });
          });
      })
      .catch((error) => console.error(error));
  };

  const handleGoogleSignIn = async () => {
    try {
      const gmailUser = await providerLogin(googleProvider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Please login first.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text ">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>

            <Link to="/register" className="text-black text-left no-underline">
              New to our website?
            </Link>
            <ToastContainer />
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <Button variant="danger" onClick={handleGoogleSignIn}>
              Login with Google
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
