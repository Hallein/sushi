<template>
    <div id="nuevo-pedido">
        <div class="row">            
            <div class="col s12">

				<div class="card">
					<div class="card-content">
						<div class="row">
							<!-- Pedido -->
							<div class="col s12 m6">
								<div class="titulo-carta" :style="primaryTextColor">Datos del pedido</div>

								<div class="row">
									<div class="input-field col s8">
										<select v-model="producto_seleccionado">
											<option 
												v-for="producto in productos" 
												:key="producto.id_producto"
												:value="producto.id_producto"
											>{{ producto.nombre_producto }}
											</option>
										</select>
										<label>Productos</label>
									</div>
									<div class="boton-agregar col s3">
										<button @click="agregarProducto" class="btn btn-small green">Agregar</button>
									</div>
								</div>
								<!-- Detalle pedido -->
								<span :style="primaryTextColor" class="total">TOTAL ${{ total }}</span>
									
								<br><br>
								<div class="row">
									<div class="col s11">
										<ul class="collection">
											<li class="collection-item" 
												v-for="(producto, index) in pedido.productos" 
												:key="index"
											>
												<span class="cantidad">{{ producto.cantidad_producto }} x</span> {{ producto.nombre_producto }}
												<a @click="quitarUnidad(producto)" class="agregar-unidad secondary-content"><i class="material-icons">remove</i></a>
												<a @click="agregarUnidad(producto)" class="agregar-unidad secondary-content"><i class="material-icons">add</i></a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<!-- Contacto -->
							<div class="col s12 m6">
								<div class="titulo-carta" :style="primaryTextColor">Datos de contacto</div>

								<div class="row">
									<div class="input-field col s12 m6">
										<input id="nombre" type="text" class="validate" v-model="pedido.nombre_contacto">
										<label for="nombre">Nombre del cliente</label>
									</div>
									<div class="input-field col s12 m6">
										<input id="telefono" type="text" class="validate" v-model="pedido.telefono_contacto">
										<label for="telefono">Telefono</label>
									</div>
									<div class="input-field col s12">
										<input id="direccion" type="text" class="validate" v-model="pedido.direccion_contacto">
										<label for="direccion">Dirección</label>
									</div>
								</div>
								<div class="row">
									<div class="input-field col s12">
										<select v-model="pedido.id_tipo_pedido">
											<option 
												v-for="tipo in tipos" 
												:key="tipo.id_tipo_pedido"
												:value="tipo.id_tipo_pedido"
											>{{ tipo.nombre_tipo_pedido }}
											</option>
										</select>
										<label>Tipo de pedido</label>
									</div>
								</div>
								<div class="input-field">
									<textarea id="comentario" class="materialize-textarea" v-model="pedido.comentario_pedido"></textarea>
									<label for="comentario">Comentario</label>
								</div>
							</div>
						</div>
					</div>  

                    <div class="opciones card-action">
                        <a class="volver" @click="volver">Cancelar</a>
                        <a class="guardar" @click="guardarPedido">Guardar</a>
                    </div>
				</div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PedidosService from "@/services/PedidosService";
import ProductosService from "@/services/ProductosService";

export default {
	data() {
		return {
			producto_seleccionado: null,
			pedido: {
				nombre_contacto: null,
				telefono_contacto: null,
				direccion_contacto: null,
				monto_total: 0,
				productos: []
			},
			productos: [],
			tipos: []
		};
	},
	computed: {
		...mapGetters([
			"primaryColor",
			"primaryColorLight",
			"primaryTextColor",
			"user"
		]),
		total() {
			return this.pedido.productos.reduce((anterior, actual, indice) => {
				return anterior + actual.monto_detalle;
			}, 0);
		}
	},
	methods: {
		agregarProducto() {
			const productoYaExiste = this.pedido.productos.find(
				producto => producto.id_producto == this.producto_seleccionado
			);
			// Si no lo encuentra, lo agrega a la lista (nuevo producto)
			if (!productoYaExiste) {
				let nuevo_producto = this.productos.find(
					producto =>
						producto.id_producto == this.producto_seleccionado
				);
				nuevo_producto.cantidad_producto = 1;
				nuevo_producto.monto_detalle = parseInt(
					nuevo_producto.precio_producto
				);
				this.pedido.productos.push(nuevo_producto);
			}
		},
		agregarUnidad(producto) {
			const lista = this.pedido.productos.map(prod => {
				if (prod.id_producto == producto.id_producto) {
					prod.cantidad_producto++;
					prod.monto_detalle = this.calcularMonto(
						producto.precio_producto,
						prod.cantidad_producto
					);
				}
				return prod;
			});
			this.pedido.productos = lista;
		},
		quitarUnidad(producto) {
			let lista = this.pedido.productos.map(prod => {
				if (prod.id_producto == producto.id_producto) {
					prod.cantidad_producto--;
					prod.monto_detalle = this.calcularMonto(
						producto.precio_producto,
						prod.cantidad_producto
					);
				}
				return prod;
			});
			lista = this.revisarProductosSinCantidad(lista);
			this.pedido.productos = lista;
		},
		calcularMonto(precio, cantidad) {
			return parseInt(precio) * parseInt(cantidad);
		},
		revisarProductosSinCantidad(lista) {
			return lista.filter(producto => {
				return producto.cantidad_producto > 0;
			});
		},
		async getProductos() {
			const response = await ProductosService.getProductos();
			this.productos = response.data;
			this.producto_seleccionado =
				this.productos.length > 0
					? this.productos[0].id_producto
					: null;
			this.initInputs();
		},
		async getTipoPedidos() {
			const response = await PedidosService.getTiposPedido();
			this.tipos = response.data;
			this.initInputs();
		},
		volver() {
			this.$router.go(-1);
		},
		async guardarPedido() {
			this.pedido.monto_total = this.total;
			const response = await PedidosService.nuevoPedido(this.pedido);
			M.toast({ html: "Pedido creado correctamente" });
			this.volver();
		},
		initInputs() {
			setTimeout(() => {
				const comentario = document.getElementById("comentario");
				M.textareaAutoResize(comentario);
				M.updateTextFields();
				var elems = document.querySelectorAll("select");
				var instances = M.FormSelect.init(elems, {});
			}, 100);
		}
	},
	mounted() {
		this.getProductos();
		this.getTipoPedidos();
	}
};
</script>

<style scoped>
.agregar-unidad {
	cursor: pointer;
}
.boton-agregar {
	margin-top: 24px;
}
.total {
	text-align: right;
	font-size: 20px;
	font-weight: bold;
}
</style>
