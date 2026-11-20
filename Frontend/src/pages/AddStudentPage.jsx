import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StudentForm from '../components/StudentForm'
import { createStudent } from '../api/studentApi'
import { cleanPayload } from '../utils/cleanPayload'

function AddStudentPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleCreate = async (formData) => {
    setSubmitting(true)
    setServerError('')

    // The backend treats "" as a real value, so send null for empty fields
    const payload = cleanPayload(formData)

    try {
      await createStudent(payload)
      navigate('/')
    } catch (err) {
      const data = err.response?.data
      if (data?.errors) {
        setServerError(Object.values(data.errors).join(', '))
      } else {
        setServerError(data?.message || 'Something went wrong. Is the backend running?')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Add Student</h2>
      <StudentForm
        onSubmit={handleCreate}
        submitting={submitting}
        serverError={serverError}
        submitLabel="Save student"
      />
    </>
  )
}

export default AddStudentPage