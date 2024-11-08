import React, { useState, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaCalendarAlt, FaUserGraduate, FaUserFriends, FaTrashAlt } from 'react-icons/fa';
import AddTeacher from './AddTeacher'
import AddCourse from './AddCourse'

const AdminDashboard = () => {


  
  const [selectedSection, setSelectedSection] = useState('Home');

  const student = {
    courses: [
      { name: 'Operating System', progress: 80, schedule: 'Tue- 9:00-11:00, Wed- 9:00 - 11:00' },
      { name: 'Analysis Of Algorithm', progress: 70, schedule: 'Wed- 2:00-3:00, Tue- 8:00 - 10:00' },
      { name: 'Data Management System', progress: 85, schedule: 'Tue- 2:00-4:00, Fri- 10:00 - 12:00' },
      { name: 'Object Based Modeling', progress: 65, schedule: 'Thu- 10:00-12:00, Fri- 5:00 - 6:00' },
      { name: 'Soft Computing', progress: 60, schedule: 'Mon- 2:00-4:00, Wed- 1:00 - 2:00' },
    ],
  };

  const sampleBadges = ['Beginner', 'Intermediate', 'Expert'];
  const sampleVouchers = [{ id: 1, name: 'Discount 10%' }, { id: 2, name: 'Free Shipping' }];
  const samplePurchaseHistory = [
    { id: 1, itemId: 'Item A', purchaseDate: '2023-11-01', cost: 500 },
    { id: 2, itemId: 'Item B', purchaseDate: '2023-11-05', cost: 300 },
  ];

  const assignmentsData = [
    { id: 1, name: 'Assignment 1', dueDate: '15 Sept 11:55', status: 'Pending' },
    { id: 2, name: 'Assignment 2', dueDate: '15 Sept 11:55', status: 'Pending' },
    { id: 3, name: 'Assignment 3', dueDate: '15 Sept 11:55', status: 'Submitted' },
    { id: 4, name: 'Assignment 4', dueDate: '15 Sept 11:55', status: 'Pending' },
    { id: 5, name: 'Assignment 5', dueDate: '15 Sept 11:55', status: 'Submitted' },
  ];

  const renderRightSection = () => {
    const [profile, setProfile] = useState({
      name: "Lav Kumar",
      avatarUrl: "https://via.placeholder.com/100",
      rating: 1000,
      auraCoins: 0,
      badges: sampleBadges,
      vouchers: sampleVouchers,
      purchaseHistory: samplePurchaseHistory,
    });

    const [activeTab, setActiveTab] = useState('Pending');
    const [assignments, setAssignments] = useState(assignmentsData);

    const handleFileUpload = (assignmentId) => {
      const updatedAssignments = assignments.map((assignment) =>
        assignment.id === assignmentId ? { ...assignment, status: 'Submitted' } : assignment
      );
      setAssignments(updatedAssignments);
      alert('File uploaded and assignment submitted!');
    };

    const [modalOpenS, setModalOpenS] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleCardClick = (course) => {
      setSelectedCourse(course);
      setModalOpen(true);
    };

    const toggleTopicCompletion = (topicName) => {
      setSelectedCourse((prevCourse) => {
        const updatedTopics = prevCourse.topics.map((topic) =>
          topic.name === topicName ? { ...topic, completed: !topic.completed } : topic
        );

        const completedCount = updatedTopics.filter((topic) => topic.completed).length;
        const newProgress = (completedCount / updatedTopics.length) * 100;

        return {
          ...prevCourse,
          topics: updatedTopics,
          progress: newProgress,
        };
      });

      student.courses = student.courses.map((course) =>
        course.name === selectedCourse.name
          ? { ...selectedCourse, topics: selectedCourse.topics, progress: selectedCourse.progress }
          : course
      );
    };

    const handleCloseModal = () => {
      setModalOpen(false);
      setSelectedCourse(null);
    };

    const studentInfo = {
      registrationNo: '2023CA57',
      name: 'LAV KUMAR',
      course: 'Master of Computer Applications',
      branch: 'Not Applicable',
      semester: '2',
      spi: '8.05',
      cpi: '7.54',
    };

    const grades = [
      { code: 'CS32101', name: 'Data structures', credit: 4, grade: 'B+' },
      { code: 'CS32102', name: 'Object oriented programming', credit: 3, grade: 'B+' },
      { code: 'CS32103', name: 'Xml applications', credit: 3, grade: 'B+' },
      { code: 'CS32104', name: 'Automata theory', credit: 3, grade: 'B' },
      { code: 'CS32105', name: 'Technical writing', credit: 2, grade: 'A+' },
      { code: 'CS32201', name: 'Data structures (lab)', credit: 2, grade: 'B+' },
      { code: 'CS32202', name: 'Xml applications (lab)', credit: 2, grade: 'A' },
      { code: 'CS32203', name: 'Object oriented programming (lab)', credit: 2, grade: 'B' },
    ];

    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState([]);

    const addTodo = () => {
      if (newTodo.trim()) {
        setTodos([...todos, newTodo]);
        setNewTodo('');
      }
    };

    const deleteTodo = (index) => {
      setTodos(todos.filter((_, i) => i !== index));
    };

    switch (selectedSection) {
      case 'All Teachers':
        return <>list of all the teachers</>;
      case 'Add New Teacher':
        return (
        <>
         
       <AddTeacher/>
         
        </>
        
        
        );
      case 'All Students':
        return <>list of all students</>;
      case 'All Courses':
        return <>list of all courses</>;
      case 'Add New Courses':
        return (
          <>
          <AddCourse/>
          </>
        )

      default:
        return (
          <>
            <main className="flex-1 p-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{selectedSection}</h1>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
                  <FaUserGraduate className="text-3xl text-blue-500" />
                  <div>
                    <h3 className="text-lg font-semibold">Students</h3>
                    <p className="text-2xl font-bold">12,478</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
                  <FaUserFriends className="text-3xl text-pink-500" />
                  <div>
                    <h3 className="text-lg font-semibold">Teachers</h3>
                    <p className="text-2xl font-bold">478</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded shadow flex items-center space-x-4">
                  <FaUserFriends className="text-3xl text-yellow-500" />
                  <div>
                    <h3 className="text-lg font-semibold">Courses</h3>
                    <p className="text-2xl font-bold">15</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded shadow">
                  <h3 className="text-lg font-semibold mb-4">Admin To-Do List</h3>
                  <div className="flex space-x-2 mb-4">
                    <input
                      type="text"
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                      placeholder="Add new task"
                      className="flex-1 p-2 border rounded"
                    />
                    <button
                      onClick={addTodo}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Add
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {todos.map((todo, index) => (
                      <li key={index} className="flex items-center justify-between space-x-3">
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>{todo}</span>
                        </div>
                        <button onClick={() => deleteTodo(index)}>
                          <FaTrashAlt className="text-red-500" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                
              </div>
            </main>
          </>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin</h1>
        </div>
        <nav>
          <ul>
            <li>
              <button
                onClick={() => setSelectedSection('Home')}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection('All Teachers')}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                All Teachers
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection('Add New Teacher')}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Add New Teacher
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection('All Students')}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                All Students
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection('All Courses')}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                All Courses
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection('Add New Courses')}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Add New Courses
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      {renderRightSection()}
    </div>
  );
};

export default AdminDashboard;
