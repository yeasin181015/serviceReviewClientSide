import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import videobg from "../../assets/pexels-polina-kovaleva-5645037.mp4";
import Service from "../Service/Service";
import "./Home.css";
const Home = () => {
  const data = useLoaderData();
  return (
    <>
      <div className="hero ">
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <video
            src={videobg}
            autoPlay
            loop
            muted
            className="w-50 h-50 rounded"
          ></video>
          <div>
            <h1 className="text-5xl font-bold">Box Office News!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      <div>
        <div className="service-cards">
          {data.map((item) => (
            <Service key={item._id} service={item}></Service>
          ))}
        </div>
        <div className="mt-10">
          <Link to="/all-services">
            <Button>See all</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
