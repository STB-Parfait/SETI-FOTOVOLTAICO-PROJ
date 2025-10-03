<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <h1>FUNESPAR - Sistema de Gestão de Projetos</h1>
        <nav>
          <router-link to="/">Projetos</router-link>
          <router-link to="/novo-projeto">Novo Projeto</router-link>
        </nav>
      </div>
    </header>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: #f5f5f5;
  color: #333;
}

#app {
  min-height: 100vh;
}

.header {
  background: #2c3e50;
  color: white;
  padding: 1.5rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.header h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.header nav {
  display: flex;
  gap: 1.5rem;
}

.header nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.2s;
}

.header nav a:hover {
  background: rgba(255,255,255,0.1);
}

.header nav a.router-link-active {
  background: rgba(255,255,255,0.2);
}

.main-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover {
  background: #2980b9;
}

.btn-success {
  background: #27ae60;
  color: white;
}

.btn-success:hover {
  background: #229954;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #3498db;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
</style>
