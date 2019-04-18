import React from 'react';
import { connect } from 'react-redux';
import { AddLocation } from '@material-ui/icons';
import RaisedButton from '@material-ui/core/Button'
import './InputField.scss';

const InputField = (props) => {
  const allRefs = {}

  const searchField = (e) => {
      e.preventDefault();
      if(allRefs.input.value.length === 0) return;
      const { map } = props.map;
      props.addPointOnMap({ text:allRefs.input.value, coords: map.getCenter(), id: Date.now().toString() })
      allRefs.input.value = ''
    }

  return(
    <form 
      className='input-form' 
      onSubmit = {(e) => searchField(e)}>
      <input 
        ref= {(el) => allRefs.input = el} 
        placeholder = "Введите название для метки"/>
      <RaisedButton variant="contained" type="submit"><AddLocation/></RaisedButton>
    </form>
  )
}

export default connect((state) => {
  return({
    list: state.listItem,
    map: state.mapProps,
    mapPoints: state.listOfPoints
  })
}, (dispatcher) => {
  return({
    addPointOnMap: (coords) => {
    dispatcher({
        type: "ADD_POINT_ON_MAP", payload: coords
      })
    }
  })
})(InputField)