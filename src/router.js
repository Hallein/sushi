import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import Productos from './views/Productos.vue'
import VerProducto from './views/VerProducto.vue'
import NuevoProducto from './views/NuevoProducto.vue'
import EditarProducto from './views/EditarProducto.vue'
import Categorias from './views/Categorias.vue'
import NuevaCategoria from './views/NuevaCategoria.vue'
import EditarCategoria from './views/EditarCategoria.vue'
import TiposPedido from './views/TiposPedido.vue'
import NuevoTipoPedido from './views/NuevoTipoPedido.vue'
import EditarTipoPedido from './views/EditarTipoPedido.vue'
import Pedidos from './views/Pedidos.vue'
import NuevoPedido from './views/NuevoPedido.vue'
import VerPedido from './views/VerPedido.vue'
import Pagos from './views/Pagos.vue'
import TiposPago from './views/TiposPago.vue'
import NuevoTipoPago from './views/NuevoTipoPago.vue'
import EditarTipoPago from './views/EditarTipoPago.vue'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{ path: '/', redirect: '/productos' },
		{ path: '/productos', name: 'productos', component: Productos },
		{ path: '/productos/:id', name: 'ver-producto', component: VerProducto },
		{ path: '/productos/nueva', name: 'nuevo-producto', component: NuevoProducto },
		{ path: '/productos/editar/:id', name: 'editar-producto', component: EditarProducto },

		{ path: '/categorias', name: 'categorias', component: Categorias },
		{ path: '/categorias/nueva', name: 'nueva-categoria', component: NuevaCategoria },
		{ path: '/categorias/editar/:id', name: 'editar-categoria', component: EditarCategoria },

		{ path: '/pedidos', name: 'pedidos', component: Pedidos },
		{ path: '/pedidos/nuevo', name: 'nuevo-pedido', component: NuevoPedido },
		{ path: '/pedidos/:id', name: 'ver-pedido', component: VerPedido },
		{ path: '/tipos_pedidos', name: 'tipos-pedido', component: TiposPedido },
		{ path: '/tipos_pedidos/nuevo', name: 'nuevo-tipo-pedido', component: NuevoTipoPedido },
		{ path: '/tipos_pedidos/editar/:id', name: 'editar-tipo-pedido', component: EditarTipoPedido },

		{ path: '/pagos', name: 'pagos', component: Pagos },
		{ path: '/tipos_pagos', name: 'tipos-pago', component: TiposPago },
		{ path: '/tipos_pagos/nuevo', name: 'nuevo-tipo-pago', component: NuevoTipoPago },
		{ path: '/tipos_pagos/editar/:id', name: 'editar-tipo-pago', component: EditarTipoPago },
	]
})

router.beforeEach((to, from, next) => {
	// Verificamos si la sidebar está abierta al momento de cambiar de ruta, si lo está, la cerramos
	if (store.getters.isSidebarOpen) {
		store.dispatch('toggleSidebar')
	}

	next()
})

export default router