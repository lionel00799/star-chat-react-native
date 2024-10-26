import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../constants/theme'

interface TextInputProps {
  label: string;  // Add label prop
  errorText?: string;  // Mark as optional
  description?: string;  // Mark as optional
  [key: string]: any;  // For additional props
}

export default function TextInput({ label, errorText, description, ...props }: TextInputProps) {
  return (
    <View style={styles.container}>
      <Input
        label={label}  // Pass the label prop here
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}  // Spread other props (like value, onChangeText, etc.)
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
})