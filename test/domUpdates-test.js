import { expect } from 'chai';
import domUpdates from '../src/domUpdates';
import ApiFetch from '../src/ApiFetch'
import chai from 'chai';
// import User from '../src/user'
import script from '../src/scripts'

const spies = require('chai-spies'); 
chai.use(spies)

describe.skip('API fetch', function() {
  
  beforeEach(function() {
    // api 
    // window.fetch = {};
    let domUpdates = {}
    chai.spy.on(fetch, ['getUsersData'], () => {})
    // chai.spy.on(document, ['createUserDisplay'], () => {})
  })
  
  it.skip('should be a pain in the butt', function() {
    // setup
    let api = new ApiFetch()
    api.getUsersData()
    // execute
    // domUpdates.createUserDisplay()
    expect(window.fetch).to.have.been.called(1)
    expect(window.fetch).to.have.been.called.with("https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData")
    // expect(global.domUpdates.createUserDisplay).to.have.been.called(1)
  })
})

describe('DOM Manipulation', function () {
  
  beforeEach(function() {
    chai.spy.on(domUpdates, [addToDom, createShortRecipeName], () => {});
  });

  it('should call addToDom', function() {
    console.log(script.generateUsers)
    // domUpdates.addToDom() {
    
    expect(domUpdates.addToDom).to.have.been.called(1);
  })
})