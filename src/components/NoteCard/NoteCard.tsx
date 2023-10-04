import { useTheme } from '@/hooks';
import { INote } from '@/screens/Home/Home';
import {  screenHeight, screenWidth } from '@/theme/Variables';
import moment from 'moment';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Spacer from '../Spacer/Spacer';

type Props = {
  selectedItem: INote | null;
  item: INote;
  onLongPress: () => void;
  onPress: () => void;
  setSelectedItem: (val: INote|null) => void;
  deleteNote: () => void;
};

const NoteCard = ({ selectedItem, item, onPress, onLongPress, setSelectedItem, deleteNote }: Props) => {
  const {
    Common,
    Fonts,
    Gutters,
    Colors,
    Layout,
    Images,
    darkMode: isDark,
  } = useTheme();
  return (
    <TouchableOpacity
      testID='note-card'
      disabled={selectedItem !== null}
      key={item.timeStamp.toString()}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View
        style={{
          backgroundColor: Colors.inputBackground,
          height: screenHeight / 4,
          width: (screenWidth / 2) - 30,
          borderWidth: 1,
          borderColor: Colors.circleButtonColor,
          borderRadius: 10,
          padding: 10,
        }}
      >
        <Text
          style={[Fonts.textTiny]}
        >
          {item.note}
        </Text>
      </View>

      <View style={[{ padding: 5 }]}>
        <Text
          numberOfLines={1}
          style={[Fonts.textSmall, Fonts.textBold]}
        >
          {item.title}
        </Text>
        <View style={[Layout.row, Layout.justifyContentBetween]}>
          <Text
            style={[Fonts.textTiny, {}]}
          >
            {moment(item.timeStamp).format('dddd, DD MMM')}
          </Text>
          <Text
            style={[Fonts.textTiny, { color: Colors.textGray200 }]}
          >
            {moment(item.timeStamp).format('HH:mm:ss a')}
          </Text>
        </View>
      </View>
      {selectedItem?.timeStamp == item.timeStamp &&
        <View style={[Layout.absolute, Layout.fill, Layout.center, { borderRadius: 10, height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.7)' }]}>
          <Text
            style={[Fonts.textSmall, Fonts.textBold, { color: Colors.white }]}
          >
            {`Delete this note?`}
          </Text>
          <Spacer height={20} />
          <TouchableOpacity
            onPress={deleteNote}
          >
            <Text
              style={[Fonts.textTiny, { color: Colors.error }]}
            >
              {`Yes`}
            </Text>
          </TouchableOpacity>
          <Spacer height={10} />
          <TouchableOpacity
            onPress={() => setSelectedItem(null)}
          >
            <Text
              style={[Fonts.textTiny, { color: Colors.white }]}
            >
              {`Cancel`}
            </Text>
          </TouchableOpacity>
        </View>
      }
      <Spacer height={20} />

    </TouchableOpacity>
  );
};

NoteCard.defaultProps = {
  selectedItem: {},
  item: {},
  onLongPress: () => { },
  onPress: () => { },
  setSelectedItem: (val: null) => { },
  deleteNote: () => { }
};

export default NoteCard;
