import { useState } from "react";
import Profile from "./Profile";
import Jobs from "./Jobs";
import Account from "./Account";
import SubmittedWork from "./SubmittedWork";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("Profile");
  const [menuOpen, setMenuOpen] = useState(false);

  const components = {
    Profile: <Profile />,
    Jobs: <Jobs />,
    Account: <Account />,
    SubmittedWork: <SubmittedWork />,
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-4">Hirer Dashboard</h2>
        <ul>
          {Object.keys(components).map((key) => (
            <li
              key={key}
              className={`p-2 cursor-pointer ${
                activeComponent === key ? "bg-gray-700" : "hover:bg-gray-600"
              }`}
              onClick={() => setActiveComponent(key)}
            >
              {key}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden w-full p-4 bg-gray-800 text-white">
        <button
          className="w-full text-left p-2 bg-gray-700 rounded"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {activeComponent} ▼
        </button>
        {menuOpen && (
          <ul className="mt-2 bg-gray-700 rounded">
            {Object.keys(components).map((key) => (
              <li
                key={key}
                className={`p-2 cursor-pointer ${
                  activeComponent === key ? "bg-gray-600" : "hover:bg-gray-500"
                }`}
                onClick={() => {
                  setActiveComponent(key);
                  setMenuOpen(false);
                }}
              >
                {key}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">{components[activeComponent]}</div>
    </div>
  );
};

export default Dashboard;
