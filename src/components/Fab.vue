<template>
    <router-link 
			:to="{ name: ruta }"  
			class="fab-button btn-floating btn-large waves-effect waves-light"
			:style="color"
		>
			<i class="material-icons">add</i>
		</router-link>
</template>

<script>
export default { 
	props: ["ruta", "color"]
};
</script>


<style scoped>
.fab-button {
	position: fixed;
	bottom: 30px;
	right: 30px;
}
</style>

