import { StyleSheet, StyleProp, TextStyle, Platform } from 'react-native'
import { human, systemWeights, sanFranciscoWeights } from 'react-native-typography'
import Colors from './Colors'
import Padding from './Padding'

interface ITypographyDefinitions {
  largeTitle: object
  subtitle: object
  seniorLarge: object
  largeBody: object
  body: object
  secondary: object
  tertiary: object
}
interface ITypographyStyles {
  largeTitle: Style
  subtitle: Style
  seniorLarge: Style
  largeBody: Style
  body: Style
  secondary: Style
  tertiary: Style
}
interface ITypographyObjects {
  largeTitleObject: TextStyle
  subtitleObject: TextStyle
  seniorLargeObject: TextStyle
  largeBodyObject: TextStyle
  bodyObject: TextStyle
  secondaryObject: TextStyle
  tertiaryObject: TextStyle
}
interface ITypography extends ITypographyStyles, ITypographyObjects {}
type Style = StyleProp<TextStyle>

const suffixProperties = (object: ITypographyDefinitions, suffix: string): ITypographyObjects =>
  Object.keys(object).reduce(
    (acc, key) => ({ ...acc, [`${key}${suffix}`]: (object as any)[key] }),
    {}
  ) as ITypographyObjects

const create = (object: ITypographyDefinitions): ITypography => ({
  ...suffixProperties(object, 'Object'),
  ...StyleSheet.create(object),
})

const stylesForColorPaddingLineHeight = (
  color: string, paddingBottom: number, zeroLineHeight?: boolean
): ITypographyDefinitions => ({
  largeTitle: {
    ...human.largeTitleObject,
    color,
    paddingBottom,
    lineHeight: zeroLineHeight ? undefined : human.largeTitleObject.lineHeight,
    ...(Platform.OS === 'ios' ? sanFranciscoWeights.bold : systemWeights.bold),
  },
  subtitle: {
    ...human.title1Object,
    color,
    paddingBottom,
    lineHeight: zeroLineHeight ? undefined : human.title1Object.lineHeight,
    ...(Platform.OS === 'ios' ? sanFranciscoWeights.medium : systemWeights.regular),
  },
  seniorLarge: {
    ...human.title2Object,
    color,
    paddingBottom,
    lineHeight: zeroLineHeight ? undefined : human.title1Object.lineHeight,
    ...(Platform.OS === 'ios' ? sanFranciscoWeights.medium : systemWeights.regular),
  },
  largeBody: {
    ...human.bodyObject,
    color,
    paddingBottom,
    lineHeight: zeroLineHeight ? undefined : human.bodyObject.lineHeight,
    ...(Platform.OS === 'ios' ? sanFranciscoWeights.medium : systemWeights.regular),
  },
  body: {
    ...human.subheadObject,
    color,
    paddingBottom,
    lineHeight: zeroLineHeight ? undefined : human.subheadObject.lineHeight,
    ...(Platform.OS === 'ios' ? sanFranciscoWeights.medium : systemWeights.regular),
  },
  secondary: {
    ...human.caption1Object,
    color,
    paddingBottom,
    lineHeight: zeroLineHeight ? undefined : human.caption1Object.lineHeight,
    ...(Platform.OS === 'ios' ? sanFranciscoWeights.medium : systemWeights.regular),
  },
  tertiary: {
    ...human.caption2Object,
    color,
    paddingBottom,
    lineHeight: zeroLineHeight ? undefined : human.caption2Object.lineHeight,
    ...(Platform.OS === 'ios' ? sanFranciscoWeights.regular : systemWeights.regular),
  },
})

export const primaryText = create(stylesForColorPaddingLineHeight(Colors.primary, 0))
export const blackText = create(stylesForColorPaddingLineHeight(Colors.black, 0))
export const greyText = create(stylesForColorPaddingLineHeight(Colors.grey, 0))
export const whiteText = create(stylesForColorPaddingLineHeight(Colors.white, 0))
export const paddedPrimaryText = create(stylesForColorPaddingLineHeight(Colors.primary, Padding.text))
export const paddedBlackText = create(stylesForColorPaddingLineHeight(Colors.black, Padding.text))
export const paddedGreyText = create(stylesForColorPaddingLineHeight(Colors.grey, Padding.text))
export const paddedWhiteText = create(stylesForColorPaddingLineHeight(Colors.white, Padding.text))
export const zerodPrimaryText = create(stylesForColorPaddingLineHeight(Colors.primary, 0, true))
export const zerodBlackText = create(stylesForColorPaddingLineHeight(Colors.black, 0, true))
export const zerodGreyText = create(stylesForColorPaddingLineHeight(Colors.grey, 0, true))
export const zerodWhiteText = create(stylesForColorPaddingLineHeight(Colors.white, 0, true))
