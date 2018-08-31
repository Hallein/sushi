<template>
    <div id="tipos-pedido">
        <div class="row">            
            <div class="col s12 m6">

				<div class="card">
					<div class="card-content">
						<span class="titulo-carta" :style="primaryTextColor">Tipos de pedido</span>

                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Opciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="tipo in tipos" :key="tipo.id_tipo_pedido">
                                <td>{{ tipo.id_tipo_pedido }}</td>
                                <td>{{ tipo.nombre_tipo_pedido }}</td>
                                <td>
                                    <a data-tooltip="Editar" 
                                        data-position="top" 
                                        @click="editarTipoPedido(tipo.id_tipo_pedido)"
                                        class="tooltipped boton-opciones btn-floating btn-small waves-effect waves-light yellow"
                                    >
                                        <i class="material-icons">edit</i
                                    ></a>
                                    <a data-tooltip="Eliminar" 
                                        data-position="top" 
                                        @click="eliminarTipoPedido(tipo.id_tipo_pedido)"
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

		<Fab ruta="nuevo-tipo-pedido" :color="primaryColor" />
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
			tipos: []
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
		async getTiposPedido() {
			const response = await PedidosService.getTiposPedido();
			this.tipos = response.data;
			this.$store.dispatch("initTooltips");
		},
		editarTipoPedido(id) {
			this.$store.dispatch("destroyTooltips");
			this.$router.push({
				name: "editar-tipo-pedido",
				params: { id: id }
			});
		},
		async eliminarTipoPedido(id) {
			const response = await PedidosService.deleteTipoPedido(id);
			if (response.data) {
				this.$store.dispatch("destroyTooltips");
				this.getTiposPedido();
				M.toast({ html: "Tipo de pedido eliminado correctamente" });
			} else {
				M.toast({
					html:
						"No se puede eliminar el tipo de pedido, tiene pedidos asociados"
				});
			}
		}
	},
	mounted() {
		this.getTiposPedido();
	}
};
</script>
