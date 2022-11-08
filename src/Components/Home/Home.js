import videobg from "../../assets/pexels-polina-kovaleva-5645037.mp4";
import "./Home.css";
const Home = () => {
  return (
    <>
      <div className="hero lg:min-h-screen bg-base-200">
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
    </>
  );
};

export default Home;
