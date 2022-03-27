import { createStore } from "vuex";

const defaultState = { cardList: []};

export default createStore({
  state: {
    ...defaultState,
  },
  mutations: {
    initMovies(state, movies: IMovie[]) {
      state.movies = movies;
    },
    initTimes(state, times: ITime[]) {
      state.times = times;
    },
    initReservations(state, reservations: IReservation[]) {
      if (localStorage.getItem("reservations") === null) {
        state.reservations = reservations;
        localStorage.setItem(
          "reservations",
          JSON.stringify(state.reservations)
        );
        console.log("init run");
      } else {
        const reservationsFromLocalstorage =
          localStorage.getItem("reservations")!;
        state.reservations = JSON.parse(reservationsFromLocalstorage);
      }
    },
    addReservation(state, newReservation: IReservation) {
      const newReservations = state.reservations.map((reservation) =>
        reservation.movieId === newReservation.movieId &&
        reservation.date === newReservation.date &&
        reservation.time === newReservation.time
          ? (reservation = newReservation)
          : reservation
      );
      state.reservations = newReservations;
      localStorage.setItem("reservations", JSON.stringify(state.reservations));
    },
  },
  actions: {},
  modules: {},
})
