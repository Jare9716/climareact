import React, {useState} from 'react';
import {
  StyleSheet, 
  View,
  TextInput,
  TouchableWithoutFeedback,
  Text,
  Animated,
  Alert,
} from 'react-native';

import {Picker} from '@react-native-picker/picker'

const Formulario = ({busqueda, setBusqueda, setConsultar}) => {

    const {ciudad, pais} = busqueda

    const [animacionboton] = useState(new Animated.Value(1))

    const consultarClima = ()=>{
        if(pais.trim() === '' || ciudad.trim() === ''){
            Alert.alert(
                'Error',
                'Agrega una ciudad y pais',
                [{text: 'Entendido'}]           
            )
            return
        }
        //consultar la API
        setConsultar(true)

    }

    const animacionEntrada = () =>{
        Animated.spring(animacionboton, {
            useNativeDriver: true,
            toValue: .75,
        }).start()
    }

    const animacionSalida = () =>{
        Animated.spring(animacionboton, {
            useNativeDriver: true,
            toValue: 1,
            friction: 4,
            tension: 30,
        }).start()
    }

    const estiloAnimacion ={
        transform: [{scale: animacionboton }]
    }

  return (
    <>
        <View style = {styles.formulario}>
            <View>
                <TextInput
                    value={ciudad}
                    style = {styles.input}
                    onChangeText={ciudad => setBusqueda({...busqueda,ciudad})}
                    placeholder='Ciudad'
                    placeholderTextColor={'#666'}  
                />
            </View>
            <View>
                <Picker
                    selectedValue={pais}
                    itemStyle = {{height:120, backgroundColor: '#FFF'}}
                    onValueChange={pais => setBusqueda({...busqueda,pais})}
                >
                    <Picker.Item label='--selecione un país--' value =""/>
                    <Picker.Item label='Estados unidos' value ="US"/>
                    <Picker.Item label='México' value ="MX"/>
                    <Picker.Item label='Argentina' value ="AR"/>
                    <Picker.Item label='Colombia' value ="CO"/>
                    <Picker.Item label='Costa Rica' value ="CR"/>
                    <Picker.Item label='España' value ="ES"/>
                    <Picker.Item label='Perú' value ="PE"/>
                </Picker>
            </View>

            <TouchableWithoutFeedback
                onPressIn={ () => animacionEntrada()}
                onPressOut={ () => animacionSalida()}
                onPress={() => consultarClima()}
            >
                <Animated.View
                    style = {[styles.btnBuscar, estiloAnimacion]}
                >
                    <Text style = {styles.textoBuscar}>Buscar Clima</Text>
                </Animated.View>
            </TouchableWithoutFeedback>

        </View>
    </>
  );
};

const styles = StyleSheet.create({
    input : {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnBuscar:{
        marginBottom: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    textoBuscar:{
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    },
});

export default Formulario;
