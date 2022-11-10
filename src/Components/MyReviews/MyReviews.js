import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetch(`http://localhost:5000/myreviews?userID=${user?.uid}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReviews(data);
      });
  }, [user?.uid]);
  //   console.log(reviews);
  let count = 0;
  return (
    <>
      {reviews.length == 0 ? (
        <h1>You have no reviews</h1>
      ) : (
        <h1>You have {reviews.length} reviews</h1>
      )}
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Item</th>
              <th>Review</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((item) => (
              <tr key={item._id}>
                <td>{(count = count + 1)}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    {/* <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src="/tailwind-css-component-profile-2@56w.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div> */}

                    <div>
                      <div className="font-bold">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td>{item.reviewText}</td>

                <td>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyReviews;
