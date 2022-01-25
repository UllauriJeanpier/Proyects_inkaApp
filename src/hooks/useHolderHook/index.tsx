import React, { createRef, Fragment, useEffect, useState } from 'react'
import { Alert, Image, TextInput, TouchableOpacity, View } from 'react-native'
import {
  Button,
  Input,
  Select,
} from '@components';
import AddIcon from '@assets/icons/plus-circle.png';
import EditIcon from '@assets/icons/Edit.png';
import RemoveIcon from '@assets/icons/trash.png';
import { useAppDispatch, useTypeDocsSelector } from '@hooks/redux';
import { 
  ActionView, 
  BtnAdd, 
  HolderView, 
  MainBtnContainer, 
  NameView, 
  TxtAdded 
} from './styles';
import * as typeDocsActions from '@redux/actions/typeDocs';
import * as functions from '@utils/functions';

interface ShareHolder {
  id?: string
  name?: string
  surname1?: string
  surname2?: string
  typeDoc?: any
  idDoc?: string
  nroDoc?: string
}

const useHolderHook  = () => {
  const dispatch = useAppDispatch();
  const typeDocsReducer: any = useTypeDocsSelector();
  const [isEditing, setIsEditing] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [holders, setHolders] = useState<ShareHolder[]>([])
  const [currentHolder, setCurrentHolder] = useState<ShareHolder>({
    name: '',
    nroDoc: '',
    surname1: '',
    surname2: '',
  })

  const inputRef: React.RefObject<TextInput> = createRef();
  const setForm = (key: keyof ShareHolder, value: string) => {
    setCurrentHolder({ ...currentHolder, [key]: value })
  }

  const cleanForm = () => setCurrentHolder({
    ...currentHolder,
    id: '',
    name: '',
    nroDoc: '',
    surname1: '',
    surname2: '',
  })

  useEffect(() => {
    dispatch(typeDocsActions.getTypeDocs({}));
  }, []);

  useEffect(() => {
    if (
      !typeDocsReducer.getTypeDocs.onloading &&
      typeDocsReducer.getTypeDocs.response?.data
    ) {
      setCurrentHolder({
        ...currentHolder,
        typeDoc: (typeDocsReducer.getTypeDocs.response?.data || [])[0].codigo,
        idDoc: (typeDocsReducer.getTypeDocs.response?.data || [])[0].id
      })
    }
  }, [typeDocsReducer.getTypeDocs]);

  const validateValue = (key: any) =>
    key && (key || '').trim().length === 0 ? null : key;

  const addShareHolder = () => {
    if (
      functions.isEmptyText(validateValue(currentHolder.name)) ||
      functions.isEmptyText(validateValue(currentHolder.surname1)) ||
      functions.isEmptyText(validateValue(currentHolder.surname2)) ||
      functions.isEmptyText(validateValue(currentHolder.typeDoc)) ||
      functions.isEmptyText(validateValue(currentHolder.idDoc)) ||
      functions.isEmptyText(validateValue(currentHolder.nroDoc))
    ) {
      /* console.log(currentHolder) */
      Alert.alert('Error', 'Ingrese todos los campos por favor');
      return;
    }
    if (isEditing) {
      const newHolders = holders.map((holder) => {
        if (holder.id === currentHolder.id) {
          return currentHolder
        } else {
          return holder
        }
      })
      setHolders(newHolders)
    } else {
      setHolders([...holders, { 
        ...currentHolder, 
        id: `${holders.length}${currentHolder.name}` 
      }])
    }
    cleanForm()
    setIsEditing(false)
  }

  const onCancelAction = () => {
    cleanForm()
    setIsEditing(false)
  }

  const onAddingAction = () => {
    cleanForm()
    setToggle(!toggle)
  }

  const onDeleteAction = (i: number) => {
    setHolders(holders.filter((item, j) => j !== i))
    cleanForm()
  }

  const onEditAction = (i: number, holder: ShareHolder) => {
    setCurrentHolder({
      ...currentHolder,
      id: holder.id,
      name: holder.name,
      nroDoc: holder.nroDoc,
      surname1: holder.surname1,
      surname2: holder.surname2,
    })
    setToggle(true)
    setIsEditing(true)
    inputRef.current && inputRef.current.focus()
  }

  const findDoc = (value: string) =>
    (typeDocsReducer.getTypeDocs.response?.data || []).find(
      (row: any) => row?.codigo === value
    );

  const renderForm = () => (
    <Fragment>
      <Input
        editable={true}
        ref={inputRef}
        value={currentHolder?.name}
        onChangeText={(text) => setCurrentHolder({...currentHolder, name: text})}
        placeholder="Nombre del representante legal"
      />

      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, marginRight: 16 }}>
          <Input
            editable={true}
            value={currentHolder?.surname1}
            onChangeText={(text) => setCurrentHolder({...currentHolder, surname1: text})}
            placeholder="Apellido paterno"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Input
            editable={true}
            value={currentHolder?.surname2}
            onChangeText={(text) => setCurrentHolder({...currentHolder, surname2: text})}
            placeholder="Apellido materno"
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, marginRight: 16 }}>
          <Select.Content>
            <Select
              selectedValue={currentHolder?.typeDoc}
              onValueChange={(itemValue: any) => { 
                const idTip = itemValue && findDoc(itemValue).id
                setCurrentHolder({...currentHolder, typeDoc: itemValue, idDoc: idTip})
              }}
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
            value={currentHolder?.nroDoc}
            onChangeText={(text) => setCurrentHolder({...currentHolder, nroDoc: text})}
            placeholder="Nº de Documento"
            maxLength={findDoc(currentHolder?.typeDoc)?.longitud}
          />
        </View>
      </View>
      <MainBtnContainer >
        <MainBtnContainer.ButtonLeft>
          <Button
            type="default"
            onPress={onCancelAction}
          >
            <Button.Text type="default">CANCELAR</Button.Text>
          </Button>
        </MainBtnContainer.ButtonLeft>

        <MainBtnContainer.ButtonRight >
          <Button
            type="secondary"
            onPress={addShareHolder}
          >
            <Button.Text type="secondary"> {isEditing ? 'GUARDAR' : 'AGREGAR'}</Button.Text>
          </Button>
        </MainBtnContainer.ButtonRight>
      </MainBtnContainer>
    </Fragment>
  )

  const renderHolders = () => (
    <Fragment>
      {holders.map((holder, index) =>
        <HolderView key={index}>
          <NameView>
            <HolderView.Txt>{holder.name} {holder.surname1}</HolderView.Txt>
          </NameView>
          <ActionView>
            <ActionView.Button onPress={() => onEditAction(index, holder)}>
              <Image source={EditIcon} width={10} height={10} />
              <ActionView.Txt>Editar</ActionView.Txt>
            </ActionView.Button>
            <ActionView.Button onPress={() => onDeleteAction(index)} >
              <Image source={RemoveIcon} width={10} height={10} />
              <ActionView.Txt>Eliminar</ActionView.Txt>
            </ActionView.Button>
          </ActionView>
        </HolderView>
      )}
      <BtnAdd actived={toggle} onPress={onAddingAction} /* style={styles.addBtntContainer} */>
        <Image source={AddIcon} width={10} height={10} />
        <TxtAdded>Agregar accionista</TxtAdded>
      </BtnAdd>
      {toggle && renderForm()}
    </Fragment>
  )

  return { holders, renderHolders}
}

export default useHolderHook
