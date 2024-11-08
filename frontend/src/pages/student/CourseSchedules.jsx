import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const CourseSchedules = () => {
    const student = {
        courses: [
            { name: 'Operating System', progress: 80, schedule: 'Tue- 9:00-11:00, Wed- 9:00 - 11:00' },
            { name: 'Analysis Of Algorithm', progress: 70, schedule: 'Wed- 2:00-3:00, Tue- 8:00 - 10:00' },
            { name: 'Data Management System', progress: 85, schedule: 'Tue- 2:00-4:00, Fri- 10:00 - 12:00' },
            { name: 'Object Based Modeling', progress: 65, schedule: 'Thu- 10:00-12:00, Fri- 5:00 - 6:00' },
            { name: 'Soft Computing', progress: 60, schedule: 'Mon- 2:00-4:00, Wed- 1:00 - 2:00' },
        ],
    };

    return (
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
    );
};

export default CourseSchedules;
