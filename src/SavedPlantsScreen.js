import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedPlantsScreen = ({ navigation }) => {
    const [savedPlants, setSavedPlants] = useState([]);

    useEffect(() => {
        loadSavedPlants();
    }, []);

    const loadSavedPlants = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const plantKeys = keys.filter(key => key.startsWith('plant_'));
            const plantsData = await AsyncStorage.multiGet(plantKeys);
            const plants = plantsData.map(([key, value]) => JSON.parse(value));
            setSavedPlants(plants);
        } catch (error) {
            console.error('Error loading saved plants:', error);
        }
    };

    const deletePlant = async (plantId) => {
        try {
            await AsyncStorage.removeItem(`plant_${plantId}`);
            loadSavedPlants(); // Reload saved plants after deletion
            Alert.alert('Success', 'Plant deleted successfully');
        } catch (error) {
            console.error('Error deleting plant:', error);
            Alert.alert('Error', 'Failed to delete plant. Please try again.');
        }
    };

    const navigateToPlantDetail = (plant) => {
        navigation.navigate('PlantDetailScreen', { plant: plant });
    };

    const refreshSavedPlants = () => {
        loadSavedPlants();
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigateToPlantDetail(item)}>
            <View style={styles.card}>
                <Image source={{ uri: item.image_url }} style={styles.image} />
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.detail}>Scientific Name: {item.scientific_name}</Text>
                <Text style={styles.detail}>Family: {item.family}</Text>
                <Text style={styles.detail}>Year: {item.year}</Text>
                <TouchableOpacity onPress={() => deletePlant(item.id)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Saved Plants</Text>
                <TouchableOpacity onPress={refreshSavedPlants} style={styles.refreshButton}>
                    <Text style={styles.refreshButtonText}>Refresh</Text>
                </TouchableOpacity>
            </View>
            {savedPlants.length > 0 ? (
                <FlatList
                    data={savedPlants}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            ) : (
                <Text>No saved plants yet.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    refreshButton: {
        backgroundColor: '#008080',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    refreshButtonText: {
        color: '#fff',
        fontSize: 16,
    },
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
    detail: {
        fontSize: 16,
        marginBottom: 4,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    image: {
        width: '100%',
        height: 200, // Adjust the height as needed
        borderRadius: 8,
        marginBottom: 10,
    },
});

export default SavedPlantsScreen;
