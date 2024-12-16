import { useState } from "react";
import { useData } from "@/lib/dataProvider"; // Import the context hook
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { toast } from "react-toastify";
import { deleteUser } from "firebase/auth";

function StudentSection() {
  const students = useData(); // Access student data from the context
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Handle Faculty Selection
  const handleFacultySelect = (faculty) => {
    setSelectedFaculty(faculty);
    setSelectedCourse(null);
    setSelectedGroup(null);
  };

  // Handle Course Selection
  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setSelectedGroup(null);
  };

  // Handle Group Selection
  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
  };

  const handleDeleteStudent = async (studentId) => {
    if (!studentId) {
      console.error("Invalid student ID:", studentId);
      return;
    }

    try {

      const studentRef = doc(db, "users", studentId);
      await deleteDoc(studentRef);
      toast.success("Student doc deleted successfully")

      if (selectedFaculty && selectedCourse && selectedGroup) {
        const updatedStudents = students[selectedFaculty][selectedCourse][
          selectedGroup
        ].filter((student) => student.userId !== studentId);

        students[selectedFaculty][selectedCourse][selectedGroup] =
          updatedStudents;
      }
    } catch (error) {
    }
  };

  
  return (
    <section className="bg-white shadow-md p-6 rounded-md">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Students</h2>

      {/* Faculties */}
      {!selectedFaculty && (
        <ul className="space-y-4">
          {Object.entries(students).map(([faculty, facultyData], index) => (
            <li
              key={index}
              className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded shadow flex justify-between items-center"
              onClick={() => handleFacultySelect(faculty)}
            >
              <span onClick={() => setSelectedFaculty(faculty)}>{faculty}</span>
              <span className="text-gray-500 text-sm">
              {faculty ? faculty.length : 0}{" "} courses
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Courses */}
      {selectedFaculty && !selectedCourse && (
        <div>
          <button
            className="text-blue-600 hover:underline mb-4"
            onClick={() => setSelectedFaculty(null)}
          >
            Back to Faculties
          </button>
          <h3 className="text-xl font-semibold mb-4">{selectedFaculty}</h3>
          <ul className="space-y-4">
            {Object.entries(students[selectedFaculty]).map(
              ([course, courseData], index) => (
                <li
                  key={index}
                  className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded shadow flex justify-between items-center"
                  onClick={() => handleCourseSelect(course)}
                >
                  <span>{course}</span>
                  <span className="text-gray-500 text-sm">
                  {course ? course.length : 0}{" "} groups
                  </span>
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {/* Groups */}
      {selectedCourse && !selectedGroup && (
        <div>
          <button
            className="text-blue-600 hover:underline mb-4"
            onClick={() => setSelectedCourse(null)}
          >
            Back to Courses
          </button>
          <h4 className="text-xl font-semibold mb-4">
            {selectedFaculty} - {selectedCourse}
          </h4>
          <ul className="space-y-4">
            {Object.entries(students[selectedFaculty][selectedCourse]).map(
              ([group, groupStudents], index) => (
                <li
                  key={index}
                  className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded shadow flex justify-between items-center"
                  onClick={() => handleGroupSelect(group)}
                >
                  <span>{group}</span>
                  <span className="text-gray-500 text-sm">
                    {groupStudents ? groupStudents.length : 0} students
                  </span>
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {/* Students */}
      {selectedGroup && (
        <div>
          <button
            className="text-blue-600 hover:underline mb-4"
            onClick={() => setSelectedGroup(null)}
          >
            Back to Groups
          </button>
          <h5 className="text-xl font-semibold mb-4">
            {selectedFaculty} - {selectedCourse} - {selectedGroup}
          </h5>
          <ul className="space-y-4">
            {students[selectedFaculty][selectedCourse][selectedGroup].map(
              (student, index) => (
                <li
                  key={index}
                  className="bg-gray-50 border rounded-md p-4 flex items-center gap-4 shadow-sm hover:shadow-lg transition"
                >
                  {/* Student Image */}
                  <div className="w-16 h-16 rounded-full bg-blue-200 flex-shrink-0 overflow-hidden">
                    <img
                      src={student.image}
                      alt={student.firstName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Student Info */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {student.firstName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Group: {selectedGroup}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition">
                      <EditIcon />
                      <span className="text-sm font-medium">Edit</span>
                    </button>
          
                    <button
                      className="flex items-center gap-1 text-red-600 hover:text-red-700 transition"
                      onClick={() => handleDeleteStudent(student.userId)} // Pass student ID to delete
                    >
                      <DeleteIcon />
                      <span className="text-sm font-medium">Delete</span>
                    </button>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </section>
  );
}

export default StudentSection;
