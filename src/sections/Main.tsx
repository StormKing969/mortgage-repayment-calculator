import React, { useState } from "react";
import { calculateAmount } from "../utils/caculations.ts";
import type { calculationResultType, loanValuesType } from "../types";

type mortgageOptions = "repayment" | "interestOnly" | "";

const Main = () => {
  const [loanValues, setLoanValues] = useState<loanValuesType>({
    amount: 0,
    term: 0,
    interest: 0,
  });
  const [calculations, setCalculations] = useState<calculationResultType>({
    totalAmount: "",
    monthlyPayment: "",
    totalInterest: "",
  });
  const [calculated, setCalculated] = useState<boolean>(false);
  const [requestType, setRequestType] = useState<mortgageOptions>("");
  const [error, setError] = useState<boolean>(false);

  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    if (/^\d*\.?\d*$/.test(value)) {
      setLoanValues({
        ...loanValues,
        [name]: value,
      });
    }
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      Number(loanValues.amount) <= 0 ||
      Number(loanValues.term) <= 0 ||
      Number(loanValues.interest) < 0 ||
      requestType === ""
    ) {
      console.error("Missing required fields");
      setError(true);
      return;
    } else {
      setError(false);
    }

    try {
      const returnObj = await calculateAmount(loanValues);
      setCalculations(returnObj);
      setCalculated(true);
    } catch (error) {
      console.log(error);
      setCalculated(false);
    }
  };

  const handleClearAll = () => {
    setLoanValues({
      amount: 0,
      term: 0,
      interest: 0,
    });
  };

  console.log(loanValues);

  return (
    <div
      className={
        "bg-white flex flex-col md:flex-row justify-evenly md:shadow-[0_15px_35px_rgba(0,0,0,0.45)] md:rounded-2xl md:max-w-[1080px]"
      }
    >
      <section className={"py-6 px-4 md:px-8 md:rounded-l-2xl md:min-w-1/2"}>
        <div
          className={
            "flex flex-col items-start md:items-center md:flex-row md:justify-between"
          }
        >
          <h1 className={"font-bold text-3xl mb-2"}>Mortgage Calculator</h1>
          <button
            className={
              "underline cursor-pointer text-neutral-500 font-semibold"
            }
            onClick={handleClearAll}
          >
            Clear All
          </button>
        </div>

        <form onSubmit={handleOnSubmit}>
          <div className={"form-input"}>
            <label>Mortgage Amount</label>
            <div
              className={`input-area-modification-1 ${error && loanValues.amount <= 0 ? "error-display" : ""}`}
            >
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                name="amount"
                value={loanValues.amount != 0 ? loanValues.amount : ""}
                onChange={handleInputs}
              />
              <div>
                <span>$</span>
              </div>
            </div>
            <p
              className={`${error && loanValues.amount <= 0 ? "text-red-500 text-sm mt-1 font-semibold" : "hidden"}`}
            >
              This field is required
            </p>
          </div>

          <div className={"md:flex md:flex-row md:justify-between md:gap-4"}>
            <div className={"form-input"}>
              <label>Mortgage Term</label>
              <div
                className={`input-area-modification-2 ${error && loanValues.term <= 0 ? "error-display" : ""}`}
              >
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="term"
                  value={loanValues.term != 0 ? loanValues.term : ""}
                  onChange={handleInputs}
                />
                <div>
                  <span>years</span>
                </div>
              </div>
              <p
                className={`${error && loanValues.term <= 0 ? "text-red-500 text-sm mt-1 font-semibold" : loanValues.interest <= 0 ? "text-white" : "hidden"}`}
              >
                This field is required
              </p>
            </div>

            <div className={"form-input"}>
              <label>Interest Rate</label>
              <div
                className={`input-area-modification-2 ${error && loanValues.interest <= 0 ? "error-display" : ""}`}
              >
                <input
                  type="text"
                  inputMode="decimal"
                  pattern="^\d+(\.\d{0,3})?$"
                  name="interest"
                  value={loanValues.interest != 0 ? loanValues.interest : ""}
                  onChange={handleInputs}
                />
                <div>
                  <span>%</span>
                </div>
              </div>
              <p
                className={`${error && loanValues.interest <= 0 ? "text-red-500 text-sm mt-1 font-semibold" : loanValues.term <= 0 ? "text-white" : "hidden"}`}
              >
                This field is required
              </p>
            </div>
          </div>

          <div className={"flex flex-col justify-center w-full pt-4"}>
            <h2
              className={
                "leading-tight font-semibold text-xl text-neutral-500 mb-3"
              }
            >
              Mortgage Type
            </h2>

            <div
              className={"flex flex-col justify-center w-full gap-2 text-lg"}
            >
              <label
                className={`radio-button ${requestType === "repayment" ? "bg-[#d5e21b] opacity-80" : ""}`}
              >
                <input
                  type="radio"
                  name="mortgageType"
                  value={requestType}
                  className={"mr-4"}
                  onChange={() => setRequestType("repayment")}
                />
                <span className={"font-bold text-lg"}>Repayment</span>
              </label>
              <label
                className={`radio-button ${requestType === "interestOnly" ? "bg-[#d5e21b] opacity-80" : ""}`}
              >
                <input
                  type="radio"
                  name="mortgageType"
                  value={requestType}
                  className={"mr-4"}
                  onChange={() => setRequestType("interestOnly")}
                />
                <span className={"font-bold text-lg"}>Interest Only</span>
              </label>
              <p
                className={`${error && requestType === "" ? "text-red-500 text-sm mt-1 font-semibold" : "hidden"}`}
              >
                This field is required
              </p>
            </div>
          </div>

          <button
            type="submit"
            className={
              "rounded-full bg-[#d5e21b] mt-6 py-4 px-8 flex flex-row gap-2 mx-auto cursor-pointer"
            }
          >
            <img src={"/icon-calculator.svg"} alt={"Calculator"} />
            <span className={"font-bold text-xl"}>Calculate Repayments</span>
          </button>
        </form>
      </section>

      <section
        className={
          "bg-[#0e7f7b] px-4 py-6 md:px-8 md:rounded-r-2xl md:rounded-bl-[80px]"
        }
      >
        {calculated ? (
          <div className={"flex flex-col justify-center gap-4 h-full"}>
            <h1 className={"text-4xl font-bold text-white"}>Your results</h1>
            <p className={"text-lg text-neutral-300 mb-4"}>
              Your results are shown below based on the information you
              provided. To adjust the results, edit the form and click
              "calculate repayments" again
            </p>

            <div
              className={
                "flex flex-col gap-3 rounded-xl p-4 bg-[#054c54] border-t-4 border-t-[#c4e560] shadow-[0_15px_35px_rgba(0,0,0,0.45)]"
              }
            >
              {requestType === "repayment" ? (
                <>
                  <p className={"text-neutral-300"}>Your monthly repayments</p>
                  <span className={"text-[#c4e560] font-bold text-4xl"}>
                    ${calculations.monthlyPayment}
                  </span>
                </>
              ) : (
                <>
                  <p className={"text-neutral-300"}>Your total interest</p>
                  <span className={"text-[#c4e560] font-bold text-4xl"}>
                    ${calculations.totalInterest}
                  </span>
                </>
              )}
              <hr className={"border-neutral-300"} />
              <p className={"text-neutral-300"}>
                Total you'll repay over the term
              </p>
              <span className={"text-white font-bold text-2xl"}>
                ${calculations.totalAmount}
              </span>
            </div>
          </div>
        ) : (
          <div
            className={
              "flex flex-col items-center justify-center gap-4 text-center h-full"
            }
          >
            <img
              src={"/illustration-empty.svg"}
              alt={"Illustration Empty"}
              className={"w-1/2 md:w-2/5 mx-auto"}
            />
            <h1 className={"text-white font-bold text-4xl"}>
              Results shown here
            </h1>
            <p className={"text-lg text-neutral-300"}>
              Complete the form and click "calculate repayments" to see what
              your monthly repayments would be.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Main;