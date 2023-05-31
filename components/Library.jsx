import React, { useEffect, useState } from 'react';
import { Image, Pressable, ToastAndroid, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import Immersive from 'react-native-immersive';
import { BottomNavigation, Button, Chip, Modal, Text } from 'react-native-paper';
import { DefaultBottomControlsBar, DefaultMainControl, VideoPlayer } from 'react-native-true-sight';
import Video from 'react-native-video';
import { useStores } from '../stores';
import GridView from './GridView';
import { height } from 'react-native-dimension';

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
    const { library } = useStores();
    const [showImage, setShowImage] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const RenderCardImage = ({ item, index }) => {
        return (
            <Pressable onPress={() => {
                setImageIndex(index);
                setShowImage(true);
            }} style={{
                width: '100%',
                borderWidth: 1,
            }}>
                <Image style={{
                    aspectRatio: 1
                }} source={{ uri: 'file://' + item }} />
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
                                await RNFS.mkdir(RNFS.DownloadDirectoryPath + '/MagicCaculator');
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

const VideoRoute = () => {
    const { library } = useStores();
    const [showVideo, setShowVideo] = useState();

    useEffect(() => {
        if (Platform.OS === 'android') {
            Immersive.on()
            Immersive.setImmersive(true)
        }
        return () => {
            if (Platform.OS === 'android') {
                Immersive.off()
                Immersive.setImmersive(false)
            }
            setShowVideo()
        }
    }, [])

    const RenderVideo = ({ item, index }) => {
        return (
            <Pressable onPress={() => {
                setShowVideo({
                    path: item.path,
                    index
                });
            }} style={{
                width: '100%',
                borderWidth: 1,
            }}>
                <Video source={{ uri: item.path }} paused={true} style={{
                    aspectRatio: 1,
                    width: '100%',
                }} />
            </Pressable>
        )
    }
    return (
        <View>
            {!showVideo ? (
                <GridView gap={10} itemPerRow={2} items={library.videos.map((item, index) => <RenderVideo item={item} index={index} />)} />

            ) : (
                <View style={{
                    backgroundColor: 'black',
                    height: '100%'
                }}>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'flex-end'
                        }}>
                            <Chip style={{
                                backgroundColor: 'white',
                                borderWidth: 1, borderColor: 'white',
                                width: 100,
                            }} icon="close" onPress={async () => {
                                setShowVideo()
                            }}>Đóng</Chip>
                        </View>
                        <Video
                            style={{
                                marginTop: 100,
                                width: '100%',
                                aspectRatio: 16/9,
                            }}
                            allowsExternalPlayback
                            fullscreen={false}
                            fullscreenAutorotate={true}
                            fullscreenOrientation='all'
                            paused={false}
                            source={{ uri: showVideo.path }}
                            controls={true}
                        />
                        <View style={{
                            width: '100%',
                            marginTop: 60,
                            backgroundColor: 'black',
                            flexDirection: 'row',
                            gap: 20
                        }}>
                            <Chip style={{
                                backgroundColor: 'white',
                                borderWidth: 1, borderColor: 'white'
                            }} icon="download" onPress={async () => {
                                await RNFS.mkdir(RNFS.DownloadDirectoryPath + '/MagicCaculator');
                                // Move picture to pictureDirectory
                                const filename = library.videos[showVideo.index].path.split('/');
                                await RNFS.copyFile(library.videos[showVideo.index].path, `${RNFS.DownloadDirectoryPath}/MagicCaculator/${Date.now()}${filename[filename.length - 1]}`);
                                ToastAndroid.show('Đã lưu vào thiết bị', 3000)
                            }}>Lưu vào thiết bị</Chip>
                            <Chip style={{
                                backgroundColor: 'white',
                                borderWidth: 1, borderColor: 'white'
                            }} icon="delete" onPress={async () => {
                                library.removeVideo(library.videos[showVideo.index]);
                                setShowVideo()
                            }}>Xoá</Chip>
                        </View>
                </View>
            )}
        </View>
    )
};

const AudioRoute = () => <Text>Recents</Text>;

export default Library