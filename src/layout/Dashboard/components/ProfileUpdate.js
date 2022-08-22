import React, { useEffect, useState } from "react";
import "../css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  bioDataFormSubmission,
  dashboardSelector,
} from "../../../slices/Dashboard/dashboard";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { imageUrl } from "../../../common/apis";
import {
  getAllCategory,
  getAllLanguage,
  getAllStates,
} from "../../../slices/api/simpleApi";
import { getKolprofile } from "../../../slices/api/simpleApi";
const ProfileUpdate = () => {
  const navigate = useNavigate();
  // const { message, biodata } = useSelector(dashboardSelector);
  const [categoryList, setCategoryList] = useState({});
  const [biodata, setBiodata] = useState({});
  const [state, setStates] = useState({});
  const [language, setLanguages] = useState("");
  let token = localStorage.getItem("token");
  console.log(token);
  useEffect(() => {
    const callback = (data) => {
      console.log("hello", data);
      setBiodata(data);
    };
    getKolprofile(callback, token);
  }, []);
  console.log("fjshdfjfhjsf", biodata.kol_type);

  useEffect(() => {
    const callback = (data) => {
      console.log(data);
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

  const data = [
    {
      value: "youtube",
      label: "Youtube",
    },
    {
      value: "instagram",
      label: "Instagram",
    },
    {
      value: "tik-tok",
      label: "Tiktok",
    },
    {
      value: "facebook",
      label: "Facebook",
    },
    {
      value: "linkedIn",
      label: "LinkedIn",
    },
    {
      value: "patreon",
      label: "Patreon",
    },
  ];

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
    social_active: [],
    video_links: [],
    languages: [],
    tags: [],
    avatar: "",
  });

  const [social_active, setSocialActive] = useState([]);

  const [selectedFile, setSelectedFile] = useState();
  const [bannerFile, setBannerFile] = useState();
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [count, setCount] = useState(0);
  const [linkCount, setLinkCount] = useState(0);
  const [video_links, setVideoLinks] = useState([]);

  const [vedioLinkArr, setVedioLinkArr] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    console.log("kolProfile======", kolProfile);

    formData.append("avatar", selectedFile);
    formData.append("banner", bannerFile);
    formData.append("personal_email", kolProfile.personal_email);
    formData.append("kol_type", kolProfile.kol_type);
    formData.append("city", kolProfile.city);
    formData.append("zip_code", kolProfile.zip_code);
    formData.append("bio", kolProfile.bio);
    formData.append("social_media[]", JSON.stringify(kolProfile.social_media));
    formData.append("social_active[]", kolProfile.social_active);
    formData.append("video_links[]", kolProfile.video_links);
    formData.append("languages[]", kolProfile.languages);
    formData.append("tags[]", kolProfile.tags);
    formData.append("state", kolProfile.state);

    dispatch(bioDataFormSubmission(formData));
  };

  // For Social Active Field
  useEffect(() => {
    setKolProfile(() => {
      return {
        ...kolProfile,
        // social_active: [...social_active],
      };
    });
  }, [social_active]);

  useEffect(() => {
    setKolProfile(() => {
      return {
        ...kolProfile,
        // social_media: [...inputList],
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
    setSocialActive(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  useEffect(() => {
    setSocialActive(biodata?.social_active);
  }, []);

  useEffect(() => {
    // console.log(biodata.video_links);
    // let a = biodata?.video_links?.split(",");

    // setVedioLinkArr([...a]);
    // setTags([...biodata?.tags?.split(",")]);

    // setInputList([...biodata?.get_social_media]);
    // console.log("vedioLinkArr ==", vedioLinkArr);

    setKolProfile(() => {
      return {
        ...kolProfile,
        video_links: [...vedioLinkArr],
        tags: [...tags],
        // social_media: [...biodata.get_social_media],
        city: biodata.city,
        kol_type: biodata.kol_type,
        zip_code: biodata.zip_code,
        state: biodata.state,
        personal_email: biodata.personal_email,
        bio: biodata.bio,
        // languages: biodata.languages.split(","),
        // social_active: biodata.social_active.split(","),
      };
    });

    console.log("kolProfile123", kolProfile);
  }, [biodata]);

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  const handleVideoChange = (e) => {
    setVideoLinks((state) => {
      return [...state, e.target.value];
    });
  };

  const removeLastElement = () => {
    return kolProfile.video_links.pop();
  };

  const languageHandleChange = (e) => {
    setKolProfile({ ...kolProfile, [e.target.name]: [e.target.value] });
  };

  const {
    biodata: { kolProfileData },
  } = useSelector(dashboardSelector);

  console.log("biodata", biodata);

  return (
    <>
      <div className="row col-12">
        <div className="col-6">
          <h3 className="mt-4">Kol Profile</h3>
        </div>
        <div className="col-6">
          <Link to="../profileview"> View</Link>
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
                onChange={handleChange}
                id="exampleInputEmail1"
                defaultValue={biodata?.get_user?.name}
                aria-describedby="emailHelp"
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
                aria-describedby="emailHelp"
                defaultValue={biodata?.personal_email}
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
                className="form-select"
                name="kol_type"
                onChange={handleChange}
                aria-label="Default select example"
                // defaultValue={biodata.kol_type}
              >
                <option value={biodata.kol_type}>
                  {categoryList[biodata.kol_type]
                    ? categoryList[biodata.kol_type]
                    : "select"}
                </option>
                {categoryList &&
                  Object.entries(categoryList).map(([key, value]) => (
                    <option key={key} value={key}>
                      {categoryList[key] ? "select" : value}
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
                defaultValue={biodata.city}
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
                <option value={biodata.state}>{biodata.state}</option>

                {state &&
                  Object.entries(state).map(([key, value]) => (
                    <option value={key}>{value}</option>
                  ))}
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
                defaultValue={biodata.zip_code}
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
                <option value={biodata.languages}>{biodata.languages}</option>
                {language &&
                  Object.entries(language).map(([key, value]) => (
                    <option value={key}>{value}</option>
                  ))}
              </select>
            </div>
            <div className=" col-6">
              <label className=" form-label">
                <b>Most Active Platform</b>
              </label>

              <Select
                className="dropdown"
                placeholder="Select Option"
                // value={data.filter((obj) => social_active.includes(obj.value))} // set selected values
                options={data} // set list of the data
                // defaultValue={biodata.kolProfile.social_active}
                onChange={handleChangeSocialActive} // assign onChange function
                name="social_active"
                // inputValue={biodata.kolProfile.social_active}
                isMulti
                isClearable
                // defaultValue={biodata.kolProfile.social_active}
              />
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
              {vedioLinkArr &&
                vedioLinkArr.map((item, index) => {
                  return (
                    <>
                      <div className="col-8 linkdiv">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="enter video link"
                          onChange={(e) => {
                            handleVideoChange(e, 0);
                          }}
                          data1={index}
                          defaultValue={item}
                        />
                      </div>
                      {index == 0 ? (
                        <div className="col-4 linkdiv">
                          <button
                            type="button"
                            name="video_links"
                            data1={index}
                            className="btn custome-btn"
                            onClick={() => setLinkCount(linkCount + 1)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <div className="col-4 linkdiv">
                          <button
                            type="button"
                            name="video_links"
                            className="btn sub-btn"
                            onClick={() => {
                              // if(linkCount == 1){
                              //     setVedioLinkArr(vedioLinkArr);
                              // }
                              setLinkCount(linkCount - 1);
                              // removeLastElement();
                            }}
                          >
                            -
                          </button>
                        </div>
                      )}
                    </>
                  );
                })}
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
              defaultValue={biodata.bio}
              rows="3"
            ></textarea>
          </div>

          <div className="col-12 mt-3">
            {tags.length ? (
              <div className="tagDiv">
                {tags.map((tag, index) => (
                  <div className="tag">
                    {tag}
                    <button onClick={() => deleteTag(index)}>x</button>
                  </div>
                ))}
              </div>
            ) : (
              ""
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
              // defaultValue={biodata.kolProfile.video_links}
            />
          </div>

          <div className="row mt-3">
            <label className="form-label">
              <b>Upload Avatar</b>
            </label>
            <input type="file" name="userImage" onChange={handleChange} />
            <img src={`${imageUrl}${biodata.avatar}`} height={50} />
          </div>
          <div className="row mt-3">
            <label className="form-label">
              <b>Upload Banner</b>
            </label>
            <input type="file" name="userBanner" onChange={handleChange} />
            <img src={`${imageUrl}${biodata.banner}`} height={50} width={50} />
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

export default ProfileUpdate;
