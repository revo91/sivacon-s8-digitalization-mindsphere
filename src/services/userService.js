import axios from "axios";

const userRoute = "customApi/user";

let currentUser = {
  isAdmin: false
};

let allAdminUsers = [];

export function getCurrentUser() {
  return currentUser;
}

const checkIfUserIsAdmin = userData => {
  if (allAdminUsers.includes(userData["user_name"])) return true;
  else return false;
};

export async function fetchCurrentUser() {
  let result = await axios({
    url: encodeURI(userRoute + "/me"),
    method: "GET",
    headers: { "Content-type": "application/json" },
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN"
  });

  if (result.data) {
    currentUser = {
      ...result.data,
      isAdmin: checkIfUserIsAdmin(result.data)
    };
  }
}

export async function fetchAllAdminUsers() {
  let result = await axios({
    url: encodeURI(userRoute + "/adminUsers"),
    method: "GET",
    headers: { "Content-type": "application/json" },
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN"
  });

  if (result) allAdminUsers = result.data;
}
