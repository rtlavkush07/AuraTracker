import React, { useState } from 'react';

// Sample data structure for the leaderboard with diverse courses
const leaderboardData = [
  { id: 1, name: "Alice", course: "BTech Computer Science", year: "2024", rating: 95 },
  { id: 2, name: "Bob", course: "BTech Mechanical", year: "2024", rating: 90 },
  { id: 3, name: "Charlie", course: "MCA", year: "2023", rating: 85 },
  { id: 4, name: "David", course: "BTech Electrical", year: "2024", rating: 80 },
  { id: 5, name: "Eve", course: "BTech Chemical", year: "2024", rating: 78 },
  { id: 6, name: "Frank", course: "MTech VLSI", year: "2024", rating: 92 },
  { id: 7, name: "Grace", course: "MTech Computer Science", year: "2023", rating: 88 },
];

const selfRank = {
  id: 0,
  name: "You",
  course: "BTech Computer Science",
  year: "2024",
  rating: 88,
  imageUrl: "https://via.placeholder.com/100" // Placeholder for user image
};

const Leaderboard = () => {
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [selectedYear, setSelectedYear] = useState("All Years");

  // Filter data based on selected course and year
  const filteredData = leaderboardData.filter(user => {
    const courseMatch = selectedCourse === "All Courses" || user.course === selectedCourse;
    const yearMatch = selectedYear === "All Years" || user.year === selectedYear;
    return courseMatch && yearMatch;
  });

  // Sort filtered data by rating in descending order
  const sortedData = [...filteredData].sort((a, b) => b.rating - a.rating);

  // Determine user's rank based on the selected course and year
  let userRank = '-';

  if (selectedCourse === selfRank.course) {
    const rankIndex = sortedData.findIndex(user => user.id === selfRank.id);
    if (rankIndex !== -1) {
      userRank = rankIndex + 1; // Rank starts from 1
    }
  } else if (selectedCourse === "All Courses") {
    const yearFilteredData = leaderboardData.filter(user => user.year === selfRank.year);
    const rankIndex = yearFilteredData.findIndex(user => user.id === selfRank.id);
    if (rankIndex !== -1) {
      userRank = rankIndex + 1; // Rank starts from 1
    }
  }

  return (
    <div className='w-screen h-screen bg-gradient-to-r  p-10'>
      <div className="p-4 w-3/4 mx-auto h-[85vh] bg-white shadow-xl rounded-lg font-sans overflow-hidden border border-gray-300">
        <div className="flex h-full">
          <div className="w-1/3 p-5 border-r border-gray-300 text-center shadow-lg rounded-lg">
            <h2 className="mb-4 mt text-2xl font-semibold text-blue-600">Logged In User</h2>
            <img
              src={selfRank.imageUrl}
              style={{ margin: "auto" }}
              alt="User"
              className="rounded-full w-28 h-28 mb-4 border-4 border-blue-500 shadow-lg block"
            />
            <div className="text-center">
              <p className="mt-4 text-3xl font-extrabold text-blue-600 shadow-md p-2 rounded-md bg-blue-200 inline-block">
                Rank: {userRank}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-5">
                <div className="bg-white shadow-lg rounded-lg p-3 flex flex-col items-center h-24 w-30">
                  <p className="text-gray-800 text-lg font-semibold">
                    <strong className="text-blue-600">Name</strong>
                  </p>
                  <p className='text-gray-800 font-bold'>{selfRank.name}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-3 flex flex-col items-center h-24 w-30">
                  <p className="text-gray-800 text-lg font-semibold">
                    <strong className="text-blue-600">Rating</strong>
                  </p>
                  <p className='text-green-500 font-bold'>{selfRank.rating}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-3 flex flex-col items-center h- w-30">
                  <p className="text-gray-800 text-lg font-semibold">
                    <strong className="text-blue-600">Course</strong>
                  </p>
                  <p className='text-gray-800 font-bold'>{selfRank.course}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-3 flex flex-col items-center h-24 w-30">
                  <p className="text-gray-800 text-lg font-semibold">
                    <strong className="text-blue-600">Year</strong>
                  </p>
                  <p className='text-gray-800 font-bold'>{selfRank.year}</p>
                </div>
              </div>


            </div>
          </div>
          {/* Leaderboard Section */}
          <div className="w-2/3 p-5 overflow-auto shadow-lg rounded-lg">
            <h1 className="text-3xl text-center font-extrabold mb-5 text-purple-600">Leaderboard</h1>

            <div className="flex justify-between mb-5">
              <select
                className="p-2 border border-gray-300 rounded-lg shadow-sm w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={selectedCourse}
                onChange={e => setSelectedCourse(e.target.value)}
              >
                <option value="All Courses">All Courses</option>
                {Array.from(new Set(leaderboardData.map(item => item.course))).map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>

              <select
                className="p-2 border border-gray-300 rounded-lg shadow-sm w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
              >
                <option value="All Years">All Years</option>
                {Array.from(new Set(leaderboardData.map(item => item.year))).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <h2 className="mt-5 text-2xl text-gray-800 font-semibold">Filtered Leaderboard</h2>
            <div className="max-h-[50vh] overflow-y-auto rounded-lg border border-gray-300 shadow-inner">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead className="bg-purple-600 text-white sticky top-0 z-10">
                  <tr>
                    <th className="border border-gray-300 p-4 text-left">Rank</th>
                    <th className="border border-gray-300 p-4 text-left">Name</th>
                    <th className="border border-gray-300 p-4 text-left">Course</th>
                    <th className="border border-gray-300 p-4 text-left">Year</th>
                    <th className="border border-gray-300 p-4 text-left">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((user, index) => (
                    <tr key={user.id} className="hover:bg-blue-200 transition-colors duration-300">
                      <td className="border border-gray-300 p-4 font-bold text-purple-600">{index + 1}</td>
                      <td className="border border-gray-300 p-4">{user.name}</td>
                      <td className="border border-gray-300 p-4">{user.course}</td>
                      <td className="border border-gray-300 p-4">{user.year}</td>
                      <td className="border border-gray-300 p-4 font-bold text-green-600">{user.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Leaderboard Section Completed */}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
