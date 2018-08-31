<template>
    <header :style="primaryColor">
		<div class="hamburger" @click="toggleSidebar">
			<div :class="{ toggle: true, active: isSidebarOpen }"></div>
		</div>		
		<h5>Shine Sushi - Alto Hospicio</h5>	
		<div class="user">
			<div class="username">{{ user }}</div>
			<img src="@/assets/user.png" alt="Avatar">
		</div>		
	</header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
	data() {
		return {
			toggle: true
		};
	},
	computed: {
		...mapGetters([
			"primaryColor",
			"primaryColorLight",
			"primaryTextColor",
			"user",
			"isSidebarOpen"
		])
	},
	methods: {
		...mapActions(["toggleSidebar"])
	}
};
</script>

<style scoped>
header {
	height: 70px;
	background-color: red;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25), 0 4px 8px rgba(0, 0, 0, 0.15);
	z-index: 10;
	box-sizing: border-box;
	padding: 10px 30px;
	line-height: 50px;
	color: #212121;
	background-color: #fff;
}
header h5 {
	margin: 0;
	display: inline-block;
	vertical-align: middle;
	color: #fff;
}
.hamburger {
	width: 26px;
	height: 26px;
	display: inline-block;
	vertical-align: middle;
	margin-right: 20px;
	cursor: pointer;
	display: none;
}
.toggle {
	width: 26px;
	height: 3px;
	/* background-color: #424242; */
	background-color: #fff;
	position: relative;
	top: 12px;
	transition: transform 0.2s ease;
	border-radius: 2px;
}
.toggle::before {
	content: "";
	display: inline-block;
	width: 26px;
	height: 3px;
	/* background-color: #424242; */
	background-color: #fff;
	position: absolute;
	top: -8px;
	transition: top 0.2s ease, transform 0.2s ease;
	border-radius: 2px;
}
.toggle::after {
	content: "";
	display: inline-block;
	width: 26px;
	height: 3px;
	/* background-color: #424242; */
	background-color: #fff;
	position: absolute;
	bottom: -8px;
	transition: bottom 0.2s ease;
	border-radius: 2px;
}
.toggle.active {
	transform: rotate(45deg);
}
.toggle.active::before {
	top: 0;
	transform: rotate(-90deg);
}
.toggle.active::after {
	bottom: 0;
}
.user {
	display: inline-block;
	vertical-align: middle;
	max-height: 50px;
	float: right;
	cursor: pointer;
}
.user img {
	max-height: 50px;
	vertical-align: top;
	margin-left: 10px;
}
.user .username {
	display: inline-block;
	vertical-align: top;
	color: #fff;
}
@media only screen and (max-width: 768px) {
	header {
		padding: 10px;
	}
	.user {
		display: none;
	}
	.hamburger {
		display: inline-block;
		margin-right: 10px;
	}
}
</style>

