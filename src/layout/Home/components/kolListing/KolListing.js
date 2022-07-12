import React, { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./KolListing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { API } from "../../../../common/apis";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";
import { kolDetails } from "../../../../slices/KolListing/KolSlices";
import { getAllLanguage,getAllStates,getAllStreams } from "../../../../slices/api/simpleApi";
import { kolListing } from "../../../../slices/api/simpleApi";
import { useDispatch, useSelector } from "react-redux";

const KolListing = () => {
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");

  console.log(token);

  const kolType = useSelector(
    (state) => state?.kolListing?.kolType
  );
  const navigate = useNavigate();
  console.log(kolType);
  // const [kolProfile, setKolProfile] = useState(null);
  // console.log(kolProfile);
  const [languages, setLanguages] = useState({});
  const [language,setLanguage]=useState('')
  const [stream, setStream] = useState('');
  const [location, setLocation] = useState('');
  const [state,setStates] = useState({})
  const [streams, setStreams]=useState({})
 
  const [freshposts, setFreshposts] = useState([]);

  const [page, setPage] = useState(1);
  const limit = 2;
  const didMount = useRef(false);
  const kolListing = async (actionType = "normal") => {
    let pageno = actionType === "reset" ? 1 : page;
    console.log(pageno,language,limit,stream,location);
    const response = await fetch(
      `${API}/kol-profile/list?limit=${limit}&page=${pageno}&languages=${language}&stream=${stream}&state=${location}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();
      console.log(result);
      if(result.statusCode == 401){
        localStorage.removeItem("token");
        navigate("/login")
      }
    // setKolProfile([...result.kolProfiles]);
    setFreshposts([...freshposts, ...result.kolProfiles]);
    setPage((page) => page + 1);
    // setIsFetching(false);
 
  };

  useEffect(() => {
    setPage(1);
    kolListing("reset");
  }, [language, stream, location]);
  // useEffect(() => {
  //  if(status===true){
  //   navigate('/details')
  //  }
  // }, [status]);
  const handleLanguageChange = (e) => {
    setFreshposts([]);
    setLanguage(e.target.value);
  };
  console.log(language);
  const handleStreamChange = (e) => {
    setFreshposts([]);
    setStream(e.target.value);
  };
  const handleLocationChange = (e) => {
    setFreshposts([]);
    setLocation(e.target.value);
  };
  useEffect(() => {
    const callback = (data) => {
      console.log(data);
      setLanguages({ ...data });
    };
    getAllLanguage(callback);
  }, []);

  useEffect(() => {
    const callback = (data) => {
      console.log(data);
      setStreams({ ...data });
    };
    getAllStreams(callback);
  }, []);
  useEffect(() => {
    const callback = (data) => {
      console.log(data);
      setStates({ ...data });
    };
    getAllStates(callback);
  }, []);
  console.log(languages);
  return (
    <>
      <div className="row justify-content-between border-bottom pt-3 pb-4">
        <div className="col-lg-7 d-flex filter-col">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleLanguageChange}
          >
            <option selected>Languages</option>
            {languages &&
              Object.entries(languages).map(([key, value]) => (
                <option value={key}>{value}</option>
              ))}
            {/* <option selected>Languages</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option> */}
          </select>
          <select
            className="form-select mx-3" 
            aria-label="Default select example"
            onChange={handleStreamChange}
          >
            <option selected>Streams</option>
            {streams && 
             Object.entries(streams).map(([key, value]) => (
              <option value={key}>{value}</option>
            ))}
            {/* <option value="Youtube">
              youtube <span className="youtube-icon">&#xf62b;</span>
            </option>
            <option value="Instagram">instagram &#xf437;</option>
            <option value="Facebook">facebook &#xF344;</option>
            <option value="Tiktok">tiktok &#xf6cc;</option>
            <option value="LinkedIn">LinkedIn &#xF472;</option> */}
          </select>

          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleLocationChange}
          >
             <option selected>Location</option>
            {state && 
             Object.entries(state).map(([key, value]) => (
              <option value={key}>{value}</option>
            ))}
            {/* <option selected>Locations</option>
            <option value="Punjab">Punjab</option>
            <option value="Haryana">Haryana</option>
            <option value="Chandigarh">Chandigarh</option> */}
          </select>
        </div>
        <div className="col-lg-2 ml-auto">
          {" "}
          <Dropdown>
            <Dropdown.Toggle variant="" className="sort" id="dropdown-basic">
              sort By
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>followers</Dropdown.Item>
              <Dropdown.Item> Views</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <InfiniteScroll
        dataLength={freshposts.length}
        next={() => kolListing()}
        hasMore={true}
        // loader={<h4>Loading.....</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {freshposts &&
          freshposts.map((item, index) => {
            console.log(item.id);
            return (
              <div
                key={index}
                className="row justify-content-between py-4 list-row"
              >
                <div className="col-lg-3 py-2">
                  <div className="kol-user-img">
                    <Link to={`/details/${item.profile_id}`}>
                      {" "}
                      <img src={item.avatar} />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-8 border-bottom  py-2">
                  <div className="row justify-content-between">
                    <div className="col-lg-9">
                      <h3 className="text-bold">
                        <Link  className="headText" to={`/details/${item.profile_id}`}>
                          {item.username}
                        </Link>

                        <sup>
                          <i className="bi bi-patch-check-fill heading-icon"></i>
                        </sup>
                      </h3>
                      <p>({item.tags})</p>
                    </div>
                    <div className="col-lg-4">
                      <p className="text-right">
                        <i className="bi bi-geo-alt mx-1 geo-icon"></i>
                        <span>
                          {item.city} {item.state},india
                        </span>
                        <span className="book-icon">
                          <i className="bi bi-bookmark mx-1 bookmark-icon"></i>
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="row py-1">
                    <div className="col-lg-12 d-flex">
                      <h5 className="text-bold">
                        Languages:{" "}
                        <span className="text-normal">{item.languages}</span>
                      </h5>
                      {item.SocialMedia.map((c, i) => {
                        return (
                          <ul key={i} className="social-count-list">
                            <li className="">
                              <span></span>
                              <i className={c.social_icon}></i> {c.followers}k
                            </li>
                          </ul>
                        );
                      })}
                    </div>
                  </div>

                  <div className="row py-1">
                    <div className="col-lg-12">
                      <h5 className="text-bold">Bio</h5>
                      <div className="kol-bio">
                        <p>{item.bio}</p>
                      </div>
                    </div>
                  </div>

                  <div className="row py-1">
                    <div className="col-lg-4 align-items-center d-flex">
                      <div className="more-button">
                        <Link to={`/details/${item.profile_id}`}>
                          Show More Detail
                        </Link>
                      </div>
                    </div>
                    <div className="col-lg-8 text-right">
                      <Link to="/chat">
                        <button className="ml-auto btn theme-btn">
                          <span className="mx-2">
                            <i className="bi bi-chat-dots"></i>
                          </span>{" "}
                          Chat with me
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </InfiniteScroll>
    </>
  );
};

export default KolListing;
