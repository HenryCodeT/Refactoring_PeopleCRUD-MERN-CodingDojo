import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DeleteButton from '../components/DeleteButton';
import PersonForm from '../components/PersonForm';

const PersonUpdate = (props) => {
    // ///// FIELDS ////////////////////////////////
    // console.log(props);
    const {id} = props.match.params 
    // const id = props.match.id;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loaded, setLoaded] = useState(false);

    // ///// API GET PERSON ////////////////////////
    const getPersonByID = async (id) =>{
        try {
            const response = await axios.get(`http://localhost:8000/api/person/${id}`)
            console.log("Response",response);
            setFirstName(response.data.person.firstName)
            setLastName(response.data.person.lastName)
            setLoaded(true);
        } catch (error) {
            console.log("Error",{error});
        }
    }
    // ///// USE EFFECT TO SET PERSON //////////////
    useEffect(() => {
        getPersonByID ( id );
    }, [])
    // //// UPDATE PERSON //////////////////////////
    const handleUpdatePerson = async (person) =>{
        setLoaded(false);
        console.log(person.firstName);
        try {
            const response = await axios.put(`http://localhost:8000/api/person/${id}`,person)
            console.log("Response",response);
            setFirstName(person.firstName);
            setLastName(person.lastName);
            setLoaded(true);
        } catch (error) {
            console.log("Error",{error});
        }
    }

    return(
        <div>
            { loaded && (
                    <PersonForm 
                        onSubmitProp={handleUpdatePerson} 
                        initialFirstName={firstName} 
                        initialLastName={lastName} 
                    />
                    )
                }
            <DeleteButton personId={id} successCallbBack={()=>props.history.push("/")}/>
        </div>
    );
}
export default PersonUpdate;