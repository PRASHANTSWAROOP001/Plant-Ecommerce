import axios from "axios";

if(!import.meta.env.VITE_API_URL){
    console.warn("base api url might not be present in .env");

}

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true,
})

export default axiosInstance;