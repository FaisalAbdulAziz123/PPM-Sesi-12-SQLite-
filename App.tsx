import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getDBConnection, createTable, insertProduct, getProducts, deleteProduct } from './src/database/database'; // Pastikan path import sesuai

const App = () => {
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        // Membuka koneksi ke database
        const db = await getDBConnection();
        
        // Membuat tabel jika belum ada
        await createTable(db);
        
        // Menambahkan produk contoh
        await insertProduct(db, { name: 'Coffee', description: 'Black coffee', price: 15000 });
        
        // Mengambil semua produk
        const products = await getProducts(db);
        
        // Menampilkan hasil produk ke terminal (console.log)
        console.log('All Products:', products);  // Menampilkan data produk di terminal
        
        // Menghapus produk dengan id = 1 (contoh)
        await deleteProduct(db, 1);
      } catch (error) {
        console.error('Database operation failed:', error);
      }
    };

    // Memanggil fungsi untuk inisialisasi database
    initializeDatabase();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View >
        <AppNavigator />
      </View>
    </GestureHandlerRootView>
  );
};

export default App;
