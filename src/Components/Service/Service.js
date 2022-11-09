import { Link } from "react-router-dom";
import "./Service.css";
const Service = ({ service }) => {
  const { _id, name, img, description } = service;
  const slicedDes = description.slice(0, 150);
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img src={img} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{slicedDes}...</p>
        <div className="card-actions justify-end">
          <Link to={`/service/${_id}`}>
            <button className="btn btn-primary">See more</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Service;
