
import React, { Component }  from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// Components: 
import LeftBar from './components/LeftBar/LeftBar';
import MapGeneral from './components/MapGeneral/MapGeneral';
import reducer from './reducers'


const store = createStore(reducer, {
  listOfPoints: [ ],
  mapProps: null,
  pointsOnMap: []
})

class App extends Component {
  render() {
    return(
      <Provider store = {store}>
        <LeftBar/>
        <MapGeneral/>
      </Provider>
    )
  }
}

export default App;