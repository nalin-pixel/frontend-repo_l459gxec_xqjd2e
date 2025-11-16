import { useEffect, useState } from "react"
import { Search, UserPlus } from "lucide-react"

const API = import.meta.env.VITE_BACKEND_URL

export default function PatientSearch({ onSelect, onCreate }) {
  const [q, setQ] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])

  useEffect(() => {
    const t = setTimeout(() => {
      if (q.length === 0) {
        setResults([])
        return
      }
      search()
    }, 300)
    return () => clearTimeout(t)
  }, [q])

  const search = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API}/api/v1/patients?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setResults(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border rounded-lg p-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search patients by name, phone, or email"
          />
        </div>
        <button onClick={onCreate} className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md">
          <UserPlus size={16}/> New patient
        </button>
      </div>
      <div className="mt-3 max-h-64 overflow-auto divide-y">
        {loading && <p className="text-sm text-gray-500 p-2">Searching...</p>}
        {!loading && results.length === 0 && q && (
          <p className="text-sm text-gray-500 p-2">No matches. Create a new patient.</p>
        )}
        {results.map((p) => (
          <button key={p.id} onClick={() => onSelect?.(p)} className="w-full text-left p-2 hover:bg-gray-50">
            <div className="font-medium">{p.first_name} {p.last_name}</div>
            <div className="text-xs text-gray-500">{p.dob || 'DOB —'} · {p.phone || '—'} · {p.email || '—'}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
