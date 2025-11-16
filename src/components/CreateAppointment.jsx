import { useEffect, useState } from "react"

const API = import.meta.env.VITE_BACKEND_URL

export default function CreateAppointment() {
  const [providers, setProviders] = useState([])
  const [form, setForm] = useState({ patient_id: "", provider_id: "", date: "", start: "09:00", end: "09:30", reason: "" })
  const [created, setCreated] = useState(null)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${API}/api/v1/providers`)
      const data = await res.json()
      setProviders(data)
    }
    load()
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    const start_time = new Date(`${form.date}T${form.start}:00`)
    const end_time = new Date(`${form.date}T${form.end}:00`)
    const payload = { patient_id: form.patient_id, provider_id: form.provider_id, start_time, end_time, reason: form.reason }
    const res = await fetch(`${API}/api/v1/appointments`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    if (res.ok) {
      const data = await res.json()
      setCreated(data.id)
    } else {
      const err = await res.json().catch(()=>({detail:'Error'}))
      alert(err.detail || 'Error creating appointment')
    }
  }

  return (
    <div className="bg-white border rounded-lg p-4">
      <h3 className="font-semibold mb-3">Quick appointment</h3>
      <form onSubmit={submit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input required placeholder="Patient ID" className="border rounded px-3 py-2" value={form.patient_id} onChange={e=>setForm({...form, patient_id:e.target.value})}/>
          <select required className="border rounded px-3 py-2" value={form.provider_id} onChange={e=>setForm({...form, provider_id:e.target.value})}>
            <option value="">Select provider</option>
            {providers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <input required type="date" className="border rounded px-3 py-2" value={form.date} onChange={e=>setForm({...form, date:e.target.value})}/>
          <input required type="time" className="border rounded px-3 py-2" value={form.start} onChange={e=>setForm({...form, start:e.target.value})}/>
          <input required type="time" className="border rounded px-3 py-2" value={form.end} onChange={e=>setForm({...form, end:e.target.value})}/>
        </div>
        <input placeholder="Reason (optional)" className="border rounded px-3 py-2 w-full" value={form.reason} onChange={e=>setForm({...form, reason:e.target.value})}/>
        <button className="bg-blue-600 text-white px-3 py-2 rounded">Create</button>
        {created && <p className="text-sm text-green-600">Created appointment {created}</p>}
      </form>
    </div>
  )
}
