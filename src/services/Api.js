import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: `/proyectos/shine/public`,
        withCredentials: false,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}