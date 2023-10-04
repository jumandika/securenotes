import React from 'react';
import { render, screen } from '@testing-library/react-native';
import NoteCard from './NoteCard';
import { Provider } from 'react-redux';
import { store } from '../../store';

test('render correctly', () => {
  const component = (
    <Provider store={store}>
      <NoteCard />
    </Provider>
  );

  render(component);

  const noteCard = screen.getByTestId('note-card');

  expect(noteCard.props.item.timeStamp).toBe(0);
});
