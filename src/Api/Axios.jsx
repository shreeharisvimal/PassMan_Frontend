import axios from 'axios'

export const AuthAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

AuthAxios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("AccessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


const Axios = axios.create({
    baseURL :   process.env.REACT_APP_BACKEND_URL,
});
export default Axios
  