<template>
  <div class="layout">
        <!-- Sidebar -->
      <aside class="sidebar">

        <div class="sidebar-top">
            <h2 class="app-name">ReAprovecha</h2>

            <nav class="menu">
            <RouterLink to="/dashboard" class="menu-item" active-class="active">🏠 Dashboard</RouterLink>
            <RouterLink to="/establecimientos" class="menu-item" active-class="active">🏬 Establecimientos</RouterLink>
            <RouterLink to="/comerciantes" class="menu-item" active-class="active">👤 Comerciantes</RouterLink>
            <RouterLink to="/notificaciones" class="menu-item" active-class="active">🔔 Notificaciones</RouterLink>
            <RouterLink to="/incidencias" class="menu-item" active-class="active">❗ Incidencias</RouterLink>
            </nav>
        </div>

        <div class="sidebar-bottom">
            <div class="user-profile">
            <div class="avatar-static"></div>
            <div class="user-info">
                <p class="user-name"> {{ authStore.usuarioActual?.nombre }} </p>
                <p class="user-role">Administrador</p>
            </div>
            </div>
        </div>
      </aside>

        <!-- Contenido principal -->
    <main class="main-content">
      <RouterView/>
      <!-- <slot/> -->
    </main>
    
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();

</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  border-right: 1px solid #ddd;
}

.app-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.menu-item {
  text-decoration: none;
  color: #333;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #e0e0e0;
}

.active {
  background-color: #333;
  color: #fff;
}

.sidebar-bottom {
  margin-top: auto;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
}

.avatar-static {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #007BFF;
}

.user-info {
  font-size: 0.875rem;
}

.user-name {
  font-weight: bold;
}

.user-role {
  color: #777;
}
.main-content {
  flex: 1;
  padding: 2rem;
  background-color: #fafafa;
  overflow-y: auto;
}
</style>