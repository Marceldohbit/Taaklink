import { useState } from "react";

const Account = () => {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPhone, setSelectedPhone] = useState("");

  const userBalance = {
    total: 5000,
    frozen: 2000,
    deposit: 3000,
    withdrawal: 1500,
  };

  const handleDeposit = () => {
    if (!phone.match(/^\d{10}$/)) {
      alert("Invalid phone number! Enter a 10-digit number.");
      return;
    }
    alert(`Deposit request of $${amount} sent from ${phone}.`);
    setShowDeposit(false);
    setAmount("");
    setPhone("");
  };

  const handleWithdrawal = () => {
    if (!selectedPhone) {
      alert("Please select a phone number for withdrawal.");
      return;
    }
    alert(`Withdrawal request sent to ${selectedPhone}.`);
    setShowWithdrawal(false);
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto">
      {/* Blur Effect Wrapper */}
      <div className={`transition-all duration-300 ${showDeposit || showWithdrawal ? "blur-sm pointer-events-none" : ""}`}>
        <h2 className="text-lg font-semibold mb-4">Account</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100 rounded">
            <p className="font-semibold">Total Balance</p>
            <p className="text-xl">${userBalance.total}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded">
            <p className="font-semibold">Frozen Balance</p>
            <p className="text-xl">${userBalance.frozen}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded">
            <p className="font-semibold">Deposits</p>
            <p className="text-xl">${userBalance.deposit}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded">
            <p className="font-semibold">Withdrawals</p>
            <p className="text-xl">${userBalance.withdrawal}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setShowDeposit(true)}
          >
            Deposit
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => setShowWithdrawal(true)}
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDeposit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-semibold">Deposit Funds</h3>
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border p-2 w-full mt-2 rounded"
            />
            <input
              type="text"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 w-full mt-2 rounded"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded w-full"
              onClick={handleDeposit}
            >
              Pay
            </button>
            <button
              className="text-gray-500 mt-2 w-full"
              onClick={() => setShowDeposit(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Withdrawal Modal */}
      {showWithdrawal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-semibold">Request Withdrawal</h3>
            <select
              value={selectedPhone}
              onChange={(e) => setSelectedPhone(e.target.value)}
              className="border p-2 w-full mt-2 rounded"
            >
              <option value="">Select Phone Number</option>
              <option value="1234567890">123-456-7890</option>
              <option value="9876543210">987-654-3210</option>
            </select>
            <button
              className="bg-green-500 text-white px-4 py-2 mt-4 rounded w-full"
              onClick={handleWithdrawal}
            >
              Request Withdrawal
            </button>
            <button
              className="text-gray-500 mt-2 w-full"
              onClick={() => setShowWithdrawal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
