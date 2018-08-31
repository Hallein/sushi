import Api from '@/services/Api'

export default {
    // Pedidos
    getPedidos() {
        return Api().get('/pedidos')
    },
    getPedido(id) {
        return Api().get('/pedidos/' + id)
    },
    nuevoPedido(data) {
        return Api().post('/pedidos', data)
    },
    updatePedido(id, data) {
        return Api().put('/pedidos/' + id, data)
    },
    deletePedido(id) {
        return Api().delete('/pedidos/' + id)
    },

    // Tipos de pedido
    getTiposPedido() {
        return Api().get('/tipos_pedidos')
    },
    getTipoPedido(id) {
        return Api().get('/tipos_pedidos/' + id)
    },
    nuevoTipoPedido(data) {
        return Api().post('/tipos_pedidos', data)
    },
    updateTipoPedido(id, data) {
        return Api().put('/tipos_pedidos/' + id, data)
    },
    deleteTipoPedido(id) {
        return Api().delete('/tipos_pedidos/' + id)
    }
}