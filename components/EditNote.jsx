import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { Button, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useStores } from '../stores';
const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>
const EditNote = ({ route, navigation }) => {
  const { item } = route.params;
  const { note } = useStores();
  const richText = React.useRef();
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");

  navigation.setOptions({
    headerRight: () => (
      <Button onPress={() => {
        if(!item) return;
        const obj = {
          id: item.id,
          content: data,
          title
        }
        note.updateNote(item.id, obj)
        navigation.goBack();
      }} children="Lưu" />
    ),
  });

  useEffect(() => {
    setTitle(item.title);
    setData(item.content);
  }, [])

  return (
    <SafeAreaView>
      <TextInput value={title} onChangeText={(e) => {
        setTitle(e)
        console.log(e);
      }} placeholder='Tiêu đề' />
      <View style={{
      }}>
        <RichToolbar
          editor={richText}
          actions={[actions.keyboard, actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1, actions.insertBulletsList, actions.insertOrderedList, actions.insertImage, actions.insertVideo, actions.insertLink, actions.checkboxList, actions.removeFormat]}
          iconMap={{ [actions.heading1]: handleHead }}
        />
      </View>
      <ScrollView style={{
      }}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} contentContainerStyle={{ flex: 1, borderTopWidth: 1 }}>
          <RichEditor
            initialContentHTML={data}
            placeholder='Nội dung'
            ref={richText}
            onChange={descriptionText => {
              setData(descriptionText)
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>

    </SafeAreaView>
  )
}

export default EditNote