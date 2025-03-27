import { useState } from "react";

const RatingModal = ({ work, actionType, close }) => {
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    alert(`${actionType === "accept" ? "Accepted" : "Declined"} work: ${work.title} (Rating: ${rating} stars)`);
    close();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">
          {actionType === "accept" ? "Accept Work" : "Decline Work"}
        </h2>
        <p>Rate the work:</p>
        <div className="mt-2">
          {[1, 2, 3, 4, 5].map(star => (
            <button key={star} className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
              onClick={() => setRating(star)}>★</button>
          ))}
        </div>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default RatingModal;

