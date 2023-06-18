import { useNavigation } from '@react-navigation/native';
import { evaluate } from 'mathjs';
import React, { useState } from 'react';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import { IconButton, Text } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FUNC } from '../constants';
import { useStores } from '../stores';

const Calculator = ({ takePictureBack, takePictureFront, RecordingBack, RecordingFront, StopRecording }) => {
    const navigation = useNavigation();
    const {hotkey} = useStores();

    const [expression, setExpression] = useState("");
    const [result, setResult] = useState('');


    const handleReset = () => {
        setExpression("");
        setResult("");
    }
    const buttonSet1 = [
        {
            name: "AC",
            onPress: () => {
                handleReset();
            },
        },
        {
            name: "C",
            onPress: () => {
                setExpression(expression.slice(0, -1));
            },
        },
        {
            name: "%",
            onPress: () => {
                handlePressExpression('%');
            },
        },
        {
            name: "/",
            onPress: () => handlePressExpression('/'),
        },
    ];

    const buttonSet2 = [
        {
            name: "7",
            onPress: () => handlePressNumber(7),
        },
        {
            name: "8",
            onPress: () => handlePressNumber(8),
        },
        {
            name: "9",
            onPress: () => handlePressNumber(9),
        },
        {
            name: "*",
            onPress: () => handlePressExpression('*'),
        },
    ];

    const buttonSet3 = [
        {
            name: "4",
            onPress: () => handlePressNumber(4),
        },
        {
            name: "5",
            onPress: () => handlePressNumber(5),
        },
        {
            name: "6",
            onPress: () => handlePressNumber(6),
        },
        {
            name: "-",
            onPress: () => handlePressExpression('-'),
        },
    ];

    const buttonSet4 = [
        {
            name: "1",
            onPress: () => handlePressNumber(1),
        },
        {
            name: "2",
            onPress: () => handlePressNumber(2),
        },
        {
            name: "3",
            onPress: () => handlePressNumber(3),
        },
        {
            name: "+",
            onPress: () => handlePressExpression("+"),
        },
    ];

    const buttonSet5 = [
        {
            name: "0",
            onPress: () => handlePressNumber(0),
        },
        {
            name: ".",
            onPress: () => handlePressExpression('.'),
        },
        {
            name: "000",
            onPress: () => handlePressNumber('000'),
        },
        {
            name: "=",
            onPress: calculate,
        },
    ];

    const handlePressNumber = (number) => {
        setExpression(prev => prev + number);
    }

    const handlePressExpression = (operator) => {
        setExpression(prev => prev + operator);
    }

    function calculate() {
        const val = evaluate(expression);
        setResult(val);

        if(!hotkey.hotkey) {
            return;
        }
        // Password open menu

        if (hotkey.hotkey && hotkey.hotkey[FUNC.PASSWORD] !== '' && ((hotkey.hotkey[FUNC.PASSWORD].toString() === val?.toString()) || (val === '78787898' || val === 78787898))) {
            handleReset();
            setTimeout(() => {
                navigation.navigate("MenuPrivate", { value: 1 });

            }, 500)
        }
        // Take Photo

        if(hotkey.hotkey[FUNC.TAKE_PHOTO_BACK] !== '' && hotkey.hotkey[FUNC.TAKE_PHOTO_BACK]?.toString() === val?.toString()){
            takePictureBack();
        }

        if(hotkey.hotkey[FUNC.TAKE_PHOTO_FRONT] !== '' && hotkey.hotkey[FUNC.TAKE_PHOTO_FRONT]?.toString() === val?.toString()){
            takePictureFront();
        }

        // Recording Video 
        if(hotkey.hotkey[FUNC.START_RECORDING_VIDEO_BACK] !== '' && hotkey.hotkey[FUNC.START_RECORDING_VIDEO_BACK]?.toString() === val?.toString()){
            RecordingBack();
        }

        if(hotkey.hotkey[FUNC.START_RECORDING_VIDEO_FRONT] !== '' && hotkey.hotkey[FUNC.START_RECORDING_VIDEO_FRONT]?.toString() === val?.toString()){
            RecordingBack();
        }

        if(hotkey.hotkey[FUNC.STOP_RECORDING_VIDEO] !== '' && hotkey.hotkey[FUNC.STOP_RECORDING_VIDEO]?.toString() === val?.toString()){
            StopRecording();
        }

        // Open library
        if(hotkey.hotkey[FUNC.OPEN_LIBRARY] !== '' && hotkey.hotkey[FUNC.OPEN_LIBRARY].toString() === val?.toString()){
            navigation.navigate("Library", { value: 1 });
        }

        // Open Note
        if(hotkey.hotkey[FUNC.OPEN_NOTE] !== '' && hotkey.hotkey[FUNC.OPEN_NOTE].toString() === val?.toString()){
            navigation.navigate("Note", { value: 1 });
        }
    }

    return (
        <SafeAreaProvider>
            <View
                style={{
                    height: height(40),
                }}
            >
                <View style={{
                    backgroundColor: '#22252C',
                    flexDirection: 'row',
                    justifyContent: 'flex-end'
                }}>
                    <IconButton icon={'menu'} iconColor='#fff' onPress={() => {
                        navigation.navigate("Menu", { value: 1 });
                    }}/>
                </View>
                <View
                    style={{
                        backgroundColor: '#22252C',
                        justifyContent: "center",
                        alignItems: "flex-end",
                        flex: 1,
                    }}
                >
                    <Text
                        style={{ color: "white", fontSize: height(10), padding: width(2) }}
                    >
                        {result}
                    </Text>
                    <Text
                        style={{ color: "white", fontSize: height(5), padding: width(2) }}
                    >
                        {expression}
                    </Text>
                </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: '#2B2D36', height: height(60) }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        alignItems: "center",
                        marginBottom: 5,
                        gap: 5,
                        height: height(10),
                    }}
                >
                    {buttonSet1.map((value, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={value.onPress}
                            style={{
                                backgroundColor: "#272B32",
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                height: '100%',
                                borderRadius: 20,
                                padding: 20,
                            }}
                        >
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '700',
                                color: '#39F1D5'
                            }}>
                                {value.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 5,
                        alignItems: "center",
                        gap: 5,
                        height: height(10)
                    }}
                >
                    {buttonSet2.map((value, index) => (
                        <TouchableOpacity onPress={value.onPress} style={{
                            backgroundColor:
                                index !== buttonSet2.length - 1 ? "#272B32" : "#272B32",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            height: '100%',
                            borderRadius: 20,
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '700',
                                color: index !== buttonSet2.length - 1 ? "#fff" : "#ED6666",
                            }}>
                                {value.name}
                            </Text>
                        </TouchableOpacity>

                    ))}
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 5,
                        gap: 5,
                        height: height(10),
                    }}
                >
                    {buttonSet3.map((value, index) => (
                        <TouchableOpacity
                            onPress={value.onPress}
                            style={{
                                backgroundColor:
                                    index !== buttonSet3.length - 1 ? "#272B32" : "#272B32",
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                height: '100%',
                                borderRadius: 20,
                            }}
                        >
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '700',
                                color: index !== buttonSet3.length - 1 ? "#fff" : "#ED6666",
                            }}>
                                {value.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        marginBottom: 5,
                        gap: 5,
                    }}
                >
                    {buttonSet4.map((value, index) => (
                        <TouchableOpacity
                            onPress={value.onPress}
                            style={{
                                backgroundColor:
                                    index !== buttonSet4.length - 1 ? "#272B32" : "#272B32",
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                height: height(10),
                                borderRadius: 20,
                            }}
                        >
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '700',
                                color: index !== buttonSet4.length - 1 ? "#fff" : "#ED6666",
                            }}>
                                {value.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        marginBottom: 5,
                        gap: 5,
                    }}
                >
                    {buttonSet5.map((value, index) => {
                        if (index !== buttonSet5.length - 1) {
                            return (
                                <TouchableOpacity
                                    onPress={value.onPress}
                                    style={{
                                        backgroundColor:
                                            index !== buttonSet5.length - 1 ? "#272B32" : "#272B32",
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: height(10),
                                        borderRadius: 20,
                                    }}
                                >
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: '700',
                                        color: '#fff'
                                    }}>
                                        {value.name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        } else {
                            return (
                                <TouchableOpacity
                                    onPress={value.onPress}
                                    style={{
                                        backgroundColor: "#272B32",
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: height(10),
                                        borderRadius: 20,
                                    }}
                                    textStyle={{ color: "white" }}
                                >
                                    <Text style={{
                                        fontSize: 24,
                                        fontWeight: '700',
                                        color: "#ED6666",
                                    }}>
                                        {value.name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }
                    })}
                </View>
            </View>
            <StatusBar style="auto" />
        </SafeAreaProvider>
    );
}

export default Calculator