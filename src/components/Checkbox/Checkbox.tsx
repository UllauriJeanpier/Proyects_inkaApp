/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react';
import {
  CheckboxStyle,
  CheckboxDisabledStyle,
  CheckboxBoxStyle,
  CheckboxLabelStyle,
} from './styles';
import Icon from '../Icon';

export interface CheckboxProps {
  /**
   * Se activa cuando se selecciona el checkbox
   */
  checked?: boolean;
  /**
   * Se bloquea su uso del checkbox
   */
  disabled?: boolean;
  /**
   * Callback que se dispara cuando se presiona el checkbox
   */
  onPress?: (checked: boolean) => void;
}

export const TEST_ID_CHECKBOX = 'chekbox';

const Checkbox: FC<CheckboxProps> = ({
  checked,
  disabled,
  children,
  onPress,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const colorIcon = '#FFF';

  useEffect(() => {
    if (checked) {
      setIsChecked(true);
    }
  }, []);

  const content = (
    <React.Fragment>
      <CheckboxBoxStyle checked={isChecked} disabled={disabled}>
        {isChecked && <Icon name="check" size={12} color={colorIcon} />}
      </CheckboxBoxStyle>
      {children && (
        <CheckboxLabelStyle checked={isChecked} disabled={disabled}>
          {children}
        </CheckboxLabelStyle>
      )}
    </React.Fragment>
  );

  if (disabled) {
    return (
      <CheckboxDisabledStyle
        checked={isChecked}
        disabled={disabled}
        testID={TEST_ID_CHECKBOX}
      >
        {content}
      </CheckboxDisabledStyle>
    );
  }

  const onPressCheckbox = () => {
    if (!checked) {
      setIsChecked(!isChecked);

      if (onPress) {
        onPress(!isChecked);
      }
    }
  };

  return (
    <CheckboxStyle
      checked={isChecked}
      disabled={disabled}
      testID={TEST_ID_CHECKBOX}
      onPress={!disabled && onPressCheckbox}
    >
      {content}
    </CheckboxStyle>
  );
};

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
};

export default Checkbox;
