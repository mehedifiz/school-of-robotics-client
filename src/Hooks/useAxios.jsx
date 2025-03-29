import axios from "axios";

const token = JSON.parse(localStorage.getItem("auth"))

const axiosPublic = axios.create({
  baseURL: "https://school-of-robotics-server.vercel.app/api",
  headers: {
    Authorization: `${token?.token}`
  }
});
console.log(token?.token)
const useAxios = () => {
  return axiosPublic;
};

export default useAxios;