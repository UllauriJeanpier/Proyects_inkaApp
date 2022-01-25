import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import { RootStackParamList } from 'src/routes';
import { Header, Content, Icon, Loader, Modal } from '@components';
import { useAppDispatch, useProfilesSelector } from '@hooks';
import * as profilesActions from '@redux/actions/profiles';
import * as profilesSlice from '@redux/slices/profiles';
import briefcaseIcon from '@assets/icons/briefcase.png';
import { Title, RowContent, RowProfile } from './styles';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'ProfilesScreen'>;
}

const ProfilesScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const profilesReducer = useProfilesSelector();
  const [visible, setVisble] = useState(false);

  useEffect(() => {
    dispatch(profilesActions.getProfiles());
  }, []);

  const setProfile = (row: any) => {
    setVisble(true);
    dispatch(
      profilesActions.setProfile({
        idPerfil: row.id,
      })
    );
  };

  useEffect(() => {
    if (
      !profilesReducer.setProfile.onloading &&
      profilesReducer.setProfile.response
    ) {
      dispatch(profilesSlice.cleanByKey({ key: 'setProfile' }));
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'HomeScreen' }],
        })
      );
    }

    if (!profilesReducer.setProfile.onloading) {
      setVisble(false);
    }
  }, [profilesReducer.setProfile]);

  if (profilesReducer.getProfiles.onloading) {
    return (
      <>
        <Header>
          <Header.Title>Elige tu perfil</Header.Title>
        </Header>
        <Content centered>
          <Loader />
        </Content>
      </>
    );
  }

  return (
    <>
      <Header>
        <Header.Title>Elige tu perfil</Header.Title>
      </Header>
      <Content centered>
        <Title>¿Con qué perfil deseas operar?</Title>
        <RowContent>
          {(profilesReducer.getProfiles.response?.data || []).map(
            (row: any) => (
              <RowProfile.Content key={row.id}>
                <RowProfile
                  company={!row.sesionActual}
                  onPress={() => setProfile(row)}
                >
                  {row.sesionActual ? (
                    <Icon name="smileo" size={64} color="#FFF" />
                  ) : (
                    <RowProfile.Img source={briefcaseIcon} />
                  )}
                </RowProfile>
                <RowProfile.Title>{row.nombre}</RowProfile.Title>
                <RowProfile.SubTitle>
                  {row.sesionActual ? 'ADMINISTRADOR' : 'DELEGADO'}
                </RowProfile.SubTitle>
              </RowProfile.Content>
            )
          )}
          <RowProfile.Content>
            <RowProfile
              add
              onPress={() => navigation.navigate('ProfilesFormScreen')}
            >
              <Icon name="plus" size={64} color="#CCCCCC" />
            </RowProfile>
            <RowProfile.Title add>Nuevo Perfil de Empresa</RowProfile.Title>
          </RowProfile.Content>
        </RowContent>
      </Content>
      <Modal visible={visible}>
        <Modal.Backdrop />
        <Modal.Card centered style={{ elevation: 4 }}>
          <Loader />
        </Modal.Card>
      </Modal>
    </>
  );
};

export default ProfilesScreen;
