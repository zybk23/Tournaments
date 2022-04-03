import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import TournamentCard from "../components/TournamentCard";
import styles from "../styles/layout.module.scss";
import { setSelectedSortedValue } from "../store/tournamentStore";

const Layout = () => {
  const dispatch = useDispatch();
  const selectedSortedValue = useSelector(
    (state) => state.tournamentSlice.selectedSortedValue
  );
  const handleChangeOrderValue = (e) => {
    dispatch(setSelectedSortedValue(e.target.value));
  };
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.selectionContainer}>
        <select value={selectedSortedValue} onChange={handleChangeOrderValue}>
          <option value={1}>order by most voted</option>
          <option value={2}>order by less voted</option>
        </select>
      </div>
      <TournamentCard />
    </div>
  );
};

export default memo(Layout);
