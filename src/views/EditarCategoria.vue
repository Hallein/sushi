<template>
    <div id="editar-categoria">
        <div class="row">            
            <div class="col s12 m8 ">

				<div class="card">
					<div class="card-content">
						<div class="titulo-carta" :style="primaryTextColor">{{ categoria.nombre_categoria_producto }}</div>

                        <div class="input-field">
                            <input id="nombre" type="text" class="validate" v-model="categoria.nombre_categoria_producto">
                            <label for="nombre">Nombre de la categoría</label>
                        </div>

					</div>                    
                    <div class="opciones card-action">
                        <a class="volver" @click="volver">Cancelar</a>
                        <a class="guardar" @click="guardarCategoria">Guardar</a>
                    </div>
				</div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import CategoriasService from "@/services/CategoriasService";

export default {
	data() {
		return {
			id: this.$route.params.id,
			categoria: {}
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
		async getCategoria() {
			const response = await CategoriasService.getCategoria(this.id);
			this.categoria = response.data;
			setTimeout(() => M.updateTextFields(), 100);
		},
		volver() {
			this.$router.go(-1);
		},
		async guardarCategoria() {
			const response = await CategoriasService.updateCategoria(
				this.id,
				this.categoria
			);
			console.log(response);
			M.toast({ html: "Categoría actualizada correctamente" });
		}
	},
	mounted() {
		this.getCategoria();
	}
};
</script>
