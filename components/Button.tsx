import React from 'react'
import { StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { Button as PaperButton, ButtonProps } from 'react-native-paper'
import { theme } from '../constants/theme'

type Props = {
  mode: 'text' | 'outlined' | 'contained';
  style?: ViewStyle | ViewStyle[];
} & ButtonProps;

export default function Button({ mode, style, ...props }: Props) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && { backgroundColor: theme.colors.surface },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  } as ViewStyle,
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  } as TextStyle,
})