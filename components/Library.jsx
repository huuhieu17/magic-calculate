import React, { useState } from 'react'
import { Image, Pressable, ToastAndroid, View } from 'react-native'
import { BottomNavigation, Chip, Text } from 'react-native-paper'
import { useStores } from '../stores';
import GridView from './GridView';
import ImageView from 'react-native-image-viewing';
import { PicturesDirectoryPath } from 'react-native-fs';

var RNFS = require('react-native-fs');
const Library = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'photos', title: 'Ảnh', focusedIcon: 'image' },
        { key: 'videos', title: 'Video', focusedIcon: 'video' },
        { key: 'audio', title: 'Ghi âm', focusedIcon: 'music' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        photos: PhotoRoute,
        videos: VideoRoute,
        audio: AudioRoute,
    });
    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    )
}

const PhotoRoute = () => {
    const {library} = useStores();
    const [showImage, setShowImage] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const RenderCardImage = ({item, index}) => {
        return (
            <Pressable onPress={()=> {
                setImageIndex(index);
                setShowImage(true);
            }} style={{
                width: '100%',
                borderWidth: 1,
            }}>
                <Image style={{
                    aspectRatio: 1
                }} source={{uri: 'file://'+item}}/>
            </Pressable>
        )
    }
    return (
        <View>
        <GridView gap={10} itemPerRow={2} items={library.images.map((item, index) => <RenderCardImage item={item} index={index} />)} />
            <ImageView
                images={library.images.map(item => {
                    return {
                        uri: 'file://' + item,
                    };
                })}
                imageIndex={imageIndex}
                visible={showImage}
                onRequestClose={() => setShowImage(false)}
                FooterComponent={(imageIndex) => {
                    return (
                        <View style={{
                            width: '100%',
                            padding: 20,
                            backgroundColor: 'black',
                            flexDirection: 'row',
                            gap: 20
                        }}>
                           <Chip style={{
                            backgroundColor: 'white',
                            borderWidth: 1, borderColor: 'white'
                           }} icon="download" onPress={async () => {
                            await RNFS.mkdir(RNFS.DownloadDirectoryPath+'/MagicCaculator');
                            // Move picture to pictureDirectory
                            const filename = library.images[imageIndex.imageIndex].split('/');
                            await RNFS.copyFile(library.images[imageIndex.imageIndex], `${RNFS.DownloadDirectoryPath}/MagicCaculator/${Date.now()}${filename[filename.length - 1]}`);
                            ToastAndroid.show('Đã lưu vào thiết bị', 3000)
                           }}>Lưu vào thiết bị</Chip>
                            <Chip style={{
                            backgroundColor: 'white',
                            borderWidth: 1, borderColor: 'white'
                           }} icon="delete" onPress={async () => {
                            library.removeImage(library.images[imageIndex.imageIndex]);
                            setShowImage(false)
                           }}>Xoá</Chip>
                        </View>
                    )
                }} 
            />
        </View>
    )

   
};

const VideoRoute = () => <Text>Albums</Text>;

const AudioRoute = () => <Text>Recents</Text>;

export default Library