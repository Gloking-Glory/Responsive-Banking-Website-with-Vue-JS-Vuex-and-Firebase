import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createStore } from 'vuex';

const store = createStore ({
    state () {
        return {
            userInfo: {},
            profileImage: require(`./components/images/image3.png`)
        }
    },
    getters: {
        user: state => state.userInfo,
        profileImage: state => state.profileImage
    },
    actions: {
        setUserInfo ({commit}, payload) {
            commit("setUser", payload);
        },
        setProfilePic ({commit}, payload) {
            commit("setPic", payload);
        }

    },
    mutations: {
        setUser (state, payload) {
            state.userInfo = payload;
        },
        setPic (state, payload) {
            state.profileImage = payload;
        }
    }
})
createApp(App).use(router).use(store).mount('#app')