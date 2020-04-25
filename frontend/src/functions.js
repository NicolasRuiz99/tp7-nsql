import axios from 'axios';
import Swal from 'sweetalert2';

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

const listAll = () => {
    return axios
        .get("http://localhost:5000/")
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const listMarvel = () => {
    return axios
        .get("http://localhost:5000/marvel")
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const listDC = () => {
    return axios
        .get("http://localhost:5000/dc")
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const deleteItem = (id) => {
    return axios
        .post("http://localhost:5000/delete", {
            id
        })
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const addItem = (item) => {
    return axios
        .post("http://localhost:5000/add", item)
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const modItem = (item) => {
    return axios
        .post("http://localhost:5000/modify", item)
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const search = (name) => {
    return axios
        .post("http://localhost:5000/search", {
            name
        })
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const get = (id) => {
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
    alertConfirm,
    alertError,
    alertSuccess,
    listAll,
    deleteItem,
    modItem,
    listMarvel,
    listDC,
    search,
    get,
    addItem
};