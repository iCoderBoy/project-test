import LeftSidebar from "@/components/dashboard/LeftSidebar";
import RightSidebar from "@/components/dashboard/RightSidebar";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const DocumentsPage = () => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserId(currentUser?.uid);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router, userId]);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          console.error("Foydalanuvchi topilmadi Firestore-da.");
        }
      } catch (error) {
        console.error("Xatolik Firestore-dan ma’lumot olishda:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <RightSidebar user={user}/>
        <LeftSidebar user={user}/>
      <header className="bg-white shadow mb-6 p-4 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">
          Talabaning Hujjatlari
        </h1>
        <p className="text-gray-600">
          Bu sahifada talabaning barcha hujjatlari saqlangan
        </p>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((doc, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 7.5L16.5 4.5m3 3l-12 12a2.121 2.121 0 01-3 0l-3-3a2.121 2.121 0 010-3l12-12m3 3l3 3m-3-3v3m0-3h3"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Hujjat {index + 1}
                  </h3>
                  <p className="text-gray-500 text-sm">PDF / Word format</p>
                </div>
              </div>
              <div className="flex justify-between">
                <button className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg focus:outline-none">
                  Yuklab Olish
                </button>
                <button className="px-4 py-2 text-sm text-blue-500 border border-blue-500 hover:bg-blue-100 rounded-lg focus:outline-none">
                  Ko'rish
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default DocumentsPage;
