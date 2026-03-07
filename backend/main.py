import pickle
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

app = FastAPI(title="India Travel Recommender API")

# CORS for React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Load data (relative to project root, run from there) ──────────────────────
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def load_pkl(filename):
    path = os.path.join(BASE_DIR, filename)
    with open(path, "rb") as f:
        return pickle.load(f)

places: pd.DataFrame = load_pkl("india_travel_list.pkl")
similarity = load_pkl("similarity_matrix.pkl")

try:
    popular: pd.DataFrame = load_pkl("popularity_df.pkl")
except Exception:
    popular = None

# ── Helpers ───────────────────────────────────────────────────────────────────
def _s(v) -> str:
    """Cast any value to a plain Python string (handles NaN, numpy types, etc.)."""
    import math
    if v is None:
        return ""
    try:
        if math.isnan(float(v)):
            return ""
    except Exception:
        pass
    return str(v)

def _f(v) -> float:
    try:
        return float(v)
    except Exception:
        return 0.0

def row_to_dict(row) -> dict:
    return {
        "name":           _s(row.get("Name", "")),
        "city":           _s(row.get("City", "")),
        "state":          _s(row.get("State", "")),
        "zone":           _s(row.get("Zone", "")),
        "type":           _s(row.get("Type", "")),
        "rating":         _f(row.get("Google review rating", 0)),
        "entrance_fee":   _f(row.get("Entrance Fee in INR", 0)),
        "visit_hours":    _f(row.get("time needed to visit in hrs", 0)),
        "best_time":      _s(row.get("Best Time to visit", "")),
        "significance":   _s(row.get("Significance", "")),
        "dslr_allowed":   _s(row.get("DSLR Allowed", "")),
        "weekly_off":     _s(row.get("Weekly Off", "")),
        "airport_nearby": _s(row.get("Airport with 50km Radius", "")),
        "reviews_lakhs":  _f(row.get("Number of google review in lakhs", 0)),
    }


# ── Endpoints ─────────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {"message": "India Travel Recommender API is running 🚀"}


@app.get("/places")
def all_places():
    """Return all place names for the frontend dropdown."""
    return {"places": places["Name"].tolist()}


@app.get("/trending")
def trending():
    """Return top 5 trending destinations."""
    if popular is None:
        # Fall back to highest-rated from places df
        top = places.nlargest(5, "Google review rating")
        return {"trending": [row_to_dict(top.iloc[i]) for i in range(len(top))]}

    top = popular.iloc[1:6]  # skip index 0 like the Streamlit app
    results = []
    for i in range(len(top)):
        results.append(row_to_dict(top.iloc[i]))
    return {"trending": results}


class PredictRequest(BaseModel):
    place_name: str
    num_results: int = 6


@app.post("/predict")
def predict(req: PredictRequest):
    """Return similar places based on collaborative-filtering similarity matrix."""
    matches = places[places["Name"] == req.place_name]
    if matches.empty:
        raise HTTPException(status_code=404, detail=f"Place '{req.place_name}' not found.")

    index = matches.index[0]
    distances = similarity[index]
    rec_list = sorted(enumerate(distances), key=lambda x: x[1], reverse=True)
    rec_list = [item for item in rec_list if item[0] != index][:req.num_results]

    results = [row_to_dict(places.iloc[i]) for i, _ in rec_list]
    return {
        "query":           req.place_name,
        "recommendations": results,
    }
