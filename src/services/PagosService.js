import Api from '@/services/Api'

export default {
    // Pedidos
    getPagos() {
        return Api().get('/pagos')
    },
    getPago(id) {
        return Api().get('/pagos/' + id)
    },
    nuevoPago(data) {
        return Api().post('/pagos', data)
    },
    updatePago(id, data) {
        return Api().put('/pagos/' + id, data)
    },
    deletePago(id) {
        return Api().delete('/pagos/' + id)
    },

    // Tipos de Pago
    getTiposPago() {
        return Api().get('/tipos_pagos')
    },
    getTipoPago(id) {
        return Api().get('/tipos_pagos/' + id)
    },
    nuevoTipoPago(data) {
        return Api().post('/tipos_pagos', data)
    },
    updateTipoPago(id, data) {
        return Api().put('/tipos_pagos/' + id, data)
    },
    deleteTipoPago(id) {
        return Api().delete('/tipos_pagos/' + id)
    }
}