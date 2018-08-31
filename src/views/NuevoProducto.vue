<template>
    <div id="nuevo-producto">
        <div class="row">            
            <div class="col s12 m8 ">

				<div class="card">
					<div class="card-content">
						<div class="titulo-carta" :style="primaryTextColor">Nuevo producto</div>

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
                                <select v-model="producto.fk_categoria_producto">
                                    <option 
                                        v-for="categoria in categorias" 
                                        :key="categoria.id_categoria_producto"
										:value="categoria.id_categoria_producto"
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
		async getCategorias() {
			const response = await CategoriasService.getCategorias();
			this.categorias = response.data;
			this.initInputs();
		},
		volver() {
			this.$router.go(-1);
		},
		async guardarProducto() {
			const response = await ProductosService.nuevoProducto(
				this.producto
			);
			M.toast({ html: "Producto creado correctamente" });
			this.volver();
		},
		initInputs() {
			setTimeout(() => {
				const descripcion = document.getElementById("descripcion");
				M.textareaAutoResize(descripcion);
				M.updateTextFields();
				var elems = document.querySelectorAll("select");
				var instances = M.FormSelect.init(elems, {});
			}, 100);
		}
	},
	mounted() {
		this.getCategorias();
	}
};
</script>
