import React, { useState } from 'react';
import { FaStar, FaBook, FaTrophy, FaBullseye, FaCalendarAlt, FaPlus,FaTrash, FaCheckCircle } from 'react-icons/fa';

// const student = {
//   image: '../public/assets/default-profile.png', 
//   name: 'Lav',
//   email: 'lav@gmail.com',
//   dob: '01-01-2002',
//   regNo: '2023CA57',
//   phone: '9876543210',
//   course: 'Computer Science',
//   achievements: 5,
//   challenges: 'this will count++ of task work',
//   courses: [
//     { name: 'Operating System', progress: 80, schedule: 'Tue- 9:00-11:00, Wed- 9:00 - 11: 00' },
//     { name: 'Analysis Of Algorithm', progress: 70, schedule: 'Wed- 2:00-3:00, Tue- 8:00 - 10: 00' },
//     { name: 'Data Management System', progress: 85, schedule: 'Tue- 2:00-4:00, Fri- 10:00 - 12: 00' },
//     { name: 'Object Based Modeling', progress: 65, schedule: 'Thu- 10:00-12:00, Fri- 5:00 - 6: 00' },
//     { name: 'Soft Computing', progress: 60, schedule: 'Mon- 2:00-4:00, Wed- 1:00 - 2: 00' },
//   ],
// };

function StudentDashboard() {

  const [tasks, setTasks] = useState([]); // complete tasks array 
  const [newTask, setNewTask] = useState(''); // one task which is string
  const [completedTasks, setCompletedTasks] = useState(Array(tasks.length).fill(false)); // starting me false rahega 
  
  // Function to add new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };
// function to delete the task 
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((tmp, i) => i !== index);
    setTasks(updatedTasks);
  };
 // Toggle function to mark task as completed or not
 const toggleTaskCompletion = (index) => {
  const updatedCompletion = [...completedTasks];
  updatedCompletion[index] = !updatedCompletion[index];
  setCompletedTasks(updatedCompletion);
};

  return (
    <div className="flex gap-5 p-5 text-gray-800 font-sans bg-gradient-to-b from-gray-800 to-gray-900">
      {/* Left section: Profile */}
      <div className="flex flex-col gap-5 mt-5 w-1/4">
        <div className="bg-white rounded-lg shadow-md p-5 text-center">
          <img src={student.image} alt="Profile" className="w-20 h-20 rounded-full mx-auto border-4 border-blue-500 mb-3" />
          <h2 className="text-xl font-semibold">{student.name}</h2>
          <p className="text-gray-500 text-sm">MNNIT ALLAHABAD</p>
          <p className="text-gray-600 text-xs">{student.email}</p>
          <p className="text-gray-600 text-xs">{student.dob}</p>
          <p className="text-gray-600 text-xs">{student.regNo}</p>
          <p className="text-gray-600 text-xs">{student.phone}</p>
          <p className="text-gray-600 text-xs">{student.course}</p>
          <button className="bg-blue-600 text-white py-2 px-4 mt-3 rounded-md hover:bg-blue-700">Edit Profile</button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-5">
          <div className="flex items-center text-gray-700 my-2">
            <FaStar className="text-blue-500 mr-2" /> <span>Achievements: {student.achievements}</span>
          </div>
          <div className="flex items-center text-gray-700 my-2">
            <FaBook className="text-blue-500 mr-2" /> <span>Courses: {student.courses.length}</span>
          </div>
          <div className="flex items-center text-gray-700 my-2">
            <FaTrophy className="text-blue-500 mr-2" /> <span>Tasks Completed: {student.challenges}</span>
          </div>
        </div>
      </div>

      {/* Right section: Dashboard */}
      <div className="flex flex-col gap-5 w-3/4">
        <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2 text-white">Progress</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {student.courses.map((course, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-5">
              <h3 className="text-lg font-semibold text-gray-600">{course.name}</h3>
              <p className="text-gray-500 text-sm">Completed: {course.progress}%</p>
              <div className="w-full h-2 bg-gray-200 rounded mt-2">
                <div className="h-full bg-blue-500 rounded" style={{ width: `${course.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Task List Section */}
        <div className="mt-5">
          <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2 text-white">Set Academic or Personal Goals</h2>
         {/* for adding the new goal  */}
          <div className="flex mt-3"> 

            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Set New Goal..."
              className="flex-grow p-2 border rounded-l-md focus:outline-none"
            />
            <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600">
              <FaPlus />
            </button>
          </div>

          {/* showing the seted goal by the student  */}
          <ul className="list-none mt-4">
      {tasks.map((task, index) => (
        <li
          key={index}
          className={`flex justify-between items-center p-3 my-2 rounded shadow ${
            completedTasks[index] ? 'bg-green-500 text-red-500 line-through text-decoration-red-800' : 'bg-white text-gray-800'
          }`}
        >
          <span>
            <input
              type="checkbox"
              style={{ marginRight: '10px' }}
              checked={completedTasks[index]}
              onChange={() => toggleTaskCompletion(index)}
            />
            {task}
          </span>
          <button onClick={() => deleteTask(index)} className="text-red-500 font-bold">
            <FaTrash />
          </button>
        </li>
      ))}
    </ul>
        </div>

        {/* Course Schedule Section */}
        <div className="mt-5">
          <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2 text-white">Course Schedule</h2>
          <div className="flex flex-wrap justify-between mt-3">
            {student.courses.map((course, index) => (
              <div key={index} className="flex items-center w-full lg:w-1/2 mb-4">
                <FaCalendarAlt className="text-green-600 mr-2 text-xl" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-600">{course.name}</h3>
                  <p className="text-gray-500 text-sm">{course.schedule}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
