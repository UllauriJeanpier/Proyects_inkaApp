import React from 'react';
import styled from 'styled-components/native';

interface TabProps {
  active?: boolean;
  last?: boolean;
}

const Tabs: any = styled.View``;

Tabs.Tab = styled.Pressable<TabProps>`
  padding: 12px 0;
  margin-right: 20px;
  margin-right: ${({ last }) => (last ? '0' : '20px')};
  ${({ theme, active }) =>
    active
      ? `
  border-bottom-width: 2px;
  border-bottom-color: ${theme.colors.text.primary};`
      : ''}
`;

Tabs.TabContent = styled.ScrollView.attrs<TabProps>(({ theme }) => ({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
}))`
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
  margin-bottom: 16px;
`;

Tabs.TabText = styled.Text<TabProps>`
  font-family: ${({ theme, active }) =>
    active ? theme.fonts.nunito.bold : theme.fonts.nunito.regular};
  font-style: normal;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  color: ${({ theme, active }) =>
    active ? theme.colors.text.primary : theme.colors.text.copy};
`;

Tabs.TabPanes = styled.View`
  flex: 1;
`;

Tabs.TabPane = styled.ScrollView.attrs<TabProps>(({ theme }) => ({
  showsHorizontalScrollIndicator: false,
}))``;

export default Tabs;
