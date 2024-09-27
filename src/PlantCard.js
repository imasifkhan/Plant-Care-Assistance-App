import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlantCard = ({ plant }) => {
    const savePlant = async () => {
        try {
            // Convert the plant object to a JSON string
            const plantData = JSON.stringify(plant);
            // Save the plant data in local storage with a unique key
            await AsyncStorage.setItem(`plant_${plant.id}`, plantData);
            alert('Plant saved successfully!');
        } catch (error) {
            console.error('Error saving plant:', error);
            alert('Failed to save plant. Please try again.');
        }
    };

    return (
        <View style={styles.card}>
            {/* Image */}
            <Image source={{ uri: plant.image_url }} style={styles.image} />

            {/* Plant details */}
            <Text style={styles.title}>{plant.name}</Text>
            <Text style={styles.detail}>Scientific Name: {plant.scientific_name}</Text>
            <Text style={styles.detail}>Family: {plant.family}</Text>
            <Text style={styles.detail}>Year: {plant.year}</Text>

            {/* Save button */}
            <TouchableOpacity onPress={savePlant} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    detail: {
        fontSize: 16,
        marginBottom: 4,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default PlantCard;
