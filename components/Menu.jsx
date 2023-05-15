import React from 'react'
import { Image, ScrollView, View } from 'react-native'
import { Banner, List, Text, TextInput } from 'react-native-paper'

const Menu = () => {
    const [visible, setVisible] = React.useState(true);
    const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
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
                        <TextInput keyboardType='number-pad' mode='outlined'
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
                            <TextInput keyboardType='number-pad' mode='outlined'
                                contentStyle={{
                                    height: 30,
                                    fontSize: 16
                                }} outlineStyle={{
                                    height: 30,
                                }} {...props} />
                        )} />
                        <List.Item title="Chụp ảnh" right={(props)=>(
                            <TextInput keyboardType='number-pad' mode='outlined' 
                                contentStyle={{
                                height: 30,
                                fontSize: 16
                            }} outlineStyle={{
                                height: 30,
                            }} {...props} />
                        )} />
                        <List.Item title="Bắt đầu quay video" right={(props)=>(
                            <TextInput keyboardType='number-pad' mode='outlined' 
                                contentStyle={{
                                height: 30,
                                fontSize: 16
                            }} outlineStyle={{
                                height: 30,
                            }} {...props} />
                        )} />
                        <List.Item title="Kết thúc quay video" right={(props)=>(
                            <TextInput keyboardType='number-pad' mode='outlined' 
                                contentStyle={{
                                height: 30,
                                fontSize: 16
                            }} outlineStyle={{
                                height: 30,
                            }} {...props} />
                        )} />
                        <List.Item title="Bắt đầu ghi âm" right={(props)=>(
                            <TextInput keyboardType='number-pad' mode='outlined' 
                                contentStyle={{
                                height: 30,
                                fontSize: 16
                            }} outlineStyle={{
                                height: 30,
                            }} {...props} />
                        )} />
                        <List.Item title="Kết thúc ghi âm" right={(props)=>(
                            <TextInput keyboardType='number-pad' mode='outlined' 
                                contentStyle={{
                                height: 30,
                                fontSize: 16
                            }} outlineStyle={{
                                height: 30,
                            }} {...props} />
                        )} />
                    </List.Accordion>
                    <List.Accordion
                        title="Chức năng khác"
                        left={props => <List.Icon {...props} icon="folder" />}>
                        <List.Item title="Mở ghi chú bí mật" right={(props)=>(
                            <TextInput keyboardType='number-pad' mode='outlined' 
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

export default Menu