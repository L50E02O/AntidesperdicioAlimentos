import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/authStore';

const pinia = createPinia()

const app = createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')

// Listener para recibir el usuario logeado desde el shell Angular
window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'usuario-logeado') {
    const authStore = useAuthStore();
    authStore.setUsuario(event.data.usuario);
  }
});
