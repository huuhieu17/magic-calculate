import React from 'react'
import { Linking, PermissionsAndroid, ScrollView, View } from 'react-native'
import { List, Text } from 'react-native-paper'
import { navigate } from './RootNavigator'

const Menu = () => {
    return (
        <View>
           <ScrollView style={{
            padding: 16,
           }}>
                <List.Item
                    title="Hướng dẫn sử dụng"
                    description="Giới thiệu và hướng dẫn cách sử dụng phần mềm"
                    left={props => <List.Icon icon="book" />}
                    onPress={()=>{
                        navigate('Tutorial', {value: 1})
                    }}
                />
                <List.Item
                    title="Cấp quyền ứng dụng"
                    description="Yêu cầu quyền sử dụng chức năng"
                    left={props => <List.Icon icon="key" />}
                    onPress={async () => {
                        await PermissionsAndroid.requestMultiple([
                            PermissionsAndroid.PERMISSIONS.CAMERA,
                            PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
                            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
                            PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
                            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                        ])
                    }}
                />
                <List.Item
                    title="Phiên bản"
                    description="1.0"
                    left={props => <List.Icon icon="phone" />}
                />
                <List.Item
                    title="Github"
                    description="huuhieu17"
                    left={props => <List.Icon icon="github" />}
                    onPress={()=> {
                        Linking.openURL('https://github.com/huuhieu17')
                    }}
                />
                <List.Item
                    title="Facebook"
                    description="huuhieu2001"
                    left={props => <List.Icon icon="facebook" />}
                    onPress={()=> {
                        Linking.openURL('https://facebook.com/huuhieu2001')
                    }}
                />
            </ScrollView>
        </View>
    )
}

export default Menu