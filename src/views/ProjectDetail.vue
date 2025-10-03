<template>
  <div class="project-detail" v-if="project">
    <div class="detail-header">
      <div>
        <h2>{{ project.titulo }}</h2>
        <p class="project-meta">
          Criado em {{ formatDate(project.createdAt) }}
          <span v-if="project.updatedAt !== project.createdAt">
            • Atualizado em {{ formatDate(project.updatedAt) }}
          </span>
        </p>
      </div>
      <router-link to="/" class="btn">← Voltar</router-link>
    </div>

    <div class="card">
      <h3>Informações do Projeto</h3>
      <div class="info-grid">
        <div class="info-item">
          <strong>Classificação:</strong>
          <span>{{ project.classificacao }}</span>
        </div>
        <div class="info-item" v-if="project.modalidade">
          <strong>Modalidade:</strong>
          <span>{{ project.modalidade }}</span>
        </div>
        <div class="info-item full-width" v-if="project.objetivos">
          <strong>Objetivos:</strong>
          <p>{{ project.objetivos }}</p>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>Coordenador do Projeto</h3>
      <div class="info-grid">
        <div class="info-item">
          <strong>Nome:</strong>
          <span>{{ project.coordenador.nome }}</span>
        </div>
        <div class="info-item">
          <strong>CPF:</strong>
          <span>{{ project.coordenador.cpf }}</span>
        </div>
        <div class="info-item">
          <strong>E-mail:</strong>
          <span>{{ project.coordenador.email }}</span>
        </div>
        <div class="info-item">
          <strong>Telefone:</strong>
          <span>{{ project.coordenador.telefone }}</span>
        </div>
        <div class="info-item full-width" v-if="project.coordenador.cargo">
          <strong>Cargo/Função:</strong>
          <span>{{ project.coordenador.cargo }}</span>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>Formulários do Projeto</h3>
      <p class="section-description">
        Preencha os formulários necessários para o projeto. Todas as informações são salvas automaticamente.
      </p>

      <div class="forms-list">
        <div
          v-for="form in availableForms"
          :key="form.id"
          class="form-item"
          :class="{ 'form-completed': isFormCompleted(form.id) }"
        >
          <div class="form-info">
            <h4>{{ form.name }}</h4>
            <p>{{ form.description }}</p>
            <span class="form-status" v-if="isFormCompleted(form.id)">
              ✓ Preenchido
            </span>
          </div>
          <button @click="openForm(form.id)" class="btn btn-primary">
            {{ isFormCompleted(form.id) ? 'Editar' : 'Preencher' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Form Modal -->
    <div v-if="activeForm" class="modal-overlay" @click.self="closeForm">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ getFormName(activeForm) }}</h3>
          <button @click="closeForm" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <component
            :is="activeFormComponent"
            :project-id="project.id"
            @saved="handleFormSaved"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storageService } from '../services/localStorage'
import AnexoI from '../components/forms/AnexoI.vue'
import AnexoII from '../components/forms/AnexoII.vue'

export default {
  name: 'ProjectDetail',
  components: {
    AnexoI,
    AnexoII
  },
  data() {
    return {
      project: null,
      activeForm: null,
      availableForms: [
        {
          id: 'anexo1',
          name: 'Anexo I - Requerimento Inicial',
          description: 'Formulário de requerimento inicial do projeto'
        },
        {
          id: 'anexo2',
          name: 'Anexo II - Plano de Trabalho',
          description: 'Plano de trabalho detalhado com cronograma e recursos'
        }
      ]
    }
  },
  computed: {
    activeFormComponent() {
      if (this.activeForm === 'anexo1') return 'AnexoI'
      if (this.activeForm === 'anexo2') return 'AnexoII'
      return null
    }
  },
  mounted() {
    this.loadProject()
  },
  methods: {
    loadProject() {
      const id = this.$route.params.id
      this.project = storageService.getProject(id)
      if (!this.project) {
        this.$router.push('/')
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    isFormCompleted(formId) {
      return this.project?.forms?.[formId] !== undefined
    },
    openForm(formId) {
      this.activeForm = formId
    },
    closeForm() {
      this.activeForm = null
    },
    getFormName(formId) {
      const form = this.availableForms.find(f => f.id === formId)
      return form?.name || ''
    },
    handleFormSaved() {
      this.loadProject()
      this.closeForm()
    }
  }
}
</script>

<style scoped>
.project-detail {
  max-width: 1000px;
  margin: 0 auto;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.detail-header h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.project-meta {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.detail-header .btn {
  text-decoration: none;
}

.card h3 {
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #3498db;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-item strong {
  color: #2c3e50;
  font-size: 0.9rem;
}

.info-item span,
.info-item p {
  color: #555;
}

.section-description {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
}

.forms-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.form-item:hover {
  background: #ecf0f1;
}

.form-item.form-completed {
  border-color: #27ae60;
  background: #e8f8f0;
}

.form-info h4 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.form-info p {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.form-status {
  display: inline-block;
  color: #27ae60;
  font-weight: 600;
  font-size: 0.9rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #ecf0f1;
}

.modal-header h3 {
  margin: 0;
  border: none;
  padding: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #7f8c8d;
  line-height: 1;
  padding: 0;
  width: 2rem;
  height: 2rem;
}

.close-btn:hover {
  color: #2c3e50;
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
}
</style>
