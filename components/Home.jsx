import React, { useEffect, useRef, useState } from 'react'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import { Dimensions, View } from 'react-native';
import Calculator from './Calculator';
import { useStores } from '../stores';
const Home = () => {
    const devices = useCameraDevices();
    const {library} = useStores();
    const device = devices.back;
    const cameraRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    useEffect(()=> {
        const requestPermission = async () => {
            await Camera.requestCameraPermission();
        };
        requestPermission();
    }, []);

    const TakePicture = () => {
        setIsActive(true);
        setTimeout(()=> {
            cameraRef.current?.takePhoto({
            }).then(res=> {
                library.addImage(res.path);
                setIsActive(false);
            })
        }, 1000)
    }
    return (
        <>
            <View>
                {device && (
                    <Camera
                        ref={cameraRef}
                        style={{
                            display: 'none',
                            position: 'absolute',
                            top: 0,
                            width: '100%',
                            height: Dimensions.get('screen').height
                        }}
                        photo={true}
                        device={device}
                        isActive={isActive}
                    />
                )}
                <Calculator takePicture={()=>TakePicture()} />
            </View>
        </>
    )
}

export default Home