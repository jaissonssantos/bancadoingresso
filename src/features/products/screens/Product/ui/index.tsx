import React, { ReactElement } from 'react';
import { ScrollView, View } from 'react-native';
import Animated, { FadeOut, FadeIn } from 'react-native-reanimated';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import { InputSearch } from 'src/components/InputSearch';
import type { UseFormReturn } from 'src/hooks/useForm';
import type { ISubGroups } from 'src/model/groupDTO';
import { BottomSheetCartList } from 'src/components/BottomSheetCartList';
import { Colors } from 'src/styleguide/colors';
import { ProductCard } from 'src/features/products/components/ProductCard';
import type { IProduct } from 'src/model/productDTO';
import { Button, ButtonIconPosition } from 'src/components/Button';
import { Skeleton } from 'src/components/Skeleton';
import { toString } from 'src/util/currency';
import { IProductStatus, IProductStatusType } from 'src/redux/productsSlice';
import type { ICartState } from 'src/redux/cartSlice';
import type { IEvent } from 'src/model/eventDTO';
import { styles } from './styles';

export type SearchFormData = {
  query: string;
};

interface ProductUIProps
  extends Pick<UseFormReturn<SearchFormData>, 'onChangeInput' | 'formData'> {
  status: IProductStatus;
  cart: ICartState;
  visible: boolean;
  event?: IEvent;
  subGroupData: ISubGroups;
  onAddProduct: (product: IProduct) => void;
  onSubtractProduct: (product: IProduct) => void;
  onGoToCart: () => void;
  onDismiss: (value: boolean) => void;
  onPaymentTypeChoice: () => void;
}

export const ProductUI: React.FC<ProductUIProps> = ({
  status,
  cart,
  visible,
  event,
  subGroupData,
  formData,
  onChangeInput,
  onAddProduct,
  onSubtractProduct,
  onGoToCart,
  onDismiss,
  onPaymentTypeChoice,
}) => {
  const renderLoading: ReactElement = (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Skeleton style={styles.skeletonSearch} />
      <Skeleton style={styles.skeletonTitle} />

      <View style={styles.productList}>
        {Array.from({ length: 9 }).map((_, index) => (
          <View key={index} style={styles.skeletonProduct}>
            <Skeleton style={styles.skeletonProductImage} />
            <Skeleton style={styles.skeletonProductTitle} />
            <Skeleton style={styles.skeletonProductPrice} />
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderDefault: ReactElement = (
    <React.Fragment>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <InputSearch
          name="query"
          placeholder={`Pesquise a ${subGroupData.productSubGroupName}`}
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
          {subGroupData.products?.length > 0 &&
            subGroupData.products?.map(product => (
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
                  {toString(cart.totalAmount)}
                </Text>
              </View>
            }
            iconPosition={ButtonIconPosition.right}
          />
        </Animated.View>
      )}

      <BottomSheetCartList
        eventId={event?.id}
        visible={visible}
        onDismiss={onDismiss}
        onContinue={onPaymentTypeChoice}
      />
    </React.Fragment>
  );

  return (
    <View style={styles.root}>
      {
        {
          [IProductStatusType.failed]: renderLoading,
          [IProductStatusType.loading]: renderLoading,
          [IProductStatusType.idle]: renderDefault,
        }[status]
      }
    </View>
  );
};
