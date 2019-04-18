export default ({ listOfPoints, mapProps, pointsOnMap }, { type, payload }) => {
  switch(type) {
    case 'ADD_ITEM': {
      return ({
        listOfPoints: [...listOfPoints, payload],
        mapProps,
        pointsOnMap
      })
    }
    case 'REPLACE_ALL': {
      return ({
        listOfPoints: [...payload],
        mapProps,
        pointsOnMap
      })
    }
    case 'DELETE_INDEX': {
      listOfPoints.splice(payload,1)
      return ({
        listOfPoints: [...listOfPoints],
        mapProps,
        pointsOnMap
      })
    }
    case 'MAP_SETTINGS_INIT': {
      return({
        listOfPoints,
        mapProps: {...mapProps, ...payload},
        pointsOnMap
      })
    }
    case 'ADD_POINT_ON_MAP': {
      return({
        listOfPoints: [...listOfPoints, { ...payload }],
        mapProps,
        pointsOnMap
      })
    }
    case 'UPDATE_BY_MAP': {
      return({
        listOfPoints: [...listOfPoints.map(({ id, coords, text }) => {
          const { id: payId, arrayOfNewCoords: newCoords } = payload
          return (id === payId) 
            ? { text, id, coords: [...newCoords]} 
            : { text, id, coords}
        })],
        mapProps,
        pointsOnMap
      })
    }
    default: {
      return { listOfPoints, mapProps, pointsOnMap }
    }
  }
}