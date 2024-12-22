import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    OrderPage: { name: string; image: any; price: string };
    DetailExample: { name: string; image: any; price: string };
};

type OrderPageProps = {
    route: RouteProp<RootStackParamList, 'OrderPage'>;
    navigation: StackNavigationProp<RootStackParamList, 'OrderPage'>;
};

const OrderPage = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { name = 'Latte', image = require("../../assets/Latte.png"), price = '3.80' } = route.params || {};

    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(quantity + 1); 
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../../assets/arrow-left.png")} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Order</Text>
            </View>

            <View style={styles.deliveryOptionContainer}>
                <TouchableOpacity style={styles.deliveryButtonSelected}>
                    <Text style={styles.deliveryTextSelected}>Deliver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deliveryButton}>
                    <Text style={styles.deliveryText}>Pick Up</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.addressContainer}>
                <Text style={styles.addressLabel}>Alamat Delivery</Text>
                <Text style={styles.address}>Faisal Abdul Aziz</Text>
                <Text style={styles.subAddress}>kp. Cikaroya Desa. Gunung Jaya rt/rw 16/03</Text>
                <View style={styles.addressButtonsContainer}>
                    <TouchableOpacity style={styles.addressButton}>
                        <Image source={require("../../assets/edit.png")} style={styles.smallIcon} />
                        <Text style={styles.addressButtonText}>Edit Address</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addressButton}>
                        <Image source={require("../../assets/Document.png")} style={styles.smallIcon} />
                        <Text style={styles.addressButtonText}>Add Note</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.productContainer}>
                <Image source={image} style={styles.productImage} />
                <View>
                    <Text style={styles.productName}>{name}</Text>
                    <Text style={styles.productDescription}>with Chocolate</Text>
                </View>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={handleDecrement} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>   
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity onPress={handleIncrement} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.discountContainer}>
                <Image source={require("../../assets/Discount.png")} style={styles.discountIcon} />
                <Text style={styles.discountText}>1 Discount is applied</Text>
                <Image source={require("../../assets/arrow-right.png")} style={styles.arrowRight} />
            </View>

            <View style={styles.paymentSummary}>
                <Text style={styles.paymentTitle}>Ringkasan Pembayaran:</Text>
                <View style={styles.paymentRow}>
                    <Text style={styles.paymentLabel}>Harga</Text>
                    <Text style={styles.paymentValue}>{price}</Text>
                </View>
                <View style={styles.paymentRow}>
                    <Text style={styles.paymentLabel}>Biaya Pengiriman</Text>
                    <Text style={styles.paymentValue}>Rp. 5.000</Text>
                </View>
                <View style={styles.paymentRow}>
                    <Text style={styles.paymentLabel}>Total Pembayaran</Text>
                    <Text style={styles.paymentTotal}>Rp. 15.000</Text>
                </View>
            </View>

            <View style={styles.paymentMethodContainer}>
                <Image source={require("../../assets/moneys.png")} style={styles.paymentIcon} />
                <Text style={styles.paymentMethodText}>Cash</Text>
                <Text style={styles.paymentMethodAmount}>15.000</Text>
                <Image source={require("../../assets/dots.png")} style={styles.dotsIcon} />
            </View>

            <TouchableOpacity style={styles.orderButton}>
                <Text style={styles.orderButtonText}>Order</Text>
            </TouchableOpacity>
        </View>
    );
}; 

export default OrderPage;  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2F2D2C',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    icon: {
        width: 24,
        height: 24,
    },
    deliveryOptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    deliveryButtonSelected: {
        backgroundColor: '#C67C4E',
        padding: 10,
        borderRadius: 10,
        width: '48%',
        alignItems: 'center',
    },
    deliveryButton: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 10,
        width: '48%',
        alignItems: 'center',
    },
    deliveryTextSelected: {
        color: '#fff',
        fontWeight: '600',
    },
    deliveryText: {
        color: '#C67C4E',
        fontWeight: '600',
    },
    addressContainer: {
        marginBottom: 50,
    },
    addressLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 15,
    },
    address: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
    },
    subAddress: {
        fontSize: 12,
        color: '#9B9B9B',
        marginBottom: 10,
    },
    addressButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 7,
    },
    addressButton: { 
        borderColor: '#DEDEDE',
        borderWidth: 1,
        padding: 8,
        borderRadius: 16,
        flexDirection: 'row',   
    },
    smallIcon: {
        width: 15,
        height: 16
    },
    addressButtonText: {
        color: '#C67C4E',
        marginLeft: 10,
        marginTop:-2
    },
    productContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginBottom: 20,
    },
    productImage: {
        width: 54,
        height: 54,
        borderRadius: 10,
        marginRight: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
    },
    productDescription: {
        fontSize: 12,
        color: '#9B9B9B',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    quantityButton: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        width: 24,
        height: 24,
    },
    quantityButtonText: {
        fontWeight: '600',
        textAlign: 'center',
    },
    quantityText: {
        marginHorizontal: 10,
        fontSize: 14,
        fontWeight: '600',
    },
    discountContainer: {
        padding: 10,
        borderRadius: 14,
        marginBottom: 20,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#EAEAEA',
    },
    discountIcon: {
        width: 24,
        height: 24,
        marginRight: 15,
    },
    discountText: {
        color: '#2F2D2C',
    },
    arrowRight: {
        width: 12,
        height: 12,
        marginLeft: 'auto',
    },
    paymentSummary: {
        marginBottom: 20,
    },
    paymentTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    paymentLabel: {
        fontSize: 14,
        color: '#2F2D2C',
    },
    paymentValue: {
        fontSize: 14,
        fontWeight: '600',
    },
    paymentTotal: {
        fontSize: 14,
        fontWeight: '600',
        color: '#C67C4E',
    },
    paymentMethodContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    paymentMethodText: {
        fontSize: 14,
        fontWeight: '600',
        marginHorizontal: 10,
    },
    paymentMethodAmount: {
        fontSize: 14,
        marginLeft:1,
    },
    dotsIcon: {
        width: 24,
        height: 24,
        marginLeft:"auto"
    },
    paymentIcon: {
        width: 24,
        height: 24,
    },

    orderButton: {
        backgroundColor: '#C67C4E',
        padding: 15,
        borderRadius: 14,
        alignItems: 'center',
    },
    orderButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
