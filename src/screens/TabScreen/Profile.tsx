import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, PermissionsAndroid, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; 

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [profileName, setProfileName] = useState('Faisal Abdul Aziz');
  const [profileEmail, setProfileEmail] = useState('faisalabdulaziz761@gmail.com');
  const [profileImage, setProfileImage] = useState(require("../../assets/Faisal.jpg")); // Gambar default

  const [isEditing, setIsEditing] = useState(false);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to select photos',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestStoragePermission(); 
    if (!hasPermission) {
      Alert.alert('Permission denied', 'App needs permission to access your storage');
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        includeBase64: false, 
      },
      (response) => {
        if (response.didCancel) {
          Alert.alert('Cancelled', 'User cancelled image picker');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage);
        } else {
         
          if (response.assets && response.assets.length > 0) {
            const source = { uri: response.assets[0].uri }; 
            setProfileImage(source);
          }
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../../assets/arrow-left.png")} style={{ width: 20, height: 30 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>

        {isEditing ? (
          <>
            <TextInput 
              value={profileName} 
              onChangeText={setProfileName} 
              style={styles.input} 
              placeholder="Enter your name" 
            />
            <TextInput 
              value={profileEmail} 
              onChangeText={setProfileEmail} 
              style={styles.input} 
              placeholder="Enter your email" 
            />
          </>
        ) : (
          <>
            <Text style={styles.profileName}>{profileName}</Text>
            <Text style={styles.profileEmail}>{profileEmail}</Text>
          </>
        )}
      </View>

      {isEditing ? (
        <TouchableOpacity style={styles.saveButton} onPress={() => setIsEditing(false)}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>My Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Payment Methods</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "silver",
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    flexDirection: "row",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2F2D2C',
    marginLeft: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 25,
    fontWeight: '600',
    color: '#2F2D2C',
  },
  profileEmail: {
    fontSize: 15,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    width: '80%',
    textAlign: 'center',
    color: 'black',
    fontSize: 17,
    backgroundColor: 'white',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  optionsContainer: {
    marginBottom: 30,
  },
  option: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#2F2D2C',
  },
  logoutButton: {
    backgroundColor: '#E74C3C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 80,
    marginTop: 40,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
