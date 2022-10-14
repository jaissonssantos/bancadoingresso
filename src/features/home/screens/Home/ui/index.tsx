import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FadeBackground from 'react-native-linear-gradient';
import { Accordion } from 'src/components/Accordion';
import { Text, TextSizes, TextWeights } from 'src/components/Text';
import { InputSearch } from 'src/components/InputSearch';
import { Colors } from 'src/styleguide/colors';
import { styles } from './styles';

interface HomeUIProps {}

export const HomeUI: React.FC<HomeUIProps> = () => (
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text
          size={TextSizes.extra}
          weight={TextWeights.bold}
          style={styles.title}>
          Eventos
        </Text>

        <InputSearch
          name="search"
          placeholder="Buscar"
          style={styles.inputSearch}
          onChangeText={() => {}}
          containerStyle={styles.spacingBottomXXLarge}
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
          Você possui 3 (três) eventos disponíveis{' '}
        </Text>

        <Accordion
          title="Vans Warped Tour - Slow Bleeding"
          style={styles.spacingBottomXLarge}>
          <Text size={TextSizes.small} color={Colors.lightText}>
            Você possui 3 (três) eventos disponíveis{' '}
          </Text>
        </Accordion>

        <Accordion title="Revoada do Tatu" style={styles.spacingBottomXLarge}>
          <Text size={TextSizes.small} color={Colors.lightText}>
            Você possui 3 (três) eventos disponíveis{' '}
          </Text>
        </Accordion>

        <Accordion
          title="Vans Warped Tour - Slow Bleeding"
          style={styles.spacingBottomXLarge}>
          <Text size={TextSizes.small} color={Colors.lightText}>
            Você possui 3 (três) eventos disponíveis{' '}
          </Text>
        </Accordion>
      </ScrollView>
    </SafeAreaView>
  </FadeBackground>
);
