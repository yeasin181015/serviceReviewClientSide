import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Update from "./Update";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(AuthContext);

  const handleDelete = (id) => {
    const proceed = window.confirm(
      "Are you sure, you want to cancel this order"
    );
    if (proceed) {
      fetch(`http://localhost:5000/myreviews/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("genius-token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("deleted successfully");
            const remaining = reviews.filter((odr) => odr._id !== id);
            setReviews(remaining);
          }
        });
    }
  };
  // const handleUpdate = (id) => {
  //   fetch(`http://localhost:5000/myreviews/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       " Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ status: "Approved" }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (data.modifiedCount > 0) {
  //         const remaining = reviews.filter((odr) => odr._id !== id);
  //         const approving = reviews.find((odr) => odr._id === id);
  //         approving.status = "Approved";
  //         const newOrders = [approving, ...remaining];
  //         setOrders(newOrders);
  //       }
  //     });
  // };
  useEffect(() => {
    fetch(`http://localhost:5000/myreviews?userID=${user?.uid}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReviews(data);
      });
  }, [user?.uid]);
  // console.log(reviews);
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((item) => (
              <tr key={item._id}>
                <td>{(count = count + 1)}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td>{item.reviewText}</td>
                <td>
                  <Link to={`/update/${item._id}`}>
                    <Button>Update</Button>
                  </Link>
                </td>
                <td>
                  <Button onClick={() => handleDelete(item._id)}>Delete</Button>
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
