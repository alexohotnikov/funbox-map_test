import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import App from '../App'

configure({ adapter: new Adapter() })

describe('General test for GeoApp:', () =>{
  const renderApp = mount(<App/>)
  
  it('rendering app', () => {
    expect(renderApp.children.length).toBeGreaterThan(0)
  })
  it('input was find', () => {
    expect(renderApp.find('input').length).toBe(1)
  })

  it('input simulate enter', () => {
    renderApp.find('input').props().value = 'z'
    expect(renderApp.find('input').props().value).toBe('z')
  })

})
