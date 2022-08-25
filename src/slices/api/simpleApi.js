// import { useSelector } from "react-redux";
import { API } from "../../common/apis";

// let token = localStorage.getItem('token')
// console.log('=================================>',token);

export const getAllCategory = async (callback, token) => {
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

export const getAllBookmark = async (callback, token) => {
  const response = await fetch(`${API}/bookmark/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  console.log(response);
  const result = await response.json();
  console.log(result);

  callback(result.bookmarks);
};

export const getChatList = async (callback, token) => {
  const response = await fetch(`${API}/Chat/chat-list-users `, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const result = await response.json();
  //console.log(result.data);

  callback(result.data);
};

export const getFeedback = async (callback, token, id) => {
  const response = await fetch(
    `${API}/feedback/kol-user-list?kol_profile_id=${id}`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  const result = await response.json();
  console.log(result);

  callback(result.Feedbacks);
};

<<<<<<< HEAD
// Deals api for users
export const getDealsListForUsers = async (callback,token,id) => {
  //console.log(callback,token,id)
  const response = await fetch(`${API}/deal/list-deals?kol_profile_id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const result = await response.json();
  console.log(result);

  callback(result);
};

// Deals api for KOL
export const getDealsListOfKol = async (callback,token) => {
  //console.log(callback,token)
  const response = await fetch(`${API}/kol-profile/view-details`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const result = await response.json();
  console.log(result);

  callback(result.kolProfile);
};


export const getKolAllAnnouncements = async (callback,token) => {
=======
export const getKolAllAnnouncements = async (callback, token) => {
>>>>>>> 094e7f7c1c2146a2c4101b2a8766c883feaa435b
  const response = await fetch(`${API}/announcement/list`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const result = await response.json();
  console.log(result);

  callback(result.announcements);
};

export const getAnnouncement = async (callback, token, id) => {
  const response = await fetch(`${API}/announcement/view?id=${id}`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const result = await response.json();
  callback(result.announcement);
};

// export const deleteAnnouncement = async (callback, token, id) => {
//   const response = await fetch(`${API}/announcement/delete?id=${id}`, {
//     method: "GET",

//     headers: {
//       Accept: "application/json",
//       Authorization: "Bearer " + token,
//     },
//   });
//   const result = await response.json();
//   return result;
// };

export const getKolprofile = async (callback, token) => {
  const response = await fetch(`${API}/kol-profile/view-details`, {
    method: "GET",

    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const result = await response.json();
  console.log("result", result);
  callback(result.kolProfile);
};

export const getUserDetails = async (callback, token) => {
  const response = await fetch(`${API}/view-user-details`, {
    method: "GET",

    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const result = await response.json();
  console.log("result", result);
  callback(result.user);
};
