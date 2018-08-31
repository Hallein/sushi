<template>
    <div id="tipos-pedido">
        <div class="row">            
            <div class="col s12 m6">

				<div class="card">
					<div class="card-content">
						<span class="titulo-carta" :style="primaryTextColor">Tipos de pago</span>

                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Opciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="tipo in tipos" :key="tipo.id_tipo_pago">
                                <td>{{ tipo.id_tipo_pago }}</td>
                                <td>{{ tipo.nombre_tipo_pago }}</td>
                                <td>
                                    <a data-tooltip="Editar" 
                                        data-position="top" 
                                        @click="editarTipoPago(tipo.id_tipo_pago)"
                                        class="tooltipped boton-opciones btn-floating btn-small waves-effect waves-light yellow"
                                    >
                                        <i class="material-icons">edit</i
                                    ></a>
                                    <a data-tooltip="Eliminar" 
                                        data-position="top" 
                                        @click="eliminarTipoPago(tipo.id_tipo_pago)"
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

		<Fab ruta="nuevo-tipo-pago" :color="primaryColor" />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PagosService from "@/services/PagosService";
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
		async getTiposPago() {
			const response = await PagosService.getTiposPago();
			this.tipos = response.data;
			this.$store.dispatch("initTooltips");
		},
		editarTipoPago(id) {
			this.$store.dispatch("destroyTooltips");
			this.$router.push({
				name: "editar-tipo-pago",
				params: { id: id }
			});
		},
		async eliminarTipoPago(id) {
			const response = await PagosService.deleteTipoPago(id);
			if (response.data) {
				this.$store.dispatch("destroyTooltips");
				this.getTiposPago();
				M.toast({ html: "Tipo de pago eliminado correctamente" });
			} else {
				M.toast({
					html:
						"No se puede eliminar el tipo de pago, tiene pagos asociados"
				});
			}
		}
	},
	mounted() {
		this.getTiposPago();
	}
};
</script>
