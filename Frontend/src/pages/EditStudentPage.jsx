import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StudentForm from '../components/StudentForm'
import { getStudentById, updateStudent } from '../api/studentApi'
import { cleanPayload } from '../utils/cleanPayload'

function EditStudentPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    getStudentById(id)
      .then((res) => {
        // an input cannot hold null, so show null fields as empty text
        const values = Object.fromEntries(
          Object.entries(res.data).map(([key, value]) => [key, value ?? '']),
        )
        setStudent(values)
      })
      .catch((err) =>
        setLoadError(
          err.response?.status === 404
            ? 'Student not found.'
            : 'Could not load student. Is the backend running?',
        ),
      )
      .finally(() => setLoading(false))
  }, [id])

  const handleUpdate = async (formData) => {
    setSubmitting(true)
    setServerError('')

    // the form carries these three along, but the backend does not accept them
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...fields } = formData

    try {
      await updateStudent(id, cleanPayload(fields))
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

  if (loading) return <p className="text-slate-500">Loading student...</p>
  if (loadError) return <p className="text-red-600">{loadError}</p>

  return (
    <>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Edit Student</h2>
      <StudentForm
        defaultValues={student}
        onSubmit={handleUpdate}
        submitting={submitting}
        serverError={serverError}
        submitLabel="Update student"
      />
    </>
  )
}

export default EditStudentPage