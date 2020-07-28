import axios from 'axios';

export default function axiosWithAuth () {
    const token = window.localStorage.getItem('token')

    return axios.create({
        headers: {
            authorization: token
        },
        baseURL: 'https://secret-family-recipes-703.herokuapp.com/api'
    })
}