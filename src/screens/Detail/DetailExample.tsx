import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = { 
    DetailExample: { 
        message: string; 
        name: string; 
        description: string; 
        image: any; 
        price: string; 
        rating: number; 
    };
    OrderPage: { 
      name: string; 
      image: any; 
      price: string; 
  };
};

type DetailExampleProps = {
    route: RouteProp<RootStackParamList, 'DetailExample'>;
    navigation: StackNavigationProp<RootStackParamList, 'DetailExample'>;
};

const DetailExample: React.FC<DetailExampleProps> = ({ route, navigation }) => {
    const { name, description, image, price, rating } = route.params;

    const [liked, setLiked] = useState(false);
    const toggleLike = () => {
    setLiked(!liked);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../../assets/arrow-left.png")} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>DETAIL</Text>
                <TouchableOpacity onPress={toggleLike}>
                <Image source={liked ? require('../../assets/Heart.png') : require('../../assets/Heart.png')}
                style={[styles.hearticon, liked && styles.dislikeikon]}/>
                </TouchableOpacity>
            </View>

            <Image source={image} style={styles.image} />

            <Text style={styles.title}>{name}</Text>

            <View style={styles.ratingContainer}>
                <Image source={require("../../assets/star.png")} style={styles.iconSmall} />
                <Text style={styles.rating}>{rating}</Text>
                <Text style={styles.ratingCount}>(230)</Text>
                <Image source={require("../../assets/bean.png")} style={styles.iconSmall} />
                <Image source={require("../../assets/milk.png")} style={styles.iconSmall} />
            </View>

            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
                A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo.. 
                <Text style={styles.readMore}> Read More</Text>
            </Text>

            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.sizeContainer}>
                {['S', 'M', 'L'].map((size, index) => (
                    <View key={index} style={styles.sizeBox}>
                        <Text style={styles.sizeText}>{size}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.footer}>
                <View>
                    <Text style={styles.priceLabel}>Price</Text>
                    <Text style={styles.price}>{price}</Text>
                </View>
                <TouchableOpacity style={styles.buyButton}
                onPress={() => navigation.navigate('OrderPage', {name, image, price})}>
                    <Text style={styles.buyButtonText}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DetailExample;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: "#2F2D2C",
    },
    icon: {
        width: 26,
        height: 24,
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 20,
        marginBottom: 20,
    },

    hearticon: {
        tintColor:"red",
        width:24,
        height:24
    },
    dislikeikon: {
        tintColor:"grey",
        width:24,
        height:24,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: "#2F2D2C",
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconSmall: {
        width: 20,
        height: 20,
        marginHorizontal: 5,
    },
    rating: {
        fontSize: 16,
        color: '#666',
    },
    ratingCount: {
        marginLeft: 5,
        color: '#666',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2F2D2C',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#9B9B9B',
        lineHeight: 22,
        marginBottom: 20,
    },
    readMore: {
        color: '#C67C4E',
    },
    sizeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    sizeBox: {
        width: 96,
        height: 43,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sizeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2F2D2C',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceLabel: {
        fontSize: 14,
        color: '#9B9B9B',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#C67C4E',
    },
    buyButton: {
        backgroundColor: '#C67C4E',
        width: 217,
        height: 62,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buyButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
