import React,{useEffect,useState} from 'react';
import axios from 'axios';
import PersonForm from '../components/PersonForm';
import PersonList from '../components/PersonList';

const Main = () =>{
    const [message, setMessage] = useState("...Lodading");
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
      axios.get('http://localhost:8000/api')
      .then(response=>{
          setMessage(response.data.message)
          setLoaded(true)
      })
      .catch(err=>console.error(err));
    }, [])

    const createPerson = (person) =>{
        setLoaded(false)
        console.log("********* create person ***********");
        axios.post('http://localhost:8000/api/person/new',person)
        .then(response => {
                            console.log("Response: ",response)
                            setLoaded(true)})
            .catch(err => console.log("Error: ", {err}))
            
    }


    return(
        <div>
            {
                loaded &&
                <div>
                    <h1>Message from the backend: {message}</h1>
                    <PersonForm onSubmitProp={createPerson} initialFirstName="" initialLastName=""/>
                    <hr />
                    <PersonList/>
                </div>
            }
        </div>
    )
    
}
export default Main;