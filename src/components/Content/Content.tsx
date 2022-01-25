import React, {FC} from 'react';
import {StatusBarStyle} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAvoidingViewStyled, StyledSafeAreaView, StatusBarStyled} from './styles';

interface Props {
    translucent?: boolean;
    barStyle?: StatusBarStyle;
    behaviorKeyboard?: 'height' | 'position' | 'padding';
    hasPadding?: boolean;
    centered?: boolean;
}

const Content: FC<Props> = ({ centered, translucent, barStyle, behaviorKeyboard, hasPadding, children }) => (
    <KeyboardAvoidingViewStyled behavior={behaviorKeyboard}>
        <StatusBarStyled translucent={translucent} barStyle={barStyle} />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <StyledSafeAreaView hasPadding={hasPadding} centered={centered}>
                {children}
            </StyledSafeAreaView>
        </ScrollView>
    </KeyboardAvoidingViewStyled>
);

Content.defaultProps = {
    translucent: false,
    barStyle: 'dark-content',
    behaviorKeyboard: 'height',
    hasPadding: true,
    centered: false
};

export default Content;
