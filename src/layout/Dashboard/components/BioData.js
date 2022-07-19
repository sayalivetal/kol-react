import React, { useEffect } from "react";
import { useState } from "react";
import "../css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {bioDataFormSubmission} from '../../../slices/Dashboard/dashboard'


const BioData = () => {
  
  const dispatch = useDispatch();
  const [inputList, setInputList] = useState([{ name: "", social_user_id: "" , followers: "", social_icon: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { name: "", social_user_id: "", followers: "", social_icon: "" }]);
  };


  const data = [
    {
      value: "Youtube",
      label: "Youtube",
    },
    {
      value: "Instagram",
      label: "Instagram",
    },
    {
      value: "Tiktok",
      label: "Tiktok",
    },
    {
      value: "Facebook",
      label: "Facebook",
    },
    {
      value: "Snapchat",
      label: "Snapchat",
    },
  ];

  const [kolProfile, setKolProfile] = useState({
    userName: "",
    personal_email: "",
    kol_type: [],
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
  });

  const [social_active, setSocialActive] = useState([]);
  

  const [selectedFile, setSelectedFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [count, setCount] = useState(0);
  const [linkCount, setLinkCount] = useState(0);
  const [video_links, setVideoLinks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(kolProfile);
    dispatch(bioDataFormSubmission(kolProfile))
  };

  // For Social Active Field
  useEffect(() => {
    setKolProfile(() => {
      return {
        ...kolProfile,
        social_active: [...social_active],
      };
    });
  }, [social_active]);

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
      setSelectedFile(e.target.files[0]);
      const file = e.target.files[0];
      if (file.size > 100000) {
        console.log("File is large");
      }
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

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  const handleVideoChange = (e) => {
    setVideoLinks([...video_links, e.target.value]);
  };

  const removeLastElement = () =>{
    return kolProfile.video_links.pop();
  }

  

  return (
    <>
      <h3 className="mt-4">Kol Profile</h3>

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
              >
                <option selected>Select Type</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
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
                <option value="1">Punjab</option>
                <option value="2">Haryana</option>
                <option value="3">Uttar Pradesh</option>
                <option value="3">Maharastra</option>
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
                onChange={handleChange}
                name="state"
                aria-label="Default select example"
              >
                <option selected>Select Language</option>
                <option value="Hindi">Hindi</option>
                <option value="Punjabi">Punjabi</option>
                <option value="English">English</option>
              </select>
            </div>
            <div className=" col-6">
              <label className=" form-label">
                <b>Most Active Platform</b>
              </label>

              <Select
                className="dropdown"
                placeholder="Select Option"
                value={data.filter((obj) => social_active.includes(obj.value))} // set selected values
                options={data} // set list of the data
                onChange={handleChangeSocialActive} // assign onChange function
                name="social_active"
                isMulti
                isClearable
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
                    onChange={e => handleInputChange(e, i)}
                  />
                </div>
                <div className="col-2">
                  <input
                    className="form-control ml10"
                    name="social_user_id"
                    placeholder="Enter User Id"
                    value={x.social_user_id}
                    onChange={e => handleInputChange(e, i)}
                  />
                </div>
                <div className="col-2">
                  <input
                    className="form-control ml10"
                    name="followers"
                    placeholder="30k"
                    value={x.followers}
                    onChange={e => handleInputChange(e, i)}
                  />
                </div>
                <div className="col-2">
                  <input
                    className="form-control ml10"
                    name="social_icon"
                    placeholder="fb-btn"
                    value={x.social_icon}
                    onChange={e => handleInputChange(e, i)}
                  />
                </div>
                
                <div className="col-2">
                  <div className="btn-box">
                    {inputList.length !== 1 && <button
                      className="btn sub-btn"
                      onClick={() => handleRemoveClick(i)}> - </button>}
                    {inputList.length - 1 === i && <button className="btn custome-btn left-mrgn" onClick={handleAddClick}> + </button>}
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
                  onBlur={(e) => {
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
                        removeLastElement()
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
              <b>Upload File</b>
            </label>
            <input
              type="file"
              value={selectedFile}
              name="userImage"
              onChange={handleChange}
            />
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
