import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Image } from 'react-native';
//Instalaciones
import axios from 'axios';

export default function App() {

  const apiUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=bc31501a'
  const [state, setState] = useState({
    m: '',
    results: [],
    selected: {},
  });

const search = () => {
  axios (apiUrl + '&s=' + state.m)
  .then(({data}) => {
    let results = data.Search
    setState(prevState => {
      return {...prevState, results: results}
    })
  })
}

console.log('Peliculas encontradas -->', state.m)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplicación de peliculas</Text>

      <TextInput
      placeholder="Buscá tu película"
      style={styles.searchBar}
      onChangeText={movie => setState(prevState => {
        return {...prevState, m: movie}
      })}
      onSubmitEditing={search}
      value={state.m}
      /> 

      <ScrollView 
      style={styles.moviesResult}>
        {state.results.map(results => (
          <View key={results.imdbID} style={styles.moviesResult}>
            <Image 
            source={{uri: results.Poster}}
            style={styles.imageResult}
            resizeMode='contain'
            />
            <Text style={styles.movieTitle}> {results.Title} </Text>
          </View>
        ))}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

//Estilos
const styles = StyleSheet.create({
  //Estilo Container
  container: {
    flex: 1,
    // backgroundColor: '#253239',
    backgroundColor: '#DC3545',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 70
  },
  //Estilo del Título
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '700'
  },
  //Estilo de Barra de Búsqueda
  searchBar: {
    backgroundColor:"#FFFFFF",
    borderRadius: 15,
    marginBottom: 40,
    fontWeight: '600',
    fontSize: 15,
    padding: 20,
    width: '70%',
    height: '10%'
  },
  //Estilo pantalla navegable 
  moviesResults:{
    flex: 1,

  },
  moviesResult: {
    flex: 1, 
    width: '100%',
    marginBottom: 15
  },
  //Estilo del texto del nombre de la pelicula
  movieTitle: {
    // backgroundColor: '#445565',
    backgroundColor: '#9A2530',
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    padding: 15,
    fontWeight: 'bold',
    borderRadius: 15, 
  },
  //Estilos de imagenes en resultado de busqueda
  imageResult:{
    width: '100%',
    height: 500,
    borderRadius: 15,
    marginHorizontal: 'auto'
  }
});
