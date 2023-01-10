import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { ProductsStackScreenProps } from 'src/navigation/ProductStack';
import type { IEvent, ISections } from 'src/model/eventDTO';
import { useAuth } from 'src/contexts/AuthContext/useAuth';
import { useForm } from 'src/hooks/useForm';
import { fetchEvents, useEvents, AppDispatch } from 'src/redux/eventsSlice';
import { HomeUI, SearchFormData } from './ui';

type HomeScreenProps = ProductsStackScreenProps<'ProductsTabHome.itself'>;

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [eventsFiltered, setEventsFiltered] = useState<IEvent[]>([]);

  const { events } = useSelector(useEvents);
  const dispatch: AppDispatch = useDispatch();

  const { token } = useAuth();

  const { formData, onChangeInput } = useForm<SearchFormData>({
    initialData: { query: '' },
  });

  const handleOnPressItem = ({
    itemSelected,
    itemExtra,
  }: {
    itemSelected: ISections;
    itemExtra?: IEvent;
  }): void => {
    navigation.push('ProductsTabHome.Sector', {
      ...itemSelected,
      event: itemExtra,
    });
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchEvents(token));
    }
  }, [token]);

  useEffect(() => {
    setEventsFiltered(events);
  }, [events]);

  useEffect(() => {
    if (formData.query.length >= 2) {
      const filtered = events.filter(event =>
        event.name
          .toLocaleLowerCase()
          .includes(formData.query.toLocaleLowerCase()),
      );

      setEventsFiltered(filtered);
    } else {
      setEventsFiltered(events);
    }
  }, [formData.query]);

  return (
    <HomeUI
      events={eventsFiltered}
      formData={formData}
      onChangeInput={onChangeInput}
      onPressItem={handleOnPressItem}
    />
  );
};
