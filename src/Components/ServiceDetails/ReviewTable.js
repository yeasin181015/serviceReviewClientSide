const ReviewTable = (props) => {
  //   console.log(props.review);
  const reviews = props.review;
  console.log(reviews);
  let count = 0;
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((item) => (
            <tr key={item._id}>
              <th>{(count = count + 1)}</th>
              <td>{item.reviewText}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewTable;
