import { Avatar } from '@rneui/base';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

import { auten, auth, db, collection, query, getDocs } from '../firebase';
import CustomListItem from '../components/CustomListItem';

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const signOutUser = () => {
    auth.signOut(auten).then(() => {
      navigation.replace('Login');
    });
  };

  useEffect(() => {
    const unsubscribe = async () => {
      const q = query(collection(db, 'chats'));
      const querySnapshot = await getDocs(q);

      setChats(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    };

    unsubscribe();
  }, [chats]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTitleStyle: {
        color: 'black',
      },
      headerTintColor: 'black',
      headerLeft: () => {
        return (
          <View styles={{ marginLeft: 20 }}>
            <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
              <Avatar
                rounded
                source={{
                  uri: auten?.currentUser?.photoURL,
                }}
              />
            </TouchableOpacity>
          </View>
        );
      },
      headerRight: () => {
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 80,
              marginRight: 20,
            }}
          >
            <TouchableOpacity activeOpacity={0.5}>
              <AntDesign name="camerao" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
              <SimpleLineIcons
                onPress={() => navigation.navigate('AddChat')}
                name="pencil"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', {
      id,
      chatName,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
