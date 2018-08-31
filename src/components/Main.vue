<template>
    <main class="dimensions">
		<router-view />
	</main>
</template>

<style scoped>
main {
	background-color: #fafafa;
	box-sizing: border-box;
	transition: margin-left 0.2s ease;
}
.dimensions {
	min-height: calc(100vh - 70px);
	margin-left: 260px;
	margin-top: 70px;
	padding: 20px;
}
@media only screen and (max-width: 768px) {
	.dimensions {
		margin-left: 0;
	}
}
</style>


