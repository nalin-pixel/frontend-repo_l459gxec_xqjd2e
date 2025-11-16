import { useEffect, useState } from 'react'
import Header from './components/Header'
import PatientSearch from './components/PatientSearch'
import TodaySchedule from './components/TodaySchedule'
import CreatePatientModal from './components/CreatePatientModal'
import CreateAppointment from './components/CreateAppointment'

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <main className="max-w-6xl mx-auto p-4 grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <section id="patients" className="space-y-3">
            <h2 className="text-xl font-semibold">Find a patient</h2>
            <PatientSearch onSelect={setSelectedPatient} onCreate={() => setModalOpen(true)}/>
            {selectedPatient && (
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold">Selected patient</h3>
                <div className="text-sm text-gray-700">{selectedPatient.first_name} {selectedPatient.last_name} · {selectedPatient.dob || 'DOB —'} · {selectedPatient.phone || '—'}</div>
              </div>
            )}
          </section>

          <section id="appointments" className="space-y-3">
            <h2 className="text-xl font-semibold">Schedule</h2>
            <TodaySchedule/>
          </section>
        </div>

        <div className="space-y-4">
          <CreateAppointment/>
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Tips</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Create a provider first via API to schedule.</li>
              <li>Create a patient from the search bar.</li>
              <li>Use the Test page to verify backend connectivity.</li>
            </ul>
            <a className="text-blue-600 text-sm" href="/test">Open backend test</a>
          </div>
        </div>
      </main>

      <CreatePatientModal open={modalOpen} onClose={() => setModalOpen(false)} onCreated={(id) => setSelectedPatient({ id })}/>
    </div>
  )
}

export default App
