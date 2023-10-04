import { Spacer } from '@/components';
import NoteCard from '@/components/NoteCard/NoteCard';
import { getSecureStorage, setSecureStorage } from '@/store';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    AppState,
    BackHandler,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { useDispatch } from 'react-redux';
import { MainScreenProps } from 'types/navigation';
import { useTheme } from '../../hooks';

export interface INote {
    title: string,
    note: string,
    timeStamp: string,
}

const Home = ({ navigation, route }: MainScreenProps) => {
    const { t } = useTranslation(['example', 'welcome']);
    const {
        Common,
        Fonts,
        Colors,
        Gutters,
        Layout,
        Images,
        darkMode: isDark,
    } = useTheme();
    const dispatch = useDispatch();

    const [noteList, setNoteList] = useState<INote[]>([])
    const [selectedItem, setSelectedItem] = useState<INote | null>(null)
    const [inBiometric, setInBiometric] = useState<boolean>(false)
    const [successAuth, setSuccessAuth] = useState<boolean>(false)


    useEffect(() => {
        setSelectedItem(null)
        getNoteList()
        const unSubscribe = navigation.addListener('focus', () => {
            getNoteList()
        })
        return unSubscribe
    }, [])

    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                if(Platform.OS === 'android'){
                    biometricAuth()
                }
                console.log('App has come to the foreground!');
            }
            appState.current = nextAppState;
            console.log('AppState', appState.current);
        });

        return () => {
            subscription.remove();
        };
    }, [successAuth]);

    const biometricAuth = () => {
        const rnBiometrics = new ReactNativeBiometrics()
        setInBiometric(true)
        rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint to see your notes' })
            .then((resultObject) => {
                const { success } = resultObject
                console.log('resultObject :>> ', resultObject);
                if (success) {
                    setSuccessAuth(true)
                    setInBiometric(false)
                    console.log('successful biometrics provided')
                } else {
                    BackHandler.exitApp()
                    console.log('user cancelled biometric prompt')
                }
            })
            .catch(() => {
                console.log('biometrics failed')
            })
    }

    const getNoteList = async () => {
        const existedNotes = await getSecureStorage('noteList')
        console.log('existedNotes :>> ', existedNotes);
        if (!existedNotes) {
            setNoteList([])
            return;
        } else {
            setNoteList(JSON.parse(existedNotes))
        }
    }

    const deleteNote = async () => {
        setSelectedItem(null)
        const existedNotes = await getSecureStorage('noteList')
        if (existedNotes) {
            let parsedExistedNotes = JSON.parse(existedNotes)
            parsedExistedNotes = parsedExistedNotes.filter((i: INote) => i.timeStamp != selectedItem?.timeStamp)
            console.log('existedNotes NotePage :>> ', parsedExistedNotes);
            const noteList = [...parsedExistedNotes]
            let isSuccess = await setSecureStorage(`noteList`, noteList)
            if (isSuccess) {
                getNoteList()
            }
        }
    }


    if (inBiometric) {
        return null;
    }
    return (
        <SafeAreaView style={[Layout.fill]}>

            <Spacer height={10} />
            <View style={[Layout.center]}>
                <Text
                    style={[Fonts.titleRegular]}
                >
                    {`All Notes`}
                </Text>
                <Spacer height={10} />
            </View>
            <View style={[Layout.fullSize,]}>
                {noteList?.length > 0 ?
                    <ScrollView
                        removeClippedSubviews
                        style={[Layout.fill]}
                        contentContainerStyle={Gutters.largeBPadding}
                    >
                        <Spacer height={20} />
                        <View style={[Layout.fill, Gutters.smallHPadding, Layout.row, Gutters.smallBPadding, { alignSelf: noteList.length > 2 ? 'flex-start' : 'auto', justifyContent: 'space-between', flexWrap: 'wrap', }]}>
                            {noteList.map((item: INote) =>
                                <NoteCard
                                    key={item.timeStamp.toString()}
                                    selectedItem={selectedItem}
                                    item={item}
                                    onPress={() => navigation.navigate('NotePage', { item: item })}
                                    onLongPress={() => setSelectedItem(item)}
                                    setSelectedItem={setSelectedItem}
                                    deleteNote={deleteNote}
                                />
                            )}
                        </View>
                    </ScrollView>
                    :
                    <View style={[Layout.fill, Layout.center]}>
                        <Text
                            style={[Fonts.textBold, Fonts.textSmall,]}
                        >
                            {`No notes`}
                        </Text>
                        <Spacer height={10} />
                        <Text
                            style={[Fonts.textTiny,]}
                        >
                            {`Tap the Add button to create a note.`}
                        </Text>
                    </View>
                }

            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('NotePage')}
                style={[Layout.absolute, Layout.center, Layout.right0, Layout.bottom0, Gutters.largeBMargin, Gutters.smallRMargin, {
                    height: 70,
                    width: 70,
                    borderRadius: 40,
                    backgroundColor: Colors.circleButtonBackground,
                }]}
            >
                <Text
                    style={[Fonts.textSmall, Fonts.textBold, { color: '#000' }]}
                >
                    {`Add`}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Home;
