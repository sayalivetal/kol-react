import { useSelector } from "react-redux";
import { API } from "../../common/apis";

// let token = localStorage.getItem('token')
// console.log('=================================>',token);



export const getAllCategory = async (callback,token) => {
  const response = await fetch(`${API}/kol-type/list`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const result = await response.json();

  callback(result.kol_types);
};

export const getAllLanguage = async (callback) => {
  const response = await fetch(`${API}/language-list`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    
    },
  });
  const result = await response.json();

  callback(result.data);
};

export const getAllStreams = async (callback) => {
  const response = await fetch(`${API}/stream-list`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    
    },
  });
  const result = await response.json();

  callback(result.data);
};

export const getAllStates = async (callback) => {
  const response = await fetch(`${API}/state-list`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    
    },
  });
  const result = await response.json();

  callback(result.data);
};


export const getAllBookmark = async (callback,token) => {
  const response = await fetch(`${API}/bookmark/list`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const result = await response.json();
  console.log(result.bookmarks);

  callback(result.bookmarks);
};


export const getChatList = async (callback,token) => {
  const response = await fetch(`${API}/Chat/chat-list-users `, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const result = await response.json();
  console.log(result.bookmarks);

  callback(result.bookmarks);
};
export const getFeedback = async (callback,token,id) => {
  const response = await fetch(`${API}/feedback/kol-user-list?kol_profile_id=${id}`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const result = await response.json();
  console.log(result);

  callback(result.Feedbacks);
};



