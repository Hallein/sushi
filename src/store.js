import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		primaryColor: '#558B2F',
		primaryColorLight: '#C5E1A5',
		username: 'Administrador',
		isSidebarOpen: false,
		isLoading: false,
	},
	mutations: {
		toggleSidebar(state) {
			state.isSidebarOpen = !state.isSidebarOpen
		},
		toggleLoading(state) {
			state.isLoading = !state.isLoading
		},
	},
	actions: {
		toggleSidebar({ commit }) {
			commit('toggleSidebar')
		},
		toggleLoading({ commit }) {
			commit('toggleLoading')
		},
		initTooltips({ commit }) {
			setTimeout(() => {
				const elems = document.querySelectorAll(".tooltipped");
				const instances = M.Tooltip.init(elems, {});
			}, 100);
		},
		destroyTooltips({ commit }) {
			const elems = document.querySelectorAll(".tooltipped");
			elems.forEach(elem => {
				const instance = M.Tooltip.getInstance(elem);
				instance.destroy();
			});
		}
	},
	getters: {
		primaryColor: state => {
			return {
				backgroundColor: state.primaryColor
			}
		},
		primaryColorLight: state => {
			return {
				backgroundColor: state.primaryColorLight
			}
		},
		primaryTextColor: state => {
			return {
				color: state.primaryColor
			}
		},
		user: state => {
			return state.username
		},
		isSidebarOpen: state => {
			return state.isSidebarOpen
		},
		loading: state => {
			return state.isLoading
		}
	}
})
