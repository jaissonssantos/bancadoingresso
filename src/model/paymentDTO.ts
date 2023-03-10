export enum PaymentType {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  CASH = 'CASH',
  PIX = 'PIX',
}

export enum IPaymentStatus {
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  PAID = 'PAID',
}

export interface IPayment {
  id?: string;
  hash?: string;
  type?: PaymentType;
  amount: number;
  status: IPaymentStatus;
  amountPaid?: number;
}
