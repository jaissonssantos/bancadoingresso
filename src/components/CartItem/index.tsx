import React from 'react';
import { View, ViewStyle } from 'react-native';
import { SubtractIcon, PlusIcon, TrashIcon, IconSizes } from 'src/assets/icons';
import { Text, TextSizes, TextWeights } from 'src/components/Text';
import { PressableOpacity } from 'src/components/PressableOpacity';
import { Colors } from 'src/styleguide/colors';
import { toString } from 'src/util/currency';
import type { IProduct } from 'src/model/productDTO';
import { feeToNumber } from 'src/util/formatters';
import { calculateFees } from 'src/util/helpers';
import { styles } from './styles';

interface CartItemProps {
  product: IProduct;
  onSubtract: (product: IProduct) => void;
  onAdd: (product: IProduct) => void;
  isAvailableClearCart?: boolean;
  style?: ViewStyle | ViewStyle[] | undefined;
}

export const CartItem: React.FC<CartItemProps> = ({
  product,
  onSubtract,
  onAdd,
  isAvailableClearCart = false,
  style,
}) => {
  const quantity = product.quantity;
  const maxLimit = product.count ?? 0;
  const amount = product.unitValue ?? product.value ?? 0;

  const fee = product?.fee
    ? calculateFees(
        feeToNumber(amount),
        feeToNumber(product.payment.fees.administrateTax),
      )
    : calculateFees(
        feeToNumber(amount),
        feeToNumber(product.physicalSale?.administrateTax),
      );

  const finalStyleButtonSubtract = [quantity === 0 ? { opacity: 0.5 } : {}];

  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <View style={[styles.column, styles.flex1]}>
          <Text size={TextSizes.small} style={styles.spacingBottom}>
            {product.name}
          </Text>
          <Text size={TextSizes.small} weight={TextWeights.medium}>
            {toString(amount)} + {toString(fee - amount)} (taxa)
          </Text>
        </View>

        <View style={[styles.row, styles.actions]}>
          {isAvailableClearCart && quantity === 1 ? (
            <PressableOpacity onPress={(): void => onSubtract(product)}>
              <TrashIcon size={IconSizes.small} fill={Colors.primaryLight} />
            </PressableOpacity>
          ) : (
            <PressableOpacity
              onPress={(): void => onSubtract(product)}
              disabled={quantity === 0}
              style={finalStyleButtonSubtract}>
              <SubtractIcon size={IconSizes.small} stroke={Colors.white} />
            </PressableOpacity>
          )}

          <Text size={TextSizes.medium} style={styles.textQuantity}>
            {product.quantity ?? 0}
          </Text>

          <PressableOpacity
            onPress={(): void =>
              quantity < maxLimit ? onAdd(product) : undefined
            }
            disabled={quantity >= maxLimit}>
            <PlusIcon size={IconSizes.small} stroke={Colors.white} />
          </PressableOpacity>
        </View>
      </View>
    </View>
  );
};
