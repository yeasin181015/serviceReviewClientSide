import { Link, useLoaderData } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../../Context/AuthProvider";
import ReviewTable from "./ReviewTable";
import "./ServiceDetails.css";
import { PhotoProvider, PhotoView } from "react-photo-view";

const ServiceDetails = () => {
  const { serviceItem, specificReviews } = useLoaderData();
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
        authorization: `Bearer ${localStorage.getItem("genius-token")}`,
      },
      body: JSON.stringify(review),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <PhotoProvider>
          <PhotoView src={img}>
            <img src={img} alt="" className="max-w-sm rounded-lg shadow-2xl" />
          </PhotoView>
        </PhotoProvider>
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
      {user?.uid ? (
        <div>
          <h2>Add Review</h2>
          <form onSubmit={handleSubmit} className="flex flex-col w-50 mx-auto">
            <textarea
              name="review"
              id=""
              style={{ border: "solid 2px black" }}
            ></textarea>
            <div>
              <button type="submit" className="submitButton">
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ServiceDetails;
