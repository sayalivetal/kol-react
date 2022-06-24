import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
const Home = () => {
  const message = useSelector((state) => state?.user?.registerUser?.data);
  const loginMessage = useSelector((state) => state?.user?.loginUser?.data?.token);
  useEffect(() => {
    if (message?.data?.token) {
      toast.success("Login Successfull!");
    }
  }, [message?.data?.token]);
  useEffect(() => {
    if (loginMessage) {
      toast.success("Login Successfull!");
    }
  }, [message]);

  return <div><Header /><Footer /></div>;
};

export default Home;
