<template>
  <div class="anexo-form">
    <form @submit.prevent="saveForm">
      <h4>Dados do Requerente</h4>

      <div class="form-row">
        <div class="form-group">
          <label for="requerente-nome">Nome Completo *</label>
          <input
            type="text"
            id="requerente-nome"
            v-model="formData.requerente.nome"
            required
          />
        </div>

        <div class="form-group">
          <label for="requerente-cpf">CPF *</label>
          <input
            type="text"
            id="requerente-cpf"
            v-model="formData.requerente.cpf"
            required
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="requerente-rg">RG</label>
          <input
            type="text"
            id="requerente-rg"
            v-model="formData.requerente.rg"
          />
        </div>

        <div class="form-group">
          <label for="requerente-orgao">Órgão Emissor</label>
          <input
            type="text"
            id="requerente-orgao"
            v-model="formData.requerente.orgaoEmissor"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="requerente-email">E-mail *</label>
          <input
            type="email"
            id="requerente-email"
            v-model="formData.requerente.email"
            required
          />
        </div>

        <div class="form-group">
          <label for="requerente-telefone">Telefone *</label>
          <input
            type="tel"
            id="requerente-telefone"
            v-model="formData.requerente.telefone"
            required
          />
        </div>
      </div>

      <div class="form-group">
        <label for="requerente-endereco">Endereço Completo</label>
        <input
          type="text"
          id="requerente-endereco"
          v-model="formData.requerente.endereco"
          placeholder="Rua, número, complemento"
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="requerente-cidade">Cidade</label>
          <input
            type="text"
            id="requerente-cidade"
            v-model="formData.requerente.cidade"
          />
        </div>

        <div class="form-group">
          <label for="requerente-estado">Estado</label>
          <select id="requerente-estado" v-model="formData.requerente.estado">
            <option value="">Selecione...</option>
            <option value="PR">Paraná</option>
            <option value="SP">São Paulo</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="MG">Minas Gerais</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="SC">Santa Catarina</option>
            <!-- Adicionar outros estados conforme necessário -->
          </select>
        </div>

        <div class="form-group">
          <label for="requerente-cep">CEP</label>
          <input
            type="text"
            id="requerente-cep"
            v-model="formData.requerente.cep"
            placeholder="00000-000"
          />
        </div>
      </div>

      <h4>Dados do Projeto</h4>

      <div class="form-group">
        <label for="projeto-titulo">Título do Projeto *</label>
        <input
          type="text"
          id="projeto-titulo"
          v-model="formData.projeto.titulo"
          required
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="projeto-area">Área do Conhecimento *</label>
          <select id="projeto-area" v-model="formData.projeto.area" required>
            <option value="">Selecione...</option>
            <option value="Ciências Exatas e da Terra">Ciências Exatas e da Terra</option>
            <option value="Ciências Biológicas">Ciências Biológicas</option>
            <option value="Engenharias">Engenharias</option>
            <option value="Ciências da Saúde">Ciências da Saúde</option>
            <option value="Ciências Agrárias">Ciências Agrárias</option>
            <option value="Ciências Sociais Aplicadas">Ciências Sociais Aplicadas</option>
            <option value="Ciências Humanas">Ciências Humanas</option>
            <option value="Linguística, Letras e Artes">Linguística, Letras e Artes</option>
          </select>
        </div>

        <div class="form-group">
          <label for="projeto-tipo">Tipo de Projeto *</label>
          <select id="projeto-tipo" v-model="formData.projeto.tipo" required>
            <option value="">Selecione...</option>
            <option value="Ensino">Ensino</option>
            <option value="Pesquisa">Pesquisa</option>
            <option value="Extensão">Extensão</option>
            <option value="Desenvolvimento Institucional">Desenvolvimento Institucional</option>
            <option value="Desenvolvimento Científico e Tecnológico">Desenvolvimento Científico e Tecnológico</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="projeto-inicio">Data de Início *</label>
          <input
            type="date"
            id="projeto-inicio"
            v-model="formData.projeto.dataInicio"
            required
          />
        </div>

        <div class="form-group">
          <label for="projeto-fim">Data de Término *</label>
          <input
            type="date"
            id="projeto-fim"
            v-model="formData.projeto.dataFim"
            required
          />
        </div>

        <div class="form-group">
          <label for="projeto-duracao">Duração (meses)</label>
          <input
            type="number"
            id="projeto-duracao"
            min="1"
            readonly
            :value="calcularDuracao"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="projeto-objetivo">Objetivo Geral *</label>
        <textarea
          id="projeto-objetivo"
          v-model="formData.projeto.objetivo"
          required
          rows="4"
          placeholder="Descreva o objetivo geral do projeto"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="projeto-justificativa">Justificativa *</label>
        <textarea
          id="projeto-justificativa"
          v-model="formData.projeto.justificativa"
          required
          rows="4"
          placeholder="Justifique a importância e relevância do projeto"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="projeto-metodologia">Metodologia</label>
        <textarea
          id="projeto-metodologia"
          v-model="formData.projeto.metodologia"
          rows="4"
          placeholder="Descreva a metodologia a ser utilizada"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="projeto-resultados">Resultados Esperados</label>
        <textarea
          id="projeto-resultados"
          v-model="formData.projeto.resultadosEsperados"
          rows="4"
          placeholder="Descreva os resultados esperados do projeto"
        ></textarea>
      </div>

      <h4>Instituição Parceira (se houver)</h4>

      <div class="form-row">
        <div class="form-group">
          <label for="parceiro-nome">Nome da Instituição</label>
          <input
            type="text"
            id="parceiro-nome"
            v-model="formData.instituicaoParceira.nome"
            placeholder="Nome da instituição parceira"
          />
        </div>

        <div class="form-group">
          <label for="parceiro-cnpj">CNPJ</label>
          <input
            type="text"
            id="parceiro-cnpj"
            v-model="formData.instituicaoParceira.cnpj"
            placeholder="00.000.000/0000-00"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="parceiro-representante">Nome do Representante</label>
        <input
          type="text"
          id="parceiro-representante"
          v-model="formData.instituicaoParceira.representante"
          placeholder="Nome do representante da instituição"
        />
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
  name: 'AnexoI',
  props: {
    projectId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      formData: {
        requerente: {
          nome: '',
          cpf: '',
          rg: '',
          orgaoEmissor: '',
          email: '',
          telefone: '',
          endereco: '',
          cidade: '',
          estado: '',
          cep: ''
        },
        projeto: {
          titulo: '',
          area: '',
          tipo: '',
          dataInicio: '',
          dataFim: '',
          duracao: '',
          objetivo: '',
          justificativa: '',
          metodologia: '',
          resultadosEsperados: ''
        },
        instituicaoParceira: {
          nome: '',
          cnpj: '',
          representante: ''
        }
      }
    }
  },
  computed: {
    calcularDuracao() {
      if (this.formData.projeto.dataInicio && this.formData.projeto.dataFim) {
        const inicio = new Date(this.formData.projeto.dataInicio)
        const fim = new Date(this.formData.projeto.dataFim)
        const diffTime = Math.abs(fim - inicio)
        const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30))
        return diffMonths
      }
      return ''
    }
  },
  mounted() {
    this.loadFormData()
  },
  methods: {
    loadFormData() {
      const savedData = storageService.getFormData(this.projectId, 'anexo1')
      if (savedData) {
        this.formData = savedData
      }
    },
    saveForm() {
      storageService.saveFormData(this.projectId, 'anexo1', this.formData)
      this.$emit('saved')
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
