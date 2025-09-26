import Header from "../components/userComponents/Header";
import Navbar from "../components/userComponents/Navbar";
import Footer from "../components/userComponents/Footer";


const UserLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800 relative">
      <div className="relative z-50">
        <Header />
        <Navbar />
      </div>
      <main className="flex-1 relative z-0">{children}</main>
      <div className="relative z-50">
        <Footer />
      </div>
    </div>
  );
};
import PropTypes from "prop-types";

UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
};


export default UserLayout;
