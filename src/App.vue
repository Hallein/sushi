<template>
	<div id="app">
		<Toolbar />
		<Sidebar />
		<Main />
	</div>
</template>

<script>
import Toolbar from "@/components/Toolbar";
import Main from "@/components/Main";
import Sidebar from "@/components/Sidebar";

export default {
	components: {
		Toolbar,
		Main,
		Sidebar
	}
};
</script>


<style>
body {
	background-color: #fafafa;
}
.divider {
	margin: 8px 0 16px;
	width: 10%;
}
.titulo-carta {
	font-size: 32px;
	font-weight: bold;
}
.boton-opciones {
	display: inline-block;
	margin: 0 2px;
}
.opciones {
	text-align: right;
}
.opciones a {
	cursor: pointer;
}
.volver {
	color: #0d47a1 !important;
}
.eliminar {
	color: #b71c1c !important;
}
.guardar {
	color: #689f38 !important;
}
</style>
