import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, ScrollView} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons'; // Importing icons from Expo vector icons library
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


// detectplant screen
export default function DetectPlant({ navigation }) {
    const [imageUri, setImageUri] = useState(null);
    const [labels, setLabels] = useState(null);
    const [Search, setSearch] = useState('');
    const [SearchData, setSearchData] = useState([]);
    
    // pick image from gallery
    const pickImage = async () => {
        try {
            setSearchData([]);
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled && result.assets && result.assets.length > 0) {
                setImageUri(result.assets[0].uri);
                setSearch(''); // Clear search text when a new image is selected
                console.log('Result=====>>>', result?.assets[0]?.uri);
                analyzeImage();
                if (labels && labels.length) {
                    SearchPlant();
                }
            }
        } catch (error) {
            console.error("Error picking image:", error);
        }
    };

    const analyzeImage = async () => {
        try {
            if (!imageUri) {
                alert('Please select an image first!!');
                return;
            }

            const apiKey = "AIzaSyDn83NTiStBSdyoZnc9KquRs0puhFga4T8";
            const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

            const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const requestData = {
                requests: [
                    {
                        image: {
                            content: base64ImageData,
                        },
                        features: [{ type: 'LABEL_DETECTION', maxResults: 1 }],
                    },
                ],
            };

            const apiResponse = await axios.post(apiURL, requestData);

            if (apiResponse && apiResponse.data && apiResponse.data.responses && apiResponse.data.responses[0] !== null) {
                setLabels(apiResponse.data.responses[0].labelAnnotations);
                setSearch(labels[0].description); // Assuming you have a reason for this line
            } else {
                console.log("Error: Invalid API response");
                alert('Invalid API response');
            }
        } catch (error) {
            console.error('Error analyzing image:', error);
            alert('Unable to Analyze Image!');
        }
    };

    // search plant by name
    const SearchPlant = async () => {
        if (!Search) {
            return;
        }

        const apiKey = "5bynn-tA8E9NGYvTICkkWvR7WpF2YQiSZcPcOgjag-g";
        // const apiURL = `https://trefle.io/api/v1/species/search?q=${Search}&limit=1&token=${apiKey}`;
        const apiURL = `https://trefle.io/api/v1/plants/search?token=${apiKey}&q=${Search}`;

        try {
            const response = await axios.get(apiURL);
            const searchData = response.data.data;
            navigation.navigate('SearchScreen', { search: Search, searchData: searchData });
        } catch (error) {
            console.log("Error", error);
            // Handle error, show error message, etc.
        }
    }

    // take picture from camera
    const takePicture = async () => {
        const result = await ImagePicker.launchCameraAsync();
        setImageUri(result?.assets[0]?.uri);
        console.log('Result=====>>>', result?.assets[0]?.uri);
        analyzeImage();
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Search input */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder='Search'
                    value={Search}
                    onChangeText={(text) => setSearch(text)}
                />
                <TouchableOpacity style={styles.searchButton} onPress={SearchPlant}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>

            {/* Card to display information about the Plant Care Assistance app */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>What is Plant Care Assistance?</Text>
                <Text style={styles.cardText}>
                    Plant Care Assistance is a mobile app designed to help you identify plants,
                    learn about their care requirements, and keep track of your plant collection.
                    Simply upload a photo of a plant or search by name to get detailed information
                    about it. You can also save your favorite plants for future reference.
                </Text>
            </View>

            {/* Select image and take picture buttons */}
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <AntDesign name="picture" size={24} color="white" />
                    <Text style={styles.buttonText}>Select Image</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.buttonSpacing]} onPress={takePicture}>
                    <MaterialIcons name="camera-alt" size={24} color="white" />
                    <Text style={styles.buttonText}>Take Picture</Text>
                </TouchableOpacity>
            </View>

            {/* Image display */}
            <Image resizeMode='contain' source={{ uri: imageUri }} style={styles.image} />
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    searchContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 16,
        paddingHorizontal: 10,
        marginRight: 10,
        padding: 5
    },
    searchButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 5,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardText: {
        fontSize: 16,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#4CAF50',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 16,
        alignItems: 'center',
    },
    image: {
        width: '90%',
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonSpacing: {
        marginHorizontal: 20,
    },
});
