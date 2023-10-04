import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../hooks';
import { Brand, Spacer } from '@/components';
import { MainScreenProps } from 'types/navigation';
import { setDefaultTheme } from '@/store/theme';

const Authentication = ({ navigation, route }: MainScreenProps) => {
    const { t } = useTranslation(['example', 'welcome']);
    const {
        Common,
        Fonts,
        Gutters,
        Layout,
        Colors,
        Images,
        darkMode: isDark,
    } = useTheme();
    const dispatch = useDispatch();
    const [message, setMessage] = useState<string | null>(null)

    const init = async () => {
        await setDefaultTheme({ theme: 'default', darkMode: null });
    };

    useEffect(() => {
        init()
        biometricAuth()
    }, [])



    const biometricAuth = () => {
        const rnBiometrics = new ReactNativeBiometrics()
        rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
            .then((resultObject) => {
                const { success } = resultObject
                console.log('resultObject :>> ', resultObject);
                if (success) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    });
                    console.log('successful biometrics provided')
                    setMessage(null)
                } else {
                    console.log('user cancelled biometric prompt.')
                    setMessage('User cancelled biometric prompt.')
                }
            })
            .catch(() => {
                setMessage('biometrics failed')
                console.log('Biometrics failed.')
            })
    }

    return (
        <View
            style={[
                Layout.fullSize,
                Layout.center,
                Layout.justifyContentAround,
            ]}
        >
            <View style={[Layout.center]}>
                <Brand height={80} width={80} />
                <Spacer height={20} />
                <Text
                    style={[Fonts.titleRegular]}
                >
                    {`Secure Notes`}
                </Text>
                <Text
                    style={[Fonts.textSmall, Fonts.textBold]}
                >
                    {`Locked!`}
                </Text>
            </View>

            <View style={[Layout.center]}>
                <TouchableOpacity
                    onPress={biometricAuth}
                >
                    <Text
                        style={[Fonts.textSmall, { textDecorationLine: 'underline' }]}
                    >
                        {`Verify your identity`}
                    </Text>
                </TouchableOpacity>
                <Spacer height={20} />

                <Text
                    style={[Fonts.textTiny, { fontSize: 12, color: Colors.error }]}
                >
                    {`${message || ''}`}
                </Text>
            </View>
        </View>
    );
};

export default Authentication;
