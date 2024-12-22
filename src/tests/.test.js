import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Coffee from '../screens/TabScreen/Home'; // Sesuaikan path jika berbeda
import { useNavigation } from '@react-navigation/native'; // Import useNavigation untuk pengujian navigasi

// Mocking useNavigation
jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: jest.fn(),
    };
});

describe('Coffee Component', () => {
    it('renders the location correctly', () => {
        const { getByText } = render(<Coffee />);
        expect(getByText('Sukabumi, Indonesia')).toBeTruthy();
    });

    it('renders the product list', () => {
        const { getAllByText } = render(<Coffee />);
        const products = ['Bakso Lava', 'Latte', 'Machito', 'Americano', 'Kopi Hitam', 'Coffee Milk'];
        
        products.forEach((product) => {
            const productElements = getAllByText(product); // Menggunakan getAllByText
            expect(productElements.length).toBeGreaterThan(0); // Pastikan ada elemen yang cocok
        });
    });

    it('navigates to the detail page when a product is pressed', () => {
        // Mock navigasi
        const navigateMock = jest.fn();
        useNavigation.mockReturnValue({ navigate: navigateMock });

        const { getByText } = render(<Coffee />);
        const productName = 'Bakso Lava';
        const product = getByText(productName);

        fireEvent.press(product); // Simulate press on the product

        // Mock navigation harus dipanggil dengan parameter yang benar
        expect(navigateMock).toHaveBeenCalledWith('DetailExample', expect.objectContaining({
            name: productName,
        }));
    });
});

