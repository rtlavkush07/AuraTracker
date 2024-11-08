import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaUserGraduate, FaUserFriends, FaTrashAlt } from 'react-icons/fa';
import AddTeacher from './AddTeacher';
import AddCourse from './AddCourse';

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('Home');
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

  const renderRightSection = () => {
    switch (selectedSection) {
      case 'All Teachers':
        return <>list of all the teachers</>;
      case 'Add New Teacher':
        return <AddTeacher />;
      case 'All Students':
        return <>list of all students</>;
      case 'All Courses':
        return <>list of all courses</>;
      case 'Add New Courses':
        return <AddCourse />;
      default:
        return (
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
