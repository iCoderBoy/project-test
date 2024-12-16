// Dashboard.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import LeftSidebar from "@/components/dashboard/LeftSidebar";
import MiddleContent from "@/components/dashboard/MiddleSidebar";
import RightSidebar from "@/components/dashboard/RightSidebar";
import { doc, getDoc } from "firebase/firestore";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <LeftSidebar/>
      <MiddleContent user={user} userId={userId} />
      <RightSidebar user={user} />
    </div>
  );
};

export default Dashboard;
