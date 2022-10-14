import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { IconSizes, PencilIcon } from 'src/assets/icons';
import { Button, ButtonIconPosition, ButtonType } from 'src/components/Button';
import { ProgressBar } from 'src/components/ProgressBar';
import { Skeleton } from 'src/components/Skeleton';
import { Text, TextSizes, TextWeights } from 'src/components/Text';
import { LoveFaceIcon } from 'src/assets/icons';
import { Colors } from 'src/styleguide/colors';
import { ChangeNumberIndicator } from '../ChangeNumberIndicator';
import { styles } from './styles';

export enum DailyGoalBoxStates {
  default = 'default',
  loading = 'loading',
  edit = 'edit',
}

export interface DailyGoalBoxProps {
  state: DailyGoalBoxStates;
  dailyGoal: number;
  numServicesDone: number;
  onChangeDailyGoalState: (newState: DailyGoalBoxStates) => void;
  onSaveDailyGoal: (newGoal: number) => void;
}

export const DailyGoalBox: React.FC<DailyGoalBoxProps> = ({
  state,
  dailyGoal,
  numServicesDone,
  onSaveDailyGoal,
  onChangeDailyGoalState,
}) => {
  const renderEmpty = (): ReactElement => (
    <>
      <View style={styles.rowTitle}>
        <Text size={TextSizes.medium} weight={TextWeights.bold}>
          Meta diária
        </Text>
        <Button
          title="+ adicionar"
          type={ButtonType.text}
          onPress={(): void => onChangeDailyGoalState(DailyGoalBoxStates.edit)}
        />
      </View>
      <View style={styles.containerEmpty}>
        <LoveFaceIcon size={IconSizes.xxmedium} />
        <Text
          size={TextSizes.small}
          weight={TextWeights.bold}
          style={styles.titleEmpty}>
          Adicione uma nova meta
        </Text>
        <Text
          size={TextSizes.xsmall}
          color={Colors.lightText}
          style={styles.descriptionEmpty}>
          para seus serviços e tenha resultado surpreendentes
        </Text>
      </View>
    </>
  );

  const renderDefault = (): ReactElement => (
    <>
      <View style={styles.rowTitle}>
        <Text size={TextSizes.medium} weight={TextWeights.bold}>
          Meta diária
        </Text>
        <Button
          title="editar"
          iconPosition={ButtonIconPosition.left}
          icon={<PencilIcon fill={Colors.primary} size={IconSizes.xsmall} />}
          type={ButtonType.text}
          onPress={(): void => onChangeDailyGoalState(DailyGoalBoxStates.edit)}
        />
      </View>
      <Text
        size={TextSizes.small}
        color={Colors.lightText}
        style={styles.titleServices}>
        Serviços executados
      </Text>
      <ProgressBar
        activeValue={
          dailyGoal > 0 ? Math.min(numServicesDone / dailyGoal, 1) : 0
        }
        style={styles.progressBar}
      />
      <Text
        size={TextSizes.small}
        weight={TextWeights.bold}
        style={styles.titleServices}>
        {numServicesDone} de {dailyGoal}
      </Text>
      <Text
        size={TextSizes.small}
        color={Colors.lightText}
        style={styles.descriptionEmpty}>
        {numServicesDone >= dailyGoal
          ? 'Parabéns, meta atingida!'
          : `Faltam ${dailyGoal - numServicesDone} para atingir a meta`}
      </Text>
    </>
  );

  const renderLoading = (): ReactElement => (
    <>
      <View style={styles.rowTitle}>
        <Text size={TextSizes.medium} weight={TextWeights.bold}>
          Meta diária
        </Text>
        <Skeleton style={[styles.skeleton, styles.skeletonRight]} />
      </View>
      <Skeleton style={[styles.skeleton, styles.skeletonSmall]} />
      <Skeleton style={[styles.skeleton, styles.skeletonLarge]} />
      <Skeleton style={[styles.skeleton, styles.skeletonMedium]} />
    </>
  );

  const renderEdit = (): ReactElement => (
    <>
      <Text size={TextSizes.medium} weight={TextWeights.bold}>
        Meta diária
      </Text>
      <ChangeNumberIndicator
        defaultValue={dailyGoal}
        onSaveValue={onSaveDailyGoal}
      />
    </>
  );

  return (
    <View style={styles.container}>
      {{
        [DailyGoalBoxStates.default]:
          dailyGoal > 0 ? renderDefault : renderEmpty,
        [DailyGoalBoxStates.loading]: renderLoading,
        [DailyGoalBoxStates.edit]: renderEdit,
      }[state]()}
    </View>
  );
};
