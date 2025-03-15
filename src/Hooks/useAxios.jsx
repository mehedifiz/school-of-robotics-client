import axios from "axios";


const axiosPublic = axios.create({
  baseURL: "http://localhost:7000/api",
  // baseURL: "https://ayotto-test-server.vercel.app/api",
  // withCredentials: true,
  
});

const useAxios = () => {
  
  return axiosPublic;
};

export default useAxios;
