import { useState } from "react";

const SubmittedWork = () => {
  const [showRating, setShowRating] = useState(null);
  const [rating, setRating] = useState({});
  
  const submittedWorks = [
    {
      id: 1,
      user: "dev_master01",
      title: "AI Sorting Algorithm",
      description: "An optimized sorting algorithm using AI heuristics.",
      code: `def ai_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return ai_sort(left) + middle + ai_sort(right)\n\n# Sample Usage\narr = [5, 2, 9, 1, 5, 6]\nsorted_arr = ai_sort(arr)\nprint(sorted_arr)\n\n# AI heuristic function\ndef ai_heuristic(value):\n    return value % 3\n\n# Another sample\nnums = [11, 7, 3, 8, 10]\nprint(ai_sort(nums))`,
      design: "/sample-design1.png",
    },
    {
      id: 2,
      user: "ui_expert99",
      title: "Chatbot Response System",
      description: "A chatbot model that understands natural language.",
      code: `class Chatbot:\n    def __init__(self, model):\n        self.model = model\n\n    def get_response(self, text):\n        if text.lower() in ["hi", "hello"]:\n            return "Hello! How can I assist you today?"\n        elif "bye" in text.lower():\n            return "Goodbye! Have a great day!"\n        else:\n            return self.model.predict(text)\n\n# Example usage\nclass AIModel:\n    def predict(self, text):\n        return f"AI Response: {text[::-1]}"  # Simulated AI response\n\nchatbot = Chatbot(AIModel())\nprint(chatbot.get_response("Hello"))\nprint(chatbot.get_response("How are you?"))\nprint(chatbot.get_response("bye"))`,
      design: "/sample-design2.png",
    },
  ];

  const handleAccept = (id) => {
    alert("Work accepted! Payment will be processed.");
    setShowRating(id);
  };

  const handleDecline = (id) => {
    alert("Work declined! 10% of the amount will be deducted.");
    setShowRating(id);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Submitted Work</h2>

      {submittedWorks.map((work) => (
        <div
          key={work.id}
          className="bg-gray-100 p-4 mb-6 rounded-lg"
          style={{ userSelect: "none", pointerEvents: "none" }}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">{work.title}</h3>
            <span className="text-gray-500">@{work.user}</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{work.description}</p>

          {/* Code Editor Simulation */}
          <div className="bg-gray-900 text-green-400 font-mono p-3 rounded-md mt-2 text-sm overflow-hidden">
            <pre>{work.code}</pre>
          </div>

          {/* Design Preview */}
          <div className="mt-4">
            <img
              src={work.design}
              alt="Design preview"
              className="w-full rounded-md border"
            />
          </div>

          <div className="flex justify-between mt-4" style={{ pointerEvents: "auto" }}>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
              onClick={() => handleAccept(work.id)}
            >
              ✔ Accept
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
              onClick={() => handleDecline(work.id)}
            >
              ✖ Decline
            </button>
          </div>

          {/* Rating Prompt */}
          {showRating === work.id && (
            <div className="mt-4 bg-gray-200 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Rate the Work</h3>
              <input
                type="number"
                min="1"
                max="5"
                className="border p-2 rounded w-full mt-2"
                value={rating[work.id] || ""}
                onChange={(e) =>
                  setRating({ ...rating, [work.id]: e.target.value })
                }
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 mt-3 rounded"
                onClick={() => setShowRating(null)}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubmittedWork;

