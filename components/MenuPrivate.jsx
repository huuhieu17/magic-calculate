import React from 'react'
import { Image, ScrollView, View } from 'react-native'
import { Banner, List, Text, TextInput } from 'react-native-paper'
import { useStores } from '../stores/index';
import { FUNC } from '../constants';

const MenuPrivate = () => {
    const { hotkey } = useStores();
    const [visible, setVisible] = React.useState(true);
    const [expanded, setExpanded] = React.useState(true);
    return (
        <View>
            <Banner
                visible={visible}
                actions={[
                    {
                        label: 'Ẩn đi',
                        onPress: () => setVisible(false),
                    },
                ]}
                icon={({ size }) => (
                    <Image
                        source={{
                            uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',
                        }}
                        style={{
                            width: size,
                            height: size,
                        }}
                    />
                )}>
                Lưu ý, các phím tắt chỉ được lưu trong máy bộ nhớ máy của bạn. Một điều nữa, vui lòng cấp quyền để sử dụng đầy đủ tính năng của phần mềm. Xin cảm ơn
            </Banner>
            <ScrollView style={{
                padding: 16,
            }}>
                <List.Section title="Đặt phím mở menu bảo mật">
                    <List.Item title="Mở menu bảo mật" right={(props) => (
                        <TextInput onChangeText={(text) => {
                            setTimeout(() => {
                                hotkey.setKeyValue(FUNC.PASSWORD, text);
                            }, 500);
                        }} defaultValue={hotkey.hotkey[FUNC.PASSWORD]} keyboardType='number-pad' mode='outlined'
                            contentStyle={{
                                height: 30,
                                fontSize: 16
                            }} outlineStyle={{
                                height: 30,
                            }} {...props} />
                    )} />
                </List.Section>
                <List.Section title="Gán phím tắt cho các chức năng">
                    <List.Accordion
                        title="Đa phương tiện"
                        left={props => <List.Icon {...props} icon="folder" />}>
                        <List.Item title="Mở thư viện" right={(props) => (
                            <TextInput onChangeText={(text) => {
                                setTimeout(() => {
                                    hotkey.setKeyValue(FUNC.OPEN_LIBRARY, text);
                                }, 500);
                            }} defaultValue={hotkey.hotkey[FUNC.OPEN_LIBRARY]} keyboardType='number-pad' mode='outlined'
                                contentStyle={{
                                    height: 30,
                                    fontSize: 16
                                }} outlineStyle={{
                                    height: 30,
                                }} {...props} />
                        )} />
                        <List.Item title="Chụp ảnh cam sau" right={(props) => (
                            <TextInput onChangeText={(text) => {
                                setTimeout(() => {
                                    hotkey.setKeyValue(FUNC.TAKE_PHOTO_BACK, text);
                                }, 500);
                            }} defaultValue={hotkey.hotkey[FUNC.TAKE_PHOTO_BACK]} keyboardType='number-pad' mode='outlined'
                                contentStyle={{
                                    height: 30,
                                    fontSize: 16
                                }} outlineStyle={{
                                    height: 30,
                                }} {...props} />
                        )} />
                        <List.Item title="Chụp ảnh cam trước" right={(props) => (
                            <TextInput onChangeText={(text) => {
                                setTimeout(() => {
                                    hotkey.setKeyValue(FUNC.TAKE_PHOTO_FRONT, text);
                                }, 500);
                            }} defaultValue={hotkey.hotkey[FUNC.TAKE_PHOTO_FRONT]} keyboardType='number-pad' mode='outlined'
                                contentStyle={{
                                    height: 30,
                                    fontSize: 16
                                }} outlineStyle={{
                                    height: 30,
                                }} {...props} />
                        )} />
                        <List.Item title="Bắt đầu quay video cam trước" right={(props) => (
                            <TextInput onChangeText={(text) => {
                                setTimeout(() => {
                                    hotkey.setKeyValue(FUNC.START_RECORDING_VIDEO_FRONT, text);
                                }, 500);
                            }} defaultValue={hotkey.hotkey[FUNC.START_RECORDING_VIDEO_FRONT]} keyboardType='number-pad' mode='outlined'
                                contentStyle={{
                                    height: 30,
                                    fontSize: 16
                                }} outlineStyle={{
                                    height: 30,
                                }} {...props} />
                        )} />
                        <List.Item title="Bắt đầu quay video cam sau" right={(props) => (
                            <TextInput onChangeText={(text) => {
                                setTimeout(() => {
                                    hotkey.setKeyValue(FUNC.START_RECORDING_VIDEO_BACK, text);
                                }, 500);
                            }} defaultValue={hotkey.hotkey[FUNC.START_RECORDING_VIDEO_BACK]} keyboardType='number-pad' mode='outlined'
                                contentStyle={{
                                    height: 30,
                                    fontSize: 16
                                }} outlineStyle={{
                                    height: 30,
                                }} {...props} />
                        )} />
                        <List.Item title="Kết thúc quay video" right={(props) => (
                            <TextInput onChangeText={(text) => {
                                setTimeout(() => {
                                    hotkey.setKeyValue(FUNC.STOP_RECORDING_VIDEO, text);
                                }, 500);
                            }} defaultValue={hotkey.hotkey[FUNC.STOP_RECORDING_VIDEO]} keyboardType='number-pad' mode='outlined'
                                contentStyle={{
                                    height: 30,
                                    fontSize: 16
                                }} outlineStyle={{
                                    height: 30,
                                }} {...props} />
                        )} />
                        {/* <List.Item title="Bắt đầu ghi âm" right={(props) => (
                            <TextInput onChangeText={(text) => {
                                setTimeout(() => {
                                    hotkey.setKeyValue(FUNC.START_RECORDING_AUDIO, text);
                                }, 500);
                            }} defaultValue={hotkey.hotkey[FUNC.START_RECORDING_AUDIO]} keyboardType='number-pad' mode='outlined'
                                contentStyle={{
                                    height: 30,
                                    fontSize: 16
                                }} outlineStyle={{
                                    height: 30,
                                }} {...props} />
                        )} />
                        <List.Item title="Kết thúc ghi âm" right={(props) => (
                            <TextInput onChangeText={(text) => {
                                setTimeout(() => {
                                    hotkey.setKeyValue(FUNC.STOP_RECORDING_AUDIO, text);
                                }, 500);
                            }} defaultValue={hotkey.hotkey[FUNC.STOP_RECORDING_AUDIO]} keyboardType='number-pad' mode='outlined'
                                contentStyle={{
                                    height: 30,
                                    fontSize: 16
                                }} outlineStyle={{
                                    height: 30,
                                }} {...props} />
                        )} /> */}
                    </List.Accordion>
                    <List.Accordion
                        title="Chức năng khác"
                        left={props => <List.Icon {...props} icon="folder" />}>
                        <List.Item title="Mở ghi chú bí mật" right={(props) => (
                            <TextInput onChangeText={(text) => {
                                setTimeout(() => {
                                    hotkey.setKeyValue(FUNC.OPEN_NOTE, text);
                                }, 500);
                            }} defaultValue={hotkey.hotkey[FUNC.OPEN_NOTE]} keyboardType='number-pad' mode='outlined'
                                contentStyle={{
                                    height: 30,
                                    fontSize: 16
                                }} outlineStyle={{
                                    height: 30,
                                }} {...props} />
                        )} />
                        <List.Item title="Comming soon" />
                    </List.Accordion>
                </List.Section>
            </ScrollView>
        </View>
    )
}

export default MenuPrivate