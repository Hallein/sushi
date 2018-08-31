<template>
    <div id="editar-categoria">
        <div class="row">            
            <div class="col s12 m8 ">

				<div class="card">
					<div class="card-content">
						<div class="titulo-carta" :style="primaryTextColor">{{ tipo.nombre_tipo_pago }}</div>

                        <div class="input-field">
                            <input id="nombre" type="text" class="validate" v-model="tipo.nombre_tipo_pago">
                            <label for="nombre">Nombre del Tipo de Pago</label>
                        </div>

					</div>                    
                    <div class="opciones card-action">
                        <a class="volver" @click="volver">Cancelar</a>
                        <a class="guardar" @click="guardarTipoPago">Guardar</a>
                    </div>
				</div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PagosService from "@/services/PagosService";

export default {
	data() {
		return {
			id: this.$route.params.id,
			tipo: {}
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
		async getTipoPago() {
			const response = await PagosService.getTipoPago(this.id);
			this.tipo = response.data;
			setTimeout(() => M.updateTextFields(), 100);
		},
		volver() {
			this.$router.go(-1);
		},
		async guardarTipoPago() {
			const response = await PagosService.updateTipoPago(
				this.id,
				this.tipo
			);
			console.log(response);
			M.toast({ html: "Tipo de pago actualizado correctamente" });
			this.volver();
		}
	},
	mounted() {
		this.getTipoPago();
	}
};
</script>
