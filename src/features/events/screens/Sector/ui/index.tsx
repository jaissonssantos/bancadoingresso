import React from 'react';
import { ScrollView, View } from 'react-native';
import Animated, { FadeOut, FadeIn } from 'react-native-reanimated';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import { InputSearch } from 'src/components/InputSearch';
import { CartItem } from 'src/components/CartItem';
import { Button, ButtonIconPosition } from 'src/components/Button';
import { BottomSheetCartList } from 'src/components/BottomSheetCartList';
import type { UseFormReturn } from 'src/hooks/useForm';
import type { IEvent, ISections } from 'src/model/eventDTO';
import type { IProduct } from 'src/model/productDTO';
import type { ICartState } from 'src/redux/cartSlice';
import { toString } from 'src/util/currency';
import { Colors } from 'src/styleguide/colors';
import { styles } from './styles';

export type SearchFormData = {
  query: string;
};

export interface ISectorData extends ISections {
  event?: IEvent;
}

interface SectorUIProps
  extends Pick<UseFormReturn<SearchFormData>, 'onChangeInput' | 'formData'> {
  fee: number;
  cart: ICartState;
  visible: boolean;
  sectorData: ISectorData;
  onAddProduct: (product: IProduct) => void;
  onSubtractProduct: (product: IProduct) => void;
  onGoToCart: () => void;
  onDismiss: (value: boolean) => void;
  onPaymentTypeChoice: () => void;
}

export const SectorUI: React.FC<SectorUIProps> = ({
  fee,
  cart,
  visible,
  sectorData,
  formData,
  onChangeInput,
  onAddProduct,
  onSubtractProduct,
  onGoToCart,
  onDismiss,
  onPaymentTypeChoice,
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

      {sectorData.tickets?.map(ticket => (
        <CartItem
          key={`${ticket.id}-${ticket.name}-${ticket.isHalfPrice}`}
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
            <Text
              size={TextSizes.small}
              align={TextAligns.right}
              weight={TextWeights.bold}
              style={styles.iconRight}>
              {toString(fee)}
            </Text>
          }
          iconPosition={ButtonIconPosition.right}
        />
      </Animated.View>
    )}

    <BottomSheetCartList
      visible={visible}
      onDismiss={onDismiss}
      onContinue={onPaymentTypeChoice}
    />
  </View>
);
