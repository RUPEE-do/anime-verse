import api from "./api";

export const getTopAnime = () => api.get("/top/anime");

export const getUpcomingAnime = (page = 1) =>
  api.get(`/seasons/upcoming?page=${page}`);

export const getAnimeDetails = (id) =>
  api.get(`/anime/${id}/full`);

export const getAnimeGenres = () =>
  api.get("/genres/anime");

export const getAnimeByGenre = (genreId) =>
  api.get(`/anime?genres=${genreId}`);

export const searchAnime = (query, page = 1) =>
  api.get(`/anime?q=${query}&page=${page}&limit=24`);