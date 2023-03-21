import { NativeModules } from 'react-native';
import type { PrintTicket } from 'src/features/cart/types';

export const { PrintModule } = NativeModules;

export const startPrint = async (
  tickets: PrintTicket[],
  ticketSequence: number,
): Promise<void> => PrintModule.startPrint(tickets, ticketSequence);
