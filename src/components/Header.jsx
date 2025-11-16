import { CalendarDays, User, Stethoscope, Search, Plus } from "lucide-react"

export default function Header() {
  return (
    <header className="sticky top-0 bg-white/70 backdrop-blur border-b border-gray-200 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded bg-blue-600 text-white flex items-center justify-center font-bold">HC</div>
          <div>
            <p className="text-sm text-gray-500 leading-tight">Hospital CRM</p>
            <h1 className="text-lg font-semibold">Operations Dashboard</h1>
          </div>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
          <a href="#patients" className="hover:text-gray-900 flex items-center gap-2"><User size={16}/>Patients</a>
          <a href="#providers" className="hover:text-gray-900 flex items-center gap-2"><Stethoscope size={16}/>Providers</a>
          <a href="#appointments" className="hover:text-gray-900 flex items-center gap-2"><CalendarDays size={16}/>Appointments</a>
        </nav>
      </div>
    </header>
  )
}
