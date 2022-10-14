import React, { PropsWithChildren, useRef, useState } from 'react';
import { useBackHandler } from 'src/hooks/useBackHandler';
import { BottomSheetContext, BottomSheetShowOptions } from '..';
import { BottomSheet, BottomSheetRef } from '../BottomSheet';
import {
  MessageBottomSheetContenProps,
  MessageBottomSheetContent,
} from '../MessageBottomSheetContent';

export const BottomSheetProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const [currProps, setCurrProps] = useState<BottomSheetShowOptions | null>(
    null,
  );

  const show = (options: BottomSheetShowOptions): void => {
    setCurrProps(options);
  };

  const hide = (): void => {
    bottomSheetRef.current?.hide();
  };

  const handleOnFinishedHiding = (): void => {
    setCurrProps(null);
  };

  const showMessage = (options: Partial<MessageBottomSheetContenProps>): void =>
    show({
      content: (
        <MessageBottomSheetContent
          title={options.title ?? ''}
          message={options.message ?? ''}
          buttonTitle={options.buttonTitle ?? 'OK'}
          onPressButton={options.onPressButton ?? hide}
        />
      ),
    });

  useBackHandler(() => {
    if (currProps) {
      hide();
      return true;
    }

    return false;
  });

  return (
    <BottomSheetContext.Provider value={{ show, hide, showMessage }}>
      {children}
      {!!currProps && (
        <BottomSheet
          ref={bottomSheetRef}
          content={currProps.content}
          onFinishedHiding={handleOnFinishedHiding}
        />
      )}
    </BottomSheetContext.Provider>
  );
};
