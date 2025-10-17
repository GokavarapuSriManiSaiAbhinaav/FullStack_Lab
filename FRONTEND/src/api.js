const BASE = import.meta.env.VITE_API_URL || 'http://localhost:2030/fitlog/api';

export async function fetchLogs() {
  const res = await fetch(`${BASE}/logs`);
  if (!res.ok) throw new Error('Failed to fetch logs');
  return res.json();
}

export async function createLog(log) {
  const res = await fetch(`${BASE}/logs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(log),
  });
  if (!res.ok) throw new Error('Failed to create log');
  return res.json();
}

export async function deleteLog(id) {
  const res = await fetch(`${BASE}/logs/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete log');
}

