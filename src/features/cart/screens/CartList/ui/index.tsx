import React, { ReactElement } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import { EmptyCartIcon, IconSizes } from 'src/assets/icons';
import { CartItem } from 'src/components/CartItem';
import { Button } from 'src/components/Button';
import type { IProduct } from 'src/model/productDTO';
import type { ICartState } from 'src/redux/cartSlice';
import { formatCurrency } from 'src/util/currency';
import { styles } from './styles';
import { PressableOpacity } from 'src/components/PressableOpacity';

interface CartListUIProps {
  cart: ICartState;
  onAddProduct: (product: IProduct) => void;
  onSubtractProduct: (product: IProduct) => void;
  onRemoveAllProduct: () => void;
}

export const CartListUI: React.FC<CartListUIProps> = ({
  cart,
  onAddProduct,
  onSubtractProduct,
  onRemoveAllProduct,
}) => {
  const renderContent = (): ReactElement => (
    <React.Fragment>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {cart.items?.map(ticket => (
          <CartItem
            key={ticket.id}
            product={ticket}
            isAvailableClearCart
            onAdd={onAddProduct}
            onSubtract={onSubtractProduct}
          />
        ))}
      </ScrollView>

      <View style={[styles.row, styles.spacingContainer]}>
        <Text
          size={TextSizes.small}
          weight={TextWeights.regular}
          align={TextAligns.center}
          style={styles.spacingTop}>
          Total de itens:
        </Text>
        <Text
          size={TextSizes.small}
          weight={TextWeights.medium}
          align={TextAligns.center}
          style={styles.spacingTop}>
          {cart.totalQuantity}
        </Text>
      </View>

      <View style={[styles.row, styles.spacingContainer, styles.spacingBottom]}>
        <Text
          size={TextSizes.small}
          weight={TextWeights.regular}
          align={TextAligns.center}
          style={styles.spacingTop}>
          Valor total do pedido:
        </Text>
        <Text
          size={TextSizes.small}
          weight={TextWeights.medium}
          align={TextAligns.center}
          style={styles.spacingTop}>
          {formatCurrency(cart.totalAmount)}
        </Text>
      </View>

      <View style={styles.containerButton}>
        <Button title="Fechar pedido" onPress={(): void => {}} />
      </View>
    </React.Fragment>
  );

  const renderEmpty = (): ReactElement => (
    <View style={styles.content}>
      <EmptyCartIcon size={IconSizes.large} />
      <Text
        size={TextSizes.medium}
        weight={TextWeights.regular}
        align={TextAligns.center}
        style={styles.spacingTop}>
        Seu carrinho está vazio
      </Text>
    </View>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.contentTitle}>
        <Text
          size={TextSizes.extra}
          weight={TextWeights.bold}
          style={styles.title}>
          Carrinho
        </Text>

        {cart.items?.length > 0 && (
          <PressableOpacity onPress={onRemoveAllProduct}>
            <Text size={TextSizes.xsmall} weight={TextWeights.medium}>
              Limpar
            </Text>
          </PressableOpacity>
        )}
      </View>

      {cart.items?.length ? renderContent() : renderEmpty()}
    </SafeAreaView>
  );
};