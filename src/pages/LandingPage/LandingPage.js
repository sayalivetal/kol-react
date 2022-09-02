import React, { useEffect, useState } from "react";
import KolPromotingSlider from "../../components/KolPromotingSlider/KolPromotingSlider";
import Banner from "../../components/Banner/Banner";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { API } from "../../common/apis";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";


const LandingPage = () => {
  const [bannerList, setBannerList] = useState([]);
  const [totalUsers, setTotalUsers] = useState({});
  const [kolVideoLists, setKolVideoLists] = useState([]);
  const [howItWorkVideo, setHowItWorkVideo] = useState([]);
  const [features, setFeatures] = useState([]);
  const [faqsList, setFaqsList] = useState([]);

  const [contactUsData, setContactUsData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    message: "",
  });

  let token = localStorage.getItem("token");
 

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API}/dashboard/banner-list`, {
        method: "GET",
      
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((response) => response.json());

      //Start of totalCounts API
      const totalCounts = await fetch(`${API}/dashboard/get-total-count`, {
        method: "GET",
       
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }).then((totalCounts) => totalCounts.json());
      //End of totalCounts API

      ////Start of VideosList API
      const videoLists = await fetch(`${API}/dashboard/information-list`, {
        method: "GET",
      
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          //Authorization: "Bearer " + token,
        },
      }).then((videoLists) => videoLists.json());
      //End of VideosList API

      //Start Featured List API
      const featuredList = await fetch(`${API}/kol-profile/featured-list`, {
        method: "GET",
       
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          //Authorization: "Bearer " + token,
        },
      }).then((featuredList) => featuredList.json());
     // console.log(featuredList)
      //End Featured List API

      //Start How KOL Works API
      const videoHowKolWorks = await fetch(`${API}/dashboard/information-list`, {
        method: "GET",
    
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          //Authorization: "Bearer " + token,
        },
      }).then((videoHowKolWorks) => videoHowKolWorks.json());
     // console.log(videoHowKolWorks.InformativeVideos)
      //Ends How KOL Works API


      //Start of Faq API
      const faqs = await fetch(`${API}/dashboard/faq-list`, {
        method: "GET",
      
      }).then((faqs) => faqs.json());
      //End of FAQ Api

      setBannerList(response.banners);
      setTotalUsers(totalCounts.InformativeVideos);
      setKolVideoLists(videoLists.InformativeVideos);
      setFeatures(featuredList.kolProfiles);
      setHowItWorkVideo(videoHowKolWorks.InformativeVideos);
       setFaqsList(faqs.banners);
    };

    fetchData();
  },[]);

  //console.log('faqsList123',faqsList);

  const handleSubmit = (e) => {
    e.preventDefault();

    const contactUsResponse = fetch(`${API}/dashboard/contactUs`, {
      method: "POST",
      body: JSON.stringify(contactUsData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(toast.success("Contact Us form submitted successfully"));
  };

  const handleChange = (e) => {
    setContactUsData({ ...contactUsData, [e.target.name]: e.target.value });
   
    return false;
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
                            <label className="form-label">First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              onChange={handleChange}
                              name="first_name"
                              placeholder=""
                            />
                          </div>
                          <div className="col-lg-6 mb-3">
                            <label className="form-label">Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              onChange={handleChange}
                              name="last_name"
                              placeholder=""
                            />
                          </div>

                          <div className="col-lg-6 mb-3">
                            <label className="form-label">Email</label>
                            <input
                              type="text"
                              className="form-control"
                              onChange={handleChange}
                              name="email"
                              placeholder=""
                            />
                          </div>
                          <div className="col-lg-6 mb-3">
                            <label className="form-label">Phone No.</label>
                            <input
                              type="text"
                              className="form-control"
                              onChange={handleChange}
                              name="mobile"
                              placeholder=""
                            />
                          </div>
                          <div className="col-lg-12 mb-4">
                            <label className="form-label">Message</label>
                            <textarea
                              type="text"
                              className="form-control"
                              onChange={handleChange}
                              name="message"
                              placeholder=""
                              rows="3"
                            ></textarea>
                          </div>
                          <div className="col-lg-12 mb-2 text-center">
                            <button type="submit" className="btn theme-btn send-btn">Send Message</button>
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
