<template>
    <div id="ver-producto">
        <div class="row">            
            <div class="col s12 m6 ">

				<div class="card">
					<div class="card-content">
						<span class="titulo-carta" :style="primaryTextColor">{{ producto.nombre_producto }}</span>
                        <span class="subtitle">{{ producto.nombre_categoria_producto }}</span>
                        <p class="descripcion">{{ producto.descripcion_producto }}</p>
                        <div :style="primaryTextColor" class="precio">${{ producto.precio_producto }}</div>
					</div>
                    <div class="opciones card-action">
                        <a class="volver" @click="volver">Volver</a>
                        <a class="editar" @click="editarProducto">Editar</a>
                        <a class="eliminar" @click="eliminarProducto">Eliminar</a>
                    </div>
				</div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductosService from "@/services/ProductosService";

export default {
	data() {
		return {
			id: this.$route.params.id,
			producto: {}
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
		async getProducto() {
			const response = await ProductosService.getProducto(this.id);
			this.producto = response.data;
		},
		volver() {
			this.$router.go(-1);
		},
		editarProducto() {
			this.$router.push({
				name: "editar-producto",
				params: { id: this.id }
			});
		},
		async eliminarProducto() {
			const response = await ProductosService.deleteProducto(this.id);
			if (response) {
				M.toast({ html: "El producto fue eliminado correctamente" });
				this.volver();
			}
		}
	},
	mounted() {
		this.getProducto();
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
.precio {
	margin-top: 16px;
	font-size: 48px;
	font-weight: bold;
	text-align: right;
}
</style>
