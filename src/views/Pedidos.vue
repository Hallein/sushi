<template>
    <div id="pedidos">
        <div class="row">            
            <div class="col s12 ">

				<div class="card">
					<div class="card-content">
						<span class="titulo-carta" :style="primaryTextColor">PEDIDOS</span>

                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>comentario</th>
                                <th>Total</th>
                                <th>Opciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="pedido in pedidos" :key="pedido.id_pedido">
                                <td>{{ pedido.id_pedido }}</td>
                                <td>{{ pedido.nombre_contacto }}</td>
                                <td>{{ pedido.telefono_contacto }}</td>
                                <td>{{ pedido.comentario_pedido }}</td>
                                <td>${{ pedido.monto_total }}</td>
                                <td>
                                    <a data-tooltip="Ver" 
                                        data-position="top" 
                                        @click="verPedido(pedido.id_pedido)"
                                        class="tooltipped boton-opciones btn-floating btn-small waves-effect waves-light blue"
                                    >
                                        <i class="material-icons">exit_to_app</i
                                    ></a>
                                    <a data-tooltip="Editar" 
                                        data-position="top" 
                                        @click="EditarPedido(pedido.id_pedido)"
                                        class="tooltipped boton-opciones btn-floating btn-small waves-effect waves-light yellow"
                                    >
                                        <i class="material-icons">edit</i
                                    ></a>
                                    <a data-tooltip="Eliminar" 
                                        data-position="top" 
                                        @click="eliminarPedido(pedido.id_pedido)"
                                        class="tooltipped boton-opciones btn-floating btn-small waves-effect waves-light red"
                                    >
                                        <i class="material-icons">delete</i
                                    ></a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        
					</div>
				</div>

            </div>
        </div>
		
		<Fab ruta="nuevo-pedido" :color="primaryColor" />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PedidosService from "@/services/PedidosService";
import Fab from "@/components/Fab";

export default {
	components: { Fab },
	data() {
		return {
			pedidos: []
		};
	},
	computed: {
		...mapGetters([
			"primaryColor",
			"primaryColorLight",
			"primaryTextColor",
			"user"
		])
	},
	methods: {
		async getPedidos() {
			const response = await PedidosService.getPedidos();
			this.pedidos = response.data;
			this.$store.dispatch("initTooltips");
		},
		verPedido(id) {
			this.$store.dispatch("destroyTooltips");
			this.$router.push({ name: "ver-pedido", params: { id: id } });
		},
		EditarPedido(id) {
			this.$store.dispatch("destroyTooltips");
			this.$router.push({
				name: "editar-pedido",
				params: { id: id }
			});
		},
		async eliminarPedido(id) {
			const response = await PedidosService.deletePedido(id);
			if (response) {
				M.toast({ html: "El pedido fue eliminado correctamente" });
				this.getPedidos();
			}
		}
	},
	mounted() {
		this.getPedidos();
	},
	filters: {
		truncate(text, stop, clamp) {
			return (
				text.slice(0, stop) + (stop < text.length ? clamp || "..." : "")
			);
		}
	}
};
</script>

<style scoped>
</style>
