import { API } from "../../common/apis";

export async function getAllCategory(callback) {
  const response = await fetch(`${API}/category/list`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const result = await response.json();
  callback(result.data);
}
