import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from '@expo/vector-icons';

// Define the props type
interface CellProps {
    title: string;
    icon: string;
    iconColor?: string;
    tintColor?: string;
    style?: ViewStyle;
    onPress?: () => void;
    secondIcon?: string;
    subtitle?: string;
    showForwardIcon?: boolean;
}

const Cell: React.FC<CellProps> = ({
    title,
    icon,
    iconColor = 'white',
    tintColor,
    style,
    onPress,
    secondIcon,
    subtitle,
    showForwardIcon = true
}) => {
    return (
        <TouchableOpacity style={[styles.cell, style]} onPress={onPress}>
            <View style={[styles.iconContainer, { backgroundColor: tintColor }]}>
                <Ionicons name={icon as any} size={24} style={{ marginStart: 4 }} color={iconColor} />
            </View>

            <View style={styles.textsContainer}>
                <Text style={styles.title}>
                    {title}
                </Text>
                {subtitle && (
                    <Text style={styles.subtitle}>
                        {subtitle}
                    </Text>
                )}
            </View>
            {showForwardIcon && <Ionicons name={secondIcon as any ?? 'chevron-forward-outline'} size={20} />}
        </TouchableOpacity>
    );
};

// Define the styles
const styles = StyleSheet.create({
    contactRow: {
        backgroundColor: 'white',
        marginTop: 16,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.border,
    },
    cell: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.border,
    },
    subtitle: {
        color: '#565656'
    },
    title: {
        fontSize: 16,
    },
    textsContainer: {
        flex: 1,
        marginStart: 8
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 6,
        alignContent: 'center',
        justifyContent: 'center',
    }
});

export default Cell;