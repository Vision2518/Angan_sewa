import React from "react";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";

const ProfileManagement = () => {
  const { email, role, isAuth } = useSelector((state) => state.user);

  if (!isAuth) {
    return <h2 className="text-center mt-10">Please login first</h2>;
  }

  return (
    <div className="w-96 mx-auto mt-10 p-6 rounded-xl shadow bg-white text-center">

      {/* Profile Circle with Icon */}
      <div className="w-28 h-28 rounded-full bg-gray-200 mx-auto mb-4 
                      flex items-center justify-center border-2 border-gray-300">
        <FaUser size={60} className="text-gray-500" />
      </div>

      <h1 className="text-2xl  font-bold mb-5">Admin Profile</h1>

      <p className="text-lg mb-2">
        <strong>Email:</strong> {email}
      </p>

      <p className="text-lg">
        <strong>Role:</strong> {role}
      </p>

    </div>
  );
};

export default ProfileManagement;
