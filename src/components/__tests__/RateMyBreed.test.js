import React from "react"
import RateMyBreed from '../../RateMyBreed'
import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

describe("Make sure methods in Breed work as expected", () => {
  let wrapper
  let component

  beforeEach(() => {
    configure({ adapter: new Adapter() })
    wrapper = shallow(<RateMyBreed/>)
    component = wrapper.instance()
  })

  test('should render breed component when app is opened', () => {
    expect(wrapper.find('Breed')).toHaveLength(1);
  });

  test('should render Chocies component when view changed to choices', () => {
    component.setState({view: 'choices'});
    expect(wrapper.find('Choices')).toHaveLength(1);
  });


})
