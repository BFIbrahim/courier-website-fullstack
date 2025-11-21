import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://gofast-server-two.vercel.app` 
})

const useAxios = () => {
    return axiosInstance
};

export default useAxios;