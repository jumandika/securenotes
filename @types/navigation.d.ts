import { INote } from '@/screens/Home/Home';
import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type MainParamsList = {
  Home: undefined;
  Authentication: undefined;
  NotePage: { item?: INote }| undefined;
};

export type ApplicationStackParamList = {
  Main: NavigatorScreenParams<MainParamsList>;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;

export type MainScreenProps =
  StackScreenProps<MainParamsList>;
