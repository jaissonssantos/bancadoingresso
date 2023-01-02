import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { EventStackScreenProps } from 'src/navigation/EventStack';
import { useAuth } from 'src/contexts/AuthContext/useAuth';
import type { IEvent, ISections } from 'src/model/eventDTO';
import { useForm } from 'src/hooks/useForm';
import { fetchEvents, useEvents, AppDispatch } from 'src/redux/eventsSlice';
import { HomeUI, SearchFormData } from './ui';

type HomeScreenProps = EventStackScreenProps<'EventsTabHome.itself'>;

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [eventsFiltered, setEventsFiltered] = useState<IEvent[]>([]);

  const { events } = useSelector(useEvents);
  const dispatch: AppDispatch = useDispatch();

  const { token } = useAuth();

  // clearAuthState();

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
    navigation.push('EventsTabHome.Sector', {
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
