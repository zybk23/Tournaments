import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import Pagination from "./Pagination";
import {
  setIncreasePoint,
  setDecreasePoint,
  setDeleteSelectedTournament,
  setUpdatedTournament,
} from "../store/tournamentStore";
import DeleteModal from "./Modal";
import UpdateTournamentModal from "./UpdateTournamentModal";
import { toast } from "react-toastify";
import moment from "moment";

const TournamentCard = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [isShowDeleteButtonId, setIsShowDeleteButtonId] = useState(null);
  const [selectedTournamentId, setSelectedTournamentId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditTournamentModal, setShowEditTournamentModal] = useState(false);

  const { allTournaments, selectedSortedValue } = useSelector(
    (state) => state.tournamentSlice
  );

  let filteredTournaments = [...allTournaments];

  //Sort all data from most voted to less voted and if vote count is same then sort as last vote date

  if (selectedSortedValue == 1) {
    filteredTournaments = filteredTournaments.sort((a, b) => {
      return b.waitlistParticipantsCount - a.waitlistParticipantsCount;
    });
    filteredTournaments = filteredTournaments.sort((a, b) => {
      if (a.waitlistParticipantsCount == b.waitlistParticipantsCount)
        return moment(b.lastVoteDate).unix() - moment(a.lastVoteDate).unix();
    });
  }

  //Sort all data from less voted to more voted and if vote count is same then sort as last vote date

  if (selectedSortedValue == 2) {
    filteredTournaments = filteredTournaments.sort(
      (a, b) => a.waitlistParticipantsCount - b.waitlistParticipantsCount
    );
    filteredTournaments = filteredTournaments.sort((a, b) => {
      if (a.waitlistParticipantsCount == b.waitlistParticipantsCount)
        return moment(b.lastVoteDate).unix() - moment(a.lastVoteDate).unix();
    });
  }

  let itemsPerPage = 6;
  const pages = [];

  for (
    let i = 1;
    i <= Math.ceil(filteredTournaments.length / itemsPerPage);
    i++
  ) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentData = filteredTournaments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleOpenEditTournamentModal = (item) => {
    setShowEditTournamentModal(true);
    dispatch(setUpdatedTournament(item));
  };

  const handleCloseEditTournamentModel = () => {
    setShowEditTournamentModal(false);
  };

  const handleIncreasePoint = (tournamentId) => {
    dispatch(setIncreasePoint(tournamentId));
    toast.success("You vote successfully", { autoClose: 1000 });
  };
  const handleDecreasePoint = (item) => {
    dispatch(setDecreasePoint(item.id));
    if (item.waitlistParticipantsCount > 0) {
      toast.warning("Your vote has been withdrawn", { autoClose: 1000 });
    }
  };

  const handleOpenDeleteModal = (id) => {
    setSelectedTournamentId(id);
    setShowModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowModal(false);
  };

  const handleDeleteSelectedTournament = () => {
    dispatch(setDeleteSelectedTournament(selectedTournamentId));
    toast.success("Tournament deleted successfully", { autoClose: 1500 });
    handleCloseDeleteModal();
  };

  return (
    <StyledLayoutContentContainer>
      {currentData.length > 0 &&
        currentData.map((item, index) => (
          <StyledCardContainer
            onMouseEnter={() => setIsShowDeleteButtonId(item.id)}
            onMouseLeave={() => setIsShowDeleteButtonId(null)}
            key={index}
          >
            <StyledCardImageContainer>
              <StyledCardImage
                className="card-image"
                src={item.owner.avatar}
                alt=""
              />
            </StyledCardImageContainer>
            <StyledCardBottomContainer>
              <StyledCardInfoContainer>
                <StyledText fontweight="bold">
                  {item.name.slice(0, 30)}
                </StyledText>
                <StyledText>{item.owner.username}</StyledText>
                <StyledText>
                  {moment(item.deadline).format("YYYY-MM-DD")}
                </StyledText>
                <StyledText>{item.lastVoteDate}</StyledText>
              </StyledCardInfoContainer>
              <StyledVoteContainer>
                <StyledVoteText fontweight="bold">
                  {item.waitlistParticipantsCount}
                </StyledVoteText>
                <StyledVoteText>Vote</StyledVoteText>
              </StyledVoteContainer>
              <StyledButtonsContainer>
                <StyledButton onClick={() => handleIncreasePoint(item.id)}>
                  Up
                </StyledButton>
                <StyledButton onClick={() => handleDecreasePoint(item)}>
                  Down
                </StyledButton>
                <StyledButton
                  onClick={() => handleOpenEditTournamentModal(item)}
                  backgrouncolor="#E35A42"
                >
                  Update
                </StyledButton>
                {isShowDeleteButtonId === item.id && (
                  <StyledButton
                    onClick={() => handleOpenDeleteModal(item.id)}
                    backgrouncolor="#E35A42"
                  >
                    Delete
                  </StyledButton>
                )}
              </StyledButtonsContainer>
            </StyledCardBottomContainer>
          </StyledCardContainer>
        ))}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
      />
      <DeleteModal
        show={showModal}
        onClose={handleCloseDeleteModal}
        handleClickSuccess={handleDeleteSelectedTournament}
      >
        Are you sure about to delete this tournament?
      </DeleteModal>
      <UpdateTournamentModal
        show={showEditTournamentModal}
        onClose={handleCloseEditTournamentModel}
      />
    </StyledLayoutContentContainer>
  );
};

const StyledLayoutContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 800px;
  width: 100%;
  height: 100%;
  margin-top: 8px;
  @media screen and (max-width: 584px) {
    padding: 8px;
  }
`;

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 31.33%;
  height: 320px;
  margin-left: 2%;
  margin-top: 8px;

  @media screen and (max-width: 768px) {
    width: 48%;
  }
  @media screen and (max-width: 584px) {
    width: 100%;
    margin-left: 0;
  }
`;

const StyledCardImageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 40%;
`;

const StyledCardImage = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledCardBottomContainer = styled(StyledCardImageContainer)`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #eadfdf;
  height: 60%;
  padding: 0 12px 12px 12px;
`;

const StyledCardInfoContainer = styled(StyledCardBottomContainer)`
  align-items: flex-start;
  padding: 4px;
  justify-content: flex-start;
  height: 80px;
  background-color: #fff;
`;

const StyledText = styled.p`
  font-size: 12px;
  font-weight: ${(p) => p.fontweight || "normal"};
  margin-top: 2px;
`;

const StyledVoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #cfc6c6;
  padding: 8px;
  border-radius: 8px;
`;

const StyledVoteText = styled.span`
  font-size: 13px;
  font-weight: ${(p) => p.fontweight || "normal"};
`;

const StyledButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  height: 28px;
  padding: 8px;
  background-color: ${(p) => p.backgrouncolor || "#fff"};
  border-radius: 6px;
  border: 1px solid gray;
  cursor: pointer;
`;

export default React.memo(TournamentCard);
