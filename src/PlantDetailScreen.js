// PlantDetailScreen.js

import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const PlantDetailScreen = ({ route }) => {
    const { plant } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Image */}
            <Image source={{ uri: plant.image_url }} style={styles.image} />

            {/* Plant Details */}
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{plant.name}</Text>
                <Text style={styles.subTitle}>Scientific Name:</Text>
                <Text style={styles.detail}>{plant.scientific_name}</Text>
                <Text style={styles.subTitle}>Family:</Text>
                <Text style={styles.detail}>{plant.family}</Text>
                <Text style={styles.subTitle}>Year:</Text>
                <Text style={styles.detail}>{plant.year}</Text>
                {/* Additional details */}
                {/* <Text style={styles.subTitle}>Duration:</Text>
                <Text style={styles.detail}>{plant.duration}</Text>
                <Text style={styles.subTitle}>Growth Habit:</Text>
                <Text style={styles.detail}>{plant.growth_habit}</Text>
                <Text style={styles.subTitle}>Native Status:</Text>
                <Text style={styles.detail}>{plant.native_status}</Text> */}
                {/* Add more details as needed */}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    detailsContainer: {
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    detail: {
        fontSize: 18,
        marginBottom: 10,
        marginLeft: 10,
    },
});

export default PlantDetailScreen;
