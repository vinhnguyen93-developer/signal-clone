import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Avatar } from '@rneui/base';

import {
  doc,
  collection,
  addDoc,
  db,
  serverTimestamp,
  auten,
  orderBy,
  onSnapshot,
  query,
} from '../firebase';

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const docRef = doc(db, 'chats', id);
    const colRef = collection(docRef, 'messages');
    const q = query(colRef, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) =>
      setChatMessages(querySnapshot.docs.map((doc) => doc.data()))
    );

    return unsubscribe;
  }, []);

  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            'https://khoinguonsangtao.vn/wp-content/uploads/2022/02/anh-dai-dien-fb-dep.jpg',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800' }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
