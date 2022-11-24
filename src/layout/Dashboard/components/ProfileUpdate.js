import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { imageUrl } from "../../../common/apis";
import {
  bioDataFormSubmission,
  dashboardSelector,
} from "../../../slices/Dashboard/dashboard";
import {
  getAllCategory,
  getAllLanguage,
  getAllStates,
  getAllStreams,
} from "../../../slices/api/simpleApi";
import { getKolprofile } from "../../../slices/api/simpleApi";
import Loader from "react-js-loader";

const ProfileUpdate = () => {
  // const navigate = useNavigate();

  const [selected, setSelected] = useState([]);

  // const { message, biodata } = useSelector(dashboardSelector);
  const [kolType, setKolType] = useState("");
  const [categoryList, setCategoryList] = useState({});
  const [state, setStates] = useState({});
  const [language, setLanguages] = useState([]);
  const [social_active, setSocialActive] = useState([]);
  const [biodata, setBiodata] = useState({});
  const [tags, setTags] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [bannerFile, setBannerFile] = useState();
  const [videoList, setVideoList] = useState([]);
  const [lang, setLang] = useState([]);
  const [input, setInput] = useState("");
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [video_links, setVideoLinks] = useState([]);
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState("");
  
  const [btnLoader, setBtnLoader] = useState(false);

  let token = localStorage.getItem("token");
  const [kolProfile, setKolProfile] = useState({
    userName: "",
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
  });


  const dispatch = useDispatch();
  const initialArr = {};
  initialArr["name"] = "";
  initialArr["social_user_id"] = "";
  initialArr["followers"] = "";

  // initialArr["social_icon"] = "";
  const [inputList, setInputList] = useState([
    {
      name: "",
      social_user_id: "",
      followers: "",
      // social_icon: "",
    },
  ]);

  useEffect(() => {
    const callback = (data) => {
      setBiodata(data);
    };
    getKolprofile(callback, token);
  }, []);

  useEffect(() => {
    if (biodata?.get_social_media?.length > 0) {
      setInputList([...biodata.get_social_media]);
    }else {
      setInputList([...inputList]);
    }

    if (biodata.video_links) {
      let str = biodata.video_links;
      let chars = str.split(",");

      setVideoList([...chars]);
    }
    if (biodata.tags) {
      let str = biodata.tags;
      let tag = str.split(",");
      setTags([...tag]);
    }
    if (biodata.languages) {
      let str = biodata.languages;
      let language = str.split(",");
      setSelected([...language]);
    }
    if (biodata.kol_type && categoryList) {
      setKolType(
        Object.keys(categoryList).find(
          (key) => categoryList[key] == biodata.kol_type
        )
      );
    }
  }, [biodata, categoryList]);

  

  useEffect(() => {
    let a = selected.map((item, index) => {
      return {
        label: item,
        value: item,
      };
    });
    setLang([...a]);
  }, [selected]);

  useEffect(() => {
    const callback = (data) => {
      setCategoryList({ ...data });
    };
    getAllCategory(callback, token);
  }, []);
  useEffect(() => {
    const callback = (data) => {
      setLanguages({ ...data });
    };
    getAllLanguage(callback);
  }, []);
  useEffect(() => {
    const callback = (data) => {
      setStates({ ...data });
    };
    getAllStates(callback);
  }, []);



  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
  // handle click event of the Remove button
  const handleRemoveClick = (e, index) => {
    e.preventDefault();
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { name: "", social_user_id: "", followers: "" },
    ]);
  };

  // handle input change
  const handleInputVideoChange = (e, index) => {
    const { value } = e.target;
    const list = [...videoList];
    list[index] = value;
    setVideoList(list);
  };

  // handle click event of the Remove button
  const handleVideoRemoveClick = (index) => {
    const list = [...videoList];
    list.splice(index, 1);
    setVideoList(list);
  };

  // handle click event of the Add button
  const handleVideoAddClick = () => {
    setVideoList([...videoList, ""]);
  };

  useEffect(() => {
    setKolProfile(() => {
      return {
        ...kolProfile,
        social_media: [...inputList],
      };
    });
  }, [inputList]);

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

  useEffect(() => {
    setKolProfile(() => {
      return {
        ...kolProfile,
        video_links: [...videoList],
      };
    });
  }, [videoList]);

  useEffect(() => {
    setKolProfile(() => {
      return {
        ...kolProfile,
        tags: [...tags],
      };
    });
  }, [tags]);

  function isValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);;
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
    if (e.target.name == "personal_email") {
      if (!e.target.value) {
        setFieldError("Please fill the mandatory filed")
      } else if (!isValidEmail(e.target.value)) {
        setFieldError("Please enter correct email")
      }else {
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

  // const handleChangeSocialActive = (e) => {
  //    setSocialActive(Array.isArray(e) ? e.map((x) => x.value) : []);
  // };

  useEffect(() => {
    const callback = (data) => {
      setSocialActive({ ...data });
    };
    getAllStreams(callback, token);
  }, []);

  useEffect(() => {
    setKolProfile(() => {
      return {
        ...kolProfile,
        userName: biodata?.get_user?.name,
        personal_email: biodata.personal_email,
        kol_type: kolType,
        city: biodata.city,
        state: biodata.state,
        zip_code: biodata.zip_code,
        languages: biodata.languages,
        social_active: biodata.social_active,
        bio: biodata.bio,
        tags: [...tags],
        userImage: biodata.avatar,
        userBanner: biodata.banner,
        social_media: [...inputList],
        video_links: [...videoList],
      };
    });
  }, [   biodata, kolType ]);



  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  const languageHandleChange = (e) => {
    setLang([...e]);
  };

  const {
    biodata: { kolProfileData },
  } = useSelector(dashboardSelector);

  let langList = Object.entries(language).map(([key, value]) => {
    return {
      label: key,
      value: value,
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoader(true);

    const formData = new FormData();

      formData.append("personal_email", kolProfile.personal_email);
      formData.append("kol_type", kolProfile.kol_type);
      formData.append("city", kolProfile.city);
      formData.append("state", kolProfile.state);
      formData.append("zip_code", kolProfile.zip_code);
      formData.append("languages[]", kolProfile.languages);
      formData.append("social_active", kolProfile.social_active);
      formData.append("bio", kolProfile.bio);
      formData.append("tags[]", kolProfile.tags);

      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }
      if (bannerFile) {
        formData.append("banner", bannerFile);
      }

      formData.append("social_media[]", JSON.stringify(kolProfile.social_media) );
      formData.append("video_links[]", kolProfile.video_links);
    
      if( kolProfile.personal_email == "" || 
          kolProfile.kol_type == "" || 
          kolProfile.city == "" || 
          kolProfile.state == "" ||
          kolProfile.zip_code == "" || 
          kolProfile.languages == "" || 
          kolProfile.social_active == "" || 
          kolProfile.bio == "" || 
          kolProfile.tags == "" || 
          kolProfile.video_links == "" ||
          kolProfile.social_media == "" ) {
          setError("Please fill the mandatory filed");
          setBtnLoader(false);
          return;
      } if (fieldError.length > 0 ){ 
        setBtnLoader(false)
        return;
      }
      else {
              dispatch(bioDataFormSubmission(formData)).then((data) => {
                if(data?.payload?.status){
                  toast.success(data?.payload?.message)
                  setBtnLoader(false)
                  const callback = (data) => {
                    setBiodata(data);
                  };
                  getKolprofile(callback, token);
                }
                else{
                  toast.error(data?.payload?.message)
                  setBtnLoader(false)
                }
              });
            }
  };


  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-title h5 justify-content-between m-0 d-flex align-items-center">
            <span>Kol Profile Update</span>{" "}
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
                  onChange={handleChange}
                  value={kolProfile?.userName}
                  disabled
                />
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>Email address <span className="text-danger">*</span></b>
                </label>
                <input
                  type="email"
                  name="personal_email"
                  className={`form-control ${error === "" || kolProfile.personal_email ? "" : "border-danger" }`}
                  value={kolProfile?.personal_email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                />
                <div id="emailHelp" className="form-text">
                  This is Secondary email. We'll never share your email with anyone else.
                </div>
                <span className="err text-danger">
                  {fieldError || error && kolProfile.personal_email == "" && ( <>{fieldError || error }</>)}
                </span>
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>Kol Type <span className="text-danger">*</span></b>
                </label>
                <select
                  className={`form-select ${error === "" || kolProfile.kol_type ? "" : "border-danger" }`}
                  name="kol_type"
                  onChange={handleChange}
                  value={kolProfile?.kol_type ? kolProfile?.kol_type : "No Type"}
                >
                  <option value="">Select Kol Type</option>
                  {categoryList &&
                    Object.entries(categoryList).map(([key, value]) => (
                      <option key={key} value={key}>
                        {categoryList[key] ? value  : "Select" }
                      </option>
                    ))}
                </select>
                <span className="err text-danger">
                  {error && kolProfile.kol_type == "" && ( <>{error}</>)}
                </span>
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>City <span className="text-danger">*</span></b>
                </label>
                <input
                  type="text"
                  name="city"
                  onChange={handleChange}
                  className={`form-control ${error === "" || kolProfile.city ? "" : "border-danger" }`}
                  value={kolProfile?.city}
                  placeholder="Enter City"
                />
                <span className="err text-danger">
                  {error && kolProfile.city == "" && ( <>{error}</>)}
                </span>
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>State <span className="text-danger">*</span></b>
                </label>
                <select
                  className={`form-select ${error === "" || kolProfile.state ? "" : "border-danger" }`}
                  onChange={handleChange}
                  name="state"
                  value={kolProfile?.state}
                >
                  <option value="">Select State</option>
                  {state &&
                    Object.entries(state).map(([key, value]) => (
                      <option value={key}>{value}</option>
                    ))}
                </select>
                <span className="err text-danger">
                  {error && kolProfile.state == "" && ( <>{error}</>)}
                </span>
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className=" form-label">
                  <b>Zip code <span className="text-danger">*</span></b>
                </label>
                <input
                  type="text"
                  name="zip_code"
                  className={`form-control ${error === "" || kolProfile.zip_code ? "" : "border-danger" }`}
                  onChange={handleChange}
                  value={kolProfile?.zip_code}
                  placeholder="Enter Zip code"
                />
                <span className="err text-danger">
                  {error && kolProfile.zip_code == "" && ( <>{error}</>)}
                </span>
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className=" form-label">
                  <b>Language <span className="text-danger">*</span></b>
                </label>
                <Select
                  options={langList}
                  name="languages"
                  onChange={languageHandleChange}
                  isMulti
                  value={lang}
                  className={`text-capitalize ${error === "" || kolProfile?.languages?.length  ? "" : "border-danger" }`}
                />
                <span className="err text-danger">
                  {error && kolProfile.languages == "" && ( <>{error}</>)}
                </span>
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className=" form-label">
                  <b>Most Social Active Platform <span className="text-danger">*</span></b>
                </label>
                <select
                  className={`form-select ${error === "" || kolProfile.social_active ? "" : "border-danger" }`}
                  name="social_active"
                  onChange={handleChange}
                  value={kolProfile?.social_active}
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
                  {error && kolProfile.social_active == "" && ( <>{error}</>)}
                </span>
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>Bio <span className="text-danger">*</span></b>
                </label>
                <textarea
                  className={`form-control ${error === "" || kolProfile.bio ? "" : "border-danger" }`}
                  name="bio"
                  onChange={handleChange}
                  value={kolProfile?.bio}
                  rows="6"
                  placeholder="Enter Bio"
                ></textarea>
                <span className="err text-danger">
                  {error && kolProfile.bio == "" && ( <>{error}</>)}
                </span>
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>Enter Tags <span className="text-danger">*</span></b>
                </label>
                <input
                  value={input}
                  placeholder="Enter tags"
                  onKeyDown={onKeyDown}
                  onKeyUp={onKeyUp}
                  name="tags"
                  className={`form-control ${error === "" || kolProfile?.tags?.length ? "" : "border-danger" }`}
                  onChange={onChange}
                />
                <span className="err text-danger">
                  {error && kolProfile.tags == "" && ( <>{error}</>)}
                </span>
                {tags.length ? (
                  <div className="tagDiv">
                    {kolProfile?.tags.map((tag, index) => (
                      <div className="tag btn-default">
                        {tag}
                        <button onClick={() => deleteTag(index)}>x</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="col-lg-6 col-sm-12 mt-3 d-flex">
                <div className="profile-img-thumb">
                  <img
                    src={`${imageUrl}${biodata?.avatar}`}
                    height={50}
                    alt="Avatar"
                  />
                </div>
                <div className="profile-img-group">
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
              </div>

              <div className="col-lg-6 col-sm-12 mt-3 d-flex">
                <div className="profile-img-thumb">
                  <img
                    src={`${imageUrl}${biodata?.banner}`}
                    height={50}
                    width={50}
                    alt="Banner"
                  />
                </div>
                <div className="profile-img-group">
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
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>Social Media Info <span className="text-danger">*</span></b>
                </label>

                {inputList.length > 0 && inputList.map((x, i) => {
                  return (
                    <div className="col d-flex mb-2">
                      <select
                        className="form-select me-3"
                        name="name"
                        onChange={(e) => handleInputChange(e, i)}
                        value={x.name}
                      >
                        <option value="">Social Media</option>
                        {Object.keys(social_active).map((keyName, keyIndex) => {
                          return (
                            <option key={keyIndex} value={keyName}>   {keyName} </option>
                          );
                        })}
                      </select>
                      <input
                        className="form-control  me-3 w-50"
                        name="social_user_id"
                        placeholder="Enter User Id"
                        value={x.social_user_id}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                      <input
                        className="form-control  me-3 w-50"
                        name="followers"
                        placeholder="30"
                        value={x.followers}
                        onChange={(e) => handleInputChange(e, i)}
                        
                      />
                      <div className="btn-box">
                        {inputList.length !== 1 && (
                          <button className="btn sub-btn" onClick={(e) => handleRemoveClick(e, i)}>-</button>
                        )}
                        {inputList.length - 1 === i && (
                          <button className="btn custom-btn" onClick={handleAddClick}>+</button>
                        )}
                      </div>
                    </div>
                  );
                })}

                    <span className="err text-danger">
                      {error && inputList?.length == "" && ( <>{error}</>)}
                    </span>
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>Video Links <span className="text-danger">*</span></b>
                </label>
                {videoList.map((x, i) => {
                  return (
                    <>
                    <div className="col d-flex mb-2">
                      <input
                        name="video_links"
                        placeholder="Enter Video Link"
                        className={`form-control me-3 ${error === "" || kolProfile?.video_links?.length ? "" : "border-danger" }`}
                        value={x}
                        onChange={(e) => handleInputVideoChange(e, i)}
                      />
                      <div className="btn-box">
                        {videoList.length !== 1 && (
                          <button className="btn sub-btn" onClick={(e) => handleVideoRemoveClick(e, i)}> - </button>
                        )}
                        {videoList.length - 1 === i && (
                          <button className="btn custom-btn" onClick={handleVideoAddClick}>+</button>
                        )}
                      </div>
                    </div>
                    <span className="err text-danger">
                    {error && kolProfile.video_links == "" && ( <>{error}</>)}
                  </span>
                  </>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 mx-auto d-block">
              <button type="submit" className="btn theme-btn form-text spiner-btn">
                {btnLoader ? <Loader type="spinner-cub" title={"Submit"} size={16} /> : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
