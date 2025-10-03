const PROJECTS_KEY = 'funespar_projects'

export const storageService = {
  // Get all projects
  getProjects() {
    const data = localStorage.getItem(PROJECTS_KEY)
    return data ? JSON.parse(data) : []
  },

  // Get a single project by ID
  getProject(id) {
    const projects = this.getProjects()
    return projects.find(p => p.id === id)
  },

  // Save a new project
  saveProject(project) {
    const projects = this.getProjects()
    const newProject = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    projects.push(newProject)
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
    return newProject
  },

  // Update an existing project
  updateProject(id, updates) {
    const projects = this.getProjects()
    const index = projects.findIndex(p => p.id === id)
    if (index !== -1) {
      projects[index] = {
        ...projects[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
      return projects[index]
    }
    return null
  },

  // Delete a project
  deleteProject(id) {
    const projects = this.getProjects()
    const filtered = projects.filter(p => p.id !== id)
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(filtered))
  },

  // Save form data for a project
  saveFormData(projectId, formType, data) {
    const project = this.getProject(projectId)
    if (project) {
      if (!project.forms) {
        project.forms = {}
      }
      project.forms[formType] = {
        data,
        savedAt: new Date().toISOString()
      }
      this.updateProject(projectId, project)
    }
  },

  // Get form data for a project
  getFormData(projectId, formType) {
    const project = this.getProject(projectId)
    return project?.forms?.[formType]?.data || null
  }
}
