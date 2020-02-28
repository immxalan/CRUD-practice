import React, { useState } from "react";
import { axiosAuth } from "./utils/axiosAuth";

const initialAnimal = {
    name: '',
    sound: '',
    classification: { species:'' }
}

export default function AnimalForm({animals, updateAnimals, setDependency }) {

    const [ updating, setUpdating ] = useState(false);
    const [animalToUpdate, setAnimalToUpdate] = useState(initialAnimal); //A single animal that we can update or delete

    const editAnimal = animal => {
        setUpdating(true);
        setAnimalToUpdate(animal);
    }

    const saveUpdate = e => {
        e.preventDefault();
        // How can we update the animal information?
        //1. Add in axiosAuth so you can make a put request to your server and update your cards
        axiosAuth()
            .put(`animals/${animalToUpdate.id}`, animalToUpdate)
            .then(res => 
            console.log(res.data),
            setDependency(true)
            )
            .catch(err => 
                console.log(err))

        // Where can we get the ID? Comes from animalToUpdate state
        // Where is the information stored?
    }

    const deleteAnimal = animal => {
        // How can we delete an animal?
        //2. Add in an axiosAuth delete call 
        axiosAuth()
            .delete(`animals/${animalToUpdate.id}`, animal)
            .then(res =>
                console.log(res.data),
                updateAnimals(animals.filter((item) => item.id !== animalToUpdate.id)))
    }

    return (
        <div className="animals-list">
            <ul className="organized">
                {animals.map(animal => (
                    <li key={animal.name} onClick={() => editAnimal(animal)} className="edit-animals">
                        <span>
                            <span onClick={e => {
                                    e.stopPropagation();
                                    deleteAnimal(animal)
                                }
                            } >
                                X
                            </span>{" "}
                            {animal.name}
                        </span>
                    </li>
                ))}
            </ul>
            { updating && (
                <form onSubmit={saveUpdate}>
                    <legend>Update Animal</legend>
                    <label>
                        Name:
                        <input 
                            onChange={e =>
                                setAnimalToUpdate({ ...animalToUpdate, name: e.target.value })
                            }
                            value={animalToUpdate.name}
                        />
                    </label>
                    <label>
                        Sound:
                        <input 
                            onChange={e =>
                                setAnimalToUpdate({ ...animalToUpdate, sound: e.target.value })
                            }
                            value={animalToUpdate.sound}
                        />
                    </label>
                    <label>
                        Classification:
                        <input 
                            onChange={e =>
                                setAnimalToUpdate({ 
                                    ...animalToUpdate, 
                                    classification: { species: e.target.value }
                                })
                            }
                            value={animalToUpdate.classification.species}
                        />
                    </label>
                    <div>
                        <button type="submit">Update</button>
                        <button onClick={() => setUpdating(false)}>Cancel</button>
                    </div>
                </form>
            )}
        </div>
    )
}