import { Button } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";

const Update = () => {
  const data = useLoaderData();
  //   console.log(data);
  const handleUpdate = (event) => {
    event.preventDefault();
    const message = event.target.review.value;
    // console.log(data.reviewText);
    data.reviewText = message;
    // console.log(data);
    const updatedData = {};
    fetch(`http://localhost:5000/myreviews/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("genius-token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Review updated");
          console.log(data);
        }
      });
  };
  return (
    <div>
      <h2>Please Update:</h2>
      <form onSubmit={handleUpdate}>
        <textarea
          name="review"
          rows="4"
          className="block p-2.5 w-50 mx-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          defaultValue={data.reviewText}
        ></textarea>

        <Button type="submit">Update Review</Button>
      </form>
    </div>
  );
};

export default Update;
