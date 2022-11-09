import React from 'react';
import { ScrollView, View } from 'react-native';
import Animated, { FadeOut, FadeIn } from 'react-native-reanimated';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import { InputSearch } from 'src/components/InputSearch';
import type { UseFormReturn } from 'src/hooks/useForm';
import type { ISubGroup } from 'src/features/products/model/subgroupDTO';
import { Colors } from 'src/styleguide/colors';
import { ProductCard } from 'src/features/products/components/ProductCard';
import type { IProduct } from 'src/model/productDTO';
import { Button, ButtonIconPosition } from 'src/components/Button';
import { formatCurrency } from 'src/util/currency';
import type { ICartState } from 'src/redux/cartSlice';
import { styles } from './styles';

export type SearchFormData = {
  query: string;
};

interface ProductUIProps
  extends Pick<UseFormReturn<SearchFormData>, 'onChangeInput' | 'formData'> {
  cart: ICartState;
  subGroupData: ISubGroup;
  onAddProduct: (product: IProduct) => void;
  onSubtractProduct: (product: IProduct) => void;
  onGoToCart: () => void;
}

export const ProductUI: React.FC<ProductUIProps> = ({
  cart,
  subGroupData,
  formData,
  onChangeInput,
  onAddProduct,
  onSubtractProduct,
  onGoToCart,
}) => (
  <View style={styles.root}>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <InputSearch
        name="query"
        placeholder={`Pesquise a ${subGroupData.name}`}
        value={formData.query}
        onChangeText={onChangeInput}
        containerStyle={styles.spacingBottomXXLarge}
        onSearchClean={(): void => onChangeInput('query', '')}
      />
      <Text
        size={TextSizes.medium}
        weight={TextWeights.bold}
        color={Colors.lightText}
        style={styles.spacingBottom}>
        Escolha
      </Text>

      <View style={styles.productList}>
        {subGroupData.items.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={onAddProduct}
            onSubtract={onSubtractProduct}
          />
        ))}
      </View>
    </ScrollView>

    {cart.items.length > 0 && (
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        style={styles.containerButton}>
        <Button
          title="Ver carrinho"
          onPress={onGoToCart}
          textAlign={TextAligns.center}
          icon={
            <View style={styles.iconRight}>
              <Text size={TextSizes.small} weight={TextWeights.bold}>
                {formatCurrency(cart.totalAmount)}
              </Text>
            </View>
          }
          iconPosition={ButtonIconPosition.right}
        />
      </Animated.View>
    )}
  </View>
);
