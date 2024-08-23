import axios from 'axios'

const accessToken = localStorage.getItem("AccessToken")

export const AuthAxios = axios.create({
    baseURL :   process.env.REACT_APP_BACKEND_URL,
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
});


const Axios = axios.create({
    baseURL :   process.env.REACT_APP_BACKEND_URL,
});
export default Axios
  