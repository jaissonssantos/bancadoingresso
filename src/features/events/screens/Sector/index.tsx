import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  useCart,
  addItemToCart,
  removeItemFromCart,
} from 'src/redux/cartSlice';
import { useFees, addFees } from 'src/redux/feesSlice';
import type { EventStackScreenProps } from 'src/navigation/EventStack';
import type { IProduct } from 'src/model/productDTO';
import { useForm } from 'src/hooks/useForm';
import { ROUTES } from 'src/navigation/constants/routes';
import { feeToNumber } from 'src/util/formatters';
import { calculateFees } from 'src/util/helpers';
import { SectorUI, ISectorData, SearchFormData } from './ui';

type SectorScreenProps = EventStackScreenProps<'EventsTabHome.Sector'>;

export const SectorScreen: React.FC<SectorScreenProps> = ({
  navigation,
  route,
}) => {
  const sectorDataFromNavigation = route.params;
  const [sectorData, setSectorData] = useState<ISectorData>(
    sectorDataFromNavigation,
  );
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector(useCart);
  const { maximumFee } = useSelector(useFees);

  const fee = calculateFees(
    feeToNumber(cart.totalAmount),
    feeToNumber(maximumFee?.administrateTax),
  );

  const { formData, onChangeInput } = useForm<SearchFormData>({
    initialData: { query: '' },
  });

  const handleOnAddProduct = (product: IProduct): void => {
    dispatch(addItemToCart(product));
  };

  const handleOnSubtractProduct = (product: IProduct): void => {
    dispatch(removeItemFromCart(product));
  };

  const handleOnGoToCart = (): void => setVisible(!visible);

  const handleOnDismiss = (value: boolean): void => setVisible(value);

  const handleOnPaymentTypeChoice = (): void => {
    navigation.navigate(ROUTES.MainTab.Cart as any, {
      screen: ROUTES.CartTabHome.PaymentCartInput,
    });
  };

  const handleFetchCart = (): void => {
    if (cart.items.length > 0) {
      const newSector = sectorDataFromNavigation.tickets.map(ticket => {
        const cartItem = cart.items.find(
          product =>
            product.id === ticket.id &&
            product.name === ticket.name &&
            product.isHalfPrice === ticket.isHalfPrice,
        );

        return {
          ...ticket,
          quantity: cartItem?.quantity ?? 0,
        };
      });

      dispatch(addFees(cart.items));
      setSectorData({ ...sectorData, tickets: newSector });
    } else {
      const newSector = sectorDataFromNavigation.tickets.map(ticket => ({
        ...ticket,
        quantity: 0,
        totalPrice: 0,
        isHalfPrice: ticket.isHalfPrice,
        count: ticket.count,
        value: ticket.value ?? ticket.unitValue,
        price: ticket.value,
      }));

      setSectorData({ ...sectorDataFromNavigation, tickets: newSector });
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: route.params.section.name });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      handleFetchCart();
    }, [cart]),
  );

  useEffect(() => {
    if (formData.query.length >= 2) {
      const filtered = sectorData.tickets.filter(ticket =>
        ticket.name
          .toLocaleLowerCase()
          .includes(formData.query.toLocaleLowerCase()),
      );

      setSectorData({ ...sectorData, tickets: filtered });
    } else {
      handleFetchCart();
    }
  }, [formData.query]);

  return (
    <SectorUI
      fee={fee}
      cart={cart}
      visible={visible}
      sectorData={sectorData}
      formData={formData}
      onChangeInput={onChangeInput}
      onAddProduct={handleOnAddProduct}
      onSubtractProduct={handleOnSubtractProduct}
      onGoToCart={handleOnGoToCart}
      onDismiss={handleOnDismiss}
      onPaymentTypeChoice={handleOnPaymentTypeChoice}
    />
  );
};
