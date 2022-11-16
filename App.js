
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import Formulario from './componentes/Formulario';
import Clima from './componentes/Clima';

import axios from 'axios';

const App = () => {
  
  const [busqueda, setBusqueda] = useState({ciudad:'', pais:''})
  const [consultar, setConsultar] = useState(false)
  const [resultado, setResultado] = useState({})
  const [bgcolor, setBgcolor] = useState('rgb(71,149,212)')

  const {ciudad, pais} = busqueda

  useEffect(()=>{
    const consultarClima = async () =>{
      if(consultar){
        const appID = 'ec644a78e6771d254e4a2250dcbf9e63'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`

        
  
        try {
          const respuesta = await fetch(url)
          const resultado = await respuesta.json()
          setResultado(resultado)
          setConsultar(false)

          //Modifica los colores de fondo basado en temp

          const kelvin = 273.15
          const {main} = resultado
          const actual = main.temp - kelvin

          if (actual < 10) {
            setBgcolor('rgb(105, 108, 149)')
          }
          else if (actual >= 10 && actual < 25){
            setBgcolor('rgb(71,149,212)')
          }
          else{
            setBgcolor('rgb(178,28,61)')
          }
        } catch (error) {
          mostrarAlerta()
        }
      }
    } 
    consultarClima()
  },[consultar])

  const mostrarAlerta = ()=>{
    Alert.alert(
      'Error',
      'La ciudad no pertenece al país seleccionado',
      [{text: 'OK'}] 
    )
  }

  const ocultarTeclado = () =>{
    Keyboard.dismiss()
  }

  const bgColorApp = {
    backgroundColor: bgcolor
  }

  return (
    <>
        <TouchableWithoutFeedback onPress={()=> ocultarTeclado()}>
          <View style ={[styles.app, bgColorApp]}>
            <View style ={styles.contenido}>
    
              <Clima 
                resultado = {resultado}
              />

              <Formulario
              busqueda = {busqueda}
              setBusqueda = {setBusqueda}
              setConsultar = {setConsultar}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({

  app:{
    flex: 1,
    justifyContent: 'center'
  },
  contenido:{
    marginHorizontal: '2.5%'
  },

});

export default App;
