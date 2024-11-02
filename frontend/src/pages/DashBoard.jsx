import React, { useState, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Dashboard = () => {
  const [goals, setGoals] = useState('');
  const [goalType, setGoalType] = useState('Academics');
  const [modalOpen, setModalOpen] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [subject, setSubject] = useState('');
  const [courses, setCourses] = useState([]);
  const [activeSection, setActiveSection] = useState('Academics');
  const scrollRef = useRef(null);

  const handleAddGoal = () => {
    if (goals.trim()) {
      setCourses(prevCourses => [
        ...prevCourses,
        { name: goals, type: goalType, subjects: [], progress: 0 }
      ]);
      setGoals('');
    }
  };

  const handleAddSubject = () => {
    if (subject.trim()) {
      setCourses(prevCourses => {
        return prevCourses.map(course => {
          if (course.name === courseName) {
            return { 
              ...course, 
              subjects: [...course.subjects, { name: subject, completed: false }],
              progress: course.progress 
            };
          }
          return course;
        });
      });
      setSubject('');
    }
  };

  const handleManageSubjects = (course) => {
    setCourseName(course.name);
    setModalOpen(true);
  };

  const handleDeleteCourse = (courseToDelete) => {
    setCourses(prevCourses => prevCourses.filter(course => course.name !== courseToDelete.name));
  };

  const handleConfirm = () => {
    setModalOpen(false);
    setCourseName('');
    setSubject('');
  };

  const toggleSubjectCompletion = (subjectName) => {
    setCourses(prevCourses => {
      return prevCourses.map(course => {
        if (course.name === courseName) {
          const updatedSubjects = course.subjects.map(subj => 
            subj.name === subjectName ? { ...subj, completed: !subj.completed } : subj
          );

          const completedCount = updatedSubjects.filter(subj => subj.completed).length;
          const newProgress = (completedCount / updatedSubjects.length) * 100;

          return {
            ...course,
            subjects: updatedSubjects,
            progress: newProgress
          };
        }
        return course;
      });
    });
  };

  const filteredCourses = courses.filter(course => course.type === activeSection);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    // mai div of the page 
    <div className="font-sans p-5 w-full h-screen mx-auto bg-gray-100 rounded-lg shadow-md">
      {/* course card starts   */}
      <div className="mb-5">
        <div className="flex gap-2 mb-2 justify-center">
          <button 
            className={`px-5 py-2 text-white rounded ${activeSection === 'Academics' ? 'bg-blue-700' : 'bg-blue-500'}`} 
            onClick={() => setActiveSection('Academics')}
          >
            Academics
          </button>
          <button 
            className={`px-5 py-2 text-white rounded ${activeSection === 'Personal' ? 'bg-blue-700' : 'bg-blue-500'}`} 
            onClick={() => setActiveSection('Personal')}
          >
            Personal
          </button>
        </div>
        
        {/* Progress bar section */}
        <div className="mx-6 relative ">
          <button onClick={handleScrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded px-2 z-10">
            &lt;
          </button>
          <button onClick={handleScrollRight} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded px-2 z-10">
            &gt;
          </button>

          <div className="overflow-x-hidden whitespace-nowrap mx-10 my-10" ref={scrollRef}>
            {filteredCourses.map((course, index) => (
              <div key={index} className="inline-block p-5 w-64 h-32 border border-gray-300 rounded-lg bg-white mr-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">{course.name}</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleManageSubjects(course)} className=" text-blue-500 rounded text-black px-2">
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button onClick={() => handleDeleteCourse(course)} className="bg-transparent text-red-500 rounded px-2">
                      DEL
                    </button>
                  </div>
                </div>
                <p className="m-0">Completed: {course.progress.toFixed(2)}%</p>
                <div className="w-full h-2 bg-gray-300 rounded mt-1">
                  <div className="h-full bg-teal-400 rounded" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          {/* End progress bar */}
        </div>
      </div> 
      {/* // course card */}

      {/* Set Your Goals Section */}
      <div className="my-5">
        <h3 className="text-2xl mb-2">Set Your Goals</h3>
        <div className="flex gap-2">
          <select
            value={goalType}
            onChange={(e) => setGoalType(e.target.value)}
            className="p-2 text-lg"
          >
            <option value="Academics">Academics</option>
            <option value="Personal">Personal</option>
          </select>
          <input
            type="text"
            placeholder="Enter your goal"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            className="p-2 text-lg flex-1 border rounded"
          />
          <button onClick={handleAddGoal} className="p-2 bg-blue-500 text-white rounded">Set Goals</button>
        </div>
      </div>

      {/* Modal for Adding Subjects */}
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg w-96">
            <h2 className="m-0 text-xl">{courseName}</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={handleAddSubject}
                className="p-2 bg-blue-500 text-white rounded"
                disabled={!subject.trim()} 
              >
                Add
              </button>
            </div>
            <ul className="list-none p-0 my-2">
              {courses.find(course => course.name === courseName)?.subjects.map((subj, index) => (
                <li key={index} className={`py-1 ${subj.completed ? 'text-green-600' : 'text-black'}`}>
                  <input
                    type="checkbox"
                    checked={subj.completed}
                    onChange={() => toggleSubjectCompletion(subj.name)}
                    className="mr-2"
                  />
                  {subj.name}
                </li>
              ))}
            </ul>
            <div className="flex justify-end">
              <button onClick={handleConfirm} className="p-2 bg-red-500 text-white rounded">Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-5">
        <h1 className="text-2xl">Course Schedule</h1>
        <button className="p-2 bg-green-500 text-white rounded">
          Add Course
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
