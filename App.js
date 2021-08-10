import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableHighlight, Modal } from 'react-native';
//Instalaciones
import axios from 'axios';

export default function App() {

  const apiUrl = 'http://www.omdbapi.com/?apikey=bc31501a'
  const [state, setState] = useState({
    m: '',
    results: [],
    selected: {},
  });

  const search = () => {
    axios(apiUrl + '&s=' + state.m)
      .then(({ data }) => {
        let results = data.Search
        setState(prevState => {
          return { ...prevState, results: results }
        })
      })
  }

  console.log('Pelicula buscada -->', state.m)

  const openPopup = id => {
    axios(apiUrl + '&i=' + id)
      .then(({ data }) => {
        let result = data;
        console.log('Objetos de la peli --> ', result)
        setState(prevState => {
          return { ...prevState, selected: result }
        });
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscador de películas</Text>

      <TextInput
        placeholder="Buscá la película"
        style={styles.searchBar}
        onChangeText={movie => setState(prevState => {
          return { ...prevState, m: movie }
        })}
        onSubmitEditing={search}
        value={state.m}
      />

      <ScrollView
        style={styles.moviesResult}>
        {state.results.map(results => (
          <TouchableHighlight
            key={results.imdbID}
            onPress={() => openPopup(results.imdbID)}
          >
            <View style={styles.moviesResult}>
              <Image
                source={{ uri: results.Poster }}
                style={styles.imageResult}
                resizeMode='contain'
              />
              <Text style={styles.movieTitle}> {results.Title} </Text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={false}
        visible={(typeof state.selected.Title != "undefined")}
      >
        <View style={styles.popUp}>
          <Image
            source={{ uri: state.selected.Poster }}
            style={styles.imageResult}
            resizeMode='contain'
          />
          <Text style={styles.popTitle}> {state.selected.Title} </Text>
          <Text style={styles.dateMovie}>Fecha de estreno: {state.selected.Released}</Text>
          <Text style={styles.dateMovie}>Duración: {state.selected.Runtime}</Text>
          <Text style={styles.dateMovie}>Director: {state.selected.Director}</Text>
          <Text style={{ marginBottom: 20 }}>Puntuación: {state.selected.imdbRating}</Text>
          <Text>{state.selected.Plot}</Text>
        </View>
        <TouchableHighlight
          onPress={() => setState(prevState => {
            return { ...prevState, selected: {} }
          })}
        >
          <Text style={styles.closeBtn}>Volver</Text>
        </TouchableHighlight>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

//Estilos
const styles = StyleSheet.create({
  //Estilo Container
  container: {
    flex: 1,
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
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginBottom: 40,
    fontWeight: '600',
    fontSize: 15,
    padding: 20,
    width: '70%',
    height: '10%'
  },
  //Estilo pantalla navegable 
  moviesResults: {
    flex: 1,

  },
  moviesResult: {
    flex: 1,
    width: '100%',
    marginBottom: 15
  },
  //Estilo del texto del nombre de la pelicula
  movieTitle: {
    backgroundColor: '#9A2530',
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    padding: 15,
    fontWeight: 'bold',
    borderRadius: 15,
    marginTop: 2
  },
  //Estilos de imagenes en resultado de busqueda
  imageResult: {
    width: '100%',
    height: 500,
    borderRadius: 15,
    marginHorizontal: 'auto'
  },
  popUp: {
    padding: 20
  },
  popTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 5
  },
  closeBtn: {
    padding: 20,
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFF',
    backgroundColor: '#A3001E'
  }
});
