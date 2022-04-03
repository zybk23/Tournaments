import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactDom from "react-dom";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import moment from "moment";
import styles from "../styles/editTournamentModal.module.scss";
import { setUpdateSelectedTournament } from "../store/tournamentStore";

const UpdateTournamentModal = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const { updatedTournament } = useSelector((state) => state.tournamentSlice);

  const [name, setName] = useState("");
  const [ownerId, setOwnerId] = useState(uuidv4());
  const [ownerUsername, setOwnerUserName] = useState("");
  const [ownerAvatar, setOwnerAvatar] = useState("");
  const [deadline, setDeadline] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [isBrowser, setIsBrowser] = useState(false);

  const handleChangeDeadLine = (e) => {
    setDeadline(e.target.value);
  };

  const handleCloseDialog = (e) => {
    onClose();
    resetAllState();
  };

  const resetAllState = () => {
    setName("");
    setOwnerUserName("");
    setOwnerId(uuidv4());
    setOwnerAvatar("");
    setDeadline(moment(new Date()).format("YYYY-MM-DD"));
  };

  const handleUpdateNewTournament = (e) => {
    e.preventDefault();
    const obj = {
      id: updatedTournament?.id,
      name: name,
      deadline: moment(deadline).format(),
      waitlistParticipantsCount: updatedTournament?.waitlistParticipantsCount,
      owner: {
        avatar: ownerAvatar,
        id: ownerId,
        username: ownerUsername,
        __typename: "User",
      },
    };

    dispatch(setUpdateSelectedTournament(obj));
    toast.success("New tournament added succussfully", { autoClose: 1500 });
    handleCloseDialog();
  };

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    setName(updatedTournament?.name);
    setOwnerUserName(updatedTournament?.owner?.username);
    setOwnerId(updatedTournament?.owner?.id);
    setOwnerAvatar(updatedTournament?.owner?.avatar);
    setDeadline(moment(updatedTournament?.deadline).format("YYYY-MM-DD"));
  }, [updatedTournament]);
  const modalContent = show ? (
    <div className={styles.modalOverlay}>
      <div className={styles.updateTournamentContaner}>
        <div className={styles.updateFormContainer}>
          <div className={styles.updateFormTitle}>Update</div>
          <form onSubmit={handleUpdateNewTournament} action="#">
            <div className={styles.updateFormUserDetails}>
              <div className={styles.updateFormInputBox}>
                <span className={styles.updateFormDetails}>Name</span>
                <input
                  value={name}
                  minLength={4}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className={styles.updateFormInputBox}>
                <span className={styles.updateFormDetails}>Owner Id</span>
                <input
                  value={ownerId}
                  minLength={4}
                  onChange={(e) => setOwnerId(e.target.value)}
                  type="text"
                  disabled
                />
              </div>
              <div className={styles.updateFormInputBox}>
                <span className={styles.updateFormDetails}>Owner Username</span>
                <input
                  value={ownerUsername}
                  onChange={(e) => setOwnerUserName(e.target.value)}
                  type="text"
                  placeholder="Enter your owner username"
                  required
                />
              </div>
              <div className={styles.updateFormInputBox}>
                <span className={styles.updateFormDetails}>Owner Avatar</span>
                <input
                  value={ownerAvatar}
                  onChange={(e) => setOwnerAvatar(e.target.value)}
                  type="text"
                  placeholder="Enter your owner avatar url"
                  required
                />
              </div>
              <div className={styles.updateFormInputBox}>
                <span className={styles.updateFormDetails}>Deadline</span>
                <input
                  value={deadline}
                  onChange={handleChangeDeadLine}
                  type="date"
                  placeholder="Enter your owner username"
                  required
                />
              </div>
            </div>
            <div className={styles.updateFormButton}>
              <input type="submit" value="Save" />
              <input onClick={handleCloseDialog} type="button" value="Cancel" />
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDom.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

export default React.memo(UpdateTournamentModal);
