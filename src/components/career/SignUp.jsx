import { useState, useEffect } from "react";
import { Upload, CheckCircle, XCircle, Image as ImageIcon } from "lucide-react";
import BlinkingButton from "../BlinkingButton";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    experience: "",
    skills: "",
    availability: "Full-time",
    expectedSalary: "",
    image: null,
    resume: null,
    role: "jobseeker", // Default role selection
  });

  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "image" && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    } else if (type === "resume" && file.type === "application/pdf") {
      setFormData((prev) => ({ ...prev, resume: file }));
      setFileName(file.name);
    } else {
      setError("Invalid file type!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, contact, experience, skills, expectedSalary, role } = formData;

    if (!name || !email || !contact || !experience || !skills || !expectedSalary) {
      setError("All required fields must be filled!");
      return;
    }

    console.log("User Registered:", formData);
    setError("");

    // Redirect based on role
    if (role === "jobseeker") {
      navigate("/jobseeker-dashboard");
    } else {
      navigate("/hirer-dashboard");
    }
  };

  return (
    <div className="relative mx-auto p-6 shadow-lg text-white bg-cover w-full flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundImage: "url('/images/bg2.jpg')" }}>
      
      <h2 className="text-2xl font-bold text-lime-400 mb-6 text-center md:-ml-25">Welcome</h2>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <div className="w-full max-w-3xl md:-ml-25 bg-black bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center gap-6">
        
        {/* Image Upload - Circular Button */}
        <label className="relative cursor-pointer w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon size={40} className="text-gray-500" />
          )}
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "image")} className="hidden" />
        </label>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="w-full px-4 py-2 border rounded bg-gray-800 text-white" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required className="w-full px-4 py-2 border rounded bg-gray-800 text-white" />
            <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Your Contact" required className="w-full px-4 py-2 border rounded bg-gray-800 text-white" />
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Your Skills" required className="w-full px-4 py-2 border rounded bg-gray-800 text-white" />
          </div>

          <textarea name="experience" value={formData.experience} onChange={handleChange} placeholder="Your Experience" rows="3" required className="w-full px-4 py-2 border rounded bg-gray-800 text-white"></textarea>
          <input type="text" name="expectedSalary" value={formData.expectedSalary} onChange={handleChange} placeholder="Expected Salary" required className="w-full px-4 py-2 border rounded bg-gray-800 text-white" />

          {/* Role Selection */}
          <label className="block text-white">Register As:</label>
          <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 border rounded bg-gray-800 text-white">
            <option value="jobseeker">Job Seeker</option>
            <option value="hirer">Hirer</option>
          </select>

          {/* Resume Upload */}
          <label className="block text-white">Upload Resume (Optional):</label>
          <div className="border border-dashed p-4 text-center cursor-pointer hover:bg-gray-700">
            <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, "resume")} className="hidden" />
            {fileName ? (
              <div className="text-green-600 flex items-center space-x-2">
                <CheckCircle size={20} /> <span>{fileName}</span>
              </div>
            ) : (
              <Upload size={24} className="text-gray-500" />
            )}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
        </form>
      </div>

      <BlinkingButton text={'Continue'} link={'/payment'} style={'fixed bottom-4 right-40'} />

      {/* Payment Notification Popup */}
      {showPopup && (
        <div className="fixed top-20 right-0 bg-yellow-500 text-white px-6 py-4 rounded-l-lg shadow-lg transition-transform duration-500 ease-in-out translate-x-0">
          <div className="flex items-center justify-between">
            <span>Payment is required for this option</span>
            <XCircle size={20} className="cursor-pointer" onClick={() => setShowPopup(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
