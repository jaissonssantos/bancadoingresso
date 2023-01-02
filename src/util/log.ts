import { IS_DEBUG } from 'src/constants/env';

// TODO: Improve log system

type LogType = 'd' | 'i' | 'w' | 'e';
type ConsoleFunction = (...texts: string[]) => void;
type LogFunction = ConsoleFunction;

const logConsole: { [key in LogType]: ConsoleFunction } = {
  d: console.log,
  i: console.info,
  w: console.warn,
  e: console.error,
};

export const logCreator =
  (type: LogType): LogFunction =>
  (...texts) => {
    if (IS_DEBUG) {
      logConsole[type](...texts);
    }
  };

export const log: { [key in LogType]: LogFunction } = {
  d: logCreator('d'),
  i: logCreator('i'),
  w: logCreator('w'),
  e: logCreator('e'),
};
