import { useState, useEffect } from 'react'
import './App.css'
import { fetchLogs, createLog, deleteLog } from './api'

function App() {
  const [logs, setLogs] = useState([])
  const [form, setForm] = useState({
    userName: '',
    age: '',
    gender: '',
    heightCm: '',
    weightKg: '',
    workoutType: '',
    durationMinutes: '',
    caloriesBurned: ''
  })

  async function load() {
    const data = await fetchLogs()
    setLogs(data)
  }

  useEffect(() => { load() }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const payload = {
        userName: form.userName || '',
        age: form.age ? parseInt(form.age) : null,
        gender: form.gender || '',
        heightCm: form.heightCm ? parseInt(form.heightCm) : null,
        weightKg: form.weightKg ? parseFloat(form.weightKg) : null,
        workoutType: form.workoutType || '',
        durationMinutes: form.durationMinutes ? parseInt(form.durationMinutes) : null,
        caloriesBurned: form.caloriesBurned ? parseInt(form.caloriesBurned) : null
      }
      
      await createLog(payload)
      
      setForm({
        userName: '', age: '', gender: '', heightCm: '', weightKg: '', workoutType: '', durationMinutes: '', caloriesBurned: ''
      })
      await load()
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      alert('Error: ' + error.message);
    }
  }


  return (
    <div className="fitlog-container">
      <header className="fitlog-header">
        <h1 className="fitlog-title">FitLog</h1>
        <p className="fitlog-subtitle">Track your fitness journey</p>
      </header>

      <div className="fitlog-form">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input 
              name="userName" 
              placeholder="User Name" 
              value={form.userName} 
              onChange={handleChange} 
              className="form-input"
              required 
            />
            <input 
              name="age" 
              placeholder="Age" 
              value={form.age} 
              onChange={handleChange} 
              className="form-input"
              type="number"
            />
            <select name="gender" value={form.gender} onChange={handleChange} className="form-select">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input 
              name="heightCm" 
              placeholder="Height (cm)" 
              value={form.heightCm} 
              onChange={handleChange} 
              className="form-input"
              type="number"
            />
            <input 
              name="weightKg" 
              placeholder="Weight (kg)" 
              value={form.weightKg} 
              onChange={handleChange} 
              className="form-input"
              type="number"
              step="0.1"
            />
            <input 
              name="workoutType" 
              placeholder="Workout Type" 
              value={form.workoutType} 
              onChange={handleChange} 
              className="form-input"
            />
            <input 
              name="durationMinutes" 
              placeholder="Duration (minutes)" 
              value={form.durationMinutes} 
              onChange={handleChange} 
              className="form-input"
              type="number"
            />
            <input 
              name="caloriesBurned" 
              placeholder="Calories Burned" 
              value={form.caloriesBurned} 
              onChange={handleChange} 
              className="form-input"
              type="number"
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <button type="submit" className="submit-btn">
              Add Workout Log
            </button>
          </div>
        </form>
      </div>

      <hr className="divider" />
      
      <div className="logs-section">
        <h2 className="logs-title">Fitness Logs</h2>
        {logs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-text">No workout logs yet!</div>
            <div className="empty-state-subtext">Add your first workout above to get started</div>
          </div>
        ) : (
          <table className="logs-table">
            <thead className="table-header">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Workout</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l, i) => (
                <tr key={l.id} className="table-row">
                  <td className="table-cell">{i + 1}</td>
                  <td className="table-cell">
                    {l.userName}
                    {l.age && <div style={{fontSize: '12px', color: '#666'}}>Age: {l.age}</div>}
                  </td>
                  <td className="table-cell">
                    {l.workoutType || 'N/A'}
                    {l.gender && <div style={{fontSize: '12px', color: '#666'}}>{l.gender}</div>}
                  </td>
                  <td className="table-cell">
                    {l.durationMinutes || 0} min
                  </td>
                  <td className="table-cell">
                    {l.caloriesBurned || 0} cal
                  </td>
                  <td className="table-cell">
                    {l.createdAt ? new Date(l.createdAt).toLocaleDateString() : 'Today'}
                  </td>
                  <td className="table-cell">
                    <button 
                      onClick={async () => { await deleteLog(l.id); load(); }}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default App
