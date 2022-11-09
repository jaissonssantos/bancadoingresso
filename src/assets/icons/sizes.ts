import { scale } from 'src/styleguide/scaling';

export enum IconSizes {
  nano = 'nano',
  xsmall = 'xsmall',
  small = 'small',
  xxxxmedium = 'xxxxmedium',
  xxxmedium = 'xxxmedium',
  xxmedium = 'xxmedium',
  xmedium = 'xmedium',
  medium = 'medium',
  large = 'large',
}

export const iconSizesValues: { [key in IconSizes]: number } = {
  [IconSizes.nano]: scale(12),
  [IconSizes.xsmall]: scale(15),
  [IconSizes.small]: scale(22),
  [IconSizes.xxxxmedium]: scale(24),
  [IconSizes.xxxmedium]: scale(30),
  [IconSizes.xxmedium]: scale(36),
  [IconSizes.xmedium]: scale(55),
  [IconSizes.medium]: scale(75),
  [IconSizes.large]: scale(95),
};
