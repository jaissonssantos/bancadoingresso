export enum PAYMENT_TYPES {
  TYPE_CASH = 0,
  TYPE_CREDITO = 1,
  TYPE_DEBITO = 2,
  TYPE_PIX = 5,
}

export interface OrderTicket {
  eventId: string;
  ticketId?: string;
  productId?: string;
  comboId?: string;
  unitValue: number;
  fee: number;
  totalValue: number;
  isHalfPrice: boolean;
  qrCodeTicket: string;
}

export interface OrderPayment {
  message?: string;
  errorCode?: string;
  transactionCode?: string;
  transactionId?: string;
  date?: string;
  time?: string;
  hostNsu?: string;
  cardBrand?: string;
  bin?: string;
  holder?: string;
  userReference?: string;
  terminalSerialNumber?: string;
  amount?: string;
  availableBalance?: string;
  cardApplication?: string;
  label?: string;
  holderName?: string;
  extendedHolderName?: string;
  result?: number;
  readerModel?: string;
  nsu?: string;
  autoCode?: string;
  installments?: string;
  originalAmount?: number;
  buyerName?: string;
  paymentType: number;
  typeTransaction?: string;
  appIdentification?: string;
  cardHash?: string;
  preAutoDueDate?: string;
  preAutoOriginalAmount?: string;
  userRegistered?: number;
  accumulatedValue?: string;
  dynamicListMsgData?: string;
  partialPayPartiallyAuthorizedAmount?: string;
  partialPayRemainingAmount?: string;
}

export interface Order {
  tickets: OrderTicket[];
  onlineSale: boolean;
  amountItens: number;
  totalValue: number;
  totalValueWithFee: number;
  totalValueWithPaymentFee: number;
  payments: OrderPayment[];
}
