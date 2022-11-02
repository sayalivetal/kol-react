import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "react-js-loader";
import KolPromotingSlider from "../../components/KolPromotingSlider/KolPromotingSlider";
import Banner from "../../components/Banner/Banner";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { API } from "../../common/apis";
import { createHelpForm } from "../../slices/AuthSlice/AuthSlice";
import { getDashboardBannerList, getfeaturedList, getfaqList, getHowItWorkVideoList, getfeatVideoList, getTotalCounts } from "../../slices/api/simpleApi";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";


const LandingPage = () => {
  const [bannerList, setBannerList] = useState([]);
  const [totalUsers, setTotalUsers] = useState({});
  const [kolVideoLists, setKolVideoLists] = useState([]);
  const [howItWorkVideo, setHowItWorkVideo] = useState([]);
  const [features, setFeatures] = useState([]);
  const [faqsList, setFaqsList] = useState([]);
  const dispatch = useDispatch();
  const [btnLoader, setBtnLoader] = useState(false);

  const [contactForm, setContactForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    messsage: "",
  });

  const [fieldError, setfieldError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    messsage: "",
  })

  const [error, setError] = useState("");

  let token = localStorage.getItem("token");
 
// banner list api
  useEffect(() => {
    const callback = (data) => {
      setBannerList([ ...data ]);
      //console.log("----------",data);
    };
    getDashboardBannerList(callback);
  }, []);

// featured list api
  useEffect(() => {
    const callback = (data) => {
      setFeatures([ ...data ]);
      //console.log("----------",data);
    };
    getfeaturedList(callback);
  }, []);

// informative videos list api
  useEffect(() => {
    const callback = (data) => {
      setKolVideoLists([ ...data ]);
      //console.log("----------",data);
    };
    getfeatVideoList(callback);
  }, []);


// how it works video list api
  useEffect(() => {
    const callback = (data) => {
      setHowItWorkVideo([ ...data ]);
      //console.log("----------",data);
    };
    getHowItWorkVideoList(callback);
  }, []);

  // users count api
  useEffect(() => {
    const callback = (data) => {
      setTotalUsers([ ...data ]);
      //console.log("----------",data);
    };
    getTotalCounts(callback);
  }, []);

// faq list api
  useEffect(() => {
    const callback = (data) => {
      setFaqsList([ ...data ]);
      //console.log("----------",data);
    };
    getfaqList(callback);
  }, []);  

// validate email regex
  function isValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);;
  }
  function isValidNum(mobNum) {
    return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(mobNum);;
  }
  

  const validateInput = (e) => {
    let { name, value } = e.target;
    setfieldError((prev) => {
    const stateObj = { ...prev, [name]: "" };
      switch (name) {
        case "first_name":
          if (!value) {
          stateObj[name] = "Please enter First name";
          }
        break;
        case "last_name":
          if (!value) {
          stateObj[name] = "Please enter Last name";
          }
        break;
        case "email":
          if (!value) {
          stateObj[name] = "Please enter email";
          }
          else if (!isValidEmail(value)) {
          stateObj[name] = "Please enter correct email";
          }
        break;
        case "mobile":
          if (!value) {
          stateObj[name] = "Please enter mobile no.";
          }
          else if (!isValidNum(value)) {
          stateObj[name] = "Please enter digit only.";
          }
        break;
        case "messsage":
          if (!value) {
          stateObj[name] = "Please enter message";
          }
        break;
        default:
        break;
      }
       return stateObj;
    });
  };

// How can we help You? form 
  const handleChange = (e) => {
    setContactForm((prevState) => { 
      return {...prevState, [e.target.name]: e.target.value }
    });
    validateInput(e);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoader(true)
    if (fieldError.first_name.length > 0 || fieldError.last_name.length > 0 || fieldError.email.length > 0 || fieldError.mobile.length > 0 || fieldError.messsage.length > 0 ) { 
      setBtnLoader(false)
      return;
    }
    if (contactForm.first_name == "" || contactForm.last_name == "" || contactForm.email == "" || contactForm.mobile == "" || contactForm.messsage == ""){
      setError("Please fill the mandatory filed");
      setBtnLoader(false)
    }else{
      // console.log("---------",contactForm)
        dispatch(createHelpForm(contactForm)).then((data)=>{
          if(data?.payload?.statusCode == 201){
            toast.success(data?.payload?.message);
            setBtnLoader(false)
          }else{
            toast.error(data?.payload?.message);
            setBtnLoader(false)
          }
      });  
    }
  };


  return (
    <>
      <Header />
      <Banner bannerList={bannerList} />
      <section>
        <div className="container">
            <div className="row py-4">
              <h2 className="mt-2">Best KOL Profiles</h2>
              <KolPromotingSlider features={features} />
            </div>

            <div className="row py-4">
            <h2 className="mt-2">How KOL Works</h2>
              <div className="col-lg-12 ">
                <div className="mt-2">
                  {howItWorkVideo.map((item, index)=>{
                    return(
                      <div className="full-video" key={index}>
                        <ReactPlayer
                            url={item.banner}
                            width='100%'
                            height='100%'
                          />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="row py-4">
              <div className="col-lg-12">
                <h2>About Us</h2>

                <div className="row">
                  <div className="col-lg-7">
                    <div className="card b-radius h-100 mt-2">
                      <div className="card-body about-body">
                        <div>
                        <h2 className="card-title mb-3">
                          We do things differently
                        </h2>
                        <div className="card-text">
                          But I must explain to you how all this mistaken idea
                          of denouncing pleasure and praising pain was born and
                          I will give you a complete account of the system, and
                          expound the actual teachings of the great explorer of
                          the truth
                        </div>

                        <div className="kol-counts">
                          <ul className="kol-count-list">
                            <li>
                              <div className="count-num">
                                {/* {totalUsers?.TotalUsers} */} 100k
                              </div>
                              <div className="count-label">User</div>
                            </li>
                            <li>
                              <div className="count-num">
                                {/* {totalUsers?.TotalKolUsers+"+"} */} 500+
                              </div>
                              <div className="count-label">KOL</div>
                            </li>
                            <li>
                              <div className="count-num">
                                {/* {totalUsers?.TotalVideos+"+"} */} 2000+
                              </div>
                              <div className="count-label">Video</div>
                            </li>
                          </ul>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="card b-radius help-form h-100  mt-2">
                      <div className="card-body ">
                        <h2 className="card-title py-2">
                          How can we help You?
                        </h2>
                        <form className="cta-form row" onSubmit={handleSubmit}>
                          <div className="col-lg-6 mb-3">
                            <label className="form-label">First Name *</label>
                            <input
                              type="text"
                              className={`form-control ${error === "" || contactForm.first_name ? "" : "border-danger" }`}
                              onChange={handleChange}
                              name="first_name"
                              placeholder=""
                            />
                            <span className="err text-danger">
                              {fieldError.first_name ||  error && contactForm.first_name == "" && (
                                <>{error || fieldError.first_name}</>
                              )}
                            </span>
                          </div>
                          <div className="col-lg-6 mb-3">
                            <label className="form-label">Last Name *</label>
                            <input
                              type="text"
                              className={`form-control ${error === "" || contactForm.last_name ? "" : "border-danger" }`}
                              onChange={handleChange}
                              name="last_name"
                              placeholder=""
                            />
                            <span className="err text-danger">
                              {fieldError.last_name ||  error && contactForm.last_name == "" && (
                                <>{error || fieldError.last_name}</>
                              )}
                            </span>
                          </div>

                          <div className="col-lg-6 mb-3">
                            <label className="form-label">Email *</label>
                            <input
                              type="text"
                              className={`form-control ${error === "" || contactForm.email ? "" : "border-danger" }`}
                              onChange={handleChange}
                              name="email"
                              placeholder=""
                            />
                            <span className="err text-danger">
                              {fieldError.email ||  error && contactForm.email == "" && (
                                <>{error || fieldError.email}</>
                              )}
                            </span>

                          </div>
                          <div className="col-lg-6 mb-3">
                            <label className="form-label">Phone No. *</label>
                            <input
                              type="text"
                              className={`form-control ${error === "" || contactForm.mobile ? "" : "border-danger" }`}
                              onChange={handleChange}
                              name="mobile"
                              placeholder=""
                            />
                            <span className="err text-danger">
                              {fieldError.mobile ||  error && contactForm.mobile == "" && (
                                <>{error || fieldError.mobile}</>
                              )}
                            </span>
                          </div>
                          <div className="col-lg-12 mb-4">
                            <label className="form-label">Message *</label>
                            <textarea
                              type="text"
                              className={`form-control ${error === "" || contactForm.messsage ? "" : "border-danger" }`}
                              onChange={handleChange}
                              name="messsage"
                              placeholder=""
                              rows="3"
                            ></textarea>
                            <span className="err text-danger">
                              {fieldError.messsage ||  error && contactForm.messsage == "" && (
                                <>{error || fieldError.messsage}</>
                              )}
                            </span>
                          </div>
                          <div className="col-lg-12 mb-2 text-center">
                            <button type="submit" className="btn theme-btn send-btn spiner-btn">
                              {btnLoader ? <Loader type="spinner-cub" title={"Send Message"} size={20} /> : 'Send Message'}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row py-4">
              <div className="col-lg-12">
                <h2>Why people choose kol</h2>
                  <div className="card b-radius mt-3">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="thumb-img">
                            <img className="img-fluid" src="./Images/Building.png" alt="thumb" />
                          </div>
                        </div>
                        <div className="col-lg-8">
                          <div className="why-choose">
                            <div className="row">
                              <div className="col-lg-6 my-4">
                                <div className="icon-box">
                                  <img
                                    src="./Images/setting.png"
                                    className="box"
                                    alt="Settings"
                                  />
                                  <div className="icon-info">
                                    <h3>Easy Setup</h3>
                                    <p>
                                      In publishing and graphic design, Lorem
                                      ipsum is a placeholder
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6 my-4">
                                <div className="icon-box">
                                  <img
                                    src="./Images/social-care.png"
                                    className="box"
                                    alt="Settings"
                                  />
                                  <div className="icon-info">
                                    <h3>Multi Platform support</h3>
                                    <p>
                                      In publishing and graphic design, Lorem
                                      ipsum is a placeholder
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 my-4">
                                <div className="icon-box">
                                  <img
                                    src="./Images/viewers.png"
                                    className="box"
                                    alt="Settings"
                                  />
                                  <div className="icon-info">
                                    <h3>Enjoyable for viewers</h3>
                                    <p>
                                      In publishing and graphic design, Lorem
                                      ipsum is a placeholder
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6 my-4">
                                <div className="icon-box">
                                  <img
                                    src="./Images/choices.png"
                                    className="box"
                                    alt="Settings"
                                  />
                                  <div className="icon-info">
                                    <h3>Your choice</h3>
                                    <p>
                                      In publishing and graphic design, Lorem
                                      ipsum is a placeholder
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 my-4">
                                <div className="icon-box">
                                  <img
                                    src="./Images/fair-trade.png"
                                    className="box"
                                    alt="Settings"
                                  />
                                  <div className="icon-info">
                                    <h3>Clear and fair</h3>
                                    <p>
                                      In publishing and graphic design, Lorem
                                      ipsum is a placeholder
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6 my-4">
                                <div className="icon-box">
                                  <img
                                    src="./Images/people.png"
                                    className="box"
                                    alt="Settings"
                                  />
                                  <div className="icon-info">
                                    <h3>For everyone</h3>
                                    <p>
                                      In publishing and graphic design, Lorem
                                      ipsum is a placeholder
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>

            <div className="row py-4">
              <div className="col-lg-12 ">
                  <div className="card b-radius faq-block">
                    <div className="faq-div">
                      <h2 className="mb-2">
                        <b>Frequently Asked Questions</b>
                      </h2>
                    </div>
                    {faqsList.map((data, index) => {
                      return (
                        <div className="ques-cls" key={index}>
                          <h5 className="faq-questions">Q - {data.question}</h5>
                          <p>A — &nbsp; {data.answer}</p>
                        </div>
                      );
                    })}
                  </div>
              </div>
            </div>
          
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LandingPage;
