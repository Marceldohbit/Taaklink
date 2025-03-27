import { useState } from "react";
import { Upload, FileText, CheckCircle } from "lucide-react";

const HelpRequest = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    pdf: null,
  });

  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({ ...prev, pdf: file }));
      setFileName(file.name);
      setError(""); // Clear error if valid
    } else {
      setError("Only PDF files are allowed!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required!");
      return;
    }

    if (!formData.pdf) {
      setError("Please attach a PDF document.");
      return;
    }

    // Form submission logic (example: send to backend)
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("email", formData.email);
    formDataObj.append("message", formData.message);
    formDataObj.append("pdf", formData.pdf);

    console.log("Form submitted!", formData);

    // Clear form after submission
    setFormData({ name: "", email: "", message: "", pdf: null });
    setFileName("");
    setError("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Request Help</h2>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Message */}
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe your issue..."
          rows="4"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* PDF Upload Area */}
        <label className="block text-sm font-medium text-gray-700">Attach PDF:</label>
        <div className="relative border border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-100">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          />
          {fileName ? (
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle size={20} />
              <span>{fileName}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2 text-gray-500">
              <Upload size={24} />
              <span>Click to upload a PDF</span>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default HelpRequest;
