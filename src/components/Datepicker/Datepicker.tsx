import React, { FC, Fragment, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatepickerPress from './styles'
import moment from 'moment'
import * as constants from '@utils/constants';

interface Props {
    value?: Date;
    onChange?: (event: any, date: any) => void;
    mode?: 'date' | 'time';
    display?: 'default' | 'compact' | 'inline' | 'spinner';
    placeholder?: string;
    format?: string;
    disabled?: boolean;
  }

const Datepicker: FC<Props> = ({ format, display, value, mode, placeholder, onChange, disabled }) => {
  const [show, setShow] = useState(false);

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || value;
    setShow(false);
    if (onChange) {
        onChange(event, currentDate);
    }
  };

  if (disabled) {
    return (
      <DatepickerPress.Disabled>
        {value ? <DatepickerPress.Text>{moment(new Date()).format(format)}</DatepickerPress.Text> : <DatepickerPress.Text>{placeholder}</DatepickerPress.Text>}
      </DatepickerPress.Disabled>
    )
  }

  return (
    <Fragment>
      <DatepickerPress onPress={() => setShow(true)}>
        {value ? <DatepickerPress.Text>{moment(value).format(format)}</DatepickerPress.Text> : <DatepickerPress.Text>{placeholder}</DatepickerPress.Text>}
      </DatepickerPress>
      {show && <DateTimePicker
        value={value || new Date()}
        mode={mode}
        display={display}
        onChange={onChangeDate}
      />}
    </Fragment>
  )
};

Datepicker.defaultProps = {
    mode: 'date',
    display: 'default',
    placeholder: 'Seleccione dia',
    format: constants.FORMAT_DATE_FRONT,
    disabled: false
}

export default Datepicker;
