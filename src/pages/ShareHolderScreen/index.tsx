
import { useAppDispatch, useAuthSelector } from '@hooks/redux'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import {
  Button,
  Brand,
  Content,
  Switch,
  Checkbox,
  EmptyState,
  Modal,
  Loader
} from '@components'
import { RootStackParamList } from 'src/routes'
import useHolderHook from '@hooks/useHolderHook'
import { TxtDescription, TxtSwitch, TxtTitle } from './styles'
import * as authSlide from '@redux/slices/auth';
import * as authActions from '@redux/actions/auth';

interface Props extends StackScreenProps<RootStackParamList, 'ShareHolderScreen'> { }

const ShareHolderForm: React.FC<Props> = ({ navigation, route }) => {

  const dispatch = useAppDispatch();
  const authReducer: any = useAuthSelector();
  const { holders, renderHolders } = useHolderHook()
  const [visible, setVisble] = useState(false);
  const [hasShareHolder, setHasShareHolder] = useState(false)
  const [checks, setChecks] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false
  })

  useEffect(() => {
    dispatch(authSlide.setForm({ hasShareHolder: false }))
  }, [])

  const onRegister = () => {
    let payload = route.params?.payload
    payload = {
      ...payload,
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
    }
    if (!hasShareHolder && !checks.check1) {
      Alert.alert('Error', 'Debe aceptar todos los terminos y condiciones');
      return;
    }
    if (!checks.check2 || !checks.check3 || !checks.check4 || !checks.check5) {
      Alert.alert('Error', 'Debe aceptar todos los terminos y condiciones');
      return;
    }
    /* console.log(JSON.stringify(payload, null, 3)) */
    dispatch(
      authActions.signUp({
        start: () => setVisble(true),
        error: () => Alert.alert('Error', 'Tenemos problemas'),
        success: () => null,
        finally: () => setVisble(false),
        data: payload,
      })
    );

  }

  if (
    !authReducer.signUp.onloading &&
    authReducer.signUp.response &&
    authReducer.signUp.response?.success
  ) {
    return (
      <Content centered>
        <EmptyState>
          <EmptyState.Icon name="checkcircleo" size={90} color="#52C41A" />
          <EmptyState.Title>REGISTRO EXITOSO</EmptyState.Title>
          <EmptyState.Subtitle>
            Hemos enviado un correo de verificación, haga clic en enlace para
            confirmar tu cuenta.
          </EmptyState.Subtitle>
          <EmptyState.Button type="primary" onPress={() => navigation.navigate('LoginScreen')}>
            <EmptyState.Button.Text>OK</EmptyState.Button.Text>
          </EmptyState.Button>
        </EmptyState>
      </Content>
    );
  }

  return (
    <Content centered>
      <Brand />
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
      <Button type="primary" onPress={onRegister}>
        <Button.Text type="primary">REGISTRAR</Button.Text>
      </Button>
      <Modal visible={visible}>
        <Modal.Backdrop />
        <Modal.Card centered style={{ elevation: 4 }}>
          <Loader />
        </Modal.Card>
      </Modal>
    </Content>
  )
}

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

export default ShareHolderForm
