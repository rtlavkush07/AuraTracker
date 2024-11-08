import React, { useState,useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaCalendarAlt } from 'react-icons/fa'; // Import specific icon

const StudentDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('Home'); // Manage which section to display

  const student = {
    courses: [
      { name: 'Operating System', progress: 80, schedule: 'Tue- 9:00-11:00, Wed- 9:00 - 11:00' },
      { name: 'Analysis Of Algorithm', progress: 70, schedule: 'Wed- 2:00-3:00, Tue- 8:00 - 10:00' },
      { name: 'Data Management System', progress: 85, schedule: 'Tue- 2:00-4:00, Fri- 10:00 - 12:00' },
      { name: 'Object Based Modeling', progress: 65, schedule: 'Thu- 10:00-12:00, Fri- 5:00 - 6:00' },
      { name: 'Soft Computing', progress: 60, schedule: 'Mon- 2:00-4:00, Wed- 1:00 - 2:00' },
    ],
  };


  // Sample data for demonstration (replace with actual data from backend in a real app)
const sampleBadges = ['Beginner', 'Intermediate', 'Expert'];
const sampleVouchers = [{ id: 1, name: 'Discount 10%' }, { id: 2, name: 'Free Shipping' }];
const samplePurchaseHistory = [
  { id: 1, itemId: 'Item A', purchaseDate: '2023-11-01', cost: 500 },
  { id: 2, itemId: 'Item B', purchaseDate: '2023-11-05', cost: 300 },
];


// sample data for assignment section 
const assignmentsData = [
  { id: 1, name: 'Assignment 1', dueDate: '15 Sept 11:55', status: 'Pending' },
  { id: 2, name: 'Assignment 2', dueDate: '15 Sept 11:55', status: 'Pending' },
  { id: 3, name: 'Assignment 3', dueDate: '15 Sept 11:55', status: 'Submitted' },
  { id: 4, name: 'Assignment 4', dueDate: '15 Sept 11:55', status: 'Pending' },
  { id: 5, name: 'Assignment 5', dueDate: '15 Sept 11:55', status: 'Submitted' },
];

  const renderRightSection = () => {

      // Initial state for user profile data
  const [profile, setProfile] = useState({
    name: "Lav Kumar",  // Add name field
    avatarUrl: "https://via.placeholder.com/100",  // Placeholder image (replace with actual URL or dynamic data)
    rating: 1000,
    auraCoins: 0,
    badges: sampleBadges,
    vouchers: sampleVouchers,
    purchaseHistory: samplePurchaseHistory,
  });
// profile section ends

  // functions for assignment section 
  const [activeTab, setActiveTab] = useState('Pending'); // Track active tab
  const [assignments, setAssignments] = useState(assignmentsData);

  // Handle file upload and change assignment status to "Submitted"
  const handleFileUpload = (assignmentId) => {
    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === assignmentId ? { ...assignment, status: 'Submitted' } : assignment
    );
    setAssignments(updatedAssignments);
    alert('File uploaded and assignment submitted!');
  };
  // assignment section ends


// functions for subjects 

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

  // Update the main student course data
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

// subjects functions ends


  // starts for result sections functions and objects 

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

  // end result section

// starts challanges section


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
    setCourses((prevCourses) => [
      ...prevCourses,
      { name: goals, type: goalType, subjects: [], progress: 0 }
    ]);
    setGoals('');
  }
};

const handleAddSubject = () => {
  if (subject.trim()) {
    setCourses((prevCourses) => {
      return prevCourses.map((course) => {
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
  setCourses((prevCourses) => prevCourses.filter((course) => course.name !== courseToDelete.name));
};

const handleConfirm = () => {
  setModalOpen(false);
  setCourseName('');
  setSubject('');
};

const toggleSubjectCompletion = (subjectName) => {
  setCourses((prevCourses) => {
    return prevCourses.map((course) => {
      if (course.name === courseName) {
        const updatedSubjects = course.subjects.map((subj) =>
          subj.name === subjectName ? { ...subj, completed: !subj.completed } : subj
        );

        const completedCount = updatedSubjects.filter((subj) => subj.completed).length;
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

const filteredCourses = courses.filter((course) => course.type === activeSection);

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

// end challenge section







// *************************************************
    switch (selectedSection) {
      
      case 'Schedule':
        return (
          <div className="mt-5 ">
            <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2 text-white">Course Schedule</h2>
            <div className="flex flex-wrap justify-between mt-3 ">
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
        );
      case 'ASSIGNMENT':
        return (

<>

<div className="p-6 bg-black text-white border border-gray-400 rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Assignment</h2>

      {/* Tab buttons */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setActiveTab('Pending')}
          className={`px-4 py-2 ${activeTab === 'Pending' ? 'bg-red-800' : 'bg-gray-800'} border border-gray-400 rounded-l-lg`}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveTab('Submitted')}
          className={`px-4 py-2 ${activeTab === 'Submitted' ? 'bg-green-800' : 'bg-gray-800'} border border-gray-400 rounded-r-lg`}
        >
          Submitted
        </button>
      </div>

      {/* Assignment list */}
      <div>
        {assignments
          .filter((assignment) => assignment.status === activeTab)
          .map((assignment) => (
            <div
              key={assignment.id}
              className="flex items-center justify-between p-4 mb-2 border border-gray-400 rounded-lg"
            >
              <div>
                <h3 className="font-semibold">{assignment.name}</h3>
                <p className="text-sm">due: {assignment.dueDate}</p>
              </div>
              {activeTab === 'Pending' && (
                <>
                  <label className="flex items-center">
                    <span className="mr-2 text-blue-500 cursor-pointer">Upload</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={() => handleFileUpload(assignment.id)}
                    />
                    <button
                      onClick={() => handleFileUpload(assignment.id)}
                      className="ml-2 px-4 py-1 border border-gray-500 rounded"
                    >
                      Submit
                    </button>
                  </label>
                </>
              )}
            </div>
          ))}
        {assignments.filter((assignment) => assignment.status === activeTab).length === 0 && (
          <p className="text-center text-gray-500 mt-4">No {activeTab.toLowerCase()} assignments</p>
        )}
      </div>
    </div>
</>

        )





      // Add other cases for each item
       case 'SUBJECTS':
        return (
        
        <>
        {/* subjects section dash board of student */}
        <div className="flex flex-col gap-5 w-3/4">
      <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2 text-white">Progress</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {student.courses.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-5 cursor-pointer"
            onClick={() => handleCardClick(course)}
          >
            <h3 className="text-lg font-semibold text-gray-600">{course.name}</h3>
            <p className="text-gray-500 text-sm">Completed: {course.progress.toFixed(2)}%</p>
            <div className="w-full h-2 bg-gray-200 rounded mt-2">
              <div className="h-full bg-blue-500 rounded" style={{ width: `${course.progress}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && selectedCourse && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg w-96">
            <h2 className="m-0 text-xl">{selectedCourse.name}</h2>
            <ul className="list-none p-0 my-2">
              {selectedCourse.topics.map((topic, index) => (
                <li
                  key={index}
                  className={`py-1 ${topic.completed ? 'text-green-600' : 'text-black'}`}
                >
                  <input
                    type="checkbox"
                    checked={topic.completed}
                    onChange={() => toggleTopicCompletion(topic.name)}
                    className="mr-2"
                  />
                  {topic.name}
                </li>
              ))}
            </ul>
            <div className="flex justify-end">
              <button onClick={handleCloseModal} className="p-2 bg-red-500 text-white rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
        
        </>
        )
        case'CHALLENGES':
        return (
        
          <>
            <div className="font-sans p-5 w-full h-screen mx-auto bg-black tex-white rounded-lg shadow-md">
      <div className="mb-5">
        
        
        <div className="mx-6 relative ">
          <button onClick={handleScrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded px-2 z-10">
            &lt;
          </button>
          <button onClick={handleScrollRight} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded px-2 z-10">
            &gt;
          </button>

          <div className="overflow-x-hidden whitespace-nowrap mx-10 my-10 " ref={scrollRef}>
            {filteredCourses.map((course, index) => (
              <div key={index} className="inline-block p-5 w-64 h-32 border border-gray-300 rounded-lg bg-black mr-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">{course.name}</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleManageSubjects(course)} className="text-blue-500 rounded text-black px-2">
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button onClick={() => handleDeleteCourse(course)} className="bg-transparent text-red-500 rounded px-2">
                      DEL
                    </button>
                  </div>
                </div>
                <p className="m-0">Completed: {course.progress.toFixed(2)}%</p>
                <div className="w-full h-2 bg-gray-300 rounded mt-1">
                  <div className="h-full bg-blue-500 rounded" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> 

      <div className="my-5">
        <h3 className="text-2xl mb-2">Set Your Goals</h3>
        <div className="flex gap-2">
          
          <input
            type="text"
            placeholder="Enter your goal"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            className="p-2 text-lg flex-1 border rounded text-black"
          />
          <button onClick={handleAddGoal} className="p-2 bg-blue-500 text-white rounded">Set Goals</button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg w-96">
            <h2 className="m-0 text-xl">{courseName}</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Topic"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="flex-1 p-2 border rounded text-black"
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
              {courses.find((course) => course.name === courseName)?.subjects.map((subj, index) => (
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

      
    </div>
          
          </>


        )
        case 'RESULTS':
          return  (
         <>
         <h1>Work in process</h1>
         </> 
         
          )

      default: 
     
        return (
          <>
              {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
       

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="col-span-2">
            {/* Progress Circles */}
            <div className="flex gap-4 mb-6">
              {[
                { title: 'Lectures', progress: '62/124' },
                { title: 'Assignments', progress: '36/42' },
                { title: 'Coursework', progress: '1/3' },
              ].map((item, index) => (
                <div key={index} className="bg-black p-4 rounded-xl text-center w-1/3">
                  <h2 className="text-xl">{item.title}</h2>
                  <p className="text-3xl font-bold">{item.progress}</p>
                </div>
              ))}
            </div>

            {/* Course Schedule Section */}
            <div className="mt-5 ">
              <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2 text-white">Course Schedule</h2>
              <div className="flex flex-wrap justify-between mt-3 ">
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

          {/* Right Section */}
          <div>
            {/* Aura Points */}
            <div className="bg-black p-4 rounded-xl mb-6">
              <h2 className="text-2xl">Aura Points 🏆</h2>
              <div className="flex flex-col justify-center items-center mt-4">
                <div className="text-xl text-center">14</div>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-black p-4 rounded-xl mb-6">
              <h2 className="text-2xl">Badges</h2>
              <div className="flex gap-3 p-2">
                <img src="https://via.placeholder.com/40" alt="Badge 1" />
                <img src="https://via.placeholder.com/40" alt="Badge 2" />
                <img src="https://via.placeholder.com/40" alt="Badge 3" />
                <img src="https://via.placeholder.com/40" alt="Badge 4" />
              </div>
            </div>

            {/* My Rating */}
            <div className="bg-black p-4 rounded-xl">
              <h2 className="text-2xl">Rating</h2>
              <div className="mt-4">
                <div className="bg-gray-800 p-4 rounded h-40 flex items-center justify-center text-gray-400">
                  Show rating in graph
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
          </>
        )
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-1/5 bg-black p-4 border-r border-green-600 flex flex-col">
        <div className="text-2xl font-bold text-green-500 mb-8">STUDENT DASHBOARD</div>
        <nav className="flex flex-col gap-4">
          {[ 'Schedule', 'ASSIGNMENT', 'SUBJECTS', 'CHALLENGES', 'RESULTS'].map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedSection(item)} // Set selected section on click
              className="text-left text-white flex items-center gap-3 py-2 px-4 hover:bg-green-700 rounded"
            >
              <i className={`fas ${
                [
                          // PROFILE
                  'fa-calendar-alt',   // Schedule
                  'fa-tasks',          // ASSIGNMENT
                  'fa-book',           // COURSES
                  'fa-bullseye',       // CHALLENGES
                  'fa-chart-line',     // RESULTS
                 
                ][index]
              }`}></i>
              {item}
            </button>
          ))}
        </nav>
        <button className="text-left mt-auto text-white flex items-center gap-3 py-2 px-4 hover:bg-red-700 rounded">
          <i className="fas fa-sign-out-alt"></i> Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Hello, ABC!</h1>
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Right Section Based on Selection */}
        <div className="grid grid-cols-3 gap-6">
          {/* Main Content Right Section */}
          <div className="col-span-3">
            {renderRightSection()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
