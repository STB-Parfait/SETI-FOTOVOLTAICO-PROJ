<template>
  <div class="project-create">
    <h2>Criar Novo Projeto</h2>

    <div class="card">
      <h3>Informações Básicas</h3>
      <form @submit.prevent="createProject">
        <div class="form-group">
          <label for="titulo">Título do Projeto *</label>
          <input
            type="text"
            id="titulo"
            v-model="projectData.titulo"
            required
            placeholder="Digite o título do projeto"
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="classificacao">Classificação *</label>
            <select id="classificacao" v-model="projectData.classificacao" required>
              <option value="">Selecione...</option>
              <option value="Ensino">Ensino</option>
              <option value="Pesquisa">Pesquisa</option>
              <option value="Extensão">Extensão</option>
              <option value="Desenvolvimento Institucional">Desenvolvimento Institucional</option>
              <option value="Desenvolvimento Científico e Tecnológico">Desenvolvimento Científico e Tecnológico</option>
            </select>
          </div>

          <div class="form-group">
            <label for="modalidade">Modalidade</label>
            <select id="modalidade" v-model="projectData.modalidade">
              <option value="">Selecione...</option>
              <option value="Presencial">Presencial</option>
              <option value="Remoto">Remoto</option>
              <option value="Híbrido">Híbrido</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="objetivos">Objetivos</label>
          <textarea
            id="objetivos"
            v-model="projectData.objetivos"
            placeholder="Descreva os objetivos do projeto"
          ></textarea>
        </div>

        <h3>Coordenador do Projeto</h3>

        <div class="form-row">
          <div class="form-group">
            <label for="coordenador-nome">Nome Completo *</label>
            <input
              type="text"
              id="coordenador-nome"
              v-model="projectData.coordenador.nome"
              required
              placeholder="Nome completo do coordenador"
            />
          </div>

          <div class="form-group">
            <label for="coordenador-cpf">CPF *</label>
            <input
              type="text"
              id="coordenador-cpf"
              v-model="projectData.coordenador.cpf"
              required
              placeholder="000.000.000-00"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="coordenador-email">E-mail *</label>
            <input
              type="email"
              id="coordenador-email"
              v-model="projectData.coordenador.email"
              required
              placeholder="email@exemplo.com"
            />
          </div>

          <div class="form-group">
            <label for="coordenador-telefone">Telefone *</label>
            <input
              type="tel"
              id="coordenador-telefone"
              v-model="projectData.coordenador.telefone"
              required
              placeholder="(00) 00000-0000"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="coordenador-cargo">Cargo/Função</label>
          <input
            type="text"
            id="coordenador-cargo"
            v-model="projectData.coordenador.cargo"
            placeholder="Professor, Pesquisador, etc."
          />
        </div>

        <div class="form-actions">
          <router-link to="/" class="btn">Cancelar</router-link>
          <button type="submit" class="btn btn-success">Criar Projeto</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { storageService } from '../services/localStorage'

export default {
  name: 'ProjectCreate',
  data() {
    return {
      projectData: {
        titulo: '',
        classificacao: '',
        modalidade: '',
        objetivos: '',
        coordenador: {
          nome: '',
          cpf: '',
          email: '',
          telefone: '',
          cargo: ''
        }
      }
    }
  },
  methods: {
    createProject() {
      const newProject = storageService.saveProject(this.projectData)
      this.$router.push(`/projeto/${newProject.id}`)
    }
  }
}
</script>

<style scoped>
.project-create {
  max-width: 900px;
  margin: 0 auto;
}

.project-create h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.project-create h3 {
  font-size: 1.25rem;
  color: #2c3e50;
  margin: 2rem 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #3498db;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #ecf0f1;
}

.form-actions .btn {
  text-decoration: none;
  min-width: 120px;
  text-align: center;
}
</style>
