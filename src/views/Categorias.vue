<template>
    <div id="categorias">
        <div class="row">            
            <div class="col s12 m6">

				<div class="card">
					<div class="card-content">
						<span class="titulo-carta" :style="primaryTextColor">Categorías de producto</span>

                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Opciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="categoria in categorias" :key="categoria.id_categoria_producto">
                                <td>{{ categoria.id_categoria_producto }}</td>
                                <td>{{ categoria.nombre_categoria_producto }}</td>
                                <td>
                                    <a data-tooltip="Editar" 
                                        data-position="top" 
                                        @click="editarCategoria(categoria.id_categoria_producto)"
                                        class="tooltipped boton-opciones btn-floating btn-small waves-effect waves-light yellow"
                                    >
                                        <i class="material-icons">edit</i
                                    ></a>
                                    <a data-tooltip="Eliminar" 
                                        data-position="top" 
                                        @click="eliminarCategoria(categoria.id_categoria_producto)"
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

		<Fab ruta="nueva-categoria" :color="primaryColor" />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import CategoriasService from "@/services/CategoriasService";
import Fab from "@/components/Fab";

export default {
	components: { Fab },
	data() {
		return {
			categorias: []
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
		async getCategorias() {
			const response = await CategoriasService.getCategorias();
			this.categorias = response.data;
			this.$store.dispatch("initTooltips");
		},
		editarCategoria(id) {
			this.$store.dispatch("destroyTooltips");
			this.$router.push({
				name: "editar-categoria",
				params: { id: id }
			});
		},
		async eliminarCategoria(id) {
			const response = await CategoriasService.deleteCategoria(id);
			if (response.data) {
				this.$store.dispatch("destroyTooltips");
				this.getCategorias();
				M.toast({ html: "Categoría eliminada correctamente" });
			} else {
				M.toast({
					html:
						"No se puede eliminar la categoría, tiene productos asociados"
				});
			}
		}
	},
	mounted() {
		this.getCategorias();
	}
};
</script>
