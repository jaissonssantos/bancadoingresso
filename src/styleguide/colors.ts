export enum Colors {
  primary = '#911F19',
  primaryLight = '#C43D35',
  primaryDark = '#6B120D',
  text = '#F1F1F1',
  lightText = '#FFF',
  gray = '#51555D',
  white = '#F1F1F1',
  whiteDarkLight = '#C6C6C6',
  whiteDarkMedium = '#7B7B7B',
  whiteDark = '#3D3D3D',
  overlay = 'rgba(0, 0, 0, 0.3)',
  overlayMedium = 'rgba(0, 0, 0, 0.5)',
  overlayDark = 'rgba(0, 0, 0, 0.8)',
  overlayDarkCart = 'rgba(37, 37, 37, 0.7)',
  transparent = '#FFFFFF00',
  black = '#040101',
  blackLight = '#1F1F1F',
  blackLightMedium = '#252525',
  blackMedium = '#333333',
  border = '#7B7B7B',
  lightBorder = '#f8f8f8',
  lightGray = '#E8EAED',
  placeholder = '#7B7B7B',
  errorRed = '#E54F49',
  success = '#7AD81B',
  warning = '#FFE249',
  info = '#3CAFC8',
}

export const ColorsRGBA = {
  black: (a = 1): string => `rgba(0, 0, 0, ${a})`,
};
