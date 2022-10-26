import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import FadeBackground from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { SubtractIcon, PlusIcon, TrashIcon, IconSizes } from 'src/assets/icons';
import { Text, TextSizes, TextWeights } from 'src/components/Text';
import { PressableOpacity } from 'src/components/PressableOpacity';
import { Colors } from 'src/styleguide/colors';
import { formatCurrency } from 'src/util/currency';
import type { IProduct } from 'src/model/productDTO';
import { styles } from './styles';

interface ProductCardProps {
  product: IProduct;
  onSubtract: (product: IProduct) => void;
  onAdd: (product: IProduct) => void;
  isAvailableClearCart?: boolean;
  style?: ViewStyle | ViewStyle[] | undefined;
}

export const ProductCard: React.FC<ProductCardProps> = ({
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
      <View style={[styles.item, style]}>
        {product.image && (
          <FastImage
            source={{ uri: product.image }}
            style={StyleSheet.absoluteFill}
          />
        )}

        <FadeBackground
          colors={[
            Colors.overlay,
            Colors.overlay,
            Colors.overlayDark,
            Colors.overlayDark,
          ]}
          style={styles.fade}>
          <View style={styles.row}>
            <View style={[styles.row, styles.actions]}>
              {isAvailableClearCart && product.quantity === 1 ? (
                <PressableOpacity onPress={(): void => onSubtract(product)}>
                  <TrashIcon
                    size={IconSizes.small}
                    fill={Colors.primaryLight}
                  />
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
        </FadeBackground>
      </View>

      <View style={styles.column}>
        <Text size={TextSizes.xsmall} style={styles.spacingBottom}>
          {product.name}
        </Text>
        <Text size={TextSizes.small} weight={TextWeights.medium}>
          {formatCurrency(product.price ?? 0)}
        </Text>
      </View>
    </View>
  );
};
