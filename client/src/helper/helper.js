import axios from "axios";
import jwt_decode from "jwt-decode";
import { setPosts } from "../store/authSlice";
import { useDispatch } from "react-redux";
// axios.defaults.baseURL = process.env.BACKEND_SERVER_URL;
axios.defaults.baseURL = "http://localhost:5000";

export async function getEmailFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Token Not Found!");
  let decode = await jwt_decode(token);
  return decode;
}

export async function registerUser(userData) {
  try {
    await axios.post(`/auth/register`, userData);

    return Promise.resolve();
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** LOGIN FUNCTION */
export async function Login({ email, password }) {
  try {
    if (email) {
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password Doesn't Match!" });
  }
}

/** UPDATE PROFILE */
export async function updateProfile(userData) {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.patch("/users/updateUser", userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile!" });
  }
}

/** UPLOAD IMAGE */
export async function postImage(data) {
  try {
    const token = localStorage.getItem("token");
    const post = await axios.post("/posts", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = post.json();
    return result;
  } catch (error) {
    return { err: "couldn't post" };
  }
}
