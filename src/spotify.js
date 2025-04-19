import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "f207419da75048fb8627aaeecdee1ee3";
const redirectUri = "http://localhost:3000";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;

export const getCurrentlyPlayingTrack = async () => {
  try {
    const response = await apiClient.get("me/player/currently-playing");
    return response.data;
  } catch (error) {
    console.error("Error fetching currently playing track:", error);
    return null;
  }
};


export const getRecommendationsBasedOnTrack = async (trackId) => {
  try {
    const response = await apiClient.get("recommendations", {
      params: {
        seed_tracks: trackId,
        limit: 10,
      },
    });
    return response.data.tracks;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};


