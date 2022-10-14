import React, { ReactElement } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ButtonType } from 'src/components/Button';
import { Line } from 'src/components/Line';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import {
  CategoriesHorizontalList,
  CategoriesHorizontalListProps,
} from 'src/features/services/components/CategoriesHorizontalList';
import { ServicesListItem } from 'src/features/services/components/ServicesListItem';
import type { Service } from 'src/features/services/types';
import { Colors } from 'src/styleguide/colors';
import { styles } from './styles';

interface ServicesHomeUIProps extends CategoriesHorizontalListProps {
  services: Service[];
  onPressAddService: () => void;
  onPressService: (item: Service) => void;
}

export const ServicesHomeUI: React.FC<ServicesHomeUIProps> = ({
  services,
  categories,
  selectedCategory,
  onPressCategory,
  onPressAddService,
  onPressService,
}) => (
  <FlatList
    data={services}
    contentContainerStyle={styles.flatlistContent}
    ListHeaderComponent={
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <Text
          size={TextSizes.xlarge}
          weight={TextWeights.bold}
          style={styles.title}>
          Serviços
        </Text>
        <CategoriesHorizontalList
          categories={categories}
          selectedCategory={selectedCategory}
          onPressCategory={onPressCategory}
        />
        <Line style={styles.line} />
        <Button
          type={ButtonType.text}
          textAlign={TextAligns.left}
          title="+ Adicionar serviço"
          style={styles.addServiceButton}
          onPress={onPressAddService}
        />
        {services.length === 0 && (
          <Text
            size={TextSizes.small}
            color={Colors.gray}
            style={styles.noServicesMsg}>
            Você não adicionou nenhum serviço
          </Text>
        )}
      </SafeAreaView>
    }
    renderItem={({ item }): ReactElement => (
      <ServicesListItem item={item} onPress={onPressService} />
    )}
  />
);
