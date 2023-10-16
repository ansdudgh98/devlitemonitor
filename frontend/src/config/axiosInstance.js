import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://backend.devlitemonitor.com",
    withCredentials: true,
    timeout: 5000,
    headers : {
        "Content-Type" : "application/json"
    }
});




