import React, { useEffect , useState } from "react";
import KolPromotingSlider from "../../components/KolPromotingSlider/KolPromotingSlider";
import Banner from "../../components/Banner/Banner";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { API } from "../../common/apis";
import { toast } from 'react-toastify';
import ReactPlayer from 'react-player'

const LandingPage = () => {
  
  const [bannerList , setBannerList] = useState([]);
  const [totalUsers , setTotalUsers] = useState({});
  const [kolVideoLists , setKolVideoLists] = useState([]);
  const [features , setfeatures] = useState([]);
  const [faqsList , setFaqsList] = useState([]);

  const [contactUsData , setContactUsData] = useState({
    first_name : '',
    last_name : '',
    email : '',
    mobile : '',
    messsage : ''
  });

  let token = localStorage.getItem("token");

  useEffect( () => {
    
    const fetchData = async () => {
      
      const response = await fetch(`${API}/dashboard/banner-list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then(response => response.json());

      //Start of totalcount API
      const totalCounts = await fetch(`${API}/dashboard/get-total-count`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }).then(totalCounts => totalCounts.json());
      //End of totalcount API

      ////Start of VideosList API
      const videoLists = await fetch(`${API}/dashboard/information-list`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }).then(videoLists => videoLists.json());
      //End of VideosList API 

      //Start Featured List API
      const featuredList = await fetch(`${API}/kol-profile/featured-list`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }).then(featuredList => featuredList.json());
      //End Featured List API

      //Start of Faq API
      const faqs = await fetch(`${API}/dashboard/faq-list`,{
        method: "GET", 
      }).then(faqs => faqs.json());
      //End of FAQ Api 

      setBannerList(response.banners);
      setTotalUsers(totalCounts.InformativeVideos);
      setKolVideoLists(videoLists.InformativeVideos);
      setfeatures(featuredList.kolProfiles);
      setFaqsList(faqs.banners);
    }
    
    fetchData();
  }, []);
  
  console.log('faqsList123',faqsList);

  const handleSubmit = (e) => {
    e.preventDefault();
    


    const contactUsResponse = fetch(`${API}/dashboard/contactUs`,{
      method: "POST",
      body:  JSON.stringify(contactUsData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(toast.success('Contact Us form submitted successfully'));

  }

  const handleChange = (e) => { 
    setContactUsData({ ...contactUsData, [e.target.name]: e.target.value });
    console.log('contactUsData', contactUsData)
    return false;
  }

  return (
    <>
      <Header />
      <Banner bannerList={bannerList}/>
      <section>
        <div className="container">
          <div className="row py-4">
            <h3>Best KOL Profiles</h3>
            <KolPromotingSlider features={features}/>

            <div className="row py-4">
              <div className="col-lg-12">
                <h3>About Us</h3>
                
                <div className="row">
                  <div className="col-lg-7">
                    <div className="card">
                      <div className="card-body about-body">
                        <h2 className="card-title ">We do things differently</h2>
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
                              <div className="count-num">{totalUsers.TotalUsers}</div>
                              <div className="count-label">User</div>
                            </li>
                            <li>
                              <div className="count-num">{totalUsers.TotalKolUsers}</div>
                              <div className="count-label">KOL</div>
                            </li>
                            <li>
                              <div className="count-num">{totalUsers.TotalVideos}</div>
                              <div className="count-label">Video</div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="card">
                      <div className="card-body help-form">
                        <h2 className="card-title py-2">How can we help You?</h2>
                        <form className="cta-form row" onSubmit={handleSubmit}>
                          <div className="col-lg-6 mb-4">
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control" onChange={handleChange} name="first_name" placeholder="First Name" />
                          </div>
                          <div className="col-lg-6 mb-4">
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control" onChange={handleChange} name="last_name" placeholder="Last Name" />
                          </div>

                          <div className="col-lg-6 mb-2">

                            <label className="form-label">Email</label>
                            <input type="text" className="form-control" onChange={handleChange} name="email" placeholder="Enter Email" />
                          </div>
                          <div className="col-lg-6 mb-2">
                            <label className="form-label">Phone No.</label>
                            <input type="text" className="form-control" onChange={handleChange} name="mobile" placeholder="Enter Phone No." />
                          </div>
                          <div className="col-lg-12 mb-2">
                            <label className="form-label">Message</label>
                            <textarea type="text" className="form-control" onChange={handleChange} name='messsage' placeholder="Enter Message" rows="3"></textarea>
                          </div>
                          <div className  ="col-lg-12 mb-2">
                            <button type="submit" className="btn theme-btn ">Send Message</button>
                          </div>
                          <div className="col-lg-12 mb-4">
                            <button type="submit" className="btn theme-btn send-btn ">Send Message</button>

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
                <h3>Why people choose kol</h3>
                <div className="row">                 
                  <div className="card">
                    <div className="card-body py-4 px-3">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="imgg"> 
                            <img className="imggg" src="./Images/parrot.jpg"/>
                          </div>
                        </div>
                        <div className="col-lg-9 px-4">
                          <div className="why-choose">
                            <div className="row">
                                  <div className="col-lg-6">
                                        <div className="icon-box">
                                              <img src="" className="box"/>
                                              <div className="icon-info">
                                                <h3>Easy Setup</h3>
                                                <p>In publishing and graphic design, Lorem ipsum is a placeholder</p>

                                              </div>
                                        </div>

                                  </div>
                                  <div className="col-lg-6">
                                    <div className="icon-box">
                                            <img src="" className="box"/>
                                            <div className="icon-info">
                                              <h3>Easy Setup</h3>
                                              <p>In publishing and graphic design, Lorem ipsum is a placeholder</p>

                                            </div>
                                      </div>                                        
                                  </div>
                            </div>
                            <div className="row">
                                  <div className="col-lg-6">
                                        <div className="icon-box">
                                              <img src="" className="box"/>
                                              <div className="icon-info">
                                                <h3>Easy Setup</h3>
                                                <p>In publishing and graphic design, Lorem ipsum is a placeholder</p>

                                              </div>
                                        </div>

                                  </div>
                                  <div className="col-lg-6">
                                    <div className="icon-box">
                                            <img src="" className="box"/>
                                            <div className="icon-info">
                                              <h3>Easy Setup</h3>
                                              <p>In publishing and graphic design, Lorem ipsum is a placeholder</p>

                                            </div>
                                      </div>                                        
                                  </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="icon-box">
                                  <img src="" className="box"/>
                                  <div className="icon-info">
                                    <h3>Easy Setup</h3>
                                    <p>In publishing and graphic design, Lorem ipsum is a placeholder</p>

                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="icon-box">
                                  <img src="" className="box"/>
                                  <div className="icon-info">
                                    <h3>Easy Setup</h3>
                                    <p>In publishing and graphic design, Lorem ipsum is a placeholder</p>
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
            </div>
            <div className="row py-4">
              <div className="col-lg-12">
                <div className="row">
                <div className="card p-4">
                  <div className="faq-div">
                    <h3><b>Frequently Asked Questions</b></h3>
                  </div>
                    {
                      faqsList.map( (data,index) => {
                        return(
                          <>
                            <div className="ques-cls">
                              <h5 className="faq-questions">Q - {data.question}</h5>
                              <p>{data.answer}</p>
                            </div>
                          </>
                        )
                      })
                    }
                  </div>
                </div>
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
