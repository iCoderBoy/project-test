import React, { useState, useMemo } from "react";
import Modal from "react-modal";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useData } from "@/lib/dataProvider";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { ref } from "firebase/storage";

Modal.setAppElement("#__next");

function AddTeacherModal({ open, onClose }) {
  const students = useData(); // DataProvider-dan olingan ma'lumotlar
  const [photoPreview, setPhotoPreview] = useState(null);
  const [teacherData, setTeacherData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    faculty: "",
    course: "",
    position: "",
    groups: [],
  });

  //Teacherni bazaga yuklash
  const addNewTeacher = async (e) => {
    e.preventDefault();
    try {
        const res = await createUserWithEmailAndPassword(
        auth,
        teacherData.email,
        teacherData.password
      );
      
      // Reference to the "teachers" collection
      const teacherCollectionRef = collection(db, "teachers");

      // Add a new document and get its ID
      const docRef = await addDoc(teacherCollectionRef, {}); // Creates an empty document and returns its reference
      const updatedTeacherData = {
        ...teacherData,
        userId: docRef.id, // Add the generated document ID
      };
      // Prepare teacher data, including docRef.id as userId

      // Update the document with teacher data
      await updateDoc(doc(db, "teachers", docRef.id), updatedTeacherData);

      // Update the local state
      setTeacherData(updatedTeacherData);

      toast.success("Teacher added with ID: " + res.user.uid);
    } catch (error) {
      toast.error("Error adding teacher: " + error.message);
    }
  };

  // Fakultet ro'yxatini olish
  const faculties = useMemo(() => Object.keys(students), [students]);

  // Tanlangan fakultetga mos kurslarni olish
  const courses = useMemo(() => {
    if (teacherData.faculty) {
      return Object.keys(students[teacherData.faculty] || {});
    }
    return [];
  }, [students, teacherData.faculty]);

  // Tanlangan kursga mos guruhlarni olish
  const groups = useMemo(() => {
    if (teacherData.faculty && teacherData.course) {
      return Object.keys(
        students[teacherData.faculty][teacherData.course] || {}
      );
    }
    return [];
  }, [students, teacherData.faculty, teacherData.course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({
      ...teacherData,
      [name]: value,
      ...(name === "faculty" ? { course: "", groups: [] } : {}),
      ...(name === "course" ? { groups: [] } : {}),
    });
  };

  const handleGroupChange = (e) => {
    const { value } = e.target;
    setTeacherData({
      ...teacherData,
      groups: typeof value === "string" ? value.split(",") : value,
    });
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      // Maksimal hajmni cheklash: 2 MB
      toast.error('Rasm hajmi juda katta. Iltimos, kichikroq rasm yuklang.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; // Maksimal kenglik
        const MAX_HEIGHT = 600; // Maksimal balandlik
        let width = img.width;
        let height = img.height;

        // O'lchamlarni moslashtirish
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width > height) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          } else {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Base64 formatga aylantirish
        const base64Image = canvas.toDataURL('image/jpeg', 0.7); // Sifatni 70% ga pasaytirish
        setTeacherData({ ...teacherData, image: base64Image });

        // Hajmni tekshirish
        console.log(`Optimallashtirilgan hajm: ${Math.round((base64Image.length * 3) / 4 / 1024)} KB`);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };
  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white w-[600px] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Add Teacher
        </h2>
        <form className="space-y-4" onSubmit={addNewTeacher}>
          {/*Photo Upload*/}
          <div className="flex items-center justify-between  ">
            <div>
              <label className="cursor-pointer">
                <img
                  className="w-24 h-24 object-cover rounded-full border border-solid border-[#333]"
                  src={teacherData.image || "https://via.placeholder.com/64?text=T"}
                  alt="Profile"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Name */}
            <div className="w-[80%]">
              <div className="w-full mb-[10px]">
                <TextField
                  label="Name"
                  name="name"
                  value={teacherData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  className="w-full"
                  InputProps={{ className: "text-sm" }}
                />
              </div>

              {/* Surname */}
              <div>
                <TextField
                  label="Surname"
                  name="surname"
                  value={teacherData.surname}
                  onChange={handleChange}
                  fullWidth
                  required
                  className="w-full"
                  InputProps={{ className: "text-sm" }}
                />
              </div>
            </div>
          </div>
          <div>
            <TextField
              label="Position"
              type="text"
              name="position"
              fullWidth
              value={teacherData.position}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-around gap-[10px]">
            {/* Faculty */}
            <FormControl fullWidth required className="w-full">
              <InputLabel className="bg-white">Faculty</InputLabel>
              <Select
                name="faculty"
                value={teacherData.faculty}
                onChange={handleChange}
                className="text-sm"
              >
                {faculties.map((faculty) => (
                  <MenuItem key={faculty} value={faculty} className="text-sm">
                    {faculty}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Course */}
            <FormControl
              fullWidth
              required
              disabled={!teacherData.faculty}
              className="w-full"
            >
              <InputLabel className="bg-white">Course</InputLabel>
              <Select
                name="course"
                value={teacherData.course}
                onChange={handleChange}
                className="text-sm"
              >
                {courses.map((course) => (
                  <MenuItem key={course} value={course} className="text-sm">
                    {course}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Groups */}
            <FormControl
              fullWidth
              required
              disabled={!teacherData.course}
              className="w-full"
            >
              <InputLabel className="bg-white">Groups</InputLabel>
              <Select
                multiple
                name="groups"
                value={teacherData.groups}
                onChange={handleGroupChange}
                renderValue={(selected) => selected.join(", ")}
                className="text-sm"
              >
                {groups.map((group) => (
                  <MenuItem key={group} value={group} className="text-sm">
                    <Checkbox
                      checked={teacherData.groups.indexOf(group) > -1}
                      className="text-primary"
                    />
                    <ListItemText primary={group} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 rounded-l-md">
              +998
            </span>
            <TextField
              type="tel"
              name="phone"
              fullWidth
              value={teacherData.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
            />
          </div>
          <div>
            <TextField
              label="Email"
              type="email"
              name="email"
              fullWidth
              value={teacherData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <TextField
              label="Password"
              type="password"
              name="password"
              fullWidth
              value={teacherData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div></div>
          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Add Teacher
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => onClose(false)}
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-100"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AddTeacherModal;
