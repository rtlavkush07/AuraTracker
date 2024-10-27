// src/pages/Home.jsx
import React from 'react';
import 'animate.css'; // Import Animate.css

const Home = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            {/* Hero Section with Gradient Background */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-20 flex flex-col items-center justify-center">
                <h1 className="text-5xl font-bold mb-4 animate__animated animate__fadeInDown">
                    Welcome to Our Aura Tracker
                </h1>
                <p className="text-xl mb-8 animate__animated animate__fadeIn animate__delay-1s">
                    Discover amazing features and connect with others.
                </p>
                <button className="bg-white text-blue-500 px-6 py-3 rounded-lg shadow-lg hover:bg-blue-100 transition duration-300 animate__animated animate__pulse animate__delay-2s">
                    Get Started
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Feature Cards */}
                {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 animate__animated animate__fadeIn"
                        style={{ animationDelay: `${index * 0.2}s` }} // Staggered animation
                    >
                        <h2 className="text-xl font-semibold mb-2">Feature {index + 1}</h2>
                        <p className="text-gray-700">This is a brief description of Feature {index + 1}.</p>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center py-4">
                <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
