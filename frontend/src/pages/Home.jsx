import React from "react";

const Home = () => {
  return (
    <div className="w-full h-full bg-gray-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white">
        <div className="absolute inset-0">
          <img
            src="/assets/bg1.jpg"
            alt="background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 flex flex-col md:flex-row items-center">
          {/* Left text */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              One Platform for Smarter Learning & Teaching
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Students can track studies, teachers can manage assignments, and
              admins can control everything – all in one app.
            </p>
            <div className="flex gap-4 mt-6">
              <button className="px-6 py-3 bg-yellow-500 text-blue-900 font-semibold rounded-lg shadow hover:bg-yellow-400 transition">
                Get Started
              </button>
             
            </div>
          </div>

          {/* Right side illustration */}
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <img
              src="/assets/dashboard.png"
              alt="Aura Tracker Dashboard"
              className="w-[80%] rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Choose Aura Tracker?
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            We bring Students, Teachers, and Admins together for a smarter
            academic journey.
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {/* Student Card */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                🎓 For Students
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>✅ Track assignments & deadlines</li>
                <li>✅ Set study goals</li>
                <li>✅ View progress reports</li>
              </ul>
            </div>

            {/* Teacher Card */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                👩‍🏫 For Teachers
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>✅ Allot assignments easily</li>
                <li>✅ Monitor student performance</li>
                <li>✅ Share feedback quickly</li>
              </ul>
            </div>

            {/* Admin Card */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                🛠️ For Admins
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>✅ Manage teachers & students</li>
                <li>✅ Add/Delete users</li>
                <li>✅ Generate system reports</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-900 text-white py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Start Your Academic Journey Smarter Today
        </h2>
        <p className="mt-4 text-gray-200 text-lg">
          Whether you are a Student, Teacher, or Admin – Aura Tracker is here
          for you.
        </p>
        
      </section>
    </div>
  );
};

export default Home;
