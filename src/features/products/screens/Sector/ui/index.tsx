import React from 'react';
import { ScrollView, View } from 'react-native';
import dayjs from 'dayjs';
import { Text, TextSizes, TextWeights } from 'src/components/Text';
import { InputSearch } from 'src/components/InputSearch';
import type { UseFormReturn } from 'src/hooks/useForm';
import type { ISector } from 'src/features/products/model/sectorDTO';
import type { IGroup } from 'src/features/products/model/groupDTO';
import type { IEvent } from 'src/features/products/model/eventDTO';
import { Colors } from 'src/styleguide/colors';
import { GroupCard } from 'src/features/products/components/GroupCard';
import { styles } from './styles';

export type SearchFormData = {
  query: string;
};

export interface ISectorData extends Partial<ISector> {
  event?: IEvent;
}

interface SectorUIProps
  extends Pick<UseFormReturn<SearchFormData>, 'onChangeInput' | 'formData'> {
  sectorData: ISectorData;
  onGoToSubGroup: (group: IGroup) => void;
}

export const SectorUI: React.FC<SectorUIProps> = ({
  sectorData,
  formData,
  onChangeInput,
  onGoToSubGroup,
}) => (
  <View style={styles.root}>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <InputSearch
        name="query"
        placeholder="Pesquise pelo grupo do produto"
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
        Escolha o grupo do produto
      </Text>

      <Text
        size={TextSizes.small}
        weight={TextWeights.medium}
        color={Colors.lightText}
        style={styles.spacingBottomLarge}>
        Evento selecionado: {sectorData.event?.name}
        {' • '}
        {`${dayjs(sectorData.event?.date).format('DD/MM')} • ${dayjs(
          sectorData.event?.date,
        ).format('dddd')}`}
      </Text>

      <Text
        size={TextSizes.xsmall}
        weight={TextWeights.medium}
        color={Colors.lightText}
        style={styles.spacingBottomLarge}>
        Grupo
      </Text>

      <GroupCard data={sectorData.items} onPress={onGoToSubGroup} />
    </ScrollView>
  </View>
);
