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
import Loader from "react-js-loader";

const ProfileAdd = () => {
  const navigate = useNavigate();

  const { username } = useSelector(userSelector);

  const [categoryList, setCategoryList] = useState({});
  const [kolType, setKolType] = useState("");
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);
  const [state, setState] = useState({});
  const [language, setLanguage] = useState([]);
  const [social_active, setSocialActive] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [bannerFile, setBannerFile] = useState();
  const [input, setInput] = useState("");
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [count, setCount] = useState(0);
  const [linkCount, setLinkCount] = useState(0);
  const [video_links, setVideoLinks] = useState([]);
  const [lang, setLang] = useState([]);
  const [videoList, setVideoList] = useState([""]);

  let token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const initialArr = {};
  initialArr["name"] = "";
  initialArr["social_user_id"] = "";
  initialArr["followers"] = "";
  initialArr["social_icon"] = "";


  const handleVideoRemoveClick = (e, i) => {
   // console.log("-------------", i);
    e.preventDefault();
    //  e.stopPropagation();
    const list = [...videoList];
    list.splice(i, 1);
    setVideoList(list);
  };
  const handleVideoAddClick = (e, i) => {
    //e.preventDefault();
    // e.stopPropagation();
    setVideoList([...videoList, ""]);
  };
  const handleInputVideoChange = (e, index) => {
    const { value } = e.target;
    const list = [...videoList];
    list[index] = value;
    setVideoList(list);
  };
  const [inputList, setInputList] = useState([
    {
      name: "",
      social_user_id: "",
      followers: "",
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
  const handleRemoveClick = (e, index) => {
    //e.preventDefault()
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = (e, index) => {
    // e.preventDefault();
    // setVideoList([...videoList, ""]);
    setInputList([
      ...inputList,
      { name: "", social_user_id: "", followers: "" },
    ]);
  };
  const onKeyDownVideo = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // useEffect(()=>{
  //   if(videoList.length > 1){
  //     videoList.forEach((item,index)=>{
  //       if(item == ''){
  //        // alert("sfhg")
  //        setError("Please fill the mandatory ")
  //       }
  //     })
  //   }

  // },[videoList])
  const [kolProfile, setKolProfile] = useState({
    userName: username,
    personal_email: "",
    kol_type: "",
    city: "",
    state: "",
    zip_code: "",
    languages: [],
    social_active: "",
    bio: "",
    tags: [],
    userImage: "",
    userBanner: "",
    social_media: [],
    video_links: [],
    //   avatar: "",
  });

  useEffect(() => {
    const callback = (data) => {
      setCategoryList({ ...data });
    };
    getAllCategory(callback, token);
  }, []);
  const [socialNameError, setSocialNameError] = useState(false);
  console.log(social_active);

  useEffect(() => {
    inputList.map((item, index) => {
      if (
        item.name == "" ||
        item.social_user_id == "" ||
        item.followers == ""
      ) {
        setSocialNameError(true);
      } else {
        setSocialNameError(false);
        setKolProfile(() => {
          return {
            ...kolProfile,
            social_media: [...inputList],
          };
        });
      }
    });
  }, [inputList, social_active]);

  useEffect(() => {
    let x = lang.map((item, index) => {
      return item.value;
    });
    setKolProfile(() => {
      return {
        ...kolProfile,
        languages: [...x],
      };
    });
  }, [lang]);
  const [videoError, setVideoError] = useState(false);
  // For Social Media video link
  useEffect(() => {
    videoList.map((item, index) => {
      if (item == "") {
        setVideoError(true);
      } else {
        setVideoError(false);
        setKolProfile(() => {
          return {
            ...kolProfile,
            video_links: [...videoList],
          };
        });
      }
    });
  }, [videoList]);

  // For creating tags
  useEffect(() => {
    setKolProfile(() => {
      return {
        ...kolProfile,
        tags: [...tags],
      };
    });
  }, [tags]);

  function isValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

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
    if (e.target.name == "personal_email") {
      if (!e.target.value) {
        setFieldError("Please fill the mandatory filed");
      } else if (!isValidEmail(e.target.value)) {
        setFieldError("Please enter correct email");
      } else {
        setFieldError("");
      }
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

  // const handleVideoChange = (e) => {
  //   setVideoLinks((prevState) => [...prevState, e.target.value]);
  // };

  // const removeLastElement = () => {
  //   return kolProfile.video_links.pop();
  // };

  const languageHandleChange = (e) => {
    setLang([...e]);
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

  let langList = Object.entries(language).map(([key, value]) => {
    return {
      label: key,
      value: value,
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("userName", kolProfile.userName);
    formData.append("personal_email", kolProfile.personal_email);
    formData.append("kol_type", kolType);
    formData.append("city", kolProfile.city);
    formData.append("state", kolProfile.state);
    formData.append("zip_code", kolProfile.zip_code);
    formData.append("languages[]", kolProfile.languages);
    formData.append("social_active", kolProfile.social_active);
    formData.append("bio", kolProfile.bio);
    formData.append("tags[]", kolProfile.tags);
    formData.append("avatar", selectedFile);
    formData.append("banner", bannerFile);
    formData.append("social_media[]", JSON.stringify(kolProfile.social_media));
    formData.append("video_links[]", kolProfile.video_links);

    if (
      kolProfile.personal_email == "" ||
      kolProfile.kol_type == "" ||
      kolProfile.city == "" ||
      kolProfile.state == "" ||
      kolProfile.zip_code == "" ||
      kolProfile.languages == "" ||
      kolProfile.social_active == "" ||
      kolProfile.bio == "" ||
      kolProfile.tags.length == "" ||
      kolProfile.userImage == "" ||
      kolProfile.userBanner == "" ||
      kolProfile?.social_media?.length == "" ||
      kolProfile?.video_links?.length == "" ||
      socialNameError ||
      videoError
    ) {
      setError("Please fill the mandatory filed");
      setBtnLoader(false);
      return;
    }
    if (fieldError.length > 0) {
      setBtnLoader(false);
      return;
    } else {
      dispatch(bioDataFormSubmission(formData)).then((data) => {
        if (data?.payload?.statusCode === 200) {
          toast.success(data?.payload?.message);
          navigate("../profile-view");
          setBtnLoader(false);
        } else {
          toast.error(data?.payload?.message);
          setBtnLoader(false);
        }
      });
    }
  };

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
                <label className="form-label">
                  <b>Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="userName"
                  value={kolProfile.userName}
                  // onChange={handleChange}
                  placeholder="Enter Name"
                  disabled
                />
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>Email address</b>
                </label>
                <input
                  type="email"
                  name="personal_email"
                  className={`form-control ${error === "" || kolProfile.personal_email
                      ? ""
                      : "border-danger"
                    }`}
                  defaultValue={kolProfile.personal_email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                />
                <div id="emailHelp" className="form-text">
                  This is Secondary email. We'll never share your email with
                  anyone else.
                </div>
                <span className="err text-danger">
                  {fieldError ||
                    (error && kolProfile.personal_email == "" && (
                      <>{fieldError || error}</>
                    ))}
                </span>
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>
                    Kol Type <span className="text-danger">*</span>
                  </b>
                </label>
                {console.log(error, kolProfile.kol_type)}
                <select
                  className={`form-select ${error === "" || kolProfile.kol_type ? "" : "border-danger"
                    }`}
                  name="kol_type"
                  onChange={handleChange}
                >
                  <option value="">Select Type</option>
                  {/* {console.log(categoryList)} */}
                  {categoryList &&
                    Object.entries(categoryList).map(([key, value]) => (
                      <option key={key} value={value}>
                        {value}
                      </option>
                    ))}
                </select>
                <span className="err text-danger">
                  {error && kolProfile.kol_type == "" && <>{error}</>}
                </span>
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>
                    City <span className="text-danger">*</span>
                  </b>
                </label>
                <input
                  type="text"
                  name="city"
                  onChange={handleChange}
                  className={`form-control ${error === "" || kolProfile.city ? "" : "border-danger"
                    }`}
                  placeholder="Enter City"
                />
                <span className="err text-danger">
                  {error && kolProfile.city == "" && <>{error}</>}
                </span>
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>
                    State <span className="text-danger">*</span>
                  </b>
                </label>
                <select
                  className={`form-select ${error === "" || kolProfile.state ? "" : "border-danger"
                    }`}
                  onChange={handleChange}
                  name="state"
                >
                  <option value="">Select State</option>
                  {state &&
                    Object.entries(state).map(([key, value]) => (
                      <option value={key}>{value}</option>
                    ))}
                </select>
                <span className="err text-danger">
                  {error && kolProfile.state == "" && <>{error}</>}
                </span>
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className=" form-label">
                  <b>
                    Zip code <span className="text-danger">*</span>
                  </b>
                </label>
                <input
                  type="text"
                  name="zip_code"
                  className={`form-control ${error === "" || kolProfile.zip_code ? "" : "border-danger"
                    }`}
                  onChange={handleChange}
                  placeholder="Enter Zip code"
                />
                <span className="err text-danger">
                  {error && kolProfile.zip_code == "" && <>{error}</>}
                </span>
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label htmlFor="exampleInputPassword1" className=" form-label">
                  <b>
                    Language <span className="text-danger">*</span>
                  </b>
                </label>

                <Select
                  className={`text-capitalize ${error === "" || kolProfile?.languages?.length
                      ? ""
                      : "border-danger"
                    }`}
                  name="languages"
                  options={langList}
                  onChange={languageHandleChange}
                  isMulti
                />
                <span className="err text-danger">
                  {error && kolProfile.languages == "" && <>{error}</>}
                </span>
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className=" form-label">
                  <b>
                    Most Social Active Platform{" "}
                    <span className="text-danger">*</span>
                  </b>
                </label>
                <select
                  className={`form-select ${error === "" || kolProfile.social_active
                      ? ""
                      : "border-danger"
                    }`}
                  name="social_active"
                  onChange={handleChangeSocialActive}
                >
                  <option value="">Select Social Platform</option>
                  {Object.keys(social_active).map((keyName, keyIndex) => {
                    return (
                      <option key={keyIndex} value={keyName}>
                        {keyName}
                      </option>
                    );
                  })}
                </select>
                <span className="err text-danger">
                  {error && kolProfile.social_active == "" && <>{error}</>}
                </span>
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>
                    Bio <span className="text-danger">*</span>
                  </b>
                </label>
                <textarea
                  className={`form-control ${error === "" || kolProfile.bio ? "" : "border-danger"
                    }`}
                  name="bio"
                  onChange={handleChange}
                  rows="6"
                  placeholder="Enter Bio"
                ></textarea>
                <span className="err text-danger">
                  {error && kolProfile.bio == "" && <>{error}</>}
                </span>
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>
                    Enter Tags <span className="text-danger">*</span>
                  </b>
                </label>
                <input
                  className={`form-control ${error === "" || kolProfile?.tags?.length
                      ? ""
                      : "border-danger"
                    }`}
                  name="tags"
                  type="text"
                  value={input}
                  placeholder="Enter tags"
                  onKeyDown={onKeyDown}
                  onKeyUp={onKeyUp}
                  onChange={onChange}
                />
                <span className="err text-danger">
                  {error && kolProfile.tags == "" && <>{error}</>}
                </span>
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
                  <b>
                    Upload Avatar <span className="text-danger">*</span>
                  </b>
                </label>
                <input
                  type="file"
                  className={`form-control ${error === "" || kolProfile.userImage ? "" : "border-danger"
                    }`}
                  name="userImage"
                  onChange={handleChange}
                />
                <span className="err text-danger">
                  {error && kolProfile.userImage == "" && <>{error}</>}
                </span>
              </div>

              <div className="col-lg-6 col-sm-12 mt-3 ">
                <label className="form-label">
                  <b>
                    Upload Banner <span className="text-danger">*</span>
                  </b>
                </label>
                <input
                  type="file"
                  className={`form-control ${error === "" || kolProfile.userBanner ? "" : "border-danger"
                    }`}
                  name="userBanner"
                  onChange={handleChange}
                />
                <span className="err text-danger">
                  {error && kolProfile.userBanner == "" && <>{error}</>}
                </span>
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>
                    Social Media Info <span className="text-danger">*</span>
                  </b>
                </label>

                {inputList.map((x, i, array) => {
                  //console.log(inputList);

                  return (
                    <div className="col d-flex mb-2">
                      <select
                        className="form-select me-3"
                        name="name"
                        onChange={(e) => handleInputChange(e, i)}
                        onKeyDown={onKeyDownVideo}
                      >
                        <option value="">Social Media</option>
                        {Object.keys(social_active).map((keyName, keyIndex) => {
                          return (
                            <option
                              key={keyIndex}
                              value={keyName}
                              disabled={
                                keyName == inputList[0]?.name ||
                                keyName == inputList[1]?.name ||
                                keyName == inputList[2]?.name ||
                                keyName == inputList[3]?.name ||
                                keyName == inputList[4]?.name
                              }
                            >

                              {keyName}
                            </option>
                          );
                        })}
                      </select>

                      <input
                        className="form-control me-3 w-50"
                        name="social_user_id"
                        placeholder="Enter User Id"
                        value={x.social_user_id}
                        onChange={(e) => handleInputChange(e, i)}
                        onKeyDown={onKeyDownVideo}
                      />
                      <input
                        className="form-control me-3 w-50"
                        type="number"
                        name="followers"
                        placeholder="30"
                        value={x.followers}
                        onChange={(e) => handleInputChange(e, i)}
                        onKeyDown={onKeyDownVideo}
                      />
                      <div className="btn-box">
                        {inputList.length !== 1 && (
                          <button
                            className="btn sub-btn"
                            onClick={(e) => handleRemoveClick(e, i)}
                          >
                            -
                          </button>
                        )}
                        {inputList.length - 1 === i && inputList.length < 5 &&  (
                          <button
                            className="btn custom-btn"
                            onClick={(e) => handleAddClick(e, i)}
                          >  + </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                <span className="err text-danger">
                  {error && socialNameError && <>{error}</>}
                </span>
                {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
              </div>
              {/* {console.log(kolProfile?.social_active.length, inputList)} */}

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>
                    Video Links <span className="text-danger">*</span>
                  </b>
                </label>
                {/* {console.log(kolProfile.video_links)} */}
                {videoList.map((x, i) => {
                  return (
                    <>
                      <div className="col d-flex mb-2">
                        <input
                          name="video_links"
                          placeholder="Enter Video Link"
                          className={`form-control me-3 ${error === "" || kolProfile?.video_links?.length
                              ? ""
                              : "border-danger"
                            }`}
                          value={x}
                          onChange={(e) => handleInputVideoChange(e, i)}
                          onKeyDown={onKeyDownVideo}
                        />
                        <div className="btn-box">
                          {videoList.length !== 1 && (
                            <button
                              className="btn sub-btn"
                              onClick={(e) => handleVideoRemoveClick(e, i)}
                            >
                              {" "}
                              -{" "}
                            </button>
                          )}
                          {videoList.length - 1 === i && (
                            <button
                              className="btn custom-btn"
                              onClick={handleVideoAddClick}
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  );
                })}
                {console.log(videoList)}
                <span className="err text-danger">
                  {error && videoError ? <>{error}</> : ""}
                </span>
               
              </div>
            </div>

            <div className="mt-4 mx-auto d-block">
              <button
                type="submit"
                className="btn theme-btn form-text spiner-btn"
              >
                {btnLoader ? (
                  <Loader type="spinner-cub" title={"Submit"} size={16} />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileAdd;
