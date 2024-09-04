// Home.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';
import SearchBar from '../../components/GenericSearchBar/SearchBar';

jest.mock('../../components/GenericSearchBar/SearchBar', () => ({
  __esModule: true,
  default: ({ onSearch }) => <input placeholder="Search..." onChange={e => onSearch(e.target.value)} />
}));

test('renders greeting message', () => {
  render(<Home />);
  expect(screen.getByText('Hello, BITS')).toBeInTheDocument();
});

test('renders SearchBar component', () => {
  render(<Home />);
  expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
});

test('renders Vehicles card', () => {
  render(<Home />);
  expect(screen.getByText('Vehicles')).toBeInTheDocument();
  expect(screen.getByText('Manage your vehicles inventory and details.')).toBeInTheDocument();
});

test('renders Spare Parts card', () => {
  render(<Home />);
  expect(screen.getByText('Spare Parts')).toBeInTheDocument();
  expect(screen.getByText('Keep track of all available spare parts.')).toBeInTheDocument();
});

test('renders Profile card', () => {
  render(<Home />);
  expect(screen.getByText('Profile')).toBeInTheDocument();
  expect(screen.getByText('Update your personal and account information.')).toBeInTheDocument();
});
