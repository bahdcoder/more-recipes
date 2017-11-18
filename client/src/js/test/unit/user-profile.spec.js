/* eslint-disable */

import sinon from 'sinon';
import { mount } from 'enzyme';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import UserProfile from './../../screens/pages/UserProfile/UserProfile';

chai.use(sinonChai);


describe('The UserProfile component', () => {
  it.only('Should call componentWillMount', () => {
    sinon.spy(UserProfile.prototype, 'componentWillMount');
    const wrapper = mount(<UserProfile />);

    expect(UserProfile.prototype.componentWillMount).to.have.been.calledOnce;
  });
});
