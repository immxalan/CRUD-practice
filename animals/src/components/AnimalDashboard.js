import React, { useState, useEffect } from "react";

import AnimalForm from "./AnimalForm.js";
import AnimalList from "./AnimalsList.js";

import { axiosAuth } from "./utils/axiosAuth";

export default function AnimalDashboard() {
    
    const [ animals, setAnimals ] = useState([]);
    //2. Create a boolean useState for your dependency array and set it to false
    //3. Pass the setDependency down througgh your AnimalForm
    //The effect of this is that whenever your boolean state is set to true (which is triggered by being updated) 
    // the dashboard will automatically refresh
    const [dependency, setDependency] = useState(false);

    //1. Set up your useEffect hook and confirm your data is being console.logged
    useEffect(() => {
        axiosAuth()
            .get("animals") //.get takes only one argument - in this instance we are getting the animals from server
            .then(res => {
                // console.table(res.data);
                // console.log(res.data)
                //1.5. Since we've confirmed it works we can now set the data to state with setAnimals
                setAnimals(res.data);
                setDependency(false)
                //4. Set the dependency state back to false (because it is set true in our AnimalForm saveUpdate function)
                //This ensures that it won't repeat itself
            })
            .catch(err => {
                console.log("Errors from animal dashboard", err.response)
            })
    }, [dependency])
    
    // How can get fetch the data from the server when the component mounts?
    // How can we capture and set that data to state?

    return(
        <div className="dash">
            <AnimalForm animals={animals} updateAnimals={setAnimals} setDependency={setDependency}/>
            <AnimalList animals={animals} />
        </div>
    )
}