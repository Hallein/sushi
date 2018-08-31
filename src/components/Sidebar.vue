<template>
    <aside :class="{ active: isSidebarOpen }">
		<ul>
			<router-link tag="li" :to="{ name: 'productos' }">
				<i class="fa fa-lg fa-user" aria-hidden="true"></i>
				<span>Productos</span>
			</router-link>
			<router-link tag="li" :to="{ name: 'pedidos' }">
				<i class="fa fa-lg fa-user" aria-hidden="true"></i>
				<span>Pedidos</span>
			</router-link>
			<router-link tag="li" :to="{ name: 'categorias' }">
				<i class="fa fa-lg fa-user" aria-hidden="true"></i>
				<span>Categorías</span>
			</router-link>
			<router-link tag="li" :to="{ name: 'tipos-pedido' }">
				<i class="fa fa-lg fa-user" aria-hidden="true"></i>
				<span>Tipos de pedido</span>
			</router-link>
			<router-link tag="li" :to="{ name: 'tipos-pago' }">
				<i class="fa fa-lg fa-user" aria-hidden="true"></i>
				<span>Tipos de pagos</span>
			</router-link>
		</ul>
	</aside>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	computed: {
		...mapGetters([
			"primaryColor",
			"primaryColorLight",
			"primaryTextColor",
			"isSidebarOpen",
			"isLogged"
		])
	}
};
</script>

<style scoped>
aside {
	background-color: #fff;
	position: fixed;
	top: 70px;
	left: 0;
	bottom: 0;
	width: 260px;
	color: #424242;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25), 0 4px 8px rgba(0, 0, 0, 0.15);
	z-index: 5;
	transition: left 0.2s ease;
}
aside ul {
	padding: 10px;
	margin: 0;
	list-style-type: none;
}
aside ul li {
	padding: 16px 20px;
	background-color: #fff;
	transition: all ease 0.1s;
	border-radius: 2px;
	box-shadow: none;
	position: relative;
	z-index: 1;
	cursor: pointer;
}
aside ul li.router-link-active {
	color: #fff;
	z-index: 10;
	/* background-color: #9c27b0; */
	/* background-color: #734b6d; */
	background-color: #558b2f;
	box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
		0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
}
/* aside ul li:last-child {
	border-top: 1px solid rgba(0, 0, 0, 0.15);
} */
aside ul li i {
	padding-right: 10px;
}
@media only screen and (max-width: 768px) {
	aside {
		left: -260px;
	}
	aside.active {
		left: 0;
	}
}
</style>

