<div align="center">
  <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/compass.svg" width="60" alt="Compass Logo">
  <h1>🗺️ India Travel Recommender</h1>
  <p><strong>A Machine Learning-powered modern travel recommendation system for Incredible India.</strong></p>

  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#installation">Installation</a> •
    <a href="#project-structure">Architecture</a>
  </p>
</div>

---

## 🌟 Overview

The **India Travel Recommender** helps you discover your perfect travel destination across India. Built with a responsive **React (Vite) + Tailwind CSS** frontend and a **FastAPI** backend, the application uses collaborative filtering (via pre-trained ML pickles) to analyze your preferences and recommend similar, hidden-gem destinations instantly.

## ✨ Features

- **🤖 AI Recommendations:** Suggests 6+ similar destinations based on a 500+ place matrix.
- **🔥 Trending Destinations:** Real-time carousel of the highest-rated places (e.g., Goa, Varanasi, Manali).
- **🎴 3D Flip Flashcards:** Interactive hero section with animated CSS 3D flip cards.
- **🔎 Smart Search form:** Live autocomplete search across all Indian destinations.
- **🎨 Modern Dark Glassmorphism UI:** Built from scratch with rich gradients, animations, and Tailwind CSS.
- **📱 Fully Responsive:** Seamless experience across desktop, tablet, and mobile.
- **⚡ Lightning Fast:** Vite frontend alongside a highly concurrent FastAPI backend.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** (scaffolded with Vite)
- **Tailwind CSS v3** (Custom UI tokens, glassmorphism)
- **Framer Motion** (Page transitions & micro-animations)
- **Axios** (API requests)

### Backend
- **FastAPI** (High-performance API server)
- **Uvicorn** (ASGI Web Server)
- **Pandas** & **NumPy** (Data manipulation)
- **Scikit-learn / Pickle** (Pre-trained ML models)

---

## 🚀 Installation & Setup

### Prerequisites
- Python 3.9+
- Node.js 18+ & npm

### 1. Clone the repository
```bash
git clone https://github.com/abhishek052005India-Travel-Recommendation.git
cd India-Travel-Recommendation
```

### 2. Start the Application

The project includes a convenience script that starts both the backend API and frontend dev server simultaneously.

**Using the one-shot script (Mac/Linux):**
```bash
chmod +x start_dev.sh
./start_dev.sh
```

**Alternatively, to run manually in two terminals:**

**Terminal 1 — Backend:**
```bash
# Install Python dependencies
pip install fastapi uvicorn pandas

# Start FastAPI server
python -m uvicorn backend.main:app --reload --port 8000
```
> The API will be available at `http://localhost:8000`

**Terminal 2 — Frontend:**
```bash
cd frontend

# Install Node dependencies
npm install

# Start Vite dev server
npm run dev
```
> The Frontend will be available at `http://localhost:5173`

---

## 📁 Project Structure

```text
India-Travel-Recommendation/
├── backend/
│   ├── main.py              # FastAPI server & endpoints (/predict, /trending)
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # React functional components
│   │   │   ├── Navbar.jsx           # Glassmorphism sticky navbar
│   │   │   ├── HeroSection.jsx      # Animated hero with 3D flashcards
│   │   │   ├── TrendingSection.jsx  # Horizontal scrollable trending cards
│   │   │   ├── TravelForm.jsx       # Search & filters form
│   │   │   ├── RecommendationCard.jsx 
│   │   │   └── Loader.jsx           # Animated compass spinner
│   │   ├── pages/
│   │   │   └── Home.jsx             # Main composition page
│   │   ├── services/
│   │   │   └── api.js               # Axios integration layer
│   │   ├── App.jsx                  # Root React component
│   │   └── index.css                # Tailwind directives & custom CSS
│   ├── tailwind.config.js           # Theme and styling config
│   └── package.json
├── data/                    # (Implicit) ML model pickles (.pkl)
├── start_dev.sh             # Convenience startup script
└── README.md                # Project documentation
```

---

## 💡 How it Works (ML Architecture)

1. The user selects a specific destination (e.g., "India Gate").
2. The React frontend sends a `POST /predict` containing this request.
3. FastAPI loads `similarity_matrix.pkl` and `india_travel_list.pkl`. 
4. The matrix computes the cosine distance from the selected location against 500+ registered venues based on features like category, rating, location parameters, and historical data.
5. The model returns the top X most similar destinations to the client.

---

<div align="center">
  <p>Built with ❤️ for Incredible India</p>
</div>
