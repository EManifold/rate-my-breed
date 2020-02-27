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
cfa_url: "http://cfa.org/Breeds/BreedsAB/Abyssinian.aspx",
vetstreet_url: "http://www.vetstreet.com/cats/abyssinian",
vcahospitals_url: "https://vcahospitals.com/know-your-pet/cat-breeds/abyssinian",
temperament: "Active, Energetic, Independent, Intelligent, Gentle",
origin: "Egypt",
country_codes: "EG",
country_code: "EG",
description: "The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.",
life_span: "14 - 15",
indoor: 0,
lap: 1,
alt_names: "",
adaptability: 5,
affection_level: 5,
child_friendly: 3,
dog_friendly: 4,
energy_level: 5,
grooming: 1,
health_issues: 2,
intelligence: 5,
shedding_level: 2,
social_needs: 5,
stranger_friendly: 5,
vocalisation: 1,
experimental: 0,
hairless: 0,
natural: 1,
rare: 0,
rex: 0,
suppressed_tail: 0,
short_legs: 0,
wikipedia_url: "https://en.wikipedia.org/wiki/Abyssinian_(cat)",
hypoallergenic: 0}]));

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
