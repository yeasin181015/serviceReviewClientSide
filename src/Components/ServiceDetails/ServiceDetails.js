import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../../Context/AuthProvider";
import ReviewTable from "./ReviewTable";

const ServiceDetails = () => {
  const { serviceItem, specificReviews } = useLoaderData();
  //   console.log(data);
  const { _id, img, name, description } = serviceItem;

  const { user } = useContext(AuthContext);
  //   console.log(user.uid);

  const handleSubmit = (event) => {
    event.preventDefault();

    const reviewText = event.target.review.value;

    const review = {
      service: _id,
      reviewerID: user.uid,
      name,
      reviewText,
    };

    fetch("http://localhost:5000/reviewsubmit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={img} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">{name}</h1>
          <p className="py-6">{description}</p>
          <button className="btn btn-primary">Order Now</button>
        </div>
      </div>
      <div>
        {specificReviews.length === 0 ? (
          <p> No reviews for this item</p>
        ) : (
          <ReviewTable review={specificReviews}></ReviewTable>
        )}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            name="review"
            id=""
            cols="30"
            rows="10"
            style={{ border: "solid 2px black" }}
          ></textarea>
        </form>
        <button
          type="submit"
          style={{ backgroundColor: "red", color: "white", padding: "5px" }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ServiceDetails;
