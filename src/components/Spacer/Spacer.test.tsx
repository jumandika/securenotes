import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Spacer from './Spacer';
import { Provider } from 'react-redux';
import { store } from '../../store';

test('render correctly', () => {
  const component = (
    <Provider store={store}>
      <Spacer />
    </Provider>
  );

  render(component);

  const spacer = screen.getByTestId('spacer');

  expect(spacer.props.style.height).toBe(0);
  expect(spacer.props.style.width).toBe(0);
});
