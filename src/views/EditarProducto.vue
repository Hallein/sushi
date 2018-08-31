<template>
    <div id="editar-producto">
        <div class="row">            
            <div class="col s12 m8 ">

				<div class="card">
					<div class="card-content">
						<div class="titulo-carta" :style="primaryTextColor">{{ producto.nombre_producto }}</div>

                        <div class="input-field">
                            <input id="nombre" type="text" class="validate" v-model="producto.nombre_producto">
                            <label for="nombre">Nombre del producto</label>
                        </div>
                        <div class="row">
                            <div class="input-field col s12 m6">
                                <input id="precio" type="text" class="validate" v-model="producto.precio_producto">
                                <label for="precio">Precio</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <select v-model="producto.id_categoria_producto">
                                    <option 
                                        v-for="categoria in categorias" 
                                        :key="categoria.id_categoria_producto"
										:value="categoria.id_categoria_producto" 
                                        :selected="categoria.id_categoria_producto == producto.id_categoria_producto"
                                    >{{ categoria.nombre_categoria_producto }}
                                    </option>
                                </select>
                                <label>Categoría</label>
                            </div>
                        </div>
                        <div class="input-field">
                            <textarea id="descripcion" class="materialize-textarea" v-model="producto.descripcion_producto"></textarea>
                            <label for="descripcion">Descripción</label>
                        </div>
					</div>                    
                    <div class="opciones card-action">
                        <a class="volver" @click="volver">Cancelar</a>
                        <a class="guardar" @click="guardarProducto">Guardar</a>
                    </div>
				</div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import CategoriasService from "@/services/CategoriasService";
import ProductosService from "@/services/ProductosService";

export default {
	data() {
		return {
			id: this.$route.params.id,
			producto: {},
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
		async getProducto() {
			const response = await ProductosService.getProducto(this.id);
			this.producto = response.data;
			setTimeout(() => {
				const descripcion = document.getElementById("descripcion");
				M.textareaAutoResize(descripcion);
				M.updateTextFields();
				this.getCategorias();
			}, 100);
		},
		async getCategorias() {
			const response = await CategoriasService.getCategorias();
			this.categorias = response.data;
			setTimeout(() => {
				var elems = document.querySelectorAll("select");
				var instances = M.FormSelect.init(elems, {});
			}, 100);
		},
		volver() {
			this.$router.go(-1);
		},
		async guardarProducto() {
			this.producto.fk_categoria_producto = this.producto.id_categoria_producto;
			const response = await ProductosService.updateProducto(
				this.id,
				this.producto
			);
			if (response) {
				M.toast({ html: "El producto fue actualizado correctamente" });
				this.volver();
			}
		}
	},
	mounted() {
		this.getProducto();
	}
};
</script>
