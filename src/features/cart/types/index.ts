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

export interface PrintTicket {
  date: string;
  transactionId: string;
  eventId: string;
  eventName: string;
  ticketId?: string;
  ticketName?: string;
  halfPrice: boolean;
  productId?: string;
  productName?: string;
  comboId?: string;
  comboName?: string;
  qrCodeEncrypted: string;
  pdvName: string;
  posName: string;
  unitValue: number;
  fee: number;
  totalValue: number;
  eventDate: string;
  eventPlace: string;
  eventCity: string;
  eventUF: string;
  paymentType: number;
  sequence: number;
}

export interface OrderItemQrCode {
  id: string;
  userName?: string;
  userCPF?: string;
  eventId: string;
  sectionId?: string;
  ticketId?: string;
  productId?: string;
  comboId?: string;
  unitValue: number;
  orderDate: Date;
  halfPrice?: boolean;
  validated?: boolean;
}
