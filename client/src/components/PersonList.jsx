import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';


const PersonList = (props) => {
    // //// FIELDS ///////////////////////////////////////////
    const [people, setPeople] = useState([]);
    const [loaded, setLoaded] = useState(false);
    // //// API AXIOS GET ////////////////////////////////////
    const getAllPeopleFromAPI = async () =>{
        try {
            const response = await axios.get('http://localhost:8000/api/people')
            console.log("Response: ",response);
            setPeople(response.data.people)
            setLoaded(true)
        } catch (error) {
            console.log("Error: ",{error});
        }
    }
    // //// SET DATA ////////////////////////////////////////
    useEffect(  () => {
        console.log("*** USE-EFFECT-PERSON ***");
        console.log(getAllPeopleFromAPI()); 
    }, [])
    // //// DELETE ////////////////////////////////////////
    // const deletePerson =  async (personId) => {
    //     try {
    //         const response = await axios.delete('http://localhost:8000/api/person/' + personId)
    //         console.log("Response: ",response.statusText );
            
    //         const filterPersonList = people.filter((person)=> person._id !== personId)
    //         setPeople(filterPersonList);
    //     } catch (error) {
    //         console.log("Error: ",error);
    //     }
        
    // }

    const removeFromDom = (personId) =>{
        setPeople(people.filter((person)=>person._id !== personId))
    } 

    // //// RETURN /////////////////////////////////////////
    return(
        <div>
            { loaded &&
                people.map((person,index) =>
                    <div key={index}>
                        <Link to={`/${person._id}`}>
                            <h2>{person.lastName}, {person.firstName}</h2>
                        </Link>    
                        <br />
                        <DeleteButton personId={person._id} successCallbBack={()=>removeFromDom(person._id)}/>               
                    </div>
                )
            }
        </div>
    );
}
export default PersonList;