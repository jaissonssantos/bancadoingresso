import React, { ReactElement } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PressableOpacity } from 'src/components/PressableOpacity';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import { Skeleton } from 'src/components/Skeleton';
// import type { ICartState } from 'src/redux/cartSlice';
import { toString } from 'src/util/currency';
import type { Installment } from 'src/features/cart/model/installmentDTO';
import { styles } from './styles';

export enum States {
  loading = 'loading',
  default = 'default',
}

export interface EventCodeGetAvailableInstallmentsListener {
  installments: string;
}

export interface PaymentChoiceByInstallmentUIProps {
  state: States;
  installments: Installment[];
  onInstallmentPress: (value: Installment) => void;
}

export const PaymentChoiceByInstallmentUI: React.FC<
  PaymentChoiceByInstallmentUIProps
> = ({ state, installments, onInstallmentPress }) => {
  const RenderInstallment = ({ item }: { item: Installment }): ReactElement => {
    return (
      <PressableOpacity
        onPress={(): void => onInstallmentPress(item)}
        style={styles.item}>
        <Text size={TextSizes.small} weight={TextWeights.regular}>
          <Text
            size={TextSizes.small}
            weight={TextWeights.bold}
            style={styles.bold}>
            {item.quantity}x
          </Text>{' '}
          {toString(item.value)}
        </Text>
        <View style={styles.row}>
          {item.quantity > 1 ? (
            <React.Fragment>
              <Text size={TextSizes.small} weight={TextWeights.regular}>
                {toString(item.quantity * item.value)}
              </Text>
              <Text
                size={TextSizes.small}
                weight={TextWeights.regular}
                style={[
                  styles.spacingLeft,
                  item.isInterest ? styles.textRed : styles.textBlue,
                ]}>
                {item.isInterest ? 'Com juros' : 'Sem juros'}
              </Text>
            </React.Fragment>
          ) : (
            <Text
              size={TextSizes.small}
              weight={TextWeights.regular}
              style={[styles.spacingLeft, styles.textGreen]}>
              À vista
            </Text>
          )}
        </View>
      </PressableOpacity>
    );
  };

  const renderLoading: ReactElement = (
    <View style={[styles.container, styles.spacingTop]}>
      {Array.from({ length: 10 }).map(_ => (
        <React.Fragment>
          <Skeleton style={styles.item} />

          <View style={styles.separator} />
        </React.Fragment>
      ))}
    </View>
  );

  const renderDefault: ReactElement = (
    <FlatList
      contentContainerStyle={styles.container}
      data={installments}
      keyExtractor={(item): string => item.value.toString()}
      renderItem={({ item }): ReactElement => <RenderInstallment item={item} />}
      ItemSeparatorComponent={(): ReactElement => (
        <View style={styles.separator} />
      )}
      ListFooterComponent={(): ReactElement => (
        <View style={styles.spacingBottom} />
      )}
    />
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.contentTitle}>
        <Text
          size={TextSizes.medium}
          weight={TextWeights.bold}
          align={TextAligns.left}
          style={styles.bold}>
          Escolha a quantidade de parcelas
        </Text>

        <Text
          size={TextSizes.small}
          weight={TextWeights.bold}
          align={TextAligns.left}
          style={styles.spacingTop}>
          Até{' '}
          <Text
            size={TextSizes.small}
            weight={TextWeights.bold}
            style={styles.bold}>
            2 parcelas sem juros
          </Text>
        </Text>
      </View>

      {
        {
          [States.loading]: renderLoading,
          [States.default]: renderDefault,
        }[state]
      }
    </SafeAreaView>
  );
};
