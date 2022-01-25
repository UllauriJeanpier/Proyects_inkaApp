import styled from 'styled-components/native';

const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.nunito.bold};
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  text-align: left;
  color: #36798c;
  margin-bottom: 20px;
`;

const Photo: any = styled.Pressable`
  background: #c4c4c4;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 80px;
  border-radius: 80px;
`;

Photo.Image = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 80px;
`;

const PhotoTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.nunito.bold};
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  color: #848484;
  margin-bottom: 4px;
`;

const PhotoText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.nunitosans.regular};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #848484;
`;

export { Title, Photo, PhotoTitle, PhotoText };
