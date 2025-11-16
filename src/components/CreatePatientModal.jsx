import { useState } from "react"
import { X } from "lucide-react"

const API = import.meta.env.VITE_BACKEND_URL

export default function CreatePatientModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({ first_name: "", last_name: "", phone: "", email: "" })
  const [loading, setLoading] = useState(false)

  if (!open) return null

  const save = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/v1/patients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      onCreated?.(data.id)
      onClose?.()
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">New patient</h3>
          <button onClick={onClose}><X/></button>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <label className="text-sm text-gray-600">First name</label>
            <input className="w-full border rounded px-3 py-2" value={form.first_name} onChange={e=>setForm({...form, first_name:e.target.value})}/>
          </div>
          <div>
            <label className="text-sm text-gray-600">Last name</label>
            <input className="w-full border rounded px-3 py-2" value={form.last_name} onChange={e=>setForm({...form, last_name:e.target.value})}/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <input className="w-full border rounded px-3 py-2" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input className="w-full border rounded px-3 py-2" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
            </div>
          </div>
        </div>
        <div className="p-4 border-t flex justify-end gap-2">
          <button className="px-3 py-2" onClick={onClose}>Cancel</button>
          <button className="bg-blue-600 text-white px-3 py-2 rounded" onClick={save} disabled={loading}>{loading? 'Saving...':'Create'}</button>
        </div>
      </div>
    </div>
  )
}
