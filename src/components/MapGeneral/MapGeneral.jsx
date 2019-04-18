import React from 'react';
import './MapGeneral.scss';
import { connect } from 'react-redux';
import { 
  YMaps, Map, GeolocationControl, 
  Placemark, Polyline, SearchControl
} from 'react-yandex-maps'

const MapGeneral = (props) => {
  const refs = {
    map: null
  };

  const mapData = {
    center: [55.751574, 37.573856],
    zoom: 9
  };

  return(
    <div className = 'map-content'>
    <YMaps>
      <Map
        defaultState={mapData} 
        width="100%" height="100%"
        modules = {['geocode','geoObject.addon.balloon']}
        instanceRef = {(map) => refs.map = map}
        onLoad = {(ymaps) => {
          props.initMaps({ ymaps, map: refs.map })
          ymaps.geocode("Ульяновск,Мира 24").then((res) => {
            refs.map.setCenter([...res.geoObjects.get(0).geometry._coordinates], 10).then(() => {
              refs.map.setZoom(14, {
                duration: 1000
            });
            })
          })
        }} >
        <SearchControl/>
        { props.mapPoints.length > 0 && props.mapPoints.map(({ text, id, coords}, index) => {
          return (
            <Placemark 
              geometry = {coords}         
              key={index} 
              properties = {{ iconCaption: text, balloonContent: `Имя метки: ${text}`}}
              options = {{ draggable: true, hasBalloon: true }}
              onDragEnd = {({ originalEvent }) => {
                props.updateCoordsByMap(id, originalEvent.target.geometry._coordinates)
              }}
            />
          )})
        }
        <Polyline 
          geometry = { props.mapPoints.map(({ coords }) => coords) } 
          options = {{ 
            strokeColor: '#00985f',
            strokeWidth: 5, 
            }} />
        <GeolocationControl/>
      </Map>
    </YMaps>
    </div>
  )
}

export default connect(
  (state) => ({
    map: state.map,
    mapPoints: state.listOfPoints
  }),
  (dispatch) => ({
    initMaps: (mapSettings) => (
      dispatch({
        type: "MAP_SETTINGS_INIT",
        payload: mapSettings
      })
    ),
    updateCoordsByMap: (id, arrayOfNewCoords) => (
      dispatch({
        type: "UPDATE_BY_MAP",
        payload: {
          id,
          arrayOfNewCoords
        }
      })
    )
  })
)(MapGeneral);