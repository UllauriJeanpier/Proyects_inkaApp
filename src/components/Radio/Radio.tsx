/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react';
import {
  RadioStyle,
  RadioDisabledStyle,
  RadioBoxStyle,
  RadioLabelStyle,
  RadioBoxCheckedStyle,
} from './styles';

export interface RadioProps {
  /**
   * Se activa cuando se selecciona el Radio
   */
  checked?: boolean;
  /**
   * Valor del Radio
   */
  value: boolean;
  /**
   * Se bloquea su uso del Radio
   */
  disabled?: boolean;
  /**
   * Callback que se dispara cuando se presiona el Radio
   */
  onPress: (checked: boolean) => void;
  /**
   * Se bloquea su uso del Radio
   */
  bold?: boolean;
}

export const TEST_ID_Radio = 'chekbox';

const Radio: FC<RadioProps> = ({
  value,
  checked,
  disabled,
  children,
  bold,
  onPress,
}) => {
  const isChecked = value || checked;

  const content = (
    <React.Fragment>
      <RadioBoxStyle checked={isChecked} disabled={disabled}>
        {isChecked && (
          <RadioBoxCheckedStyle checked={isChecked} disabled={disabled} />
        )}
      </RadioBoxStyle>
      {children && (
        <RadioLabelStyle checked={isChecked} disabled={disabled} bold={bold}>
          {children}
        </RadioLabelStyle>
      )}
    </React.Fragment>
  );

  if (disabled) {
    return (
      <RadioDisabledStyle
        checked={isChecked}
        disabled={disabled}
        testID={TEST_ID_Radio}
      >
        {content}
      </RadioDisabledStyle>
    );
  }

  const onPressRadio = () => {
    if (!checked) {
      if (onPress) {
        onPress(!value);
      }
    }
  };

  return (
    <RadioStyle
      checked={value}
      disabled={disabled}
      testID={TEST_ID_Radio}
      onPress={!disabled && onPressRadio}
    >
      {content}
    </RadioStyle>
  );
};

Radio.defaultProps = {
  value: false,
  checked: false,
  disabled: false,
};

export default Radio;
