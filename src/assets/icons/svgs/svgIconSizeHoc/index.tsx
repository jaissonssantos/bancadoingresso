import React, { ReactElement } from 'react';
import type { SvgProps } from 'react-native-svg';
import { IconSizes, iconSizesValues } from 'src/assets/icons/sizes';

export interface SvgIconSizeProps extends SvgProps {
  size?: IconSizes;
}

export type SvgIconComponent = React.FC<SvgIconSizeProps>;

export const svgIconSizeHoc =
  (IconSvg: React.FC<SvgProps>): SvgIconComponent =>
  ({ size = IconSizes.medium, ...rest }): ReactElement =>
    (
      <IconSvg
        {...rest}
        width={iconSizesValues[size]}
        height={iconSizesValues[size]}
      />
    );
