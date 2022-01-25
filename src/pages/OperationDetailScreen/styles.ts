import styled from 'styled-components/native';

const CopyWarning = styled.Text`
  font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
  color: #cf0117;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
`;

interface TimelineProps {
  active?: boolean;
  complete?: boolean;
  waiting?: boolean;
}

const handleState = (active: any, complete: any, waiting: any) => {
  if (active && !complete && !waiting) {
    return {
      color: '#848484',
      number: '#FFFFFF',
      circle: '#FE761E',
      bg: '#FE761E',
    };
  }

  if (complete && !active && !waiting) {
    return {
      color: '#FE761E',
      number: '#FE761E',
      circle: '#FE761E',
      bg: '#FFFFFF',
    };
  }

  if (waiting && !active && !complete) {
    return {
      color: '#848484',
      number: '#848484',
      circle: '#848484',
      bg: '#FFFFFF',
    };
  }

  return {
    color: '#cccccc',
    number: '#cccccc',
    circle: '#cccccc',
    bg: '#FFFFFF',
  };
};

const Timeline: any = styled.View``;

Timeline.Item = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

Timeline.Content = styled.View`
  margin-left: 16px;
  flex: 1;
`;

Timeline.State = styled.View`
  align-items: center;
`;

Timeline.State.Line = styled.View<TimelineProps>`
  width: 1px;
  flex: 1;
  margin-top: 0;
  background-color: ${({ active, complete, waiting }) =>
    handleState(active, complete, waiting).circle};
`;

Timeline.State.Circle = styled.View<TimelineProps>`
  width: 30px;
  height: 30px;
  border-color: ${({ active, complete, waiting }) =>
    handleState(active, complete, waiting).circle};
  border-width: 1px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  background-color: ${({ active, complete, waiting }) =>
    handleState(active, complete, waiting).bg};
`;

Timeline.State.Number = styled.Text<TimelineProps>`
  font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: ${({ active, complete, waiting }) =>
    handleState(active, complete, waiting).number};
`;

Timeline.State.Text = styled.Text<TimelineProps>`
  font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 15px;
  text-align: center;
  color: ${({ active, complete, waiting }) =>
    handleState(active, complete, waiting).color};
`;

Timeline.Title = styled.Text<TimelineProps>`
  font-family: ${({ theme }) => theme.fonts.nunito.bold};
  color: ${({ active, complete, waiting }) =>
    active
      ? '#FE761E'
      : complete
      ? '#192D36'
      : waiting
      ? '#CCCCCC'
      : '#848484'};
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 8px;
`;

Timeline.Description = styled.Text<TimelineProps>`
  font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
  color: ${({ active, complete }) =>
    active || complete ? '#848484' : '#CCCCCC'};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 24px;
`;

const HeaderCard = styled.Text<TimelineProps>`
  font-family: ${({ theme }) => theme.fonts.nunito.bold};
  color: #36798c;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
`;

const RowTitle = styled.Text<TimelineProps>`
  font-family: ${({ theme }) => theme.fonts.nunito.bold};
  color: #848484;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  margin-top: 24px;
`;

const RowValue = styled.Text<TimelineProps>`
  font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
  color: #848484;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
`;

export { CopyWarning, Timeline, HeaderCard, RowTitle, RowValue };
