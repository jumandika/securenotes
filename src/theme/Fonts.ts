/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native';
import { ThemeVariables } from '../../@types/theme';

export default function ({ FontSize, Colors }: ThemeVariables) {
  return StyleSheet.create({
    textTiny: {
      fontSize: FontSize.tiny,
      color: Colors.textGray400,
      fontFamily:'Dosis-Regular'
    },
    textSmall: {
      fontSize: FontSize.small,
      color: Colors.textGray400,
      fontFamily:'Dosis-Regular'
    },
    textRegular: {
      fontSize: FontSize.regular,
      color: Colors.textGray400,
      fontFamily:'Dosis-Regular'
    },
    textLarge: {
      fontSize: FontSize.large,
      color: Colors.textGray400,
      fontFamily:'Dosis-Regular'
    },
    textBold: {
      fontFamily:'Dosis-ExtraBold' 
    },
    textUppercase: {
      textTransform: 'uppercase',
    },
    titleSmall: {
      fontSize: FontSize.small * 1.5,
      color: Colors.textGray800,
      fontFamily:'Dosis-ExtraBold'
    },
    titleRegular: {
      fontSize: FontSize.regular * 2,
      color: Colors.textGray800,
      fontFamily:'Dosis-ExtraBold'
    },
    titleLarge: {
      fontSize: FontSize.large * 2,
      color: Colors.textGray800,
      fontFamily:'Dosis-ExtraBold'
    },
    textCenter: {
      textAlign: 'center',
      fontFamily:'Dosis-Regular'
    },
    textJustify: {
      textAlign: 'justify',
      fontFamily:'Dosis-Regular'
    },
    textLeft: {
      textAlign: 'left',
      fontFamily:'Dosis-Regular'
    },
    textRight: {
      textAlign: 'right',
      fontFamily:'Dosis-Regular'
    },
    textError: {
      color: Colors.error,
      fontFamily:'Dosis-Regular'
    },
    textSuccess: {
      color: Colors.success,
      fontFamily:'Dosis-Regular'
    },
    textPrimary: {
      color: Colors.primary,
      fontFamily:'Dosis-Regular'
    },
    textLight: {
      color: Colors.textGray200,
      fontFamily:'Dosis-Regular'
    },
    textLobster: {
      fontFamily: 'lobster',
      fontWeight: 'normal',
    },
  });
}
