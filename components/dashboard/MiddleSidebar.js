import React, { useEffect, useState } from "react";
import {
  doc,
  updateDoc,
  arrayRemove,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "react-toastify";

const MiddleContent = ({ user, userId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [userImages, setUserImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const images = userDoc.data().images || [];
          setUserImages(images);
          setFilteredImages(images); // Initialize filtered images
        }
      } catch (error) {
        toast.error("Error fetching user images:", error);
      }
    };

    if (userId) {
      fetchUserImages();
    }
  }, [userId]);

  useEffect(() => {
    if (!searchDate) {
      setFilteredImages(userImages); // Reset to show all images when input is empty
    } else {
      const filtered = userImages.filter((image) => {
        const imageDate = new Date(image.uploadedAt);
        const formattedDate = imageDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        return formattedDate === searchDate;
      });
      setFilteredImages(filtered);
    }
  }, [searchDate, userImages]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.info("Rasm hajmi juda katta. Iltimos, kichikroq rasm yuklang.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

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
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const base64Image = canvas.toDataURL("image/jpeg", 0.7);
        setSelectedFile(base64Image);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Iltimos, avval rasm tanlang.");
      return;
    }

    setUploading(true);
    try {
      const location = await getLocation();
      const timestamp = new Date().toISOString();

      const newImage = {
        url: selectedFile,
        uploadedAt: timestamp,
        location: {
          lat: location.latitude,
          lng: location.longitude,
          mapLink: `https://www.google.com/maps?q=${location.latitude},${location.longitude}`,
        },
      };

      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        images: arrayUnion(newImage),
      });
      setUserImages((prevImages) => [...prevImages, newImage]);
      setFilteredImages((prevImages) => [...prevImages, newImage]);
      toast.success("Rasm muvaffaqiyatli yuklandi va saqlandi!");
      setSelectedFile(null);
    } catch (error) {
      toast.error("Xatolik rasmni saqlashda:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (image) => {
    const confirmDelete = window.confirm(
      "Bu rasmni o‘chirishni istaysizmi? Ushbu amal qaytarib bo'lmaydi!"
    );
    if (!confirmDelete) return;

    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        images: arrayRemove(image),
      });
      setUserImages((prevImages) =>
        prevImages.filter((img) => img.url !== image.url)
      );
      setFilteredImages((prevImages) =>
        prevImages.filter((img) => img.url !== image.url)
      );
      toast.success("Rasm muvaffaqiyatli o'chirildi!");
    } catch (error) {
      toast.error("Xatolik rasmni o'chirishda:", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  };

  return (
    <div className="flex items-center justify-start flex-col w-full min-h-screen p-5">
      <div className="flex justify-between items-center mb-6 flex-col w-full">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-4 flex-col w-full">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-5 mb-5"
          />
          <label className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none cursor-pointer text-center mb-2">
            Rasm tanlash
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <button
            onClick={handleUpload}
            className={`bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={uploading}
          >
            {uploading ? "Yuklanmoqda..." : "Yuklash"}
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Yuklangan rasmlar:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="relative border rounded-lg shadow-md p-4 bg-gray-50"
            >
              <button
                onClick={() => handleDelete(image)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
              >
                &times;
              </button>
              <img
                src={image.url}
                alt={`Uploaded ${index}`}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <div className="text-sm text-gray-500">
                <p>Yuklangan sana: {formatTimestamp(image.uploadedAt)}</p>
                <p>
                  <a
                    href={image.location?.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Manzilni ko‘rish
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiddleContent;
