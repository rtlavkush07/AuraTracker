import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseName, setCourseName] = useState();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);

        // fetch course name
        if (response.data.course) {
          const courseRes = await axios.get(
            `/api/student/course/${response.data.course}`
          );
          setCourseName(courseRes.data.courseName);
        }

        console.log("Profile:", response.data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchProfileData();
  }, [isAuthenticated, navigate, token]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className=" overflow-hidden">
      

      <div className="relative bg-black bg-opacity-30 mt-20 text-white min-h-screen p-8">
        {/* Profile Header */}
        <div className="flex items-start mb-8 mx-10 justify-between">
          
          <div className="flex flex-col  space-y-8 mt-12">
            <img
            src={userData.profilePicture}
            alt="profile"
            className="w-40 h-40 rounded-full border mr-8"
          />
            <h2 className="text-2xl font-semibold">Welcome: {userData.name}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mt-8">
            <div className="bg-black bg-opacity-45 p-6 rounded-lg text-center">
              <h2 className="text-lg font-semibold">Rating</h2>
              <p className="text-2xl">{userData.userProfile.rating || 0}</p>
            </div>
            <div className="bg-black bg-opacity-45 p-6 rounded-lg text-center">
              <h2 className="text-lg font-semibold">Aura Coins</h2>
              <p className="text-2xl">{userData.userProfile.auraCoins || 0}</p>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-10 mt-5">
          <div className="bg-black bg-opacity-45 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Email</h2>
            <p className="text-2xl">{userData.email}</p>
          </div>
          <div className="bg-black bg-opacity-45 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Course</h2>
            <p className="text-2xl">{courseName}</p>
          </div>
          <div className="bg-black bg-opacity-45 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Year</h2>
            <p className="text-2xl">{userData.year}</p>
          </div>
          <div className="bg-black bg-opacity-45 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Reg No. </h2>
            <p className="text-2xl">{userData.regNo}</p>
          </div>
        </div>

        {/* Badges Section */}
        <div className="bg-black bg-opacity-45 p-6 rounded-lg mb-6 mt-5 overflow-x-auto whitespace-nowrap">
          <h2 className="text-2xl font-semibold mb-4">Badges</h2>
          <div className="flex gap-4">
            {userData.userProfile.badges?.length > 0 ? (
              userData.userProfile.badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center w-50 px-10 py-10 rounded-full"
                >
                  {badge.icon && (
                    <img
                      src="/badge/bronze.png" 
                      alt={badge.name}
                      className="w-20 h-20 mr-2"
                    />
                  )}
                  <span className="text-3xl">{badge.name}</span>
                </div>
              ))
            ) : (
              <p>No badges available</p>
            )}
          </div>
        </div>

        {/* Purchase History Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-6"
        >
          View Purchase History
        </button>

        {/* Purchase History Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-scroll">
            <div className="bg-black bg-opacity-40 text-white rounded-lg p-6 max-w-lg w-full relative">
              <h2 className="text-2xl font-semibold mb-4">Purchase History</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-red-500 absolute top-4 right-4"
              >
                &#10005;
              </button>
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="border-b border-gray-700 py-2">Item</th>
                    <th className="border-b border-gray-700 py-2">
                      Purchase Date
                    </th>
                    <th className="border-b border-gray-700 py-2">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.userProfile.purchaseHistory?.length > 0 ? (
                    userData.userProfile.purchaseHistory.map((purchase) => (
                      <tr key={purchase.id}>
                        <td className="py-2">{purchase.itemName}</td>
                        <td className="py-2">{purchase.purchaseDate}</td>
                        <td className="py-2">{purchase.cost} Coins</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="py-2 text-center">
                        No purchase history available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
