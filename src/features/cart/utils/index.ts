import CryptoJS from 'crypto-js';
import { v4 as uuid } from 'uuid';
import type { Installment } from 'src/features/cart/model/installmentDTO';
import type { ICartState } from 'src/redux/cartSlice';
import { calculateFees } from 'src/util/helpers';
import {
  PAYMENT_TYPES,
  OrderPayment,
  Order,
  OrderTicket,
  PrintTicket,
  OrderItemQrCode,
} from '../types';
import dayjs from 'dayjs';

export const getInstallments = (
  amount: number,
  fee: number,
  maxInstallments: number = 1,
): Installment[] => {
  const installments = [];

  for (let i = 1; i <= maxInstallments; i++) {
    let value: number;
    const id = uuid();

    if (i === 1) {
      value = amount;
    } else {
      value = calculateFees(installments[i - 2]?.value * 100, fee);
    }

    installments.push({
      id,
      value: value / 100,
      quantity: i,
      isInterest: true,
    });
  }

  return installments;
};

export const formatPaymentPayload = (
  terminalSerialNumber: string | null,
  cart: ICartState,
  orders: OrderPayment[],
  totalAmountFee: number,
  totalAmountFeeWithPayment: number,
  paymentType: PAYMENT_TYPES = PAYMENT_TYPES.TYPE_CASH,
): Order => {
  const { items, totalAmount } = cart;

  const order: Order = {
    tickets: [],
    onlineSale: true,
    amountItens: items.length,
    totalValue: totalAmount,
    totalValueWithFee: totalAmountFee,
    totalValueWithPaymentFee: totalAmountFeeWithPayment,
    payments: [],
  };

  items.forEach(item => {
    const { id, eventId, fee, unitValue, isHalfPrice, totalPrice, payment } =
      item;

    let payload: OrderTicket = {
      eventId: eventId!,
      unitValue: unitValue!,
      fee: fee!,
      totalValue: totalPrice!,
      isHalfPrice: isHalfPrice!,
      qrCodeTicket: '',
    };

    if (payment) {
      order.tickets.push({
        ...payload,
        ticketId: id,
      });
    } else {
      order.tickets.push({
        ...payload,
        productId: id,
      });
    }
  });

  orders.forEach(orderPayment => {
    const { paymentType: orderPaymentType } = orderPayment;

    if (orderPaymentType === paymentType) {
      order.payments.push({
        ...orderPayment,
        terminalSerialNumber: terminalSerialNumber!,
      });
    } else {
      order.payments.push(orderPayment);
    }
  });

  return order;
};

const encrypt = (value: string): string => {
  const keyString = '1@4&%nFTzuXiZAT^';
  const ivString = 'Bar12345Bar12345';
  const data = CryptoJS.enc.Utf8.parse(value);
  const key = CryptoJS.enc.Utf8.parse(keyString);
  const iv = CryptoJS.enc.Utf8.parse(ivString);

  const encrypted = CryptoJS.AES.encrypt(data, key, {
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.ECB,
    iv,
  });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
};

export const formatPrintTicket = (
  cart: ICartState,
  orders: OrderPayment[],
): PrintTicket[] => {
  const list: PrintTicket[] = [];
  let count = 1;

  cart.items.forEach(data => {
    const amount = data.amount || 1;
    for (let i = 0; i < amount; i++) {
      const orderItemQrCodeDTO: OrderItemQrCode = {
        id: orders[0].transactionCode as string,
        eventId: data.eventId as string,
        ticketId: data.id,
        unitValue: data.unitValue as number,
        orderDate: new Date(),
        halfPrice: data.isHalfPrice,
      };

      const ticket: PrintTicket = {
        date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        transactionId: orders[0].transactionCode as string,
        eventId: data.eventId as string,
        eventName: 'N/A',
        ticketId: data.id,
        ticketName: data.name,
        halfPrice: data.isHalfPrice,
        qrCodeEncrypted: encrypt(JSON.stringify(orderItemQrCodeDTO)),
        pdvName: 'N/A',
        posName: 'N/A',
        unitValue: data.unitValue as number,
        fee: data.fee as number,
        totalValue: data.totalValue as number,
        eventDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        eventPlace: 'N/A',
        eventCity: 'N/A',
        eventUF: 'N/A',
        paymentType: orders[0].paymentType,
        sequence: count,
      };
      count++;
      list.push(ticket);
    }
  });
  return list;
};
