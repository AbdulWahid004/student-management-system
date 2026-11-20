import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8081/api',
})

export const getStudents = (search = '', classGrade = '') =>
  api.get('/students', { params: { search, classGrade } })
export const createStudent = (student) => api.post('/students', student)

export const getStudentById = (id) => api.get(`/students/${id}`)

export const updateStudent = (id, student) => api.put(`/students/${id}`, student)

export const deleteStudent = (id) => api.delete(`/students/${id}`)