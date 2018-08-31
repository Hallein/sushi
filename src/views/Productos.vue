<template>
    <div id="productos">
        <div class="row">            
            <div class="col s12 ">

				<div class="card">
					<div class="card-content">
						<span class="titulo-carta" :style="primaryTextColor">PRODUCTOS</span>

                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Descripción</th>
                                <th>Categoría</th>
                                <th>Opciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="producto in productos" :key="producto.id_producto">
                                <td>{{ producto.id_producto }}</td>
                                <td>{{ producto.nombre_producto }}</td>
                                <td>{{ producto.precio_producto }}</td>
                                <td class="tooltipped" 
                                    data-position="top" 
                                    :data-tooltip="producto.descripcion_producto"
                                >
                                    {{ producto.descripcion_producto | truncate(20) }}
                                </td>
                                <td>{{ producto.nombre_categoria_producto }}</td>
                                <td>
                                    <a data-tooltip="Ver" 
                                        data-position="top" 
                                        @click="verProducto(producto.id_producto)"
                                        class="tooltipped boton-opciones btn-floating btn-small waves-effect waves-light blue"
                                    >
                                        <i class="material-icons">exit_to_app</i
                                    ></a>
                                    <a data-tooltip="Editar" 
                                        data-position="top" 
                                        @click="editarProducto(producto.id_producto)"
                                        class="tooltipped boton-opciones btn-floating btn-small waves-effect waves-light yellow"
                                    >
                                        <i class="material-icons">edit</i
                                    ></a>
                                    <a data-tooltip="Eliminar" 
                                        data-position="top" 
                                        @click="eliminarProducto(producto.id_producto)"
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
		
		<Fab ruta="nuevo-producto" :color="primaryColor" />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductosService from "@/services/ProductosService";
import Fab from "@/components/Fab";

export default {
	components: { Fab },
	data() {
		return {
			productos: []
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
		async getProductos() {
			const response = await ProductosService.getProductos();
			this.productos = response.data;
			this.$store.dispatch("initTooltips");
		},
		verProducto(id) {
			this.$store.dispatch("destroyTooltips");
			this.$router.push({ name: "ver-producto", params: { id: id } });
		},
		editarProducto(id) {
			this.$store.dispatch("destroyTooltips");
			this.$router.push({
				name: "editar-producto",
				params: { id: id }
			});
		},
		async eliminarProducto(id) {
			const response = await ProductosService.deleteProducto(id);
			if (response) {
				M.toast({ html: "El producto fue eliminado correctamente" });
				this.getProductos();
			}
		}
	},
	mounted() {
		this.getProductos();
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
