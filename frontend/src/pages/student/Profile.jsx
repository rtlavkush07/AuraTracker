import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);

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
        console.log(response.data)
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchProfileData();
  }, [isAuthenticated, navigate, token]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      {/* Header with Name and Image */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={userData.profilePicture}
          alt="profile image"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h1 className="text-3xl font-semibold">{userData.name || 'User'}</h1>
      </div>

      {/* Rating and Aura Coins */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-black p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Rating</h2>
          <p className="text-3xl">{userData.userProfile.rating || 0}</p>
        </div>
        <div className="bg-black p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Aura Coins</h2>
          <p className="text-3xl">{userData.userProfile.auraCoins || 0}</p>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-black p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Badges</h2>
        <div className="flex gap-4">
          {userData.badges && userData.badges.length > 0 ? (
            userData.badges.map((badge, index) => (
              <div key={index} className="bg-green-700 px-4 py-2 rounded-full">
                {badge}
              </div>
            ))
          ) : (
            <p>No badges available</p>
          )}
        </div>
      </div>

      {/* Vouchers */}
      <div className="bg-black p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Vouchers</h2>
        <ul className="list-disc list-inside">
          {userData.vouchers && userData.vouchers.length > 0 ? (
            userData.vouchers.map((voucher) => (
              <li key={voucher.id}>{voucher.name}</li>
            ))
          ) : (
            <p>No vouchers available</p>
          )}
        </ul>
      </div>

      {/* Purchase History */}
      <div className="bg-black p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Purchase History</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="border-b border-gray-700 py-2">Item</th>
              <th className="border-b border-gray-700 py-2">Purchase Date</th>
              <th className="border-b border-gray-700 py-2">Cost</th>
            </tr>
          </thead>
          <tbody>
            {userData.purchaseHistory && userData.purchaseHistory.length > 0 ? (
              userData.purchaseHistory.map((purchase) => (
                <tr key={purchase.id}>
                  <td className="py-2">{purchase.itemId}</td>
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
  );
};

export default Profile;
