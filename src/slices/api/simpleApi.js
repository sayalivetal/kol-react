// import { useSelector } from "react-redux";
import { async } from "@firebase/util";
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
  //console.log(response);
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
 // console.log(result);

  callback(result.Feedbacks);
};


// Deals api for users
export const getDealsListForUsers = async (callback,token,id) => {
 // console.log(callback,token,id)
  const response = await fetch(`${API}/deal/list-kol-deals?kol_user_id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const result = await response.json();
 // console.log(result);

  callback(result.deals);
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


  callback(result.kolProfile);
};



export const getKolAllAnnouncements = async (callback, token, page) => {
  const response = await fetch(
    `${API}/announcement/list?page=${page}&limit=5`,
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

  callback(result.user);
};

// Order Summary api
export const getOrderSummary = async (callback, token, id) => {
  const response = await fetch(`${API}/order/get_order_summary?id=${id}`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const result = await response.json();
  callback(result.orderSummary)
}

// Order history of user
export const getUserOrderHistory = async (callback, token) => {
  const response = await fetch(`${API}/order/get_user_order_history`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const result = await response.json();
  //console.log(result)
  
  callback(result.orderSummary)
}

// Order history of Kol
export const getKolOrderHistory = async (callback, token) => {
  const response = await fetch(`${API}/order/get_kol_order_history`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const result = await response.json();
  //console.log(result)
  
  callback(result.orderSummary)
}


// landing page banner list
export const getDashboardBannerList = async (callback) => {
  const response = await fetch(`${API}/dashboard/banner-list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const result = await response.json();
 // console.log(result)
  
  callback(result.banners)
}

// landing page featuredlist
export const getfeaturedList = async (callback) => {
  const response = await fetch(`${API}/kol-profile/featured-list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const result = await response.json();
 // console.log(result)
  
  callback(result.kolProfiles)
}


// landing page faq list
export const getfaqList = async (callback) => {
  const response = await fetch(`${API}/dashboard/faq-list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const result = await response.json();
 // console.log(result)
  
  callback(result.banners)
}

// landing page How It Work Video List
export const getHowItWorkVideoList = async (callback) => {
  const response = await fetch(`${API}/dashboard/information-list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const result = await response.json();
 // console.log(result)
  
  callback(result.InformativeVideos)
}


// landing page get feat Video List
export const getfeatVideoList = async (callback) => {
  const response = await fetch(`${API}/dashboard/information-list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const result = await response.json();
 // console.log(result)
  
  callback(result.InformativeVideos)
}

// landing page get total user count
export const getTotalCounts = async (callback) => {
  const response = await fetch(`${API}/dashboard/get-total-count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const result = await response.json();
 // console.log(result)
  
  callback(result.InformativeVideos)
}
