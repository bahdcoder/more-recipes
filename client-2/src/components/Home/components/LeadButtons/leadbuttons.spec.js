import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import LeadButtons from './index';

// Due to lack of knowledge on how to test conditionally rendered react components using jest snapshots, we going manual. testing all things 

it('Should mount SignedInButtons if isAuthenticated prop is true', () => {
  const authenticatedTree = renderer.create(
    <MemoryRouter>
      <LeadButtons isAuthenticated={true}/>
    </MemoryRouter>
  ).toJSON();



  const leadButtons = authenticatedTree.children[0].children;

  expect(leadButtons[0].children[0]).toBe('Create recipe');
  expect(leadButtons[0].props.href).toBe('/recipes/create');

  expect(leadButtons[1].children[0]).toBe('Manage your recipes');
  expect(leadButtons[1].props.href).toBe('/user/recipes');
});

it('Should mount SignedOutButtons if isAuthenticated prop is false', () => {
  const authenticatedTree = renderer.create(
    <MemoryRouter>
      <LeadButtons isAuthenticated={false}/>
    </MemoryRouter>
  ).toJSON();



  const leadButtons = authenticatedTree.children[0].children;

  expect(leadButtons[0].children[0]).toBe('Sign in');
  expect(leadButtons[1].children[0]).toBe('Join now');
});
