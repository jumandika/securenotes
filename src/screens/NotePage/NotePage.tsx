import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../hooks';
import { Spacer } from '@/components';
import { getSecureStorage, setSecureStorage } from '@/store';
import moment from 'moment';
import { MainScreenProps } from 'types/navigation';
import { INote } from '../Home/Home';
import { screenHeight } from '@/theme/Variables';

const NotePage = ({ navigation, route }: MainScreenProps) => {
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

    const item: INote = route.params?.item

    const [title, setTitle] = useState<string>(item?.title || '')
    const [note, setNote] = useState<string>(item?.note || '')


    const onBlur = async () => {
        if (item) {
            if (note == '') return;
            let timeStamp = moment().valueOf()
            console.log('timeStamp :>> ', timeStamp);
            const value = [{
                title: title == '' ? 'Untitled' : title,
                note: note,
                timeStamp: timeStamp,
            }]
            const existedNotes = await getSecureStorage('noteList')
            if (existedNotes) {
                let parsedExistedNotes = JSON.parse(existedNotes)
                parsedExistedNotes = parsedExistedNotes.filter((i: INote) => i.timeStamp != item.timeStamp)
                console.log('existedNotes NotePage :>> ', parsedExistedNotes);
                const noteList = [...value, ...parsedExistedNotes]
                setSecureStorage(`noteList`, noteList)
                return true
            } else {
                setSecureStorage(`noteList`, value)
                return true
            }
        }
        else {
            if (note == '') return;
            let timeStamp = moment().valueOf()
            console.log('timeStamp :>> ', timeStamp);
            const value = [{
                title: title == '' ? 'Untitled' : title,
                note: note,
                timeStamp: timeStamp,
            }]
            const existedNotes = await getSecureStorage('noteList')
            console.log('existedNotes NotePage :>> ', existedNotes);
            if (existedNotes) {
                let parsedExistedNotes = JSON.parse(existedNotes)
                const noteList = [
                    ...value,
                    ...parsedExistedNotes
                ]
                setSecureStorage(`noteList`, noteList)
                return true
            } else {
                setSecureStorage(`noteList`, value)
                return true
            }
        }
    }


    return (
        <SafeAreaView style={[Layout.fill]}>
            <Spacer height={10} />
            <View style={[Layout.center]}>
                <Text
                    style={[Fonts.titleSmall]}
                >
                    {`${item ? 'Edit' : 'Create'} Note`}
                </Text>
            </View>
            <ScrollView
            contentContainerStyle={Gutters.smallBPadding}
            >

                <View style={[Layout.center, Gutters.smallMargin, Gutters.tinyPadding, { borderRadius: 10, backgroundColor: Colors.inputBackground }]}>
                    <TextInput
                        autoFocus
                        placeholder='TITLE'
                        autoCapitalize='characters'
                        placeholderTextColor={Colors.textGray200}
                        value={title}
                        onChangeText={(val: string) => setTitle(val)}
                        style={[Fonts.textSmall, Fonts.textBold, {
                            paddingVertical:0,
                            height: 'auto',
                            width: '100%',
                            backgroundColor: Colors.inputBackground,
                        }]}
                    >

                    </TextInput>
                </View>
                <View style={[Layout.fill, Layout.center, Gutters.smallHMargin, Gutters.tinyPadding, { height: screenHeight - 200, borderRadius: 10, backgroundColor: Colors.inputBackground }]}>
                    <TextInput
                        multiline
                        placeholder='Your notes'
                        placeholderTextColor={Colors.textGray200}
                        value={note}
                        onChangeText={(val: string) => setNote(val)}
                        style={[Fonts.textSmall, {
                            paddingVertical:0,
                            textAlignVertical: 'top',
                            height: '100%',
                            width: '100%',
                            backgroundColor: Colors.inputBackground,
                        }]}
                    >

                    </TextInput>
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={async () => {
                    const success = await onBlur()
                    if (success) {
                        navigation.goBack()
                    } else {

                    }
                }}
                style={[Layout.absolute, Layout.center, Layout.right0, Layout.bottom0, Gutters.largeBMargin, Gutters.smallRMargin, {
                    height: 70,
                    width: 70,
                    borderRadius: 40,
                    backgroundColor: Colors.circleButtonBackground
                }]}
            >
                <Text
                    style={[Fonts.textSmall, Fonts.textBold, { color: '#000' }]}
                >
                    {`Save`}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default NotePage;
