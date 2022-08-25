import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";
import { MultiSelect } from "react-multi-select-component";



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
  getAllStreams,
} from "../../../slices/api/simpleApi";
import { getKolprofile } from "../../../slices/api/simpleApi";
const ProfileUpdate = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState([]);
  console.log(selected);
  // const { message, biodata } = useSelector(dashboardSelector);
  const [categoryList, setCategoryList] = useState({});
  const [biodata, setBiodata] = useState({});
  const [state, setStates] = useState({});
  const [language, setLanguages] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [b, setA] = useState([]);
  const [social_active, setSocialActive] = useState([]);

  const [selectedFile, setSelectedFile] = useState();
  const [bannerFile, setBannerFile] = useState();
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [kolType, setKolType] = useState("");

  const [video_links, setVideoLinks] = useState([]);
  console.log(language);
  let token = localStorage.getItem("token");

  useEffect(() => {
    const callback = (data) => {
      setBiodata(data);
    };
    getKolprofile(callback, token);
  }, []);
  useEffect(() => {
    let a = selected.map((item, index) => {
      return {
        label: item,
        value: item,
      };
    });
    setA([...a]);
    console.log(a);
  }, [selected]);
  console.log(b);
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
    console.log(value);
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

  useEffect(() => {
    setKolProfile(() => {
      return {
        ...kolProfile,
        social_media: [...inputList],
      };
    });
  }, [inputList]);
  useEffect(() => {
    console.log(b);
    let x = b.map((item, index) => {
      return item.value;
    });
    console.log(x);
    setKolProfile(() => {
      return {
        ...kolProfile,
        languages: [...x],
      };
    });
  }, [b]);
  useEffect(() => {
    console.log(videoList);
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
    // setSocialActive(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  useEffect(() => {
    const callback = (data) => {
      setSocialActive({ ...data });
    };
    getAllStreams(callback, token);
  }, []);

  useEffect(() => {
    if (biodata.get_social_media) {
      setInputList([...biodata.get_social_media]);
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
    if (biodata.kol_type) {
      console.log(biodata.kol_type, categoryList);
      setKolType(
        Object.keys(categoryList).find(
          (key) => categoryList[key] == biodata.kol_type
        )
      );
    }
  }, [biodata]);
  useEffect(() => {
    setKolProfile(() => {
      console.log(videoList, inputList);
      return {
        ...kolProfile,
        userName: biodata?.get_user?.name,
        personal_email: biodata.personal_email,
        kol_type: kolType,
        city: biodata.city,
        zip_code: biodata.zip_code,
        state: biodata.state,
        userImage: biodata.banner,
        bio: biodata.bio,
        social_media: [...inputList],
        social_active: biodata.social_active,
        video_links: [...videoList],
        languages: biodata.languages,
        tags: [...tags],
        avatar: biodata.avatar,
      };
    });
  }, [tags, inputList, videoList, biodata, kolType]);

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  const languageHandleChange = (e) => {
    console.log("jghjdfhgjdghgdh", e);
    setA([...e]);
  };

  const {
    biodata: { kolProfileData },
  } = useSelector(dashboardSelector);
  console.log("fgsdhjjjj", kolProfile.languages);
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    console.log(kolProfile.video_links);
    if (!selectedFile || !bannerFile) {
      formData.append("personal_email", kolProfile.personal_email);
      formData.append("kol_type", kolProfile.kol_type);
      formData.append("city", kolProfile.city);
      formData.append("zip_code", kolProfile.zip_code);
      formData.append("bio", kolProfile.bio);
      formData.append(
        "social_media[]",
        JSON.stringify(kolProfile.social_media)
      );
      formData.append("social_active", kolProfile.social_active);
      formData.append("video_links[]", kolProfile.video_links);
      formData.append("languages[]", kolProfile.languages);
      formData.append("tags[]", kolProfile.tags);
      formData.append("state", kolProfile.state);
    } else {
      formData.append("avatar", selectedFile);
      formData.append("banner", bannerFile);
      formData.append("personal_email", kolProfile.personal_email);
      formData.append("kol_type", kolProfile.kol_type);
      formData.append("city", kolProfile.city);
      formData.append("zip_code", kolProfile.zip_code);
      formData.append("bio", kolProfile.bio);
      formData.append(
        "social_media[]",
        JSON.stringify(kolProfile.social_media)
      );
      formData.append("social_active", kolProfile.social_active);
      formData.append("video_links[]", kolProfile.video_links);
      formData.append("languages[]", kolProfile.languages);
      formData.append("tags[]", kolProfile.tags);
      formData.append("state", kolProfile.state);
    }

    dispatch(bioDataFormSubmission(formData)).then(() => {
      console.log("hello");
    });
  };
  let a = Object.entries(language).map(([key, value]) => {
    return {
      label: key,
      value: value,
    };
  });
  console.log("kolProfile", kolProfile);
  console.log("biodata", biodata);
  // console.log("hgdfffffffffffffffffffffff", kolProfile);

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
                defaultValue={kolType?kolType:"hgdf"}
              >
                <option
                  value={kolType}
                >
                  {biodata.kol_type}
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
                value={biodata.city}
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
                value={biodata.zip_code}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <label htmlFor="exampleInputPassword1" className=" form-label">
                <b>Language</b>
              </label>
              

              <Select
                options={a}
                onChange={languageHandleChange}
                isMulti
                value={b}
              />
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
                <option value={biodata?.social_active}>
                  {biodata?.social_active}
                </option>
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
                
                    <select
                      className="form-select"
                      name="name"
                      onChange={(e) => handleInputChange(e, i)}
                    >
                      <option value={x.name}>
                        {x.name}
                      </option>
                      {Object.keys(social_active).map((keyName, keyIndex) => {
                        return (
                          <option key={keyIndex} value={keyName}>
                            {keyName}
                          </option>
                        );
                      })}
                    </select>
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
            {videoList.map((x, i) => {
              return (
                <div className="row topmrgn">
                  <div className="col-8">
                    <input
                      name="videoLink"
                      placeholder="Video Link"
                      className="form-control"
                      defaultValue={x}
                      onChange={(e) => handleInputVideoChange(e, i)}
                    />
                  </div>

                  <div className="col-2">
                    <div className="btn-box">
                      {videoList.length !== 1 && (
                        <button
                          className="btn sub-btn"
                          onClick={() => handleVideoRemoveClick(i)}
                        >
                          -
                        </button>
                      )}
                      {videoList.length - 1 === i && (
                        <button
                          className="btn custome-btn left-mrgn"
                          onClick={handleVideoAddClick}
                        >
                          +
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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
