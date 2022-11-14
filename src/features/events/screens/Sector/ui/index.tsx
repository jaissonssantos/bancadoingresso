import React from 'react';
import { ScrollView, View } from 'react-native';
import Animated, { FadeOut, FadeIn } from 'react-native-reanimated';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import { InputSearch } from 'src/components/InputSearch';
import { CartItem } from 'src/components/CartItem';
import { Button, ButtonIconPosition } from 'src/components/Button';
import type { UseFormReturn } from 'src/hooks/useForm';
import type { ISector } from 'src/model/sectorDTO';
import type { IEvent } from 'src/model/eventDTO';
import type { IProduct } from 'src/model/productDTO';
import type { ICartState } from 'src/redux/cartSlice';
import { toString } from 'src/util/currency';
import { Colors } from 'src/styleguide/colors';
import { styles } from './styles';

export type SearchFormData = {
  query: string;
};

export interface ISectorData extends Partial<ISector> {
  event?: IEvent;
}

interface SectorUIProps
  extends Pick<UseFormReturn<SearchFormData>, 'onChangeInput' | 'formData'> {
  cart: ICartState;
  sectorData: ISectorData;
  onAddProduct: (product: IProduct) => void;
  onSubtractProduct: (product: IProduct) => void;
  onGoToCart: () => void;
}

export const SectorUI: React.FC<SectorUIProps> = ({
  cart,
  sectorData,
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
        placeholder="Pesquise pelo tipo do ingresso"
        value={formData.query}
        onChangeText={onChangeInput}
        containerStyle={styles.spacingBottomXXLarge}
        onSearchClean={(): void => onChangeInput('query', '')}
      />
      <Text
        size={TextSizes.small}
        weight={TextWeights.medium}
        color={Colors.lightText}
        style={styles.spacingBottomLarge}>
        {sectorData.event?.name}
      </Text>

      {sectorData.items?.map(ticket => (
        <CartItem
          key={ticket.id}
          product={ticket}
          onAdd={onAddProduct}
          onSubtract={onSubtractProduct}
        />
      ))}
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
                {toString(cart.totalAmount)}
              </Text>
            </View>
          }
          iconPosition={ButtonIconPosition.right}
        />
      </Animated.View>
    )}
  </View>
);
