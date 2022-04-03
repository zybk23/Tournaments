import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import ArrowLeft from "../assets/images/arrowLeft.png";
import ArrowRight from "../assets/images/arrowRight.png";

const Pagination = ({ currentPage, setCurrentPage, pages }) => {
  let pageNumberLimit = 7;
  const [maxPageNumberLimitFirstPart, setMaxPageNumberLimitFirstPart] =
    useState(7);
  const [minPageNumberLimitFirstPart, setMinpageNumberLimitFirstPart] =
    useState(0);
  const [maxPageNumberLimitSecondPart, setMaxPageNumberLimitSecondPart] =
    useState(pages.length);
  const [minPageNumberLimitSecondPart, setMinpageNumberLimitSecondPart] =
    useState(pages.length - 1);

  const handleClickPrevButton = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
    if (minPageNumberLimitFirstPart >= 10) {
      if ((currentPage - 1) % minPageNumberLimitFirstPart == 0) {
        setMaxPageNumberLimitFirstPart(
          maxPageNumberLimitFirstPart - pageNumberLimit
        );
        setMinpageNumberLimitFirstPart(
          minPageNumberLimitFirstPart - pageNumberLimit
        );
      }
    } else {
      if (currentPage - 1 === minPageNumberLimitFirstPart) {
        setMaxPageNumberLimitFirstPart(
          maxPageNumberLimitFirstPart - pageNumberLimit
        );
        setMinpageNumberLimitFirstPart(
          minPageNumberLimitFirstPart - pageNumberLimit
        );
      }
    }
  };

  const handleClickNextButton = () => {
    if (currentPage === pages.length) {
      return;
    }
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimitFirstPart) {
      setMaxPageNumberLimitFirstPart(
        maxPageNumberLimitFirstPart + pageNumberLimit
      );
      setMinpageNumberLimitFirstPart(
        minPageNumberLimitFirstPart + pageNumberLimit
      );
    }
  };

  const handleClickPageNumber = (e) => {
    const id = Number(e.target.id);
    setCurrentPage(id);
    if (id > pages.length - 3) {
      setMinpageNumberLimitFirstPart(id - 6);
      setMaxPageNumberLimitFirstPart(id + 1);
    }
  };

  useEffect(() => {
    setMaxPageNumberLimitSecondPart(pages.length);
    setMinpageNumberLimitSecondPart(pages.length - 1);
  }, [pages]);

  return (
    <StyledPaginationContainer>
      <StyledPaginationItemContainer onClick={handleClickPrevButton}>
        <Image src={ArrowLeft} alt="" />
      </StyledPaginationItemContainer>
      {pages.map((item, index) => (
        <React.Fragment key={index}>
          {item < maxPageNumberLimitFirstPart + 1 &&
            item > minPageNumberLimitFirstPart &&
            (item === pages.length ? null : (
              <StyledPaginationItemContainer
                id={item}
                onClick={handleClickPageNumber}
                bordercolor={currentPage === item && "#1BA1FB"}
              >
                {item}
              </StyledPaginationItemContainer>
            ))}
          {item === pages.length - 1 && currentPage < pages.length - 5 ? (
            <PaginationContinue>{"....."}</PaginationContinue>
          ) : null}
          {item < maxPageNumberLimitSecondPart + 1 &&
            item > minPageNumberLimitSecondPart && (
              <StyledPaginationItemContainer
                id={item}
                onClick={handleClickPageNumber}
                bordercolor={currentPage === item && "#1BA1FB"}
              >
                {item}
              </StyledPaginationItemContainer>
            )}
        </React.Fragment>
      ))}
      <StyledPaginationItemContainer onClick={handleClickNextButton}>
        <Image src={ArrowRight} alt="" />
      </StyledPaginationItemContainer>
    </StyledPaginationContainer>
  );
};

const StyledPaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 33px;
  margin-top: 24px;
`;

const PaginationContinue = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-right: 12px;
`;

const StyledPaginationItemContainer = styled.div`
  cursor: pointer;
  width: 33px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 20px;
  color: #646464;
  padding: 5px;
  border-radius: 9px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-color: ${(p) => p.bordercolor};
  margin-right: 13.2px;
`;

export default React.memo(Pagination);
