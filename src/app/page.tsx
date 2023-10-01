"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import cardFront from "../images/bg-card-front.png";
import cardBack from "../images/bg-card-back.png";

import cardLogo from "../images/card-logo.svg";

import desktopImg from "../images/bg-main-desktop.png";
import mobileImg from "../images/bg-main-mobile.png";
import thanksImg from "../images/icon-complete.svg";

import CustomModal from "./CustomModal";

export default function Home() {
  const imageUrl = useWindowWidth() >= 650 ? desktopImg : mobileImg;

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");

  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isNumberEmpty, setIsNumberEmpty] = useState(false);
  const [isMonthEmpty, setIsMonthEmpty] = useState(false);
  const [isYearEmpty, setIsYearEmpty] = useState(false);
  const [isCvvEmpty, setIsCvvEmpty] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const formatCardNumber = (input: string) => {
    const numericValue = input.replace(/\D/g, "");

    const formattedValue = numericValue.match(/.{1,4}/g)?.join(" ");

    return formattedValue;
  };

  function containAlphabet(inputString: string) {
    return /^[0-9]+$/.test(inputString);
  }

  function ChangeNumber(e: ChangeEvent<HTMLInputElement>) {
    let cardNumber = e.target.value;

    if (containAlphabet(cardNumber)) {
      setNumber(cardNumber);
    }
  }

  function changeMonth(e: ChangeEvent<HTMLInputElement>) {
    let cardMonth = e.target.value;

    if (containAlphabet(cardMonth)) {
      const numericValue = parseInt(cardMonth);

      if (numericValue > 12) {
        cardMonth = "12";
      }
      setMonth(cardMonth);
    }
  }

  function ChangeYear(e: ChangeEvent<HTMLInputElement>) {
    let cardYear = e.target.value;

    if (containAlphabet(cardYear)) {
      setYear(cardYear);
    }
  }

  function ChangeCvv(e: ChangeEvent<HTMLInputElement>) {
    let cardcvv = e.target.value;

    if (containAlphabet(cardcvv)) {
      setCvv(cardcvv);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (number === "") {
      console.log("number empity");
      setIsNumberEmpty(true);
    }

    if (name === "") {
      console.log("name empity");
      setIsNameEmpty(true);
    }

    if (month === "") {
      console.log("month empity");
      setIsMonthEmpty(true);
    }

    if (year === "") {
      console.log("year empity");
      setIsYearEmpty(true);
    }

    if (cvv === "") {
      console.log("cvv empity");
      setIsCvvEmpty(true);
    }
    setIsModalOpen(true)
  }

  return (
    <>
      <main className="flex flex-col gap-10 md:flex-row md:gap-0  ">
        <section className=" img-container">
          <img src={imageUrl.src} alt="background Image" className="bg-img" />

          <img src={cardBack.src} alt="Card back side" className="cardBack" />
          <p className="cardCvv fs-small">
            <span className={`${cvv.length >= 1 ? "hidden" : "block"}`}>
              000
            </span>
            {cvv}
          </p>
          <img
            src={cardFront.src}
            alt="Card front side"
            className="cardFront"
          />
          <img
            src={cardLogo.src}
            alt="crdit card company log"
            className="cardLogo"
          />
          <h2 className="cardNumber">
            <span className={`${number.length >= 1 ? "hidden" : "block"}`}>
              0000 0000 0000 0000
            </span>
            {formatCardNumber(number)}
          </h2>
          <p className="cardUsername fs-small">
            <span className={`${name.length >= 1 ? "hidden" : "block"}`}>
              Jane Appleseed
            </span>
            {name}
          </p>
          <p className="cardExpiryDate fs-small">
            <span className={`${month.length >= 1 ? "hidden" : "block"}`}>
              00/00
            </span>
            <span className={`${month.length >= 1 ? "block" : "hidden"}`}>
              {month}/{year}
            </span>
          </p>
        </section>

        <section className="form-container max-w-sm mx-auto mb-10 md:max-w-lg">
          <form className="form-spacing  ">
            <div className="flex flex-col mt-5">
              <label className="form-spacing">CARDHOLDER NAME</label>
              <input
                className={`input-field px-4 py-2 rounded-md ${
                  isNameEmpty ? "input-border-red" : ""
                }`}
                placeholder="e.g. Jane Appleseed"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
                type="name"
              />
              <span
                className={`${isNameEmpty ? "block" : "hidden"} text-red-500`}
              >
                Can't be blank
              </span>
            </div>

            <div className="flex flex-col mt-5">
              <label>CARD NUMBER</label>
              <input
                className={`input-field px-4 py-2 rounded-md ${
                  isNumberEmpty ? "input-border-red" : ""
                }`}
                placeholder="e.g. 0000 0000 0000 0000"
                value={number}
                maxLength={16}
                type="text"
                pattern="\d*"
                onChange={ChangeNumber}
              />
              <span
                className={`${isNumberEmpty ? "block" : "hidden"} text-red-500`}
              >
                Can't be blank
              </span>
            </div>

            <div className="flex justify-between mt-5">
              <label>EXP. DATE (MM/YY)</label>
              <label className="mr-28 lg:mr-36">CVC</label>
            </div>

            <div className="flex  justify-between">
              <div className=" flex gap-2">
                <div className="flex flex-col">
                  <input
                    className={`input-field input-sm px-3 py-2 rounded-md ${
                      isMonthEmpty ? "input-border-red" : ""
                    }`}
                    placeholder="MM"
                    value={month}
                    onChange={changeMonth}
                    maxLength={2}
                  />
                  <span
                    className={` ${
                      isMonthEmpty ? "block" : "hidden"
                    } text-red-500`}
                  >
                    Can't be blank
                  </span>
                </div>

                <div className="flex flex-col">
                  <input
                    className={`input-field input-sm px-3 py-2 rounded-md ${
                      isYearEmpty ? "input-border-red" : ""
                    }`}
                    placeholder="YY"
                    value={year}
                    onChange={ChangeYear}
                    maxLength={2}
                  />
                  <span
                    className={` ${
                      isYearEmpty ? "block" : "hidden"
                    } text-red-500`}
                  >
                    Can't be blank
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <input
                  className={`input-field input-lg px-4 py-2 rounded-md ${
                    isCvvEmpty ? "input-border-red" : ""
                  }`}
                  placeholder="e.g. 123"
                  value={cvv}
                  onChange={ChangeCvv}
                  maxLength={3}
                />
                <span
                  className={` ${
                    isYearEmpty ? "block" : "hidden"
                  } text-red-500`}
                >
                  Can't be blank
                </span>
              </div>
            </div>
            {/* <div className="flex gap-10">


               
                </div>
                */}

            <div className="flex ">
              <button
                type="button"
                // onClick={openModal}
                onClick={handleSubmit}
                className="grow px-2 py-2 btn-color mt-5 rounded-md"
              >
                Confirm
              </button>
              <CustomModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="ThankYou-Modal"
              >
                <main className="thanks-modal flex flex-col gap-5 items-center">
                  <img src={thanksImg.src} alt="thanksIcon" className="w-20 " />
                  <h1 className="text-center text-xl">THANK YOU!</h1>
                  <p className="text-center fs-small text-slate-500">
                    We've added your card details
                  </p>
                </main>
              </CustomModal>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return windowWidth;
};
