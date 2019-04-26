import React, { PureComponent } from 'react';
import './MapGeneral.scss';
import { connect } from 'react-redux';
import { 
  YMaps, Map, GeolocationControl, 
  Placemark, Polyline, SearchControl
} from 'react-yandex-maps';
import PropTypes from 'prop-types'


class MapGeneral extends PureComponent {
  constructor(props) {
    super(props);
    this.mapData = {
      center: [55.751574, 37.573856],
      zoom: 9
    }
    this.state = {
      mapInstance: null
    }
  }

  render() {
    const { props, mapData, state } = this
    return(
      <div className = 'map-content'>
      <YMaps>
        <Map
          defaultState={mapData} 
          width="100%" height="100%"
          modules = {['geocode','geoObject.addon.balloon']}
          instanceRef = {(map) => this.setState({ mapInstance: map }, () => {
            props.initMaps({ mapInstance: state.mapInstance })
          })}
          onLoad = {(ymaps) => {
            ymaps.geocode("Ульяновск,Мира 24").then((res) => {
              state.mapInstance.setCenter([...res.geoObjects.get(0).geometry._coordinates], 10).then(() => {
                state.mapInstance.setZoom(14, {
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
}

const mapStateToProps = (state) => ({
  mapInstance: state.map,
  mapPoints: state.listOfPoints
})

const mapDispatchToProps = (dispatch) => ({
  initMaps: (mapSettings) => (
    dispatch({
      type: "YMAP_INSTANCE_SAVE",
      payload: mapSettings
    })
  ),
  updateCoordsByMap: (id, arrayOfNewCoords) => (
    dispatch({
      type: "UPDATE_LIST_BY_MAP",
      payload: {
        id,
        arrayOfNewCoords
      }
    })
  )
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
  )(MapGeneral);

  MapGeneral.propTypes = {
    mapPoints: PropTypes.array.isRequired,
    initMaps: PropTypes.func.isRequired,
    updateCoordsByMap: PropTypes.func.isRequired,
  }