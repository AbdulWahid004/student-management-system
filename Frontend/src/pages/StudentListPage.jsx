import { useEffect, useState } from 'react'
import { getStudents, deleteStudent } from '../api/studentApi'
import StudentTable from '../components/StudentTable'
import ConfirmDialog from '../components/ConfirmDialog'

function StudentListPage() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [studentToDelete, setStudentToDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    getStudents()
      .then((res) => setStudents(res.data))
      .catch(() => setError('Could not load students. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  const confirmDelete = async () => {
    setDeleting(true)
    setDeleteError('')
    try {
      await deleteStudent(studentToDelete.id)
      setStudents((current) => current.filter((s) => s.id !== studentToDelete.id))
      setStudentToDelete(null)
    } catch {
      setDeleteError('Could not delete the student. Please try again.')
      setStudentToDelete(null)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">All Students</h2>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
          {students.length} students
        </span>
      </div>

      {loading && <p className="text-slate-500">Loading students...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {deleteError && <p className="mb-3 text-red-600">{deleteError}</p>}
      {!loading && !error && (
        <StudentTable students={students} onDelete={setStudentToDelete} />
      )}

      <ConfirmDialog
        open={studentToDelete !== null}
        title="Delete student?"
        message={
          studentToDelete
            ? `${studentToDelete.firstName} ${studentToDelete.lastName} (${studentToDelete.rollNumber}) will be removed permanently.`
            : ''
        }
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setStudentToDelete(null)}
      />
    </>
  )
}

export default StudentListPage