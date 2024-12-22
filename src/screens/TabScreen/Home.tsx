import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from "react-native";
import { NavigationProp } from '@react-navigation/native';

const product = [
    // { id: '1', name: 'Bakso Lava', description: 'with chocolate', image: require('../../assets/bakso.jpg'), price: '$4.50', rating: 4.8 },
    // { id: '2', name: 'Latte', description: 'with chocolate', image: require('../../assets/Faisal.jpg'), price: 'Rp. 10.000', rating: 4.9 },
    { id: '3', name: 'Machito', description: 'with chocolate', image: require('../../assets/Torabika.png'), price: '$4.00', rating: 4.5 },
    { id: '4', name: 'Americano', description: 'with chocolate', image: require('../../assets/Americano.png'), price: '$3.00', rating: 4.8 },
    { id: '5', name: 'Kopi Hitam', description: 'with original', image: require('../../assets/kopiItem.jpeg'), price: '$3.00', rating: 4.8 },
    { id: '6', name: 'Coffee Milk', description: 'with milk', image: require('../../assets/kopi6.jpeg'), price: '$3.00', rating: 4.8 },
];

type RootStackParamList = {
    Home: undefined;
    DetailExample: { message: string };
    Profile: undefined;
};

type DetailNavigationProps = NavigationProp<RootStackParamList, 'DetailExample'>;

const Coffee = () => {
    const navigation = useNavigation<DetailNavigationProps>();
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    const handleProductPress = (product: any) => {
        navigation.navigate('DetailExample', {
            message: 'Product Details',
            name: product.name,
            description: product.description,
            image: product.image,
            price: product.price,
            rating: product.rating,
        });
    };

    const handleProfilePress = () => {
        navigation.navigate('Profile');
    };

    return (
        <View style={[styles.container, isLandscape ? styles.landscapeContainer : styles.portraitContainer]}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.header}>
                    <View style={styles.locationContainer}>
                        <Text style={styles.locationText}>Location</Text>
                        <Text style={styles.location}>Sukabumi, Indonesia</Text>
                    </View>
                    <Image source={require("../../assets/Faisal.jpg")} style={styles.avatar} />
                </View>

                <View style={styles.searchContainer}>
                    <TextInput placeholder="Search Coffee" style={styles.search} />
                </View>

                <View style={styles.bannerContainer}>
                    <Image source={require("../../assets/coffe.png")} style={styles.banner} />
                </View>

                <View style={styles.buttonContainer}>
                    {['Cappuccino', 'Machito', 'Latte', 'Americano'].map((buttonLabel, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.button, index > 0 && styles.buttonCase]}>
                            <Text style={[styles.buttonText, index > 0 && styles.buttonTextCase]}>
                                {buttonLabel}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={[styles.cardWrapper, isLandscape && styles.cardWrapperLandscape]}>
                    {product.map(product => (
                        <TouchableOpacity key={product.id} style={styles.cardContainer} onPress={() => handleProductPress(product)}>
                            <Image source={product.image} style={styles.cardImage} />
                            <View style={styles.ratingContainer}>
                                <Image source={require("../../assets/star.png")} style={styles.iconStar} />
                                <Text style={styles.rating}>{product.rating}</Text>
                            </View>
                            <Text style={styles.cardTitle}>{product.name}</Text>
                            <Text style={styles.cardDescription}>{product.description}</Text>
                            <Text style={styles.cardPrice}>{product.price}</Text>
                            <Image source={require("../../assets/plus.png")} style={styles.iconPlus} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default Coffee;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    portraitContainer: {
        paddingHorizontal: 10,
    },
    landscapeContainer: {
        paddingHorizontal: 30,
    },
    scrollViewContent: {
        paddingBottom: 20, // to ensure content is not cut off on smaller screens
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
        marginHorizontal: 30,
        alignItems: 'center',
    },
    locationContainer: {
        flexDirection: 'column',
    },
    locationText: {
        fontSize: 12,
        color: "#B7B7B7",
        fontFamily: "sora",
        fontWeight: "400",
    },
    location: {
        fontSize: 14,
        color: "#DDDDDD",
        fontWeight: "600",
        fontFamily: "sora",
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 10,
    },
    searchContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    search: {
        paddingLeft: 20,
        borderRadius: 16,
        width: 351,
        height: 52,
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: "white",
    },
    bannerContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    banner: {
        width: "90%",
        height: 170,
        borderRadius: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 18,
    },
    button: {
        backgroundColor: "#C67C4E",
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    buttonCase: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    buttonText: {
        fontWeight: "600",
        fontSize: 14,
        color: "#FFFFFF",
        fontFamily: "sora",
    },
    buttonTextCase: {
        fontWeight: "600",
        fontSize: 14,
        color: "#2F4B4E",
        fontFamily: "sora",
    },
    cardWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    cardWrapperLandscape: {
        justifyContent: 'center',
    },
    cardContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 4,
        marginBottom: 20,
        width: '45%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    cardImage: {
        width: '100%',
        height: 130,
        borderRadius: 10,
    },
    cardTitle: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#333",
        marginTop: 10,
        marginLeft: 5,
    },
    cardDescription: {
        marginTop: 1,
        fontSize: 14,
        marginLeft: 7,
        color: "#666",
    },
    cardPrice: {
        marginTop: 10,
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bold',
        color: "#333",
    },
    iconPlus: {
        marginHorizontal: 125,
        marginTop: -30,         
        width: 35,
        height: 35,
    },
    iconStar: {
        position: "absolute",
        width: 20,
        height: 20,
        marginLeft: 9,
        marginTop: 5,
    },
    ratingContainer: {
        position: "absolute",
        flexDirection: "row",
        marginTop: 6,
        marginLeft: 35,
    },
    rating: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});
