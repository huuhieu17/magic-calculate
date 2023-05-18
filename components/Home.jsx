import React, { useEffect, useRef, useState } from 'react'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import { Dimensions, PermissionsAndroid, View } from 'react-native';
import Calculator from './Calculator';
import { useStores } from '../stores';
const Home = () => {
    const devices = useCameraDevices();
    const {library} = useStores();
    const cameraRefBack = useRef(null);
    const cameraRefFront = useRef(null);
    const [isActiveBack, setIsActiveBack] = useState(false);
    const [isActiveFront, setIsActiveFront] = useState(false);
    useEffect(()=> {
        const requestPermission = async () => {
            await Camera.requestCameraPermission();
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
              ])
        };
        requestPermission();
    }, []);

    const TakePictureBack = () => {
        setIsActiveBack(true);
        setTimeout(()=> {
            cameraRefBack.current?.takePhoto({
            }).then(res=> {
                library.addImage(res.path);
                setIsActiveBack(false);
            })
        }, 1000)
    }
    const TakePictureFront = () => {
        setIsActiveFront(true);
        setTimeout(()=> {
            cameraRefFront.current?.takePhoto({
            }).then(res=> {
                library.addImage(res.path);
                setIsActiveFront(false);
            })
        }, 1000)
    }


    return (
        <>
            <View>
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
                        photo={true}
                        device={devices.front}
                        isActive={isActiveFront}
                    />
                )}
                <Calculator takePictureBack={()=>TakePictureBack()} takePictureFront={()=>TakePictureFront()} />
            </View>
        </>
    )
}

export default Home