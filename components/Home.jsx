import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, PermissionsAndroid, ToastAndroid, View } from 'react-native';
import { Button, Dialog, Portal, Text, TextInput } from 'react-native-paper';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { FUNC } from '../constants';
import { useStores } from '../stores';
import Calculator from './Calculator';
const Home = () => {
    const devices = useCameraDevices();
    const { library, hotkey } = useStores();
    const cameraRefBack = useRef(null);
    const cameraRefFront = useRef(null);
    const [isActiveBack, setIsActiveBack] = useState(false);
    const [isActiveFront, setIsActiveFront] = useState(false);
    const [pass, setPass] = useState();
    const [isShowSet, setIsShowSet] = useState(false);
    const [render, setRender] = useState(0)

    const TakePictureBack = () => {
        setIsActiveBack(true);
        setTimeout(() => {
            cameraRefBack.current?.takePhoto({
            }).then(res => {
                library.addImage(res.path);
                setIsActiveBack(false);
            })
        }, 1000)
    }
    const TakePictureFront = () => {
        setIsActiveFront(true);
        setTimeout(() => {
            cameraRefFront.current?.takePhoto({
            }).then(res => {
                library.addImage(res.path);
                setIsActiveFront(false);
            })
        }, 1000)
    }
    const RecordingBack = () => {
        setIsActiveBack(true);
        setTimeout(() => {
            cameraRefBack.current?.startRecording({
                onRecordingFinished: (video) => library.addVideo(video),
                onRecordingError: (error) => cameraRefBack.current?.stopRecording(),
            })
        }, 1000)
    }
    const RecordingFront = () => {
        setIsActiveFront(true);
        setTimeout(() => {
            cameraRefFront.current?.startRecording({
                onRecordingFinished: (video) => library.addVideo(video),
                onRecordingError: (error) => cameraRefFront.current?.stopRecording(),
            })
        }, 1000)
    }
    const StopRecording = async () => {
        if (cameraRefFront.current) {
            await cameraRefFront.current.stopRecording()
        }
        if (cameraRefBack.current) {
            await cameraRefBack.current.stopRecording()
        }
    }

    useEffect(() => {
        const requestPermission = async () => {
            await Camera.requestCameraPermission();
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ])
        };
        requestPermission();
    }, []);

    useEffect(() => {
        setIsShowSet(hotkey.hotkey[FUNC.PASSWORD] === '');
        return () => {
            StopRecording()
        }
    }, [render])

    return (
        <>
            <View>
                <Calculator takePictureBack={() => TakePictureBack()} takePictureFront={() => TakePictureFront()} StopRecording={() => StopRecording()} RecordingBack={() => RecordingBack()} RecordingFront={() => RecordingFront()} />
                <Portal>
                    <Dialog visible={isShowSet} onDismiss={() => { }}>
                        <Dialog.Title>Bắt đầu</Dialog.Title>
                        <Dialog.Content>
                            <Text variant="bodyMedium">Xin chào, bạn vui lòng tạo mã bí mật trước tiên để sử dụng phần mềm</Text>
                            <TextInput value={pass} onChangeText={(text) => {
                                setPass(text);
                            }} placeholder='Nhập mã bí mật' keyboardType='number-pad' />
                            <Text variant="bodyMedium">Lưu ý vui lòng ghi nhớ mã bí mật này</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => {
                                if (!pass || pass === '') {
                                    ToastAndroid.show('Vui lòng điền mã bí mật', 3000);
                                    return;
                                }
                                hotkey.setKeyValue(FUNC.PASSWORD, pass)
                                setRender(Date.now())
                            }}>Xác nhận</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                {isActiveBack && (
                    <>
                        <Camera
                            ref={cameraRefBack}
                            style={{
                                display: 'none',
                                position: 'absolute',
                                top: 0,
                                width: '100%',
                                height: Dimensions.get('screen').height
                            }}
                            video={true}
                            audio={true}
                            photo={true}
                            device={devices.back}
                            isActive={isActiveBack}
                        />
                    </>
                )}
                {isActiveFront && (
                    <Camera
                        ref={cameraRefFront}
                        style={{
                            display: 'none',
                            position: 'absolute',
                            top: 0,
                            width: '100%',
                            height: Dimensions.get('screen').height
                        }}
                        video={true}
                        audio={true}
                        photo={true}
                        device={devices.front}
                        isActive={isActiveFront}
                    />
                )}

            </View>
        </>
    )
}

export default Home