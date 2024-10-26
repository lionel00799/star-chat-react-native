import React from "react";
import { Text, TouchableOpacity, View, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "@/constants/Colors";

// Define the types for the props
interface ContactRowProps {
  name: string;
  subtitle: string;
  subtitle2?: string; // subtitle2 is optional
  onPress?: () => void;
  onLongPress?: () => void;
  style?: ViewStyle;
  selected?: boolean;
  showForwardIcon?: boolean;
}

const ContactRow: React.FC<ContactRowProps> = ({
  name,
  subtitle,
  onPress,
  style,
  onLongPress,
  selected = false,
  showForwardIcon = true,
  subtitle2,
}) => {
  return (
    <TouchableOpacity style={[styles.row, style]} onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.avatar}>
        <Text style={styles.avatarLabel}>
          {name.trim().split(' ').reduce((prev, current) => `${prev}${current[0]}`, '')}
        </Text>
      </View>

      <View style={styles.textsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {subtitle2 && (
        <View style={styles.textsContainer}>
          <Text style={styles.subtitle2}>{subtitle2}</Text>
        </View>
      )}

      {selected && (
        <View style={showForwardIcon ? styles.overlay : styles.overlay2}>
          <Ionicons name="checkmark-outline" size={16} color={'white'} />
        </View>
      )}
      {showForwardIcon && <Ionicons name="chevron-forward-outline" size={20} />}
    </TouchableOpacity>
  );
};

// Define the styles
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  name: {
    fontSize: 16,
  },
  subtitle: {
    marginTop: 2,
    color: '#565656',
    width: 240,
  },
  subtitle2: {
    fontSize: 12,
    left: 96,
    color: '#565656',
  },
  textsContainer: {
    flex: 1,
    marginStart: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  avatarLabel: {
    fontSize: 20,
    color: 'white',
  },
  overlay: {
    width: 22,
    height: 22,
    backgroundColor: Colors.teal,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1.5,
    top: 18,
    right: 278,
  },
  overlay2: {
    width: 22,
    height: 22,
    backgroundColor: Colors.teal,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1.5,
    top: 18,
    right: 298,
  },
});

export default ContactRow;