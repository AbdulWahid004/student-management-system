import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const inputClass =
  'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'

function Field({ label, error, className = '', children }) {
  return (
    <label className={`block text-sm font-medium text-slate-700 ${className}`}>
      {label}
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error.message}</span>}
    </label>
  )
}

function StudentForm({ defaultValues, onSubmit, submitting, serverError, submitLabel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="First name *" error={errors.firstName}>
          <input
            className={inputClass}
            {...register('firstName', { required: 'First name is required' })}
          />
        </Field>

        <Field label="Last name *" error={errors.lastName}>
          <input
            className={inputClass}
            {...register('lastName', { required: 'Last name is required' })}
          />
        </Field>

        <Field label="Roll number *" error={errors.rollNumber}>
          <input
            className={inputClass}
            {...register('rollNumber', { required: 'Roll number is required' })}
          />
        </Field>

        <Field label="Class" error={errors.classGrade}>
          <input className={inputClass} {...register('classGrade')} />
        </Field>

        <Field label="Section" error={errors.section}>
          <input className={inputClass} {...register('section')} />
        </Field>

        <Field label="Gender" error={errors.gender}>
          <select className={inputClass} {...register('gender')}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </Field>

        <Field label="Email" error={errors.email}>
          <input
            type="email"
            className={inputClass}
            {...register('email')}
          />
        </Field>

        <Field label="Phone (10 digits)" error={errors.phoneNumber}>
          <input
            className={inputClass}
            {...register('phoneNumber', {
              pattern: { value: /^[0-9]{10}$/, message: 'Phone must be 10 digits' },
            })}
          />
        </Field>

        <Field label="Date of birth" error={errors.dateOfBirth}>
          <input type="date" className={inputClass} {...register('dateOfBirth')} />
        </Field>

        <Field label="Admission date" error={errors.admissionDate}>
          <input type="date" className={inputClass} {...register('admissionDate')} />
        </Field>

        <Field label="Guardian name" error={errors.guardianName}>
          <input className={inputClass} {...register('guardianName')} />
        </Field>

        <Field label="Guardian phone (10 digits)" error={errors.guardianPhone}>
          <input
            className={inputClass}
            {...register('guardianPhone', {
              pattern: { value: /^[0-9]{10}$/, message: 'Phone must be 10 digits' },
            })}
          />
        </Field>

        <Field label="Attendance %" error={errors.attendancePercentage}>
          <input
            type="number"
            step="0.01"
            className={inputClass}
            {...register('attendancePercentage', {
              min: { value: 0, message: 'Cannot be below 0' },
              max: { value: 100, message: 'Cannot be above 100' },
            })}
          />
        </Field>

        <Field label="Address" error={errors.address} className="md:col-span-2">
          <input className={inputClass} {...register('address')} />
        </Field>
      </div>

      {serverError && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{serverError}</p>
      )}

      <div className="mt-6 flex justify-end gap-3">
        <Link
          to="/"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {submitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default StudentForm