import Header from "@/components/admin/header";
import TeacherSection from "@/components/admin/teacher";
import StudentSection from "@/components/admin/student";

function AdminPage() {

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header />
      <TeacherSection />
      <StudentSection />
    </div>
  );
}

export default AdminPage;
