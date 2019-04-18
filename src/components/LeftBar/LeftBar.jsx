import React from 'react';
import InputField from '../InputField/InputField';
import BarItems from '../BarItems/BarItems'

import './LeftBar.scss'

export default (props) => {
  return(
    <div className = 'left_menu-bar'>
      <span className = 'label'>Геолокация</span>
      <InputField/>
      <BarItems/>
    </div>
  )
}