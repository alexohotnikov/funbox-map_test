import React from 'react';
import InputField from './InputField'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store'

configure({adapter: new Adapter()});

const initialState = {}
const mockStore = configureStore()
let store,container


beforeEach(()=>{
  store = mockStore(initialState)
  container = mount(<InputField store={store} /> )  
})

afterEach(() => {
  container.unmount()
})

it('[Input]: render the connected(SMART) component', () => {
  expect(container.length).toEqual(1)
});

it('[Input]: set value', () => {
  container.find(input).simulate('keypress', { key: 3 })
  expect(container.find('input').props().val)
})

