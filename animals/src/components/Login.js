import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { axiosAuth } from "./utils/axiosAuth";

export default function Login(props) {
    // How can we log in? What do we need to do?
    //3. Set up state for the handleChange function for your credentials(username, password)
    const [login, setLogin] = useState({
            username: "",
            password: ""
    })
    //6. Set up your useHistory hook so you can push the PrivateRoute after logging in
    const history = useHistory()
    //2. Set up your handleChange to take in the user input in the login form for onChange
    //preventDefault is used to stop auto-refreshing
const handleChange = (e) => {
    setLogin({
        ...login,
        [e.target.name]: e.target.value})
//we use a spread operator for login so it only captures the last input as opposed to all of it
}
//4. Set up your handleSubmit for when you login - make an axios post to the server inside this
//5. Axios post will be done in separate component - axiosAuth - make sure to set that up
const handleSubmit = (e) => {
    e.preventDefault();
    axiosAuth()
        .post("login", login)
        .then(res => {
            console.log(res);
            window.localStorage.setItem("token", res.data.payload)
            history.push("/creatures")
            //6.5. props.history.push("/creatures") - if you don't set up a useHistory hook use this instead
        })
        .catch(err => 
            console.log("There was an error", err.response))
        //5.5 .post accepts 2 argument - the URL + the state
}
    return (
        //1. Set up your form for logging in
        <div>
            <h1>Welcome to the Safari App!</h1>
            <form className="forms-style" onSubmit={handleSubmit}>
                <label htmlFor="username">
                    <input type="text"
                            name="username"
                            label="username"
                            value={login.username}
                            onChange={handleChange}
                            className="input"/>
                            </label>
                <label htmlFor="password">
                    <input type="text"
                            name="password"
                            label="password"
                            value={login.password}
                            onChange={handleChange}
                            className="input"/>
                            </label>
            <button onClick={handleSubmit}>Login</button>
            </form>
        </div>
    )
}