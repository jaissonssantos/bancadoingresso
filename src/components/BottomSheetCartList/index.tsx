import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { View } from 'react-native';
import {
  NativeViewGestureHandler,
  ScrollView,
} from 'react-native-gesture-handler';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import {
  useCart,
  addItemToCart,
  removeItemFromCart,
  removeAllItemFromCart,
} from 'src/redux/cartSlice';
import { useFees } from 'src/redux/feesSlice';
import type { IProduct } from 'src/model/productDTO';
import { CartItem } from 'src/components/CartItem';
import { BottomSheetBackdrop } from 'src/components/BottomSheetBackdrop';
import { CloseIcon, EmptyCartIcon, IconSizes } from 'src/assets/icons';
import { Button, ButtonType } from 'src/components/Button';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import { Colors } from 'src/styleguide/colors';
import { PressableOpacity } from '../PressableOpacity';
import { toString } from 'src/util/currency';
import { calculateFees } from 'src/util/helpers';
import { feeToNumber } from 'src/util/formatters';
import styles from './styles';

interface BottomSheetCartListProps {
  visible: boolean;
  eventId?: string;
  onDismiss?: (value: boolean) => void;
  onContinue: () => void;
}

export const BottomSheetCartList: React.FC<BottomSheetCartListProps> = ({
  visible,
  eventId,
  onDismiss,
  onContinue,
}) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const dispatch = useDispatch();
  const cart = useSelector(useCart);
  const { maximumFee } = useSelector(useFees);
  const fee = calculateFees(
    feeToNumber(cart.totalAmount),
    feeToNumber(maximumFee?.administrateTax),
  );

  const snapPoints = useMemo(() => ['95%'], []);

  const handleOnChange = useCallback((index: number) => {
    if (index === -1) {
      onDismiss?.(false);
    }
  }, []);

  const handleOnAddProduct = (product: IProduct): void => {
    dispatch(
      addItemToCart({
        ...product,
        eventId,
      }),
    );
  };

  const handleOnSubtractProduct = (product: IProduct): void => {
    dispatch(removeItemFromCart(product));
  };

  const handleOnRemoveAllProduct = (): void => {
    dispatch(removeAllItemFromCart());
    sheetRef.current?.dismiss();
  };

  const handleOnCancel = (): void => {
    sheetRef.current?.dismiss();
  };

  const handleOnContinue = (): void => {
    sheetRef.current?.dismiss();
    onContinue();
  };

  useEffect(() => {
    if (visible) {
      sheetRef.current?.present();
    } else {
      sheetRef.current?.dismiss();
    }
  }, [visible]);

  const renderEmpty = (): ReactElement => (
    <View style={[styles.container, styles.flex1, styles.justifyCenter]}>
      <View style={styles.alignSelfCenter}>
        <EmptyCartIcon size={IconSizes.large} />
      </View>
      <Text
        size={TextSizes.medium}
        weight={TextWeights.regular}
        align={TextAligns.center}
        style={styles.spacingTop}>
        Seu carrinho está vazio
      </Text>
    </View>
  );

  const renderContent = (): ReactElement => (
    <ScrollView contentContainerStyle={styles.scrollInner}>
      {cart.items?.map(ticket => (
        <CartItem
          key={`${ticket.id}-${ticket.name}-${ticket.isHalfPrice}`}
          product={ticket}
          isAvailableClearCart
          onAdd={handleOnAddProduct}
          onSubtract={handleOnSubtractProduct}
        />
      ))}
    </ScrollView>
  );

  return (
    <BottomSheetModal
      ref={sheetRef}
      snapPoints={snapPoints}
      index={0}
      onChange={handleOnChange}
      backdropComponent={BottomSheetBackdrop}
      handleIndicatorStyle={styles.handleIndicatorStyle}
      backgroundStyle={styles.bottomSheet}
      enablePanDownToClose>
      <NativeViewGestureHandler disallowInterruption={true}>
        <View style={styles.flex1}>
          <View style={styles.container}>
            <PressableOpacity
              onPress={handleOnCancel}
              style={[styles.alignSelfEnd, styles.spacingBottom]}>
              <CloseIcon size={IconSizes.xsmall} fill={Colors.white} />
            </PressableOpacity>

            <View style={styles.row}>
              <Text
                size={TextSizes.large}
                align={TextAligns.center}
                style={[styles.bold, styles.flex1]}>
                Carrinho
              </Text>

              {cart.items.length > 0 && (
                <PressableOpacity onPress={handleOnRemoveAllProduct}>
                  <Text size={TextSizes.small} align={TextAligns.right}>
                    Limpar
                  </Text>
                </PressableOpacity>
              )}
            </View>
          </View>

          {cart.items.length === 0 ? renderEmpty() : renderContent()}

          <View style={styles.footer}>
            <View style={[styles.row, styles.spacingBottom]}>
              <Text size={TextSizes.small} align={TextAligns.left}>
                Total de itens:
              </Text>
              <Text size={TextSizes.small} align={TextAligns.left}>
                {cart.totalQuantity}
              </Text>
            </View>

            <View style={[styles.row, styles.spacingBottomLarge]}>
              <Text size={TextSizes.small} align={TextAligns.left}>
                Valor total do pedido:
              </Text>
              <Text size={TextSizes.small} align={TextAligns.left}>
                {toString(fee)}
              </Text>
            </View>

            <View style={styles.row}>
              <Button
                title="Continuar comprando"
                type={ButtonType.outlined}
                onPress={handleOnCancel}
                titleStyle={styles.buttonTitleStyle}
                style={[styles.buttonOutlinedStyle, styles.flex1]}
              />

              <View style={styles.buttonSeparator} />

              <Button
                title="Fechar pedido"
                onPress={handleOnContinue}
                disabled={cart.items.length === 0}
                titleStyle={styles.buttonTitleStyle}
                style={styles.flex1}
              />
            </View>
          </View>
        </View>
      </NativeViewGestureHandler>
    </BottomSheetModal>
  );
};
