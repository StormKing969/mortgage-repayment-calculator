export interface loanValuesType {
  amount: number ;
  term: number ;
  interest: number ;
}

export interface calculationResultType {
  totalAmount: string;
  monthlyPayment: string;
  totalInterest: string;
}