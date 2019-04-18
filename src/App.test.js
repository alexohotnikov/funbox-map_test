import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';


configure({adapter: new Adapter()});


describe("Testing geolocation app", () => {
  const app = shallow(<App/>)
  it("Redering App", () => {
      expect(app).toMatchSnapshot()
  })
})