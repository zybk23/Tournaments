import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const tournamentSlice = createSlice({
  name: "tournament",
  initialState: {
    allTournaments: [],
    selectedSortedValue: 1,
    updatedTournament: {},
  },
  reducers: {
    setAllTournaments: (state, action) => {
      let initialTournaments = action.payload.sort(
        (a, b) => b.waitlistParticipantsCount - a.waitlistParticipantsCount
      );
      state.allTournaments = initialTournaments;
    },
    setIncreasePoint: (state, action) => {
      const findIndex = state.allTournaments.findIndex(
        (x) => x.id === action.payload
      );

      state.allTournaments[findIndex].waitlistParticipantsCount += 1;
      state.allTournaments[findIndex].lastVoteDate = moment(new Date()).format(
        "YYYY-MM-DD , h:mm:ss a"
      );
    },

    setDecreasePoint: (state, action) => {
      const findIndex = state.allTournaments.findIndex(
        (x) => x.id === action.payload
      );
      if (state.allTournaments[findIndex].waitlistParticipantsCount > 0) {
        state.allTournaments[findIndex].waitlistParticipantsCount -= 1;
        state.allTournaments[findIndex].lastVoteDate = moment(
          new Date()
        ).format("YYYY-MM-DD , h:mm:ss a");
      }
    },
    setDeleteSelectedTournament: (state, action) => {
      const filteredTournament = state.allTournaments.filter(
        (x) => x.id !== action.payload
      );
      state.allTournaments = filteredTournament;
    },
    setSelectedSortedValue: (state, action) => {
      state.selectedSortedValue = action.payload;
    },
    setUpdatedTournament: (state, action) => {
      state.updatedTournament = action.payload;
    },
    setUpdateSelectedTournament: (state, action) => {
      const findTournamentIndex = state.allTournaments.findIndex(
        (x) => x.id == action.payload.id
      );
      state.allTournaments[findTournamentIndex] = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setAllTournaments,
  setIncreasePoint,
  setDecreasePoint,
  setDeleteSelectedTournament,
  setSelectedSortedValue,
  setUpdatedTournament,
  setUpdateSelectedTournament,
} = tournamentSlice.actions;

export default tournamentSlice.reducer;
