import { useCallback, useRef, useState } from 'react';

export const useStateWithRef = <T extends unknown>(
  initialState: T,
): [T, React.Dispatch<React.SetStateAction<T>>, React.MutableRefObject<T>] => {
  const [state, setState] = useState(initialState);
  const ref = useRef(state);

  const setStateAndRef: typeof setState = useCallback(newState => {
    if (typeof newState === 'function') {
      setState(prevState => {
        const resultState = (newState as Function)(prevState);
        ref.current = resultState;
        return resultState;
      });
      return;
    }

    ref.current = newState;
    setState(newState);
  }, []);

  return [state, setStateAndRef, ref];
};
