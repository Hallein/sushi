import Api from '@/services/Api'

export default {
    getProductos() {
        return Api().get('/productos')
    },
    getProducto(id) {
        return Api().get('/productos/' + id)
    },
    nuevoProducto(data) {
        return Api().post('/productos', data)
    },
    updateProducto(id, data) {
        return Api().put('/productos/' + id, data)
    },
    deleteProducto(id) {
        return Api().delete('/productos/' + id)
    }
}