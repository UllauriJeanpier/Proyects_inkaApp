import React, { FC, Fragment, useState } from 'react';
import { View } from 'react-native';
import { Icon, Card, Button } from '@components';
import styled from 'styled-components/native';

interface Props {
  header?: string;
}

const CardOperation: FC<Props> = ({ header, children }) => {
  const [toggle, setToggle] = useState(true);

  return (
    <Card style={{ elevation: 4 }}>
      {header && (
        <Card.Header>
          <Card.Text>{header}</Card.Text>
          <Card.Menu onPress={() => setToggle(!toggle)}>
            <Icon name={toggle ? 'down' : 'up'} size={16} color="#CCCCCC" />
          </Card.Menu>
        </Card.Header>
      )}
      {toggle && (
        <Fragment>
          <View style={{ marginBottom: 24 }} />
          <Card.Body>{children}</Card.Body>
        </Fragment>
      )}
    </Card>
  );
};

CardOperation.defaultProps = {};

const IconText: any = styled.View`
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  margin-bottom: 4px;
`;

IconText.Icon = styled.View`
  width: 24px;
`;

IconText.Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #848484;
  flex: 1;
  text-align: left;
`;

const CardAction: any = styled(Button)`
  margin: 0;
  margin-top: 24px;
`;

CardAction.Text = styled(Button.Text)`
  font-size: 14px;
  line-height: 19px;
`;

const ChangeValues: any = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 20px;
`;

ChangeValues.Group = styled.View``;

ChangeValues.Title = styled.Text<{
  right?: boolean;
}>`
  font-family: ${({ theme }) => theme.fonts.nunitosans.bold};
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: #36798c;
  text-align: ${({ right }) => (right ? 'right' : 'left')};
  margin-bottom: 8px;
`;

ChangeValues.Value = styled.Text<{
  right?: boolean;
}>`
  font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #848484;
  text-align: ${({ right }) => (right ? 'right' : 'left')};
`;

export { CardOperation, IconText, CardAction, ChangeValues };
