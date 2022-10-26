import React from 'react';
import { useSelector } from 'react-redux';
import type { EventStackScreenProps } from 'src/navigation/EventStack';
import type { IEvent } from 'src/model/eventDTO';
import type { ISector } from 'src/model/sectorDTO';
import { useForm } from 'src/hooks/useForm';
import { useEvents } from 'src/redux/eventsSlice';
import { HomeUI, SearchFormData } from './ui';

type HomeScreenProps = EventStackScreenProps<'EventsTabHome.itself'>;

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const events = useSelector(useEvents);

  const { formData, onChangeInput } = useForm<SearchFormData>({
    initialData: { query: '' },
  });

  const handleOnPressItem = ({
    itemSelected,
    itemExtra,
  }: {
    itemSelected: ISector;
    itemExtra?: IEvent;
  }): void => {
    navigation.push('EventsTabHome.Sector', {
      ...itemSelected,
      event: itemExtra,
    });
  };

  return (
    <HomeUI
      events={events}
      formData={formData}
      onChangeInput={onChangeInput}
      onPressItem={handleOnPressItem}
    />
  );
};
