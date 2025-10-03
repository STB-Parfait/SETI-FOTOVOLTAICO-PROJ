<template>
  <div class="anexo-form">
    <form @submit.prevent="saveForm">
      <h4>Plano de Trabalho</h4>

      <div class="form-group">
        <label for="resumo">Resumo do Projeto *</label>
        <textarea
          id="resumo"
          v-model="formData.resumo"
          required
          rows="4"
          placeholder="Apresente um resumo executivo do projeto"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="palavras-chave">Palavras-chave *</label>
        <input
          type="text"
          id="palavras-chave"
          v-model="formData.palavrasChave"
          required
          placeholder="Separadas por vírgula"
        />
      </div>

      <h4>Objetivos Específicos</h4>

      <div class="form-group">
        <label>Lista de Objetivos Específicos *</label>
        <div v-for="(objetivo, index) in formData.objetivosEspecificos" :key="index" class="list-item">
          <input
            type="text"
            v-model="formData.objetivosEspecificos[index]"
            placeholder="Digite um objetivo específico"
          />
          <button type="button" @click="removerObjetivo(index)" class="btn-remove">×</button>
        </div>
        <button type="button" @click="adicionarObjetivo" class="btn btn-secondary">
          + Adicionar Objetivo
        </button>
      </div>

      <h4>Cronograma de Execução</h4>

      <div class="form-group">
        <label>Etapas do Projeto *</label>
        <div class="cronograma-list">
          <div v-for="(etapa, index) in formData.cronograma" :key="index" class="cronograma-item">
            <div class="form-row">
              <div class="form-group">
                <input
                  type="text"
                  v-model="etapa.descricao"
                  placeholder="Descrição da etapa"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  type="date"
                  v-model="etapa.dataInicio"
                  placeholder="Início"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  type="date"
                  v-model="etapa.dataFim"
                  placeholder="Término"
                  required
                />
              </div>
              <button type="button" @click="removerEtapa(index)" class="btn-remove">×</button>
            </div>
          </div>
        </div>
        <button type="button" @click="adicionarEtapa" class="btn btn-secondary">
          + Adicionar Etapa
        </button>
      </div>

      <h4>Recursos Humanos</h4>

      <div class="form-group">
        <label>Equipe do Projeto</label>
        <div class="recursos-list">
          <div v-for="(pessoa, index) in formData.recursosHumanos" :key="index" class="recurso-item">
            <div class="form-row">
              <div class="form-group">
                <input
                  type="text"
                  v-model="pessoa.nome"
                  placeholder="Nome completo"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  v-model="pessoa.funcao"
                  placeholder="Função/Cargo"
                />
              </div>
              <div class="form-group">
                <select v-model="pessoa.vinculo">
                  <option value="">Vínculo</option>
                  <option value="Servidor">Servidor</option>
                  <option value="Bolsista">Bolsista</option>
                  <option value="Voluntário">Voluntário</option>
                  <option value="Terceirizado">Terceirizado</option>
                </select>
              </div>
              <button type="button" @click="removerPessoa(index)" class="btn-remove">×</button>
            </div>
          </div>
        </div>
        <button type="button" @click="adicionarPessoa" class="btn btn-secondary">
          + Adicionar Membro
        </button>
      </div>

      <h4>Recursos Materiais</h4>

      <div class="form-group">
        <label>Materiais e Equipamentos Necessários</label>
        <div class="recursos-list">
          <div v-for="(material, index) in formData.recursosMateriaisEquipamentos" :key="index" class="recurso-item">
            <div class="form-row">
              <div class="form-group">
                <input
                  type="text"
                  v-model="material.descricao"
                  placeholder="Descrição do item"
                />
              </div>
              <div class="form-group">
                <input
                  type="number"
                  v-model="material.quantidade"
                  placeholder="Qtd"
                  min="1"
                />
              </div>
              <div class="form-group">
                <input
                  type="number"
                  v-model="material.valorUnitario"
                  placeholder="Valor unitário"
                  step="0.01"
                  min="0"
                />
              </div>
              <button type="button" @click="removerMaterial(index)" class="btn-remove">×</button>
            </div>
          </div>
        </div>
        <button type="button" @click="adicionarMaterial" class="btn btn-secondary">
          + Adicionar Material
        </button>
      </div>

      <h4>Orçamento</h4>

      <div class="form-row">
        <div class="form-group">
          <label for="orcamento-total">Orçamento Total (R$)</label>
          <input
            type="number"
            id="orcamento-total"
            step="0.01"
            min="0"
            readonly
            :value="calcularOrcamentoTotal"
          />
        </div>

        <div class="form-group">
          <label for="orcamento-fonte">Fonte de Recursos *</label>
          <select id="orcamento-fonte" v-model="formData.orcamento.fonte" required>
            <option value="">Selecione...</option>
            <option value="FUNESPAR">FUNESPAR</option>
            <option value="Instituição Parceira">Instituição Parceira</option>
            <option value="Agência de Fomento">Agência de Fomento</option>
            <option value="Recursos Próprios">Recursos Próprios</option>
            <option value="Misto">Misto</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="orcamento-justificativa">Justificativa do Orçamento</label>
        <textarea
          id="orcamento-justificativa"
          v-model="formData.orcamento.justificativa"
          rows="3"
          placeholder="Justifique os principais gastos previstos"
        ></textarea>
      </div>

      <h4>Informações Complementares</h4>

      <div class="form-group">
        <label for="impacto">Impacto Esperado</label>
        <textarea
          id="impacto"
          v-model="formData.impactoEsperado"
          rows="3"
          placeholder="Descreva o impacto esperado do projeto"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="observacoes">Observações</label>
        <textarea
          id="observacoes"
          v-model="formData.observacoes"
          rows="3"
          placeholder="Informações adicionais relevantes"
        ></textarea>
      </div>

      <div class="form-actions">
        <button type="button" @click="$emit('cancel')" class="btn">
          Cancelar
        </button>
        <button type="submit" class="btn btn-success">
          Salvar Formulário
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { storageService } from '../../services/localStorage'

export default {
  name: 'AnexoII',
  props: {
    projectId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      formData: {
        resumo: '',
        palavrasChave: '',
        objetivosEspecificos: [''],
        cronograma: [
          { descricao: '', dataInicio: '', dataFim: '' }
        ],
        recursosHumanos: [
          { nome: '', funcao: '', vinculo: '' }
        ],
        recursosMateriaisEquipamentos: [
          { descricao: '', quantidade: 1, valorUnitario: 0 }
        ],
        orcamento: {
          total: 0,
          fonte: '',
          justificativa: ''
        },
        impactoEsperado: '',
        observacoes: ''
      }
    }
  },
  computed: {
    calcularOrcamentoTotal() {
      let total = 0
      this.formData.recursosMateriaisEquipamentos.forEach(item => {
        const quantidade = parseFloat(item.quantidade) || 0
        const valorUnitario = parseFloat(item.valorUnitario) || 0
        total += quantidade * valorUnitario
      })
      return total.toFixed(2)
    }
  },
  mounted() {
    this.loadFormData()
  },
  methods: {
    loadFormData() {
      const savedData = storageService.getFormData(this.projectId, 'anexo2')
      if (savedData) {
        this.formData = savedData
      }
    },
    saveForm() {
      this.formData.orcamento.total = this.calcularOrcamentoTotal
      storageService.saveFormData(this.projectId, 'anexo2', this.formData)
      this.$emit('saved')
    },
    adicionarObjetivo() {
      this.formData.objetivosEspecificos.push('')
    },
    removerObjetivo(index) {
      if (this.formData.objetivosEspecificos.length > 1) {
        this.formData.objetivosEspecificos.splice(index, 1)
      }
    },
    adicionarEtapa() {
      this.formData.cronograma.push({ descricao: '', dataInicio: '', dataFim: '' })
    },
    removerEtapa(index) {
      if (this.formData.cronograma.length > 1) {
        this.formData.cronograma.splice(index, 1)
      }
    },
    adicionarPessoa() {
      this.formData.recursosHumanos.push({ nome: '', funcao: '', vinculo: '' })
    },
    removerPessoa(index) {
      if (this.formData.recursosHumanos.length > 1) {
        this.formData.recursosHumanos.splice(index, 1)
      }
    },
    adicionarMaterial() {
      this.formData.recursosMateriaisEquipamentos.push({ descricao: '', quantidade: 1, valorUnitario: 0 })
    },
    removerMaterial(index) {
      if (this.formData.recursosMateriaisEquipamentos.length > 1) {
        this.formData.recursosMateriaisEquipamentos.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
.anexo-form {
  max-width: 100%;
}

h4 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin: 2rem 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #ecf0f1;
}

h4:first-child {
  margin-top: 0;
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  align-items: start;
}

.list-item {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  align-items: center;
}

.list-item input {
  flex: 1;
}

.cronograma-list,
.recursos-list {
  margin-bottom: 1rem;
}

.cronograma-item,
.recurso-item {
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.cronograma-item .form-row,
.recurso-item .form-row {
  gap: 0.5rem;
}

.btn-remove {
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 1;
}

.btn-remove:hover {
  background: #c0392b;
}

.btn-secondary {
  background: #95a5a6;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
}

.btn-secondary:hover {
  background: #7f8c8d;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #ecf0f1;
}
</style>
