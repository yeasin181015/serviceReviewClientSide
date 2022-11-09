import { useLoaderData } from "react-router-dom";
import Service from "../Service/Service.js";
import "./AllService.css";
const AllService = () => {
  const data = useLoaderData();
  return (
    <div className="all-service-div">
      {data.map((item) => (
        <Service key={item._id} service={item}></Service>
      ))}
    </div>
  );
};

export default AllService;
