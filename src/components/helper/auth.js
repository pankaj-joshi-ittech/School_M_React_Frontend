import {envirnoment} from '../../envirnoment/envirnoment';
const {axios} = require('axios');


const API = envirnoment.api_url;


// Using Javascript Fetch Method
export const signup = (data) => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            ACCEPT: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            return response.json();
        }).catch((error) => {
            console.log(error)
        })
}


//Using  axios 

export const signin = (data) => {
    return axios.post(`${API}/signin`,{
        data,
        headers : {
            'Content-Type': 'application/json',
        }
    }
       
    ).then((response) => {
        return response.json();
    }).catch((error) => {
        console.log(error)
    })
}