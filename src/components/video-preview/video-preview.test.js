import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import VideoPreview from "./video-preview";

import mockData from "../../mocks/mock-data";

Enzyme.configure({adapter: new Adapter()});

it(`VideoPlayer renders correctly`, () => {
  const tree = shallow(<VideoPreview
    previewImage={mockData[0].previewImage}
    previewVideoLink={mockData[0].previewVideoLink}
  />);

  expect(toJson(tree)).toMatchSnapshot();
});

