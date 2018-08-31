import Api from '@/services/Api'

export default {
    getCategorias() {
        return Api().get('/categorias_productos')
    },
    getCategoria(id) {
        return Api().get('/categorias_productos/' + id)
    },
    nuevaCategoria(data) {
        return Api().post('/categorias_productos', data)
    },
    updateCategoria(id, data) {
        return Api().put('/categorias_productos/' + id, data)
    },
    deleteCategoria(id) {
        return Api().delete('/categorias_productos/' + id)
    }
}