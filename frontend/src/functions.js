import axios from 'axios';

const listAll = async() => {
    return axios
        .get("http://localhost:5000/")
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const listMarvel = async() => {
    return axios
        .get("http://localhost:5000/marvel")
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const listDC = async() => {
    return axios
        .get("http://localhost:5000/dc")
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const deleteItem = async(rank) => {
    return axios
        .post("http://localhost:5000/delete", {
            rank
        })
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const search = async(name) => {
    return axios
        .post("http://localhost:5000/search", {
            name
        })
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const get = async(id) => {
    return axios
        .post("http://localhost:5000/get", {
            id
        })
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

export {
    listAll,
    deleteItem,
    listMarvel,
    listDC,
    search,
    get
};