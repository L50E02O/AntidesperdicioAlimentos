import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Comerciante } from '../types/comerciante';
import type { Administrator } from '../types/administrador';

type Usuario = Comerciante | Administrator | null;

export const useAuthStore = defineStore('auth', () => {
  const usuario = ref<Usuario>(null);

  function setUsuario(nuevoUsuario: Usuario) {
    usuario.value = nuevoUsuario;
  }

  const usuarioActual = computed(() => usuario.value);

  return { usuarioActual, setUsuario };
});
