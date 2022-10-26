import React from 'react';
import { View, ViewStyle } from 'react-native';
import { SubtractIcon, PlusIcon, TrashIcon, IconSizes } from 'src/assets/icons';
import { Text, TextSizes, TextWeights } from 'src/components/Text';
import { PressableOpacity } from 'src/components/PressableOpacity';
import { Colors } from 'src/styleguide/colors';
import { formatCurrency } from 'src/util/currency';
import type { IProduct } from 'src/model/productDTO';
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
  const finalStyleButtonSubtract = [
    product.quantity === 0 ? { opacity: 0.5 } : {},
  ];

  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <View style={[styles.column, styles.flex1]}>
          <Text size={TextSizes.small} style={styles.spacingBottom}>
            {product.name}
          </Text>
          <Text size={TextSizes.small} weight={TextWeights.medium}>
            {formatCurrency(product.price ?? 0)}
          </Text>
        </View>

        <View style={[styles.row, styles.actions]}>
          {isAvailableClearCart && product.quantity === 1 ? (
            <PressableOpacity onPress={(): void => onSubtract(product)}>
              <TrashIcon size={IconSizes.small} fill={Colors.primaryLight} />
            </PressableOpacity>
          ) : (
            <PressableOpacity
              onPress={(): void => onSubtract(product)}
              disabled={product.quantity === 0}
              style={finalStyleButtonSubtract}>
              <SubtractIcon size={IconSizes.small} stroke={Colors.white} />
            </PressableOpacity>
          )}

          <Text size={TextSizes.medium} style={styles.textQuantity}>
            {product.quantity}
          </Text>

          <PressableOpacity onPress={(): void => onAdd(product)}>
            <PlusIcon size={IconSizes.small} stroke={Colors.white} />
          </PressableOpacity>
        </View>
      </View>
    </View>
  );
};
