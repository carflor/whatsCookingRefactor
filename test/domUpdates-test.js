const chai = require('chai');
import { expect } from 'chai';
import domUpdates from '../src/domUpdates';
import users from '../src/data/users-data'

const spies = require('chai-spies'); 
chai.use(spies)

describe.only('DOM Manipulation', function () {
  beforeEach(function() {
    global.document = {};
    chai.spy.on(document, "querySelector", () => {});
  });

  it.skip('should call createUserDisplay', function() {
    domUpdates.createUserDisplay(users[0]);
    expect(document.querySelector).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called.with(".banner-image");
  })

  it('should call showWelcomeBanner', function() {
    domUpdates.showWelcomeBanner();
    expect(document.querySelector).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called.with(".welcome-msg");
  })
})