export default ({ listOfPoints, mapProps }, { type, payload }) => {
  switch(type) {
    case 'ADD_ITEM': {
      return ({
        listOfPoints: [...listOfPoints, payload],
        mapProps,
      })
    }
    case 'REPLACE_ALL': {
      return ({
        listOfPoints: [...payload],
        mapProps,
      })
    }
    case 'DELETE_INDEX': {
      listOfPoints.splice(payload,1)
      return ({
        listOfPoints: [...listOfPoints],
        mapProps,
      })
    }
    case 'YMAP_INSTANCE_SAVE': {
      return({
        listOfPoints,
        mapProps: {...mapProps, ...payload},
      })
    }
    case 'ADD_POINT_ON_MAP': {
      return({
        listOfPoints: [...listOfPoints, { ...payload }],
        mapProps,
      })
    }
    case 'UPDATE_LIST_BY_MAP': {
      return({
        listOfPoints: [...listOfPoints.map(({ id, coords, text }) => {
          const { id: payId, arrayOfNewCoords: newCoords } = payload
          return (id === payId) 
            ? { text, id, coords: [...newCoords]} 
            : { text, id, coords}
        })],
        mapProps,
      })
    }
    default: {
      return { listOfPoints, mapProps }
    }
  }
}