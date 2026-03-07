import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
});

/** Fetch all available place names for the search dropdown */
export const getAllPlaces = () => api.get("/places").then((r) => r.data.places);

/** Fetch top 5 trending destinations */
export const getTrending = () => api.get("/trending").then((r) => r.data.trending);

/**
 * Get ML-powered recommendations similar to a chosen place.
 * @param {string} placeName
 * @param {number} numResults
 */
export const getRecommendations = (placeName, numResults = 6) =>
    api
        .post("/predict", { place_name: placeName, num_results: numResults })
        .then((r) => r.data);

export default api;
