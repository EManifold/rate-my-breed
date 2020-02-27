import React from "react"
import Breed from '../Breed'
import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

describe("Make sure methods in Breed work as expected", () => {
  let wrapper
  let component

  beforeEach(() => {
    configure({ adapter: new Adapter() })
    wrapper = shallow(<Breed/>)
    component = wrapper.instance()
  })

  test('API call shows details on page', async () => {
    const spy = jest
      .spyOn(component, 'breedApiCall')
      .mockImplementation(() => Promise.resolve([{weight: {imperial: "7  -  10", metric: "3 - 5"},
id: "abys",
name: "Abyssinian",
temperament: "Active, Energetic, Independent, Intelligent, Gentle",
origin: "Egypt",
description: "The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.",
affection_level: 5}]));

    await component.setBreed();

    expect(wrapper.find("#breedName").text()).toEqual('Abyssinian')
    expect(wrapper.find("#breedDescription").text()).toEqual("The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.")
  });

  test("should increase likes by 1", () => {
    expect(component.state.likes).toEqual(0)
    wrapper.find("#like").simulate("click")
    expect(component.state.likes).toEqual(1)
  })

  test("should increase dislikes by 1", () => {
    expect(component.state.dislikes).toEqual(0)
    wrapper.find("#dislike").simulate("click")
    expect(component.state.dislikes).toEqual(1)
  })

  test("pressing like should render a new breed", async () => {
    // expect(component.state.breedImage).toEqual("https://cdn2.thecatapi.com/images/9x1zk_Qdr.jpg")
    const spy = jest
    .spyOn(component, 'setBreed')
    .mockImplementation(() => Promise.resolve());

    component.forceUpdate();
    wrapper.find("#like").simulate("click")

    expect(spy).toHaveBeenCalled();
  })

  test("pressing dislike should render a new breed", async () => {
    // expect(component.state.breedImage).toEqual("https://cdn2.thecatapi.com/images/9x1zk_Qdr.jpg")
    const spy = jest
    .spyOn(component, 'setBreed')
    .mockImplementation(() => Promise.resolve());

    component.forceUpdate();
    wrapper.find("#dislike").simulate("click")

    expect(spy).toHaveBeenCalled();
  })

  test("liking should add to liked breeds", () => {
    component.setState({breedName: 'Ragamuffin'})
    wrapper.find("#like").simulate("click")
    expect(component.state.likedBreeds).toEqual(['Ragamuffin'])
  })


})
