import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  bioDataFormSubmission,
  dashboardSelector,
  getKolprofile,
} from "../../../slices/Dashboard/dashboard";
import { userSelector } from "../../../slices/AuthSlice/AuthSlice";
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

const ProfileAdd = () => {
  const navigate = useNavigate();

  const {  username } =  useSelector(userSelector);

  const [categoryList, setCategoryList] = useState({});
  const [kolType, setKolType] = useState("");
 

  const dispatch = useDispatch();
  const initialArr = {};
  initialArr["name"] = "";
  initialArr["social_user_id"] = "";
  initialArr["followers"] = "";
  initialArr["social_icon"] = "";

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
    userName: username,
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
  const [state, setState] = useState({});
  const [selectedFile, setSelectedFile] = useState();
  const [bannerFile, setBannerFile] = useState();
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [count, setCount] = useState(0);
  const [linkCount, setLinkCount] = useState(0);
  const [video_links, setVideoLinks] = useState([]);
  const [b, setA] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("avatar", selectedFile);
    formData.append("banner", bannerFile);
    formData.append("personal_email", kolProfile.personal_email);
    formData.append("kol_type", kolType);
    formData.append("city", kolProfile.city);
    formData.append("zip_code", kolProfile.zip_code);
    formData.append("bio", kolProfile.bio);
    formData.append("social_media[]", JSON.stringify(kolProfile.social_media));
    formData.append("social_active", kolProfile.social_active);
    formData.append("video_links[]", kolProfile.video_links);
    formData.append("languages[]", kolProfile.languages);
    formData.append("tags[]", kolProfile.tags);
    formData.append("state", kolProfile.state);

    dispatch(bioDataFormSubmission(formData)).then((data) => {
      if(data?.payload?.status) {
        toast.success(data?.payload?.message)
        navigate("../profile-view");
      }else{
        toast.error(data?.payload?.message)
      }
     
    });
  };
  let token = localStorage.getItem("token");

  useEffect(() => {
    const callback = (data) => {
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
  useEffect(() => {
    let x = b.map((item, index) => {
      return item.value;
    });

    setKolProfile(() => {
      return {
        ...kolProfile,
        languages: [...x],
      };
    });
  }, [b]);

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
        return;
      }
      setSelectedFile(e.target.files[0]);
    }

    if (e.target.name == "userBanner") {
      const file = e.target.files[0];
      if (file.size > 1000000) {
        return;
      }
      setBannerFile(e.target.files[0]);
    }

    if (e.target.name == "tags") {
      setTags(e.target.value);
    }

    if (e.target.name == "kol_type") {
    
      setKolType(
        Object.keys(categoryList).find(
          (key) => categoryList[key] == e.target.value
        )
      );
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

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  const handleVideoChange = (e) => {
    setVideoLinks((prevState) => [...prevState, e.target.value]);
  };

  const removeLastElement = () => {
    return kolProfile.video_links.pop();
  };

  const languageHandleChange = (e) => {
    setA([...e]);
  };

  const handleViewClick = (e) => {
    dispatch(getKolprofile());
    navigate("../profile");
  };

  useEffect(() => {
    const callback = (data) => {
      setSocialActive({ ...data });
    };
    getAllStreams(callback, token);
  }, []);

  useEffect(() => {
    const callback = (data) => {
      setState({ ...data });
    };
    getAllStates(callback, token);
  }, []);

  useEffect(() => {
    const callback = (data) => {
      setLanguage({ ...data });
    };
    getAllLanguage(callback, token);
  }, []);

  let a = Object.entries(language).map(([key, value]) => {
    return {
      label: key,
      value: value,
    };
  });
  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-title h5 justify-content-between m-0 d-flex align-items-center">
            <span>Kol Profile Add</span>{" "}
            <Link className="btn theme-btn btn-sm" to={`../profile-view`}>
              View
            </Link>
          </div>
        </div>
        <div className="card-body px-4">
          <form className="" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6 col-sm-12 mt-3">

                  <label  className="form-label">
                    <b>Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="userName"
                    defaultValue={kolProfile.userName}
                    // onChange={handleChange}
                  />
                </div>
                <div className="col-lg-6 col-sm-12 mt-3">
                  <label  className="form-label">
                    <b>Email address</b>
                  </label>
                  <input
                    type="email"
                    name="personal_email"
                    className="form-control"
                    defaultValue={kolProfile.personal_email}
                    onChange={handleChange}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
              
                </div>


              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>Kol Type</b>
                </label>

                <select
                  className="form-select"
                  name="kol_type"
                  onChange={handleChange}
                >
                  <option defaultValue>Select Type</option>
                  {console.log(categoryList)}
                  {categoryList &&
                    Object.entries(categoryList).map(([key, value]) => (
                      <option key={key} value={value}>
                        {value}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>City</b>
                </label>
                <input
                  type="text"
                  name="city"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>State</b>
                </label>
                <select
                  className="form-select"
                  onChange={handleChange}
                  name="state"
                >
                  <option defaultValue>Select State</option>

                  {state &&
                    Object.entries(state).map(([key, value]) => (
                      <option value={key}>{value}</option>
                    ))}
                </select>
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className=" form-label">
                  <b>Zip code</b>
                </label>
                <input
                  type="text"
                  name="zip_code"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label htmlFor="exampleInputPassword1" className=" form-label">
                  <b>Language</b>
                </label>

                <Select className="text-capitalize" options={a} onChange={languageHandleChange} isMulti />
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
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

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>Bio</b>
                </label>
                <textarea
                  className="form-control"
                  name="bio"
                  onChange={handleChange}
                  rows="6"
                ></textarea>
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>Enter Tags</b>
                </label>
                <input
                  value={input}
                  placeholder="Enter tags"
                  onKeyDown={onKeyDown}
                  onKeyUp={onKeyUp}
                  name="tags"
                  className="form-control"
                  onChange={onChange}
                />
                <div className="tagDiv">
                {tags.length > 0 && (
                  <>
                    {tags.map((tag, index) => (
                      <div className="tag btn-default" key={index}>
                        {tag}
                        <button onClick={() => deleteTag(index)}>x</button>
                      </div>
                    ))}

                    </>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-12 mt-3 ">
                <label className="form-label">
                  <b>Upload Avatar</b>
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="userImage"
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-6 col-sm-12 mt-3 ">
                <label className="form-label">
                  <b>Upload Banner</b>
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="userBanner"
                  onChange={handleChange}
                />
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>Social Media Info</b>
                </label>

                {inputList.map((x, i) => {
                  return (
                    <div className="col d-flex mb-2">
                      <select
                        className="form-select me-3"
                        name="name"
                        onChange={(e) => handleInputChange(e, i)}
                      >
                        <option defaultValue>Social Media</option>
                        {Object.keys(social_active).map((keyName, keyIndex) => {
                          return (
                            <option key={keyIndex} value={keyName}>
                              {keyName}
                            </option>
                          );
                        })}
                      </select>
                      <input
                        className="form-control me-3"
                        name="social_user_id"
                        placeholder="Enter User Id"
                        value={x.social_user_id}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                      <input
                        className="form-control me-3"
                        name="followers"
                        placeholder="30k"
                        value={x.followers}
                        onChange={(e) => handleInputChange(e, i)}
                      />

                      {/* <input
                          className="form-control ml10"
                          name="social_icon"
                          placeholder="fb-btn"
                          value={x.social_icon}
                          onChange={(e) => handleInputChange(e, i)}
                        /> */}

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
                            className="btn custom-btn "
                            onClick={handleAddClick}
                          >
                            {" "}
                            +{" "}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>Video Links</b>
                </label>

                <div className="col d-flex mb-2">
                  <input
                    type="text"
                    className="form-control me-3"
                    placeholder="enter video link"
                    onChange={(e) => {
                      handleVideoChange(e, 0);
                    }}
                  />

                  <div className="btn-box">
                    <button
                      type="button"
                      name="video_links"
                      className="btn custom-btn"
                      onClick={() => setLinkCount(linkCount + 1)}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                </div>

                {[...Array(linkCount)].map((_, i) => (
                  <div key={i} className="col d-flex mb-2">
                    <input
                      type="text"
                      className="form-control me-3"
                      onBlur={(e) => {
                        handleVideoChange(e, i + 1);
                      }}
                      placeholder="enter video link"
                    />
                    <div className="btn-box">
                      <button
                        type="button"
                        name="video_links"
                        className="btn sub-btn"
                        onClick={() => {
                          setLinkCount(linkCount - 1);
                          removeLastElement();
                        }}
                      >
                        {" "}
                        -{" "}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 mx-auto d-block">
              <button type="submit" className="btn theme-btn form-text">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileAdd;
