import { useState } from "react";

const AddJobModal = ({ close, addJob }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [numNeeded, setNumNeeded] = useState("");
  const [depositAmount, setDepositAmount] = useState(null);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const calculateDeposit = () => {
    if (!salary || !numNeeded) return;
    const totalCost = parseFloat(salary) * parseInt(numNeeded);
    setDepositAmount(totalCost / 2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !salary || !numNeeded || !logo) {
      return alert("Please fill all fields and upload a logo.");
    }
    if (!depositAmount) {
      return alert("Please calculate deposit first.");
    }
    const job = {
      title,
      description,
      salary: parseFloat(salary),
      numNeeded: parseInt(numNeeded),
      deposit: depositAmount,
      logo,
    };
    addJob(job);
    close();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg md:max-w-20 lg:max-w-100">
        <h2 className="text-lg font-semibold mb-4">Add Job</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block font-medium">Job Title:</label>
            <input type="text" className="w-full border p-2 rounded"
              value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="block font-medium">Description:</label>
            <textarea className="w-full border p-2 rounded"
              value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div>
            <label className="block font-medium">Salary per Employee ($):</label>
            <input type="number" className="w-full border p-2 rounded"
              value={salary} onChange={(e) => setSalary(e.target.value)} required />
          </div>
          <div>
            <label className="block font-medium">Number of Employees Needed:</label>
            <input type="number" className="w-full border p-2 rounded"
              value={numNeeded} onChange={(e) => setNumNeeded(e.target.value)} required />
          </div>
          <div>
            <label className="block font-medium">Upload Company Logo:</label>
            <input type="file" accept="image/*" className="w-full border p-2 rounded"
              onChange={handleLogoChange} required />
            {logoPreview && <img src={logoPreview} alt="Logo Preview" className="mt-2 h-16 object-contain border" />}
          </div>
          <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={calculateDeposit}>
            Calculate Deposit
          </button>
          {depositAmount !== null && (
            <p className="text-green-600 font-semibold">Deposit Required: ${depositAmount}</p>
          )}
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={close}>
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={depositAmount === null}>
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobModal;
