import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  const [userData, setUserData] = useState(null);
  const [showPurchaseHistory, setShowPurchaseHistory] = useState(false);
  const [showCoupons, setShowCoupons] = useState(false);
  const [showVouchers, setShowVouchers] = useState(false);

  const scrollRefBadges = useRef();
  const scrollRefCoupons = useRef();
  const scrollRefVouchers = useRef();

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
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchProfileData();
  }, [isAuthenticated, navigate, token]);

  const scroll = (ref, direction) => {
    const scrollAmount = direction === "left" ? -100 : 100;
    ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const togglePurchaseHistory = () => setShowPurchaseHistory(!showPurchaseHistory);
  const toggleCoupons = () => {
    setShowCoupons(!showCoupons);
    setShowVouchers(false);
  };
  const toggleVouchers = () => {
    setShowVouchers(!showVouchers);
    setShowCoupons(false);
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="h-screen w-screen flex flex-col items-center overflow-hidden">
      <div className="flex w-full h-full rounded-lg shadow-lg p-4">
        {/* Profile Section */}
        <div className="flex flex-col items-center w-1/4 p-6 bg-white shadow-lg rounded-lg">
          <img
            src={userData.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="rounded-full w-40 h-40 mb-4 border-4 border-blue-500 shadow-md"
          />
          <h1 className="text-2xl font-semibold text-center text-gray-800">{userData.name}</h1>
          <p className="text-gray-500 text-center">{userData.email}</p>
          <p className="text-gray-600 text-center mt-2">Reg No: <span className="font-medium">{userData?.regNo}</span></p>
          <p className="text-gray-600 text-center">Course: <span className="font-medium">{userData?.course}</span></p>
          <p className="text-gray-600 text-center">Year: <span className="font-medium">{userData?.year}</span></p>
          <div className="flex justify-center items-center space-x-2 mt-2">
            <p className="text-gray-600">Rating:</p>
            <p className="text-yellow-500 font-bold">{userData.userProfile?.rating} ⭐</p>
          </div>
          <div className="flex justify-center items-center space-x-2 mt-2">
            <p className="text-gray-600">Coins:</p>
            <p className="text-blue-500 font-bold">{userData.userProfile?.auraCoins}</p>
          </div>
        </div>

        {/* Badges and Actions Section */}
        <div className="flex flex-col w-3/4 bg-white p-2">
          <h2 className="text-lg font-semibold mb-2">Badges</h2>
          <div className="relative flex items-center w-full">
            <button
              onClick={() => scroll(scrollRefBadges, "left")}
              className="bg-blue-500 text-white px-3 py-1 rounded-l hover:bg-blue-600 absolute left-0 z-10"
            >
              &lt;
            </button>
            <div ref={scrollRefBadges} className="flex overflow-x-auto whitespace-nowrap space-x-4 py-2 mx-10">
              {userData.userProfile?.badges.length > 0 ? (
                userData.userProfile?.badges.map((badge, index) => (
                  <div key={index} className="flex flex-col items-center min-w-[60px]">
                    <img src={badge.image} alt={badge.title} className="w-12 h-12 rounded-full" />
                    <p className="text-sm text-center">{badge.title}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No Badges 😞</p>
              )}
            </div>
            <button
              onClick={() => scroll(scrollRefBadges, "right")}
              className="bg-blue-500 text-white px-3 py-1 rounded-r hover:bg-blue-600 absolute right-0 z-10"
            >
              &gt;
            </button>
          </div>

          <h2 className="text-lg font-semibold mt-4">Actions</h2>
          <button
            onClick={toggleCoupons}
            className={`bg-green-500 text-white px-4 py-2 rounded mb-2 ${showCoupons ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            Coupons
          </button>
          {showCoupons && (
            <div className="flex items-center mb-4">
              <button onClick={() => scroll(scrollRefCoupons, "left")} className="bg-blue-500 text-white px-2 py-1 rounded-l hover:bg-blue-600">
                &lt;
              </button>
              <div ref={scrollRefCoupons} className="flex overflow-hidden whitespace-nowrap space-x-4 py-2">
                {userData.userProfile?.coupons.length > 0 ? (
                  userData.userProfile?.coupons.map((coupon, index) => (
                    <div key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                      {coupon}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">No Coupons 😞 Complete Goals to get Coupons</p>
                )}
              </div>
              <button onClick={() => scroll(scrollRefCoupons, "right")} className="bg-blue-500 text-white px-2 py-1 rounded-r hover:bg-blue-600">
                &gt;
              </button>
            </div>
          )}

          <button
            onClick={toggleVouchers}
            className={`bg-yellow-500 text-white px-4 py-2 rounded mb-2 ${showVouchers ? 'bg-yellow-600' : 'hover:bg-yellow-600'}`}
          >
            Vouchers
          </button>
          {showVouchers && (
            <div className="flex items-center mb-4">
              <button onClick={() => scroll(scrollRefVouchers, "left")} className="bg-blue-500 text-white px-2 py-1 rounded-l hover:bg-blue-600">
                &lt;
              </button>
              <div ref={scrollRefVouchers} className="flex overflow-hidden whitespace-nowrap space-x-4 py-2">
                {userData.userProfile?.vouchers.length > 0 ? (
                  userData.userProfile?.vouchers.map((voucher, index) => (
                    <div key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                      {voucher}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">No Vouchers 😞 Complete Goals to get Vouchers</p>
                )}
              </div>
              <button onClick={() => scroll(scrollRefVouchers, "right")} className="bg-blue-500 text-white px-2 py-1 rounded-r hover:bg-blue-600">
                &gt;
              </button>
            </div>
          )}

          <button onClick={togglePurchaseHistory} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Purchase History
          </button>

          {showPurchaseHistory && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-6 w-3/4 max-w-md">
                <h2 className="text-lg font-semibold mb-2">Purchase History</h2>
                <ul>
                  {userData.userProfile?.purchaseHistory.map((item, index) => (
                    <li key={index} className="text-gray-700 px-3 py-1 mb-1 border-b border-gray-200">
                      {item}
                    </li>
                  ))}
                </ul>
                <button onClick={togglePurchaseHistory} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
