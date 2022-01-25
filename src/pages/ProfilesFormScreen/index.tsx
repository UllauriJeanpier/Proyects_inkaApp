import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import { RootStackParamList } from 'src/routes';
import { View, Alert, StyleSheet } from 'react-native';
import {
  Header,
  Content,
  Switch,
  Button,
  Copy,
  Input,
  Select,
  Loader,
  Modal,
  Checkbox,
} from '@components';
import { useAppDispatch, useProfilesSelector, useTypeDocsSelector } from '@hooks';
import useHolderHook from '@hooks/useHolderHook'
import * as profilesActions from '@redux/actions/profiles';
import * as profilesSlice from '@redux/slices/profiles';
import * as typeDocsActions from '@redux/actions/typeDocs';
import * as functions from '@utils/functions';
import { TxtDescription, TxtSwitch, TxtTitle } from './styles';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'ProfilesFormScreen'>;
}

const ProfilesFormScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const profilesReducer: any = useProfilesSelector();
  const typeDocsReducer: any = useTypeDocsSelector();
  const [visible, setVisble] = useState(false);

  // Accionistas
  const [hasShareHolder, setHasShareHolder] = useState(false)
  const { holders, renderHolders } = useHolderHook()
  const [checks, setChecks] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false
  })

  useEffect(() => {
    dispatch(profilesSlice.cleanByKey({ key: 'getActivityEconomic' }));
    dispatch(profilesSlice.cleanByKey({ key: 'getSectorEconomic' }));
    dispatch(profilesActions.getActivityEconomic());
    dispatch(profilesActions.getSectorEconomic());
    dispatch(typeDocsActions.getTypeDocs({}));
  }, []);

  useEffect(() => {
    if (
      !profilesReducer.getActivityEconomic.onloading &&
      profilesReducer.getActivityEconomic.response &&
      (profilesReducer.getActivityEconomic.response?.data || []).length > 0
    ) {
      dispatch(
        profilesSlice.setForm({
          activity: (profilesReducer.getActivityEconomic.response?.data ||
            [])[0]?.codigo,
          idActivity: (profilesReducer.getActivityEconomic.response?.data ||
            [])[0]?.id,
        })
      );
    }
  }, [profilesReducer.getActivityEconomic]);

  useEffect(() => {
    if (
      !profilesReducer.getSectorEconomic.onloading &&
      profilesReducer.getSectorEconomic.response &&
      (profilesReducer.getSectorEconomic.response?.data || []).length > 0
    ) {
      dispatch(
        profilesSlice.setForm({
          sector: (profilesReducer.getSectorEconomic.response?.data || [])[0]
            ?.codigo,
          idSector: (profilesReducer.getSectorEconomic.response?.data || [])[0]
            ?.id,
        })
      );
    }
  }, [profilesReducer.getSectorEconomic]);

  useEffect(() => {
    if (
      !typeDocsReducer.getTypeDocs.onloading &&
      typeDocsReducer.getTypeDocs.response?.data
    ) {
      dispatch(
        profilesSlice.setForm({
          typeDoc: (typeDocsReducer.getTypeDocs.response?.data || [])[0].codigo,
          typeDocPerson: (typeDocsReducer.getTypeDocs.response?.data || [])[0].codigo,
        })
      );
    }
  }, [typeDocsReducer.getTypeDocs]);

  const onPressSave = () => {
    if (
      functions.isEmptyText(profilesReducer.form?.ruc) ||
      functions.isEmptyText(profilesReducer.form?.alias) ||
      functions.isEmptyText(profilesReducer.form?.mail) ||
      functions.isEmptyText(profilesReducer.form?.sector) ||
      functions.isEmptyText(profilesReducer.form?.activity) ||
      functions.isEmptyText(profilesReducer.form?.legalPerson) ||
      functions.isEmptyText(profilesReducer.form?.dadname) ||
      functions.isEmptyText(profilesReducer.form?.momname) ||
      functions.isEmptyText(profilesReducer.form?.typeDocPerson) ||
      functions.isEmptyText(profilesReducer.form?.numDocPerson) 
    ) {
      Alert.alert('Error', 'Ingrese todos los campos');
      return
    }

    if (!hasShareHolder && !checks.check1) {
      Alert.alert('Error', 'Debe aceptar todos los terminos y condiciones');
      return;
    }

    if (!checks.check2 || !checks.check3 || !checks.check4 || !checks.check5) {
      Alert.alert('Error', 'Debe aceptar todos los terminos y condiciones');
      return;
    }

    console.log(JSON.stringify({
      ruc: profilesReducer.form?.ruc,
          nombre: profilesReducer.form?.alias,
          email: profilesReducer.form?.mail,
          sector: profilesReducer.form?.sector,
          idSector: profilesReducer.form?.idSector,
          actividad: profilesReducer.form?.activity,
          idActividad: profilesReducer.form?.idActivity,
          sesionActual: true,
          representante: {
            nombre:  profilesReducer.form?.legalPerson,
            apellidoPaterno: profilesReducer.form?.dadname,
            apellidoMaterno: profilesReducer.form?.momname,
            tipoDocumento: profilesReducer.form?.typeDocPerson,
            numeroDocumento: profilesReducer.form?.numDocPerson,
          },
          accionistas: holders.map((holder) => {
            return {
              nombres: holder.name,
              apellidoPaterno: holder.surname1,
              apellidoMaterno: holder.surname2,
              idTipoDocumento: holder.idDoc,
              tipoDocumento: holder.typeDoc,
              numeroDocumento: holder.nroDoc
            }
          })
    }, null, 3))
    
    dispatch(
      profilesActions.saveProfile({
        start: () => setVisble(true),
        success: () => {
          dispatch(profilesSlice.cleanByKey({ key: 'setProfile' }));
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: 'HomeScreen' }],
            })
          );
        },
        error: () => Alert.alert('Error', 'Tenemos problemas'),
        finally: () => {
          setVisble(false);
          dispatch(profilesActions.getProfiles());
        },
        data: {
          ruc: profilesReducer.form?.ruc,
          nombre: profilesReducer.form?.alias,
          email: profilesReducer.form?.mail,
          sector: profilesReducer.form?.sector,
          actividad: profilesReducer.form?.activity,
          sesionActual: true,
          representante: {
            nombre:  profilesReducer.form?.legalPerson,
            apellidoPaterno: profilesReducer.form?.dadname,
            apellidoMaterno: profilesReducer.form?.momname,
            tipoDocumento: profilesReducer.form?.typeDocPerson,
            numeroDocumento: profilesReducer.form?.numDocPerson,
          },
          accionistas: holders.map((holder) => {
            return {
              nombres: holder.name,
              apellidoPaterno: holder.surname1,
              apellidoMaterno: holder.surname2,
              idTipoDocumento: holder.idDoc,
              tipoDocumento: holder.typeDoc,
              numeroDocumento: holder.nroDoc
            }
          })
        },
      })
    );
  };

  const findDoc = (value: string) => 
    (typeDocsReducer.getTypeDocs.response?.data || []).find(
      (row: any) => row?.codigo === value
    );

  const findActivity = (value: string) => 
    (profilesReducer.getActivityEconomic.response?.data || []).find(
      (row: any) => row?.codigo === value
    );

  const findSector = (value: any) =>
    (profilesReducer.getSectorEconomic.response?.data || []).find(
      (row: any) => row?.codigo === value
    );
  
  
  

  return (
    <>
      <Header>
        <Header.ArrowBack navigation={navigation} />
        <Header.Title internal>Nuevo perfil de empresa</Header.Title>
      </Header>
      <Content>
        <Copy>Completa los datos de información de la empresa</Copy>
        <View style={{ marginBottom: 35 }} />
        <Input
          editable={true}
          value={profilesReducer.form?.ruc}
          onChangeText={(text) =>
            dispatch(profilesSlice.setForm({ ruc: text }))
          }
          placeholder="RUC"
        />
        <Input
          editable={true}
          value={profilesReducer.form?.alias}
          onChangeText={(text) =>
            dispatch(profilesSlice.setForm({ alias: text }))
          }
          placeholder="Alias"
        />
        <Input
          editable={true}
          value={profilesReducer.form?.mail}
          onChangeText={(text) =>
            dispatch(profilesSlice.setForm({ mail: text }))
          }
          placeholder="Email (diferente al que usa en su cuenta personal)"
        />
        <Select.Content>
          <Select
            selectedValue={profilesReducer.form?.sector}
            onValueChange={(itemValue: any) => {
              dispatch(profilesSlice.setForm({ sector: itemValue }))
              dispatch(profilesSlice.setForm({idSector: findDoc(profilesReducer.form?.sector)?.id}))
            }}
          >
            {(profilesReducer.getSectorEconomic?.response?.data || []).map(
              (row: any) => (
                <Select.Item
                  key={row.codigo}
                  label={row.nombre}
                  value={row.codigo}
                />
              )
            )}
          </Select>
        </Select.Content>
        <Select.Content>
          <Select
            selectedValue={profilesReducer.form?.activity}
            onValueChange={(itemValue: any) => {
              dispatch(profilesSlice.setForm({ activity: itemValue }))
              dispatch(profilesSlice.setForm({idActivity: findDoc(profilesReducer.form?.activity)?.id}))
            }}
          >
            {(profilesReducer.getActivityEconomic?.response?.data || []).map(
              (row: any) => (
                <Select.Item
                  key={row.codigo}
                  label={row.nombre}
                  value={row.codigo}
                />
              )
            )}
          </Select>
        </Select.Content>

        {/* // Agregar Representante legal  */}

        <View style={styles.titleContainer}>
          <TxtTitle>
            Representante legal
          </TxtTitle>
        </View>

        <Input
            editable={true}
            value={profilesReducer.form?.legalPerson}
            onChangeText={(text) =>
              dispatch(profilesSlice.setForm({ legalPerson: text }))
            }
            placeholder="Nombre del representante legal"
          />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, marginRight: 16 }}>
              <Input
                editable={true}
                value={profilesReducer.form?.dadname}
                onChangeText={(text) =>
                  dispatch(profilesSlice.setForm({ dadname: text }))
                }
                placeholder="Apellido paterno"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Input
                editable={true}
                value={profilesReducer.form?.momname}
                onChangeText={(text) =>
                  dispatch(profilesSlice.setForm({ momname: text }))
                }
                placeholder="Apellido materno"
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, marginRight: 16 }}>
              <Select.Content>
                <Select
                  selectedValue={profilesReducer.form?.typeDocPerson}
                  onValueChange={(itemValue: any) =>
                    dispatch(profilesSlice.setForm({ typeDocPerson: itemValue }))
                  }
                >
                  {(typeDocsReducer.getTypeDocs.response?.data || []).map(
                    (row: any) => (
                      <Select.Item
                        key={row.codigo}
                        label={row.nombre}
                        value={row.codigo}
                      />
                    )
                  )}
                </Select>
              </Select.Content>
            </View>
            <View style={{ flex: 1 }}>
              <Input
                editable={true}
                value={profilesReducer.form?.numDocPerson}
                onChangeText={(text) =>
                  dispatch(profilesSlice.setForm({ numDocPerson: text }))
                }
                placeholder="Nº de Documento"
                maxLength={findDoc(profilesReducer.form?.typeDocPerson)?.longitud}
              />
            </View>
          </View>

        {/* // Agregar Accionistas */}

        <View style={styles.titleContainer}>
          <TxtTitle>
            Accionistas Mayoritarios
          </TxtTitle>
        </View>
        <View style={styles.titleContainer}>
          <TxtDescription>
            Especifica todos los accionistas con
            participación mayor o igual al 25%.
            Este formulario tiene carácter de
            declaración jurada.
          </TxtDescription>
        </View>
        <View style={styles.switchContainer} >
          <TxtDescription>
            Si tengo accionistas mayoritarios
          </TxtDescription>
          <Switch
            toggle={hasShareHolder}
            onToggle={(toggle: boolean) =>
              setHasShareHolder(toggle)
            }
          />
        </View>
        {hasShareHolder ?
          renderHolders() : (
            <View style={styles.checkContainer}>
              <Checkbox
                checked={checks.check1}
                onPress={(checked) => setChecks({ ...checks, check1: checked })}
              />
              <TxtSwitch>
                Declaro que hay 0 accionista(s) con participación igual o superior al 25%
              </TxtSwitch>
            </View>
          )}
        <View style={styles.checkContainer}>
          <Checkbox
            checked={checks.check2}
            onPress={(checked) => setChecks({ ...checks, check2: checked })}
          />
          <TxtSwitch>
            Declaro que la información proporcionada es veraz y actual.
            Asumo absoluta responsabilidad por su exactitud y legatimidad.
          </TxtSwitch>
        </View>
        <View style={styles.checkContainer}>
          <Checkbox
            checked={checks.check3}
            onPress={(checked) => setChecks({ ...checks, check3: checked })}
          />
          <TxtSwitch>
            Autorizo recibir comunicaciones promocionales.
          </TxtSwitch>
        </View>
        <View style={styles.checkContainer}>
          <Checkbox
            checked={checks.check4}
            onPress={(checked) => setChecks({ ...checks, check4: checked })}
          />
          <TxtSwitch>
            Confirmo que cuento con el consentimiento de uso de datos
            personales de terceros, encargando su tratamiento a Inkambio
            conforme a la Política de Privacidad y los Términos y
            Condiciones.
          </TxtSwitch>
        </View>
        <View style={styles.checkContainer}>
          <Checkbox
            checked={checks.check5}
            onPress={(checked) => setChecks({ ...checks, check5: checked })}
          />
          <TxtSwitch>
            Al crear una cuenta acepto los términos y condiciones y
            la política de privacidad
          </TxtSwitch>
        </View>


        <Button type="primary" onPress={onPressSave}>
          <Button.Text type="primary">GUARDAR</Button.Text>
        </Button>
        <Button
          type="secondary"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Button.Text type="secondary">CANCELAR</Button.Text>
        </Button>
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

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
    marginVertical: 8
  },
  switchContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15
  },
  checkContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingRight: 20,
    marginVertical: 12
  }
})

export default ProfilesFormScreen;
