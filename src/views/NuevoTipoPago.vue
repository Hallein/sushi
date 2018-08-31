<template>
    <div id="nueva-categoria">
        <div class="row">            
            <div class="col s12 m8 ">

				<div class="card">
					<div class="card-content">
						<div class="titulo-carta" :style="primaryTextColor">Nuevo Tipo de pago</div>

                        <div class="input-field">
                            <input id="nombre" type="text" class="validate" v-model="tipo.nombre_tipo_pago">
                            <label for="nombre">Nombre del Tipo de pago</label>
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
			tipo: {
				nombre_tipo_pago: null
			}
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
		volver() {
			this.$router.go(-1);
		},
		async guardarTipoPago() {
			const response = await PagosService.nuevoTipoPago(this.tipo);
			M.toast({ html: "Tipo de pago creado correctamente" });
			this.volver();
		}
	}
};
</script>
