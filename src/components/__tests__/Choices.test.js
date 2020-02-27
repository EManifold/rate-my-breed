import React from "react"
import Choices from '../Choices'
import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

describe("Make sure methods in Choices work as expected", () => {
  let wrapper
  let component
  let props

  beforeEach(() => {
    props = {
      likedBreeds: [{data: {name: 'cat1'}, image: 'image1'}, {data: {name: 'cat2'}, image: 'image2'}, {data: {name: 'cat3'}, image: 'image3'}],
      dislikedBreeds: [{data: {name: 'cat4'}, image: 'image4'}, {data: {name: 'cat5'}, image: 'image5'}]
    };
    configure({ adapter: new Adapter() })
    wrapper = shallow(<Choices {...props}/>)
    component = wrapper.instance()
  })

  test('should remove duplicate words from array', () => {
    expect(component.removeDuplicates([1, 1, 2])).toEqual([1, 2])
  })

})
