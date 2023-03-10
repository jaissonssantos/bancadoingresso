import { v4 as uuid } from 'uuid';
import type { Installment } from 'src/features/cart/model/installmentDTO';
import type { ICartState } from 'src/redux/cartSlice';
import { calculateFees } from 'src/util/helpers';
import { PAYMENT_TYPES, OrderPayment, Order, OrderTicket } from '../types';

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
  paymentType: PAYMENT_TYPES = PAYMENT_TYPES.TYPE_CASH,
): Order => {
  const { items } = cart;

  const order: Order = {
    tickets: [],
    onlineSale: true,
    amountItens: 0,
    totalValue: 0,
    totalValueWithFee: 0,
    totalValueWithPaymentFee: 0,
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
        paymentType: 0,
        terminalSerialNumber: terminalSerialNumber!,
      });
    } else {
      order.payments.push(orderPayment);
    }
  });

  return order;
};
