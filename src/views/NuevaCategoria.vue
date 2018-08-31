<template>
    <div id="nueva-categoria">
        <div class="row">            
            <div class="col s12 m8 ">

				<div class="card">
					<div class="card-content">
						<div class="titulo-carta" :style="primaryTextColor">Nueva categoría</div>

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
			categoria: {
				nombre_categoria_producto: null
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
		async guardarCategoria() {
			const response = await CategoriasService.nuevaCategoria(
				this.categoria
			);
			console.log(response);
			M.toast({ html: "Categoría creada correctamente" });
			this.volver();
		}
	}
};
</script>
