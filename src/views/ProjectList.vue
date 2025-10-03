<template>
  <div class="project-list">
    <div class="header-section">
      <h2>Meus Projetos</h2>
      <router-link to="/novo-projeto" class="btn btn-primary">
        + Novo Projeto
      </router-link>
    </div>

    <div v-if="projects.length === 0" class="empty-state">
      <p>Nenhum projeto encontrado. Crie seu primeiro projeto!</p>
    </div>

    <div v-else class="projects-grid">
      <div v-for="project in projects" :key="project.id" class="card project-card">
        <div class="project-header">
          <h3>{{ project.titulo }}</h3>
          <span class="project-date">
            {{ formatDate(project.createdAt) }}
          </span>
        </div>
        <div class="project-info">
          <p><strong>Coordenador:</strong> {{ project.coordenador?.nome || 'Não informado' }}</p>
          <p><strong>Classificação:</strong> {{ project.classificacao || 'Não informado' }}</p>
        </div>
        <div class="project-forms">
          <span class="forms-count">
            Formulários: {{ getFormsCount(project) }}
          </span>
        </div>
        <div class="project-actions">
          <router-link :to="`/projeto/${project.id}`" class="btn btn-primary">
            Ver Detalhes
          </router-link>
          <button @click="deleteProject(project.id)" class="btn btn-danger">
            Excluir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storageService } from '../services/localStorage'

export default {
  name: 'ProjectList',
  data() {
    return {
      projects: []
    }
  },
  mounted() {
    this.loadProjects()
  },
  methods: {
    loadProjects() {
      this.projects = storageService.getProjects()
    },
    deleteProject(id) {
      if (confirm('Tem certeza que deseja excluir este projeto?')) {
        storageService.deleteProject(id)
        this.loadProjects()
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR')
    },
    getFormsCount(project) {
      return project.forms ? Object.keys(project.forms).length : 0
    }
  }
}
</script>

<style scoped>
.project-list {
  padding: 2rem 0;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-section h2 {
  font-size: 2rem;
  color: #2c3e50;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 8px;
  color: #7f8c8d;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.project-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.project-header {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ecf0f1;
}

.project-header h3 {
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.project-date {
  font-size: 0.875rem;
  color: #7f8c8d;
}

.project-info {
  margin-bottom: 1rem;
}

.project-info p {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #555;
}

.project-forms {
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #ecf0f1;
  border-radius: 4px;
}

.forms-count {
  font-size: 0.875rem;
  color: #2c3e50;
  font-weight: 600;
}

.project-actions {
  display: flex;
  gap: 0.5rem;
}

.project-actions .btn {
  flex: 1;
  text-align: center;
  text-decoration: none;
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background: #c0392b;
}
</style>
