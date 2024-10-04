import React, { useState } from "react";
import { FaUserEdit, FaChartBar } from "react-icons/fa";
import EditProfile from "./EditProfile";
import StatsView from "./StatsView";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("editProfile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      <aside className="w-1/4 bg-gray-800 p-6">
        <ul className="space-y-4">
          <li
            className={`cursor-pointer flex items-center space-x-2 p-2 rounded ${
              activeTab === "editProfile" ? "bg-gray-700" : ""
            }`}
            onClick={() => handleTabClick("editProfile")}
          >
            <FaUserEdit />
            <span>Edit Profile</span>
          </li>
          <li
            className={`cursor-pointer flex items-center space-x-2 p-2 rounded ${
              activeTab === "statsView" ? "bg-gray-700" : ""
            }`}
            onClick={() => handleTabClick("statsView")}
          >
            <FaChartBar />
            <span>View Stats</span>
          </li>
        </ul>
      </aside>
      <main className="flex-grow p-6">
        {activeTab === "editProfile" && <EditProfile />}
        {activeTab === "statsView" && <StatsView />}
      </main>
    </div>
  );
};

export default ProfilePage;
