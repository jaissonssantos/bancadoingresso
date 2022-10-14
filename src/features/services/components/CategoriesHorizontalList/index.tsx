import React, { ReactElement } from 'react';
import { FlatList, View } from 'react-native';
import type { GetItemLayoutReturn } from 'src/types/flatList';
import type { ServiceCategory } from '../../types';
import {
  CategoriesHorizontalListItem,
  CategoriesHorizontalListItemProps,
} from '../CategoriesHorizontalListItem';
import { ITEM_SIZE } from '../CategoriesHorizontalListItem/styles';
import { styles } from './styles';

export interface CategoriesHorizontalListProps {
  categories: ServiceCategory[];
  selectedCategory: ServiceCategory | null;
  onPressCategory: CategoriesHorizontalListItemProps['onPress'];
}

export const CategoriesHorizontalList: React.FC<
  CategoriesHorizontalListProps
> = ({ categories, selectedCategory, onPressCategory }) => (
  <View style={styles.container}>
    <FlatList
      horizontal
      data={categories}
      contentContainerStyle={styles.flatlistContent}
      showsHorizontalScrollIndicator={false}
      getItemLayout={(_, index): GetItemLayoutReturn => ({
        length: ITEM_SIZE,
        offset: ITEM_SIZE * index,
        index,
      })}
      keyExtractor={(item): string => item.id}
      renderItem={({ item }): ReactElement => (
        <CategoriesHorizontalListItem
          item={item}
          selected={!!selectedCategory && item.id === selectedCategory.id}
          onPress={onPressCategory}
        />
      )}
    />
  </View>
);
