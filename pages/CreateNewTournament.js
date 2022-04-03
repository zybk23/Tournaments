import React, { useState } from "react";
import styles from "../styles/createNewTournament.module.scss";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import moment from "moment";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import { useRouter } from "next/router";

const CreateNewTournament = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [alias, setAlias] = useState("");
  const [ownerId, setOwnerId] = useState(uuidv4());
  const [ownerUsername, setOwnerUserName] = useState("");
  const [ownerAvatar, setOwnerAvatar] = useState("");
  const [deadline, setDeadline] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleChangeDeadLine = (e) => {
    setDeadline(e.target.value);
  };

  const resetAllState = () => {
    setName("");
    setAlias("");
    setOwnerUserName("");
    setOwnerId(uuidv4());
    setOwnerAvatar("");
    setDeadline(moment(new Date()).format("YYYY-MM-DD"));
  };

  const handleCreateNewTournament = (e) => {
    e.preventDefault();
    const obj = {
      id: ownerId,
      name: name,
      deadline: moment(deadline).format(),
      waitlistParticipantsCount: 0,
      owner: {
        avatar: ownerAvatar,
        id: uuidv4(),
        username: ownerUsername,
        __typename: "User",
      },
    };
    let localTournaments = localStorage.getItem("tournaments");
    localTournaments = JSON.parse(localTournaments);
    if (localTournaments) {
      localTournaments.push(obj);
    } else {
      localTournaments = [];
      localTournaments.push(obj);
    }
    localStorage.setItem("tournaments", JSON.stringify(localTournaments));
    resetAllState();
    toast.success("New tournament added succussfully", { autoClose: 1500 });
    handleCloseModal();
    router.push("/");
  };

  return (
    <>
      <Navbar />
      <div className={styles.createTournamentContaner}>
        <div className={styles.createFormContainer}>
          <div className={styles.createFormTitle}>Add New</div>
          <form onSubmit={handleOpenModal} action="#">
            <div className={styles.createFormUserDetails}>
              <div className={styles.createFormInputBox}>
                <span className={styles.createFormDetails}>Name</span>
                <input
                  value={name}
                  minLength={4}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className={styles.createFormInputBox}>
                <span className={styles.createFormDetails}>Alias</span>
                <input
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  type="text"
                  placeholder="Enter your alias"
                  required
                />
              </div>
              <div className={styles.createFormInputBox}>
                <span className={styles.createFormDetails}>Owner Id</span>
                <input
                  value={ownerId}
                  minLength={4}
                  onChange={(e) => setOwnerId(e.target.value)}
                  type="text"
                  disabled
                />
              </div>
              <div className={styles.createFormInputBox}>
                <span className={styles.createFormDetails}>Owner Username</span>
                <input
                  value={ownerUsername}
                  onChange={(e) => setOwnerUserName(e.target.value)}
                  type="text"
                  placeholder="Enter your owner username"
                  required
                />
              </div>
              <div className={styles.createFormInputBox}>
                <span className={styles.createFormDetails}>Owner Avatar</span>
                <input
                  value={ownerAvatar}
                  onChange={(e) => setOwnerAvatar(e.target.value)}
                  type="text"
                  placeholder="Enter your owner avatar url"
                  required
                />
              </div>
              <div className={styles.createFormInputBox}>
                <span className={styles.createFormDetails}>Deadline</span>
                <input
                  value={deadline}
                  onChange={handleChangeDeadLine}
                  type="date"
                  placeholder="Enter your owner username"
                  required
                />
              </div>
            </div>
            <div className={styles.createFormButton}>
              <input type="submit" value="Add" />
            </div>
          </form>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        handleClickSuccess={handleCreateNewTournament}
      >
        Are you sure about to delete this tournament?
      </Modal>
    </>
  );
};

export default CreateNewTournament;
