const chai = require('chai');
import { expect } from 'chai';
import domUpdates from '../src/domUpdates';
import ApiFetch from '../src/ApiFetch'
import users from '../src/data/users-data'
import ingredients from '../src/data/ingredient-data'

// import { generateUser } from '../src/scripts'

// // import User from '../src/user'
// import script from '../src/scripts'

const spies = require('chai-spies'); 
chai.use(spies)


// describe.skip('API fetch', function() {
  
//   beforeEach(function() {
//     // api 
//     // window.fetch = {};
//     let domUpdates = {}
//     chai.spy.on(fetch, ['getUsersData'], () => {})
//     // chai.spy.on(document, ['createUserDisplay'], () => {})
//   })
  
//   it.skip('should be a pain in the butt', function() {
//     // setup
//     let api = new ApiFetch()
//     api.getUsersData()
//     // execute
//     // domUpdates.createUserDisplay()
//     expect(window.fetch).to.have.been.called(1)
//     expect(window.fetch).to.have.been.called.with("https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData")
//     // expect(global.domUpdates.createUserDisplay).to.have.been.called(1)
//   })
// })

describe.only('DOM Manipulation', function () {
  beforeEach(function() {
    global.domUpdates = {};
    // chai.spy.on(document, [generateUser, createCards], () => {});
    chai.spy.on(domUpdates, "createUserDisplay", () => {});
  });

  it('should call createUserDisplay', function() {
    domUpdates.createUserDisplay(users);
    // document.generateUser(users, ingredients);
    
    expect(domUpdates.createUserDisplay).to.have.been.called(1);
    expect(domUpdates.createUserDisplay).to.have.been.called.with(users)
  })
})