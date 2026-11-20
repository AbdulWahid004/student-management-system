import { Link, Route, Routes } from 'react-router-dom'
import StudentListPage from './pages/StudentListPage'
import AddStudentPage from './pages/AddStudentPage'
import EditStudentPage from './pages/EditStudentPage'

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            Student Management System
          </Link>
          <Link
            to="/students/new"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            + Add Student
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <Routes>
          <Route path="/" element={<StudentListPage />} />
          <Route path="/students/new" element={<AddStudentPage />} />
          <Route path="/students/:id/edit" element={<EditStudentPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App