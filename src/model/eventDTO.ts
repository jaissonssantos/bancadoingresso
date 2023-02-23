import type { IGroup } from './groupDTO';

export interface IFees {
  id: string;
  allowCreditCardPayment: boolean;
  debit: number | null;
  credit: number | null;
  bankSlip: number;
  pix: number;
  installments: number;
  administrateTax: number;
  fee: number;
}

export interface IPayment {
  installmentLimit: number;
  allowFractionalPayment: boolean;
  allowPaymentBankSlip: boolean;
  allowPaymentPIX: boolean;
  allowContactlessPayment: boolean;
  fees: IFees;
}

export interface ITickets {
  id: string;
  name: string;
  value: number;
  unitValue?: number;
  count: number;
  isHalfPrice: boolean;
  quantity: number;
  totalPrice: number;
  payment: IPayment;
}

export interface ISection {
  id: string;
  name: string;
  description: string;
}

export interface ISections {
  section: ISection;
  group: IGroup[];
  tickets: ITickets[];
}

export interface IEvent {
  id: string;
  name: string;
  eventPlace?: string;
  startDate?: string;
  endDate?: string;
  censure?: number;
  imagePosBase64?: string;
  sections: ISections[];
}
