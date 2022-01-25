import React, { FC, useState } from 'react';
import StylesCollapse from './styles';
import Icon from '../Icon';

interface Props {
  header?: string;
}

const Collapse: FC<Props> = ({ header, children }) => {
  const [toggle, setToggle] = useState(true);

  return (
    <StylesCollapse>
      <StylesCollapse.Header>
        <StylesCollapse.Arrow onPress={() => setToggle(!toggle)}>
          <Icon name={toggle ? 'right' : 'down'} size={16} color="#CCCCCC" />
        </StylesCollapse.Arrow>
        <StylesCollapse.Text>{header}</StylesCollapse.Text>
      </StylesCollapse.Header>
      {toggle && <StylesCollapse.Content>{children}</StylesCollapse.Content>}
    </StylesCollapse>
  );
};

Collapse.defaultProps = {};

export default Collapse;
