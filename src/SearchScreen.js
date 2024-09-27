// SearchScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import PlantCard from './PlantCard';

const SearchScreen = ({ route, navigation }) => {
    const { search, searchData } = route.params;

    const navigateToPlantDetail = (plant) => {
        navigation.navigate('PlantDetailScreen', { plant: plant });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Search Results for "{search}":</Text>
            {searchData && searchData.length > 0 ? (
                searchData.map((plant, index) => (
                    <TouchableOpacity key={index} onPress={() => navigateToPlantDetail(plant)}>
                        <PlantCard plant={plant} />
                    </TouchableOpacity>
                ))
            ) : (
                <Text style={styles.outputText}>No results found.</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    outputText: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default SearchScreen;
