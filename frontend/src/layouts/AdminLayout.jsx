// Layout.jsx
import { useState } from "react";
import Navbar from "../components/adminComponents/Navbar";
import Sidebar from "../components/adminComponents/Sidebar";
import Header from "../components/userComponents/Header";
import Footer from "../components/userComponents/Footer";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
      <Header />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="flex flex-col flex-1 w-full">
          <Navbar onToggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-4 my-6">{children}</div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
