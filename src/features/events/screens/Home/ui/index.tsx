import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FadeBackground from 'react-native-linear-gradient';
import dayjs from 'dayjs';
import { Accordion } from 'src/components/Accordion';
import { Text, TextSizes, TextWeights } from 'src/components/Text';
import { InputSearch } from 'src/components/InputSearch';
import { CarouselCard } from 'src/components/CarouselCard';
import type { UseFormReturn } from 'src/hooks/useForm';
import type { IEvent, ISections } from 'src/model/eventDTO';
import { Colors } from 'src/styleguide/colors';
import { styles } from './styles';

export type SearchFormData = {
  query: string;
};

interface HomeUIProps
  extends Pick<UseFormReturn<SearchFormData>, 'onChangeInput' | 'formData'> {
  events: IEvent[];
  onPressItem: ({
    itemSelected,
    itemExtra,
  }: {
    itemSelected: ISections;
    itemExtra?: IEvent;
  }) => void;
}

export const HomeUI: React.FC<HomeUIProps> = ({
  events,
  formData,
  onChangeInput,
  onPressItem,
}) => (
  <FadeBackground
    colors={[
      Colors.overlay,
      Colors.overlay,
      Colors.overlayMedium,
      Colors.black,
      Colors.black,
      Colors.black,
      Colors.black,
      Colors.black,
      Colors.black,
      Colors.black,
      Colors.black,
    ]}
    style={styles.root}>
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text
          size={TextSizes.extra}
          weight={TextWeights.bold}
          style={styles.title}>
          Eventos
        </Text>

        <InputSearch
          name="query"
          placeholder="Pesquise pelo evento"
          value={formData.query}
          onChangeText={onChangeInput}
          containerStyle={styles.spacingBottomXXLarge}
          onSearchClean={(): void => onChangeInput('query', '')}
        />
        <Text
          size={TextSizes.xlarge}
          weight={TextWeights.medium}
          color={Colors.lightText}
          style={styles.spacingBottom}>
          Escolha o evento e setor
        </Text>
        <Text
          size={TextSizes.small}
          color={Colors.lightText}
          style={styles.spacingBottomXLarge}>
          Você possui {events.length ?? 0} eventos disponíveis
        </Text>

        {events.length > 0 &&
          events?.map(event => (
            <Accordion
              key={event.id}
              title={event.name}
              image={{ uri: event.imagePosBase64 }}
              isContentNoPadding
              style={styles.spacingBottomXLarge}>
              <CarouselCard
                title={`${dayjs(event.startDate).format('DD/MM')} - ${dayjs(
                  event.startDate,
                ).format('dddd')}`}
                titleStyle={styles.spacingCarouselTitle}
                containerStyle={styles.containerCarousel}
                onPress={onPressItem}
                data={event.sections}
                extraData={event}
              />
            </Accordion>
          ))}
      </ScrollView>
    </SafeAreaView>
  </FadeBackground>
);
