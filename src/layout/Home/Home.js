import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, clearState } from "../../slices/AuthSlice/AuthSlice";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Filter from "./components/Filter/Filter";
import KolListing from "./components/kolListing/KolListing";
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isFetching, errorMessage, isError ,isSuccess} = useSelector(userSelector);

  let token = localStorage.getItem("token");

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success(errorMessage);
  //   }
  // }, [token]);
  const { username, email } = useSelector(userSelector);
 
  // useEffect(() => {
  //   if (isError) {
  //     dispatch(clearState());
  //     navigate("/login");
  //   }
  // }, [isError]);

  return (
    <>
      {token && (
        <div className="container">
          <div className="card">
            <div className="card-body">
              <KolListing />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
