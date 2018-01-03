import React from 'react';
import renderer from 'react-test-renderer';

import ValidationSpanError from './index';

describe('The ValidationSpanError', () => {
  it('Should render an error in a span', () => {
    const error = 'The email is required.';
    const tree = renderer.create(<ValidationSpanError error={error} />).toJSON();

    expect(tree.type).toEqual('span');
    expect(tree.children.length).toEqual(1);
    expect(tree.children[0].type).toEqual('small');
    expect(tree.children[0].children.length).toEqual(1);
    expect(tree.children[0].children[0]).toEqual(error);
    expect(tree).toMatchSnapshot();
  });
});
