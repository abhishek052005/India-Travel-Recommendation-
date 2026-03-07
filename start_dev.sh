#!/usr/bin/env bash
# Start both the FastAPI backend and the React frontend
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "🚀  India Travel Recommender – Dev Server"
echo "==========================================="
echo ""

# Backend
echo "📡  Starting FastAPI backend on http://localhost:8000"
cd "$ROOT"
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Give backend a moment to start
sleep 2

# Frontend
echo "⚛️   Starting React (Vite) frontend on http://localhost:5173"
cd "$ROOT/frontend"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅  Both servers started."
echo "   → Frontend: http://localhost:5173"
echo "   → API docs:  http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers."

# Trap Ctrl+C to kill both
trap "echo ''; echo 'Stopping servers…'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" SIGINT
wait
