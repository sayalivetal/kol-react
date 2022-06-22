import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
const Home = () => {
  const message = useSelector((state) => state?.user?.registerUser?.data);
  console.log(message);
  useEffect(() => {
    if (message?.token) {
      toast.success("Login Successfull!");
    }
  }, [message?.token]);

  return <div>Home</div>;
};

export default Home;
