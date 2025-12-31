export interface loanValuesType {
  amount: number | string;
  term: number | string;
  interest: number | string;
}

export interface calculationResultType {
  totalAmount: string;
  monthlyPayment: string;
  totalInterest: string;
}