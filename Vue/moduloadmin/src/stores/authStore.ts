import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Administrator } from '../types/administrador';

export const useAuthStore = defineStore('auth', () => {
  const usuario = ref<Administrator>();

  function setUsuario(nuevoUsuario: Administrator | undefined) {
    usuario.value = nuevoUsuario;
  }

  function logout() {
    usuario.value = undefined;
    localStorage.removeItem('usuario');
  }

  const usuarioActual = computed(() => usuario.value);

  return { usuarioActual, setUsuario, logout };
});
