<template>
    <div id="ver-pedido">
        <div class="row">            
            <div class="col s12 m6 ">

				<div class="card">
					<div class="card-content">
						<span class="titulo-carta" :style="primaryTextColor">Pedido de {{ pedido.nombre_contacto }}</span>
                        <span class="subtitle">{{ pedido.nombre_tipo_pedido }}</span>
                        <p class="descripcion"><span :style="primaryTextColor">Teléfono:</span> {{ pedido.telefono_contacto }}</p>
                        <p class="descripcion"><span :style="primaryTextColor">Dirección:</span> {{ pedido.direccion_contacto }}</p>
                        <h5 :style="primaryTextColor">Detalle del pedido</h5>
                        <hr>
                        <ul class="collection">
                            <li class="collection-item" 
                                v-for="(producto, index) in pedido.detalles" 
                                :key="index"
                            >
                                <span class="cantidad">{{ producto.cantidad_producto }} x</span> {{ producto.nombre_producto }}
                                <span class="secondary-content">${{ producto.monto_detalle }}</span>
                            </li>
                        </ul>
                        <hr>
                        <div :style="primaryTextColor" class="precio">${{ pedido.monto_total }}</div>
					</div>
				</div>
                
            </div>
            <div class="col s12 m6">
                <div class="card">
					<div class="card-content">
						<span class="titulo-carta" :style="primaryTextColor">Estado del pago:</span>
                        <div :class="estiloEstadoPedido">{{ estadoPedido }}</div>
					</div>
                    <div class="opciones card-action">
                        <a class="volver" @click="volver">Volver</a>
                        <a class="editar" @click="editarPedido">Hacer pago</a>
                        <a class="eliminar" @click="eliminarPedido">Eliminar</a>
                    </div>
				</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PedidosService from "@/services/PedidosService";

export default {
	data() {
		return {
			id: this.$route.params.id,
			pedido: {}
		};
	},
	computed: {
		...mapGetters([
			"primaryColor",
			"primaryColorLight",
			"primaryTextColor",
			"user"
		]),
		estadoPedido() {
			return this.pedido.pagos > 0 ? "Pagado" : "Pendiente";
		},
		estiloEstadoPedido() {
			return {
				pendiente: this.pedido.pagos == 0,
				pagado: this.pedido.pagos > 0,
				pago: true
			};
		}
	},
	methods: {
		async getPedido() {
			const response = await PedidosService.getPedido(this.id);
			this.pedido = response.data;
			console.log(this.pedido);
		},
		volver() {
			this.$router.go(-1);
		},
		editarPedido() {
			// this.$router.push({
			// 	name: "editar-pedido",
			// 	params: { id: this.id }
			// });
		},
		async eliminarPedido() {
			// const response = await PedidosService.deletePedido(this.id);
			// if (response) {
			// 	M.toast({ html: "El pedido fue eliminado correctamente" });
			// 	this.volver();
			// } else {
			// 	M.toast({ html: "No se pudo eliminar el pedido" });
			// }
		}
	},
	mounted() {
		this.getPedido();
	},
	filters: {}
};
</script>

<style scoped>
.descripcion {
	font-size: 16px;
}
.subtitle {
	display: inline-block;
	margin-left: 8px;
	font-size: 16px;
	color: #9e9e9e;
}
.precio,
.pago {
	margin-top: 16px;
	font-size: 48px;
	font-weight: bold;
	text-align: right;
}
.pendiente {
	color: #b71c1c;
}
.pagado {
	color: #689f38;
}
.cancelado {
	color: #bdbdbd;
}
</style>
