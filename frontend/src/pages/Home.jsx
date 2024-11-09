import React from 'react';

const Home = () => {
  return (
    <div className="w-full h-screen">
      {/* Background GIF */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('../public/assets/bgFinal.gif')", // Use the correct path for your GIF
          height: '100%', // Ensure it covers the entire height of the parent div
          width: '100%',  // Ensure it covers the entire width of the parent div
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay for text visibility */}
      </div>

      {/* Animated Text */}
      <div className="relative flex items-center justify-center w-full h-full">
        <h1 className="text-5xl md:text-6xl lg:text-7xl text-white font-cursive text-center animate-pulse shadow-lg">
          AURA TRACKER
        </h1>
      </div>
    </div>
  );
};

export default Home;