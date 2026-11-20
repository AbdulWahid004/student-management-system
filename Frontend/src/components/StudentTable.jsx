import { Link } from 'react-router-dom'

function StudentTable({ students, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
        No students found.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Student</th>
            <th className="px-4 py-3">Roll No</th>
            <th className="px-4 py-3">Class</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Guardian</th>
            <th className="px-4 py-3">Attendance</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {students.map((s) => (
            <tr key={s.id} className="hover:bg-slate-50">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                    {s.firstName?.[0]}
                    {s.lastName?.[0]}
                  </div>
                  <span className="font-medium text-slate-800">
                    {s.firstName} {s.lastName}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-slate-600">{s.rollNumber}</td>
              <td className="px-4 py-3 text-slate-600">
                {s.classGrade || '-'} {s.section}
              </td>
              <td className="px-4 py-3 text-slate-600">{s.email || '-'}</td>
              <td className="px-4 py-3 text-slate-600">{s.phoneNumber || '-'}</td>
              <td className="px-4 py-3 text-slate-600">{s.guardianName || '-'}</td>
              <td className="px-4 py-3">
                <AttendanceBadge value={s.attendancePercentage} />
              </td>
               <td className="px-4 py-3 text-right">
  <Link
    to={`/students/${s.id}/edit`}
    className="mr-3 text-sm font-medium text-indigo-600 hover:text-indigo-800"
  >
    Edit
  </Link>
  <button
    onClick={() => onDelete(s)}
    className="text-sm font-medium text-red-600 hover:text-red-800"
  >
    Delete
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function AttendanceBadge({ value }) {
  const pct = Number(value ?? 0)
  const color =
    pct >= 75
      ? 'bg-green-100 text-green-700'
      : pct >= 60
        ? 'bg-amber-100 text-amber-700'
        : 'bg-red-100 text-red-700'

  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${color}`}>
      {pct}%
    </span>
  )
}

export default StudentTable