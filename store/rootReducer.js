import { combineReducers } from "@reduxjs/toolkit";

import tournamentSlice from "./tournamentStore";

const createReducer = combineReducers({
  tournamentSlice,
});

export default createReducer;
