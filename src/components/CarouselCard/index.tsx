import React, { ReactElement, useState } from 'react';
import { View, ViewStyle, TextStyle, LayoutChangeEvent } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { PressableOpacity } from 'src/components/PressableOpacity';
import { Text, TextAligns, TextSizes } from 'src/components/Text';
import type { IEvent, ISections } from 'src/model/eventDTO';
import { Dot } from './Dot';
import { styles, cardWidth } from './styles';

export interface ICarousel extends Partial<ISections> {
  event?: IEvent;
}

interface CarouselCardProps {
  title?: string;
  data: ICarousel[];
  extraData: IEvent;
  style?: ViewStyle | ViewStyle[] | undefined;
  containerStyle?: ViewStyle | ViewStyle[] | undefined;
  titleStyle?: TextStyle | TextStyle[] | undefined;
  onPress: ({
    itemSelected,
    itemExtra,
  }: {
    itemSelected: ISections;
    itemExtra?: IEvent;
  }) => void;
}

export const CarouselCard: React.FC<CarouselCardProps> = ({
  title,
  data,
  extraData,
  titleStyle,
  style,
  containerStyle,
  onPress,
}) => {
  const translateX = useSharedValue(0);
  const contentWidth = useSharedValue(0);
  const [totalPages, setTotalPages] = useState(0);
  const finalStyleTitle = [styles.title, titleStyle];
  const finalStyleCarousel = [styles.carouselCard, style];

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value = event.contentOffset.x;
    },
  });

  const onLayout = (event: LayoutChangeEvent): void => {
    const width = event.nativeEvent.layout.width;
    const totalItemByView = width / cardWidth;
    const pages = Math.ceil(data.length / Math.round(totalItemByView));
    setTotalPages(pages);

    contentWidth.value = width;
  };

  const activeDot = useDerivedValue(() => {
    return Math.round(translateX.value / contentWidth.value);
  });

  return (
    <View onLayout={onLayout} style={containerStyle}>
      <View style={styles.root}>
        {title && (
          <Text size={TextSizes.xxsmall} style={finalStyleTitle}>
            {title}
          </Text>
        )}
        <View style={styles.pagination}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Dot key={index} index={index} activeDotIndex={activeDot} />
          ))}
        </View>
      </View>
      <Animated.FlatList
        data={data ?? []}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        keyExtractor={(item): string => item?.section?.name?.toString() ?? ''}
        onScroll={scrollHandler}
        renderItem={({ item }): ReactElement => (
          <PressableOpacity
            onPress={(): void =>
              onPress({
                itemSelected: item as ISections,
                itemExtra: extraData,
              })
            }
            key={item.section?.name}
            style={styles.item}>
            <Text size={TextSizes.xxsmall} align={TextAligns.center}>
              {item.section?.name}
            </Text>
          </PressableOpacity>
        )}
        ListFooterComponent={(): ReactElement => <View style={styles.footer} />}
        style={finalStyleCarousel}
      />
    </View>
  );
};
