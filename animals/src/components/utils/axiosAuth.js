import axios from "axios";

//Set up your baseurl in here so it doesn't have to repeat every time you use axios for the server
export const axiosAuth = () => {
    const token = window.localStorage.getItem("token");
    //window not necessary but "Safer" for certain browsers due to specificity

    return axios.create({
        baseURL:"http://localhost:5001/api/",
        headers: {
            Authorization: token
        }
    })
}