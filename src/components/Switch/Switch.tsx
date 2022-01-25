/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import SwitchStyle from './styles';
import { DefaultTheme } from 'styled-components/native';
import useTheme from '@hooks/useStyledTheme';

export interface SwitchProps {
  /**
   * Se activa cuando se selecciona el switch
   */
  toggle?: boolean;
  /**
   * Se bloquea su uso del switch
   */
  disabled?: boolean;
  /**
   * Callback que se dispara cuando se presiona el switch
   */
  onToggle?: (toggle: boolean) => void;
}

export const TEST_ID_SWITCH = 'switch';

const Switch: FC<SwitchProps> = ({ toggle, disabled, children, onToggle }) => {
  const theme: DefaultTheme = useTheme();
  const [isToggle, setIsToogle] = useState(false);
  const durationTranstion = 150; // 0.15s
  const initLeftTransition = 0;
  const toLeftTransition = 14;
  const rangeTransition = [initLeftTransition, toLeftTransition];

  const getValuesStyles = (_disabled: any, _toggle: any) => {
    if (_disabled) {
      if (!_toggle) {
        return {
          border: '#CCCCCC',
          backgroundBox: '#CCCCCC',
          backgroundCircle: '#FFFFFF',
          positionLeft: toLeftTransition,
        };
      }

      return {
        border: '#CCCCCC',
        backgroundBox: '#CCCCCC',
        backgroundCircle: '#FFFFFF',
        positionLeft: initLeftTransition,
      };
    }

    if (!_toggle) {
      return {
        border: '#FE761E',
        backgroundBox: '#FE761E',
        backgroundCircle: '#FFFFFF',
        positionLeft: toLeftTransition,
      };
    }

    return {
      border: '#CCCCCC',
      backgroundBox: '#CCCCCC',
      backgroundCircle: '#FFFFFF',
      positionLeft: initLeftTransition,
    };
  };

  const togglePosLeft = useRef(new Animated.Value(0)).current;

  const moveToogle = () => {
    Animated.parallel([
      Animated.timing(togglePosLeft, {
        toValue: getValuesStyles(disabled, isToggle).positionLeft,
        duration: durationTranstion,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    if (toggle) {
      setIsToogle(true);
      moveToogle();
    }
  }, []);

  const onToggleSwitch = () => {
    if (!disabled) {
      /* if (!toggle) { */
        setIsToogle(!isToggle);
        moveToogle();
        if (onToggle) {
          onToggle(!isToggle);
        }
     /*  } else {
        console.log('Prueba', isToggle)
        setIsToogle(!isToggle);
      } */
    }
  };

  const SwitchContentAnimated = Animated.createAnimatedComponent(
    SwitchStyle.Pressable
  );

  return (
    <SwitchStyle testID={TEST_ID_SWITCH} toggle={isToggle} disabled={disabled}>
      <SwitchContentAnimated
        toggle={isToggle}
        disabled={disabled}
        onPress={onToggleSwitch}
        style={{
          borderColor: togglePosLeft.interpolate({
            inputRange: rangeTransition,
            outputRange: [
              getValuesStyles(disabled, true).border,
              getValuesStyles(disabled, false).border,
            ],
          }),
          backgroundColor: togglePosLeft.interpolate({
            inputRange: rangeTransition,
            outputRange: [
              getValuesStyles(disabled, true).backgroundBox,
              getValuesStyles(disabled, false).backgroundBox,
            ],
          }),
        }}
      >
        <SwitchStyle.Circle
          toggle={isToggle}
          disabled={disabled}
          style={{
            left: togglePosLeft,
            backgroundColor: togglePosLeft.interpolate({
              inputRange: rangeTransition,
              outputRange: [
                getValuesStyles(disabled, true).backgroundCircle,
                getValuesStyles(disabled, false).backgroundCircle,
              ],
            }),
          }}
        />
      </SwitchContentAnimated>
      <SwitchStyle.Text toggle={isToggle} disabled={disabled}>
        {children}
      </SwitchStyle.Text>
    </SwitchStyle>
  );
};

Switch.defaultProps = {
  toggle: false,
};

export default Switch;
