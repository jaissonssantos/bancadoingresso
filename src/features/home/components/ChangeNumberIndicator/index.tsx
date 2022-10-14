import React, { useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { Button, ButtonType } from 'src/components/Button';
import { PressableOpacity } from 'src/components/PressableOpacity';
import { Text, TextSizes, TextWeights } from 'src/components/Text';
import { styles, TOTAL_BLOCK_WIDTH } from './styles';

interface ChangeNumberIndicator {
  defaultValue?: number;
  onSaveValue: (value: number) => void;
}

export const ChangeNumberIndicator: React.FC<ChangeNumberIndicator> = ({
  defaultValue,
  onSaveValue,
}) => {
  const [numOfBlocks, setNumOfBlocks] = useState(0);
  const [activeValue, setActiveValue] = useState(defaultValue ?? 0);

  const handleOnDecrease = (): void =>
    setActiveValue(value => Math.max(0, value - 1));

  const handleOnAdd = (): void => setActiveValue(value => value + 1);

  const handleOnSetNumOfBlocks = (e: LayoutChangeEvent): void =>
    setNumOfBlocks(Math.floor(e.nativeEvent.layout.width / TOTAL_BLOCK_WIDTH));

  return (
    <>
      <View style={styles.row}>
        <PressableOpacity
          style={styles.minusPressable}
          onPress={handleOnDecrease}>
          <Text size={TextSizes.xxxxlarge} weight={TextWeights.bold}>
            -
          </Text>
        </PressableOpacity>
        <Text size={TextSizes.extra} weight={TextWeights.bold}>
          {activeValue}
        </Text>
        <PressableOpacity style={styles.plusPressable} onPress={handleOnAdd}>
          <Text size={TextSizes.xxxxlarge} weight={TextWeights.bold}>
            +
          </Text>
        </PressableOpacity>
      </View>
      <View onLayout={handleOnSetNumOfBlocks} style={styles.rowBlocks}>
        {Array.from({ length: numOfBlocks }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.block,
              index < activeValue ? styles.blockActive : styles.blockInactive,
            ]}
          />
        ))}
      </View>
      <Button
        title="Salvar"
        type={ButtonType.outlined}
        onPress={(): void => onSaveValue(activeValue)}
      />
    </>
  );
};
