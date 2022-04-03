import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/navbar.module.scss";
import Img from "../assets/images/logo.png";

const Navbar = () => {
  const [screenSize, getDimension] = useState(null);
  const [showNavbarBottom, setShowNavbarBottom] = useState(true);

  const setDimension = () => {
    getDimension(window.innerWidth);
  };

  useEffect(() => {
    getDimension(window.innerWidth);
  }, []);
  useEffect(() => {
    window.addEventListener("resize", setDimension);

    if (screenSize <= 786) {
      setShowNavbarBottom(true);
    } else {
      setShowNavbarBottom(false);
    }

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);
  return (
    <>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>
          <Image src={Img} alt="" />
        </div>
        <div className={styles.navbarButtonsContainer}>
          <Link href="/">
            <a className={styles.navbarButton}>Tournaments Listing</a>
          </Link>
          <Link href="/CreateNewTournament">
            <a className={styles.navbarButton}>Add New</a>
          </Link>
          <Link href="#">
            <a className={styles.navbarButton}>Sign In</a>
          </Link>
        </div>
      </div>
      {showNavbarBottom && (
        <div className={styles.navbarBottomContainer}>
          <div className={styles.navbarLogo}>
            <Image src={Img} alt="" />
          </div>
          <div className={styles.navbarButtonsContainer}>
            <Link href="/">
              <a className={styles.navbarButton}>Tournaments Listing</a>
            </Link>
            <Link href="/CreateNewTournament">
              <a className={styles.navbarButton}>Add New</a>
            </Link>
            <Link href="#">
              <a className={styles.navbarButton}>Sign In</a>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
