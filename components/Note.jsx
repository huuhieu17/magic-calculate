import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, IconButton, Menu, Text, TextInput } from 'react-native-paper'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { useStores } from '../stores'
import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react'
import { removeHtmlStringTag } from '../utils/string'

const Note = () => {
    const navigation = useNavigation();
    const { note } = useStores();

    const [data, setData] = useState([]);
    useEffect(() => {
        setData(note.notes);
    }, [note.notes])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => {
                    navigation.navigate("Add Note", { value: 1 })
                }} children="Thêm mới" />
            ),
        });

    }, [])

    return (
        <View style={{
            padding: 16,
            position: 'relative',
            height: '100%',
        }}>
            <ScrollView style={{
                marginTop: 10,
                flex: 1,
            }} >
                <Text>Danh sách ghi chú</Text>
                <View>
                    {data.map(item => {
                        return (
                            <Card.Title
                                title={(item.title && item.title !== "") ? item.title : 'Không có tiêu đề'}
                                subtitle={removeHtmlStringTag(item.content)}
                                left={(props) => <Avatar.Icon {...props} icon="text" />}
                                right={(props) => <MenuItem navigation={navigation} item={item} />}
                            />
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

const MenuItem = ({ item, navigation }) => {
    const { note } = useStores();
    const [open, setOpen] = useState(false);
    return (
        <View style={{
            position: 'relative',
        }}>
            <Menu
                visible={open}
                onDismiss={() => {
                    setOpen(false)
                }}
                anchor={<IconButton style={{
                }} icon="dots-vertical" onPress={() => {
                    setOpen(true);
                }} />}>
                <Menu.Item style={{ zIndex: 3 }} leadingIcon="eye" onPress={() => {
                     setOpen(false)
                    navigation.push("View Note", { item });
                }} title="Xem" />
                <Menu.Item style={{ zIndex: 3 }} leadingIcon="pencil" onPress={() => {
                    setOpen(false)
                    navigation.push("Edit Note", { item });
                 }} title="Sửa" />
                <Menu.Item style={{ zIndex: 3 }} leadingIcon="trash-can" onPress={() => {
                    note.removeNote(item.id);
                    setOpen(false)
                 }} title="Xoá" />
            </Menu>
        </View>
    )
}

export default observer(Note)