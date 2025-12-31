import type { loanValuesType } from "../types";

export const calculateAmount = async ({
  amount,
  term,
  interest,
}: loanValuesType) => {
  const P = Number(amount);
  const r = Number(interest) / 100 / 12; // monthly rate
  const n = Number(term) * 12; // total payments

  // Zero-interest case
  if (r === 0) {
    const monthlyPayment = P / n;
    return {
      totalAmount: P.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: "0.00",
    };
  }

  // Standard amortized mortgage formula
  let monthlyPayment =
    P * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));

  let totalAmount = monthlyPayment * n;
  let totalInterest = totalAmount - P;

  if (Number.isNaN(totalInterest)) {
    totalAmount = 0;
  }

  if (Number.isNaN(totalInterest)) {
    totalInterest = 0;
  }

  if (Number.isNaN(monthlyPayment)) {
    monthlyPayment = 0;
  }

  return {
    totalAmount: formatNumber(totalAmount),
    monthlyPayment: formatNumber(monthlyPayment),
    totalInterest: formatNumber(totalInterest),
  };
};

const formatNumber = (num: number | bigint) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);