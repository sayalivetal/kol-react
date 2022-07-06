import { useSelector } from "react-redux";
import { API } from "../../common/apis";


export async function getAllCategory(callback) {
  const response = await fetch(`${API}/category/list`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const result = await response.json();
  callback(result.data);
}

// export async function kolListing(callback) {
  
//   const response = await fetch(`${API}/kol-profile/list`, {
//     method: "GET",
//     headers: { 
//       "Content-Type": "application/json",
//     Authorization:`Bearer ${token}`
//   },
//   });

//   const result = await response.json();
//   callback(result.kolProfiles);
// }