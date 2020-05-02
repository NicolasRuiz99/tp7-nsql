import axios from 'axios';
import Swal from 'sweetalert2';

//alert functions

const alertSuccess = () => {
    return Swal.fire(
        'Éxito!',
        'La operación a finalizado correctamente!',
        'success'
    )
}

const alertError = () => {
    return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Ocurrió un fallo!'
    })
}

const alertConfirm = () => {
    return Swal.fire({
        title: 'Confirmar operación',
        text: "Los cambios serán irreversibles!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
    })
}

//backend request functions

const herolistAll = () => {
    return axios
        .get("http://localhost:5000/hero")
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const movielistAll = () => {
    return axios
        .get("http://localhost:5000/movie")
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const herolistMarvel = () => {
    return axios
        .get("http://localhost:5000/hero/marvel")
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const herolistDC = () => {
    return axios
        .get("http://localhost:5000/hero/dc")
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const deleteItem = (id) => {
    return axios
        .post("http://localhost:5000/hero/delete", {
            id
        })
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const heroaddItem = (item) => {
    return axios
        .post("http://localhost:5000/hero/add", item)
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const movieaddItem = (item) => {
    return axios
        .post("http://localhost:5000/movie/add", item)
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const modItem = (item) => {
    return axios
        .post("http://localhost:5000/hero/modify", item)
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const heroget = (id) => {
    return axios
        .post("http://localhost:5000/hero/get", {
            id
        })
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const movieget = (id) => {
    return axios
        .post("http://localhost:5000/movie/get", {
            id
        })
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const upload = (formData) => {
    return axios({
            method: 'post',
            url: 'http://localhost:5000/upload',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

//API functions

const searchAPImovie = (query) => {
    return axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=6219c1b0835cb6191273f70128265f35&query=${query}`)
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const getAPImovieCast = (id) => {
    return axios
        .get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=6219c1b0835cb6191273f70128265f35`)
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

export {
    alertConfirm,
    alertError,
    alertSuccess,
    herolistAll,
    deleteItem,
    modItem,
    herolistMarvel,
    herolistDC,
    heroget,
    heroaddItem,
    upload,
    movieaddItem,
    searchAPImovie,
    getAPImovieCast,
    movielistAll,
    movieget
};