import React, { useEffect, useState } from 'react'
import { ScrollView, useWindowDimensions } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'
import RenderHTML from 'react-native-render-html';
import { useStores } from '../stores';
import { observer } from 'mobx-react';

const ViewNote = ({ route, navigation }) => {
    const {note} = useStores();
    const { item } = route.params;
    const { width } = useWindowDimensions();
    const [data, setData] = useState(item);
    navigation.setOptions({
        headerRight: () => (
            <Button onPress={() => {
                if (!item) return;
                navigation.push("Edit Note", { item });
            }} children="Sửa" />
        ),
    });

    useEffect(() => {
        if(!item) return;
        const noteData = note.notes.find(_note => _note.id === item.id);
        setData(noteData);
    }, [note.notes])

    if (!data) return <Text>Something went wrong</Text>
    return (
        <ScrollView>
            <Card>
                <Card.Content>
                    <Text variant="titleLarge">{data.title}</Text>
                    <RenderHTML
                        contentWidth={width}
                        source={{
                            html: data.content
                        }}
                    />
                </Card.Content>
            </Card>
        </ScrollView>
    )
}

export default observer(ViewNote)