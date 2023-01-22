import React, {
  useContext,
  createContext,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import Snackbar, { SnackbarType } from 'src/components/Snackbar';

export interface SnackbarOptions {
  message: string;
  type?: SnackbarType;
}

interface SnackbarProviderValue {
  show(options: SnackbarOptions): void;
  hide(): void;
}

const SnackbarContext = createContext<SnackbarProviderValue>({
  show: () => undefined,
  hide: () => undefined,
});

export const useSnackbar = (): SnackbarProviderValue =>
  useContext(SnackbarContext);

export const SnackProvider = (props: {
  children:
    | string
    | number
    | boolean
    | {}
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNodeArray
    | React.ReactPortal
    | null
    | undefined;
}): ReactElement => {
  const [currentProps, setCurrentProps] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Omit<SnackbarProviderValue, 'onClose' | 'visible'> | any
  >({});

  const [visible, setVisible] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();

  const show = (options: SnackbarOptions): void => {
    setVisible(true);
    setCurrentProps(options);
  };

  const hide = useCallback((): void => setVisible(false), []);

  useEffect(() => {
    if (visible) {
      timeout.current = setTimeout(hide, 3000);
      return () => {
        if (timeout) {
          clearTimeout(timeout.current);
        }
      };
    }
  }, [hide, visible]);

  return (
    <SnackbarContext.Provider value={{ show, hide }}>
      {props.children}
      {currentProps.message && (
        <Snackbar
          visible={visible}
          onClose={hide}
          type={currentProps.type}
          message={currentProps.message}
        />
      )}
    </SnackbarContext.Provider>
  );
};
