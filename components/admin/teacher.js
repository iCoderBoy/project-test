import { Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Adjust import as per your setup
import AddTeacherModal from "./addTeacher";
import { toast } from "react-toastify";

function TeacherSection() {
  const [isOpen ,setIsOpen] = useState(false)
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "teachers"));
        const teachersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeachers(teachersData);
      } catch (error) {
        console.log("Error fetchTeachers", error);
      }
    };
    fetchTeachers();
  }, []);

    const handleDeleteTeacher = async (teacherId) => {
      if (!teacherId) {
        console.error("Invalid student ID:", teacherId);
        return;
      }
  
      try {
  
        const studentRef = doc(db, "teachers", teacherId);
        await deleteDoc(studentRef);
        toast.success("Student doc deleted successfully")
      } catch (error) {
        toast.error("Error deleting student", error);
      }
    };
  return (
    <section className="bg-white shadow-md p-6 mb-6 rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Teachers</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700"
        >
          Add Teacher
        </button>
      </div>

      <ul className="space-y-4">
        {teachers.map((teacher) => (
          <li
            key={teacher.id}
            className="bg-gray-50 border rounded-md p-4 flex items-center gap-4 shadow-sm hover:shadow-lg transition"
          >
            {/* Teacher Image */}
            <div className="w-16 h-16 rounded-full bg-blue-200 flex-shrink-0 overflow-hidden">
              <img
                src={
                  teacher.image || `https://via.placeholder.com/64?text=T`
                }
                alt={`Teacher profile`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-800">
                {teacher.name} {teacher.surname}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Subject: {teacher.position}
              </p>
              <div className="text-sm text-gray-600">
                Groups:{" "}
                <span className="font-medium">
                  {teacher.groups?.map((group) => group).join(", ") ||
                    "No groups assigned"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition">
                <Edit />
                <span className="text-sm font-medium">Edit</span>
              </button>
              <button
               onClick={()=> handleDeleteTeacher(teacher.userId)}
               className="flex items-center gap-1 text-red-600 hover:text-red-700 transition">
                <Delete />
                <span className="text-sm font-medium">Delete</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <AddTeacherModal open={isOpen} onClose={setIsOpen}/>
    </section>
  );
}

export default TeacherSection;
