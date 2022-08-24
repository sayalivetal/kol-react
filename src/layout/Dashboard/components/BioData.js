import React, { useEffect, useState } from "react";
import "../css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  bioDataFormSubmission,
  dashboardSelector,
  getKolprofile,
} from "../../../slices/Dashboard/dashboard";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../../common/apis";
import {
  getAllCategory,
  getAllStreams,
  getAllStates,
  getAllLanguage,
} from "../../../slices/api/simpleApi";

const BioData = () => {
  const navigate = useNavigate();

  const { message, biodata } = useSelector(dashboardSelector);
  const [categoryList, setCategoryList] = useState({});

  const dispatch = useDispatch();
  const initialArr = {};
  initialArr["name"] = "";
  initialArr["social_user_id"] = "";
  initialArr["followers"] = "";
  initialArr["social_icon"] = "";
  //console.log(initialArr);
  const [inputList, setInputList] = useState([
    {
      name: "",
      social_user_id: "",
      followers: "",
      social_icon: "",
    },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { name: "", social_user_id: "", followers: "", social_icon: "" },
    ]);
  };

  const [kolProfile, setKolProfile] = useState({
    userName: "",
    personal_email: "",
    kol_type: "",
    city: "",
    zip_code: "",
    state: "",
    userImage: "",
    bio: "",
    social_media: [],
    social_active: "",
    video_links: [],
    languages: [],
    tags: [],
    avatar: "",
  });

  const [social_active, setSocialActive] = useState([]);
  const [language, setLanguage] = useState([]);
  const [state, setState] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [bannerFile, setBannerFile] = useState();
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [count, setCount] = useState(0);
  const [linkCount, setLinkCount] = useState(0);
  const [video_links, setVideoLinks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("avatar", selectedFile);
    formData.append("banner", bannerFile);
    formData.append("personal_email", kolProfile.personal_email);
    formData.append("kol_type", kolProfile.kol_type);
    formData.append("city", kolProfile.city);
    formData.append("zip_code", kolProfile.zip_code);
    formData.append("bio", kolProfile.bio);
    formData.append("social_media[]", JSON.stringify(kolProfile.social_media));
    formData.append("social_active", kolProfile.social_active);
    formData.append("video_links[]", kolProfile.video_links);
    formData.append("languages[]", kolProfile.languages);
    formData.append("tags[]", kolProfile.tags);
    formData.append("state", kolProfile.state);

    dispatch(bioDataFormSubmission(formData)).then(() => {
      navigate("../profileView");
    });
  };
  let token = localStorage.getItem("token");
  console.log("gjhdfjhgggg", token);
  useEffect(() => {
    const callback = (data) => {
      console.log(data);
      setCategoryList({ ...data });
    };
    getAllCategory(callback, token);
  }, []);

  useEffect(() => {
    setKolProfile(() => {
      return {
        ...kolProfile,
        social_media: [...inputList],
      };
    });
  }, [inputList]);

  // For Social Media video link
  useEffect(() => {
    setKolProfile(() => {
      return {
        ...kolProfile,
        video_links: [...video_links],
      };
    });
  }, [video_links]);

  useEffect(() => {
    setKolProfile(() => {
      return {
        ...kolProfile,
        tags: [...tags],
      };
    });
  }, [tags]);

  const handleChange = (e) => {
    setKolProfile({ ...kolProfile, [e.target.name]: e.target.value });
    if (e.target.name == "userImage") {
      const file = e.target.files[0];
      if (file.size > 1000000) {
        console.log("File is large");
        return;
      }
      setSelectedFile(e.target.files[0]);
    }

    if (e.target.name == "userBanner") {
      const file = e.target.files[0];
      if (file.size > 1000000) {
        console.log("File is large");
        return;
      }
      setBannerFile(e.target.files[0]);
    }

    if (e.target.name == "tags") {
      setTags(e.target.value);
    }
  };

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (
      key === "Enter" &&
      trimmedInput.length &&
      !tags.includes(trimmedInput)
    ) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
    }

    if (key === "Backspace" && !input.length && tags.length) {
      e.preventDefault();
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();

      setTags(tagsCopy);
      setInput(poppedTag);
    }
    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  const handleChangeSocialActive = (e) => {
    //setSocialActive(Array.isArray(e) ? e.map((x) => x.value) : []);
    setKolProfile((prevState) => {
      return { ...prevState, [e.target.name]: [e.target.value] };
    });
  };

  console.log("kolProfile 1231", kolProfile);

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  const handleVideoChange = (e) => {
    console.log("=========>", e.target.value);
    setVideoLinks((prevState) => [...prevState, e.target.value]);
  };

  const removeLastElement = () => {
    return kolProfile.video_links.pop();
  };

  const languageHandleChange = (e) => {
    setKolProfile({ ...kolProfile, [e.target.name]: [e.target.value] });
    // console.log('language', kolProfile.languages)
  };
  const handleViewClick = (e) => {
    dispatch(getKolprofile());
    navigate("../profile");
  };

  useEffect(() => {
    const callback = (data) => {
      console.log(data);
      setSocialActive({ ...data });
    };
    getAllStreams(callback, token);
  }, []);

  useEffect(() => {
    const callback = (data) => {
      console.log(data);
      setState({ ...data });
    };
    getAllStates(callback, token);
  }, []);

  useEffect(() => {
    const callback = (data) => {
      console.log(data);
      setLanguage({ ...data });
    };
    getAllLanguage(callback, token);
  }, []);

  //console.log('social_active',social_active)

  const {
    biodata: { kolProfileData },
  } = useSelector(dashboardSelector);
  return (
    <>
      <div className="row col-12">
        <div className="col-6">
          <h3 className="mt-4">Kol Profile</h3>
        </div>
        <div className="col-6">
          <Link to={"/dashboard/profileview"}> View</Link>
        </div>
      </div>
      <div className="row">
        <form className="dashboard-main-form" onSubmit={handleSubmit}>
          <div className="row mt-3">
            <div className="col-6">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <b>Name</b>
              </label>
              <input
                type="text"
                className="form-control"
                name="userName"
                value={kolProfile.userName}
                onChange={handleChange}
                id="exampleInputEmail1"
              />
            </div>
            <div className="col-6">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <b>Email address</b>
              </label>
              <input
                type="email"
                name="personal_email"
                className="form-control"
                id="exampleInputEmail1"
                defaultValue={kolProfile.personal_email}
                onChange={handleChange}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <label className="form-label">
                <b>Kol Type</b>
              </label>

              <select
                className="form-select custom-btn"
                aria-label="Default select example"
                name="kol_type"
                onChange={handleChange}
              >
                <option defaultValue>Select Type</option>
                {categoryList &&
                  Object.entries(categoryList).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="exampleInputPassword1" className="form-label">
                <b>City</b>
              </label>
              <input
                type="text"
                name="city"
                onChange={handleChange}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-6">
              <label className="form-label">
                <b>State</b>
              </label>
              <select
                className="form-select form-text"
                onChange={handleChange}
                name="state"
                aria-label="Default select example"
              >
                <option selected>Select state</option>
                <option value="Punjab">Punjab</option>
                <option value="Haryana">Haryana</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Maharastra">Maharastra</option>
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="exampleInputPassword1" className=" form-label">
                <b>Zip code</b>
              </label>
              <input
                type="text"
                name="zip_code"
                className="form-control"
                id="exampleInputPassword1"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <label htmlFor="exampleInputPassword1" className=" form-label">
                <b>Language</b>
              </label>
              <select
                className="form-select form-text"
                onChange={languageHandleChange}
                name="languages"
                aria-label="Default select example"
              >
                <option selected>Select Language</option>
                <option value="hindi">Hindi</option>
                <option value="punjabi">Punjabi</option>
                <option value="english">English</option>
              </select>
            </div>
            <div className=" col-6">
              <label className=" form-label">
                <b>Most Active Platform</b>
              </label>

              <select
                className="form-select"
                name="social_active"
                onChange={handleChangeSocialActive}
              >
                <option defaultValue>Select Event Type</option>
                {Object.keys(social_active).map((keyName, keyIndex) => {
                  return (
                    <option key={keyIndex} value={keyName}>
                      {keyName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="row mt-3">
            <label className="form-label">
              <b>Social Media Info</b>
            </label>

            {inputList.map((x, i) => {
              return (
                <div className="row topmrgn">
                  <div className="col-3">
                    <input
                      name="name"
                      placeholder="Platform Name"
                      className="form-control"
                      value={x.name}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </div>
                  <div className="col-2">
                    <input
                      className="form-control ml10"
                      name="social_user_id"
                      placeholder="Enter User Id"
                      value={x.social_user_id}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </div>
                  <div className="col-2">
                    <input
                      className="form-control ml10"
                      name="followers"
                      placeholder="30k"
                      value={x.followers}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </div>
                  <div className="col-2">
                    <input
                      className="form-control ml10"
                      name="social_icon"
                      placeholder="fb-btn"
                      value={x.social_icon}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </div>

                  <div className="col-2">
                    <div className="btn-box">
                      {inputList.length !== 1 && (
                        <button
                          className="btn sub-btn"
                          onClick={() => handleRemoveClick(i)}
                        >
                          {" "}
                          -{" "}
                        </button>
                      )}
                      {inputList.length - 1 === i && (
                        <button
                          className="btn custome-btn left-mrgn"
                          onClick={handleAddClick}
                        >
                          {" "}
                          +{" "}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
          </div>

          <div className="col-12 mt-3">
            <label className="form-label">
              <b>Video Links</b>
            </label>

            <div className="row">
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter video link"
                  onChange={(e) => {
                    handleVideoChange(e, 0);
                  }}
                />
              </div>
              <div className="col-4">
                <button
                  type="button"
                  name="video_links"
                  className="btn custome-btn"
                  onClick={() => setLinkCount(linkCount + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {[...Array(linkCount)].map((_, i) => (
              <div key={i} className="linkdiv">
                <div className="row">
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      onBlur={(e) => {
                        handleVideoChange(e, i + 1);
                      }}
                      placeholder="enter video link"
                    />
                  </div>
                  <div className="col-4">
                    <button
                      type="button"
                      name="video_links"
                      className="btn sub-btn"
                      onClick={() => {
                        setLinkCount(linkCount - 1);
                        removeLastElement();
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-12 mt-3">
            <label className="form-label">
              <b>Bio</b>
            </label>
            <textarea
              className="form-control form-text"
              id="exampleFormControlTextarea1"
              name="bio"
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>

          <div className="col-12 mt-3">
            {tags.length && (
              <div className="tagDiv">
                {tags.map((tag, index) => (
                  <div className="tag">
                    {tag}
                    <button onClick={() => deleteTag(index)}>x</button>
                  </div>
                ))}
              </div>
            )}
            <label className="form-label">
              <b>Enter Tags</b>
            </label>
            <input
              value={input}
              placeholder="Enter a tag"
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
              name="tags"
              className="form-control"
              onChange={onChange}
            />
          </div>

          <div className="row mt-3">
            <label className="form-label">
              <b>Upload Avatar</b>
            </label>
            <input type="file" name="userImage" onChange={handleChange} />
          </div>
          <div className="row mt-3">
            <label className="form-label">
              <b>Upload Banner</b>
            </label>
            <input type="file" name="userBanner" onChange={handleChange} />
          </div>

          <div className="mt-4 mx-auto d-block">
            <button type="submit" className="btn btn-primary form-text">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BioData;
