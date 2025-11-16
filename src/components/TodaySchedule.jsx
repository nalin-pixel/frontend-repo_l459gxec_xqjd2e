import { useEffect, useState } from "react"
import { CalendarDays, Clock } from "lucide-react"

const API = import.meta.env.VITE_BACKEND_URL

export default function TodaySchedule({ providerId }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const load = async () => {
      const start = new Date()
      start.setHours(0,0,0,0)
      const end = new Date()
      end.setHours(23,59,59,999)
      const qs = `start=${start.toISOString()}&end=${end.toISOString()}${providerId?`&provider_id=${providerId}`:''}`
      const res = await fetch(`${API}/api/v1/appointments?${qs}`)
      const data = await res.json()
      setItems(data)
    }
    load()
  }, [providerId])

  return (
    <div className="bg-white border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <CalendarDays size={18} className="text-blue-600"/>
        <h3 className="font-semibold">Today's schedule</h3>
      </div>
      <div className="divide-y">
        {items.length === 0 && (
          <p className="text-sm text-gray-500">No appointments today.</p>
        )}
        {items.map(a => (
          <div key={a.id} className="py-2 flex items-start gap-3">
            <Clock size={16} className="mt-1 text-gray-500"/>
            <div>
              <div className="text-sm font-medium">{new Date(a.start_time).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})} - {new Date(a.end_time).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
              <div className="text-sm text-gray-600">Patient: {a.patient_id} · Provider: {a.provider_id}</div>
              {a.reason && <div className="text-xs text-gray-500">{a.reason}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
