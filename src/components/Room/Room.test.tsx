import React from 'react';
import { shallow } from 'enzyme';

import Room from './Room';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
jest.mock('../../hooks/useChatContext/useChatContext');
jest.mock('../../hooks/useVideoContext/useVideoContext');

const mockUseVideoContext = useVideoContext as jest.Mock<any>;

const mockToggleChatWindow = jest.fn();
const mockOpenBackgroundSelection = jest.fn();
mockUseVideoContext.mockImplementation(() => ({ setIsBackgroundSelectionOpen: mockOpenBackgroundSelection }));

describe('the Room component', () => {
  it('should render correctly when the chat window and background selection windows are closed', () => {
    const wrapper = shallow(<Room />);
    expect(wrapper.prop('className')).not.toContain('rightDrawerOpen');
  });

  it('should render correctly with chat window open', () => {
    const wrapper = shallow(<Room />);
    expect(wrapper.prop('className')).toContain('rightDrawerOpen');
  });

  it('should render correctly with the background selection window open', () => {
    mockUseVideoContext.mockImplementationOnce(() => ({ isBackgroundSelectionOpen: true }));
    const wrapper = shallow(<Room />);
    expect(wrapper.prop('className')).toContain('rightDrawerOpen');
  });
});
