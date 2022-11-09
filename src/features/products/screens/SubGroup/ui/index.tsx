import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text, TextSizes, TextWeights } from 'src/components/Text';
import { InputSearch } from 'src/components/InputSearch';
import type { UseFormReturn } from 'src/hooks/useForm';
import type { IGroup } from 'src/features/products/model/groupDTO';
import type { ISubGroup } from 'src/features/products/model/subgroupDTO';
import { Colors } from 'src/styleguide/colors';
import { SubGroupCard } from 'src/features/products/components/SubGroupCard';
import { styles } from './styles';

export type SearchFormData = {
  query: string;
};

interface SubGroupUIProps
  extends Pick<UseFormReturn<SearchFormData>, 'onChangeInput' | 'formData'> {
  groupData: IGroup;
  onGoToProduct: (subgroup: ISubGroup) => void;
}

export const SubGroupUI: React.FC<SubGroupUIProps> = ({
  groupData,
  formData,
  onChangeInput,
  onGoToProduct,
}) => (
  <View style={styles.root}>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <InputSearch
        name="query"
        placeholder="Pesquise pelo subgrupo do produto"
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
        Escolha o subgrupo do produto
      </Text>

      <Text
        size={TextSizes.xsmall}
        weight={TextWeights.medium}
        color={Colors.lightText}
        style={styles.spacingBottomLarge}>
        Subgrupo
      </Text>

      <SubGroupCard data={groupData.items} onPress={onGoToProduct} />
    </ScrollView>
  </View>
);
