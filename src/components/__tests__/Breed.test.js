import React from "react"
import Breed from '../Breed'
import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

const mockBreeds = [
  {
    weight: {
      imperial: "7  -  10",
      metric: "3 - 5"
    },
    id: "abys",
    name: "Abyssinian",
    temperament: "Active, Energetic, Independent, Intelligent, Gentle",
    origin: "Egypt",
    description: "The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.",
    affection_level: 5
  },
  {
    weight: {
      imperial: "7  -  10",
      metric: "3 - 5"
    },
    id: "mock",
    name: "Mock",
    temperament: "Active, Energetic, Independent, Intelligent, Gentle",
    origin: "Egypt",
    description: "The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.",
    affection_level: 5
  }
]

describe("Make sure methods in Breed work as expected", () => {
  let wrapper
  let component
  let props
  let getBreedsSpy
  let getBreedsImage

  beforeEach(() => {
    getBreedsSpy = jest.spyOn(Breed.prototype, "getBreeds").mockImplementation(() => Promise.resolve(mockBreeds))
    getBreedsImage = jest.spyOn(Breed.prototype, "getImage").mockImplementation(() => Promise.resolve("https://www.mockimage.com"))

    props = {
      likedBreeds: [{data: {name: 'cat1'}, image: 'image1'}, {data: {name: 'cat2'}, image: 'image2'}, {data: {name: 'cat3'}, image: 'image3'}],
      dislikedBreeds: [{data: {name: 'cat4'}, image: 'image4'}, {data: {name: 'cat5'}, image: 'image5'}],
      setLikedBreeds: jest.fn(),
      setDislikedBreeds: jest.fn(),
      goToPage: jest.fn()
    };
    configure({ adapter: new Adapter() })
    wrapper = shallow(<Breed {...props}/>)
    component = wrapper.instance()

  })

  afterEach(() => {
    getBreedsSpy.mockClear()
    getBreedsImage.mockClear()
  })

  test('API call shows details on page', async () => {
    expect(wrapper.find("#breedName").text()).toMatch(/^Abyssinian|Mock$/)
    expect(wrapper.find("#breedDescription").text()).toEqual("The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.")
  });

  test("pressing like should call onLikeChange", async () => {
    // expect(component.state.breedImage).toEqual("https://cdn2.thecatapi.com/images/9x1zk_Qdr.jpg")
    const spy = jest
    .spyOn(component, 'onLikeChange')
    .mockImplementation(() => component.setState({breeds: mockBreeds}))

    wrapper.find("#like").simulate("click")

    expect(spy).toHaveBeenCalled();
  })

  test("pressing dislike should call onLikeChange", async () => {
    // expect(component.state.breedImage).toEqual("https://cdn2.thecatapi.com/images/9x1zk_Qdr.jpg")
    const spy = jest
      .spyOn(component, 'onLikeChange')
      .mockImplementation(() => component.setState({breeds: mockBreeds}))

    wrapper.find("#dislike").simulate("click")

    expect(spy).toHaveBeenCalled();
  })

  test("A new breed should be rendered when a breed is liked or disliked", async() => {
    const spy = jest
      .spyOn(component, 'setBreed')
      .mockImplementation(() => ({breeds: mockBreeds}))

      component.onLikeChange("likedBreeds")

      expect(spy).toHaveBeenCalledWith(mockBreeds[1])
  })

  test("liking should add to liked breeds", () => {
    component.setState({currentBreed: {data: {name: 'Ragamuffin'}, image: 'image'}})
    wrapper.find("#like").simulate("click")
    expect(component.state.likedBreeds).toEqual([{data: {name: 'Ragamuffin'}, image: 'image'}])
  })

  test('View choices button takes you to choices component', () => {
    const viewSpy = jest.spyOn(component, "viewChoices")
    wrapper.find("#view-choices").simulate("click")
    expect(viewSpy).toHaveBeenCalled();
  });

})
