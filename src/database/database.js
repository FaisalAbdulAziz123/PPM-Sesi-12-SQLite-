import SQLite from 'react-native-sqlite-storage';

// Fungsi untuk mendapatkan koneksi database
const getDBConnection = () => {
  return SQLite.openDatabase(
    {
      name: 'coffee_products.db',
      location: 'default',
    },
    () => {
      console.log('Database opened successfully');
    },
    (error) => {
      console.error('Error opening database:', error);
    }
  );
};

// Fungsi untuk membuat tabel jika belum ada
const createTable = (db) => {
  const query = `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL
    );
  `;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        () => resolve(),
        (_, error) => {
          console.error('Error creating table:', error);
          reject(error);
        }
      );
    });
  });
};

// Fungsi untuk memasukkan produk baru ke dalam database
const insertProduct = (db, { name, description, price }) => {
  const query = `INSERT INTO products (name, description, price) VALUES (?, ?, ?);`;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [name, description, price],
        (_, result) => resolve(result),
        (_, error) => {
          console.error('Error inserting product:', error);
          reject(error);
        }
      );
    });
  });
};

// Fungsi untuk mengambil semua produk dari database
const getProducts = (db) => {
  const query = `SELECT * FROM products;`;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (_, { rows }) => resolve(rows.raw()), // raw() digunakan untuk mengambil array data
        (_, error) => {
          console.error('Error fetching products:', error);
          reject(error);
        }
      );
    });
  });
};

// Fungsi untuk menghapus produk berdasarkan ID
const deleteProduct = (db, id) => {
  const query = `DELETE FROM products WHERE id = ?;`;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [id],
        (_, result) => resolve(result),
        (_, error) => {
          console.error('Error deleting product:', error);
          reject(error);
        }
      );
    });
  });
};

export { getDBConnection, createTable, insertProduct, getProducts, deleteProduct };
