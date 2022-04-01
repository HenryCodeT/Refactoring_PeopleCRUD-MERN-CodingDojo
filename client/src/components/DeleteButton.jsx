import axios from 'axios';
import React from 'react';

const DeleteButton = (props) => {
    const { personId, successCallbBack} = props;

    const deletePerson =  async (personId) => {
        try {
            const response = await axios.delete('http://localhost:8000/api/person/' + personId)
            console.log("Response: ",response.statusText );
            successCallbBack();
        } catch (error) {
            console.log("Error: ",error);
        }
    }

    return (
        <button className='btn btn-danger' onClick={(e)=>{deletePerson(personId)}}>
            Delete
        </button>  
    );
}
export default DeleteButton;