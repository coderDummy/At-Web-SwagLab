require('cypress-xpath')

describe('Checkout Product - Positive', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
    cy.get('#user-name')
      .type('standard_user')
      .should('have.value', 'standard_user')

    cy.get('#password')
      .type('secret_sauce')
      .should('have.value', 'secret_sauce')

    cy.get('#login-button').click()

  
  })

  it('Checkout product until step one', () => {

    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('.shopping_cart_link').click()
    cy.get('#checkout').click()

    cy.get('#first-name').should('be.visible')
    cy.get('#last-name').should('be.visible')
    cy.get('#postal-code').should('be.visible')

    cy.get('#continue').should('be.visible')
    cy.get('#cancel').should('be.visible')

    cy.get('span.title').should('have.text','Checkout: Your Information');
      
  })

  it('Cancel checkout product in step one and back to cart', () => {

    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('.shopping_cart_link').click()
    cy.get('#checkout').click()

    cy.get('#cancel').click();

    cy.url().should('eq', 'https://www.saucedemo.com/cart.html')

      
  })

  it('Checkout product until step two', () => {

    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('.shopping_cart_link').click()
    cy.get('#checkout').click()

    cy.get('#first-name').type('Jhon').should('have.value', 'Jhon')
    cy.get('#last-name').type('Due').should('have.value', 'Due')
    cy.get('#postal-code').type('14045').should('have.value', '14045')

    cy.get('#continue').click()

    cy.get('span.title').should('have.text','Checkout: Overview');
    cy.get('.cart_quantity_label').should('have.text','QTY');
    cy.get('.cart_desc_label').should('have.text','DESCRIPTION');

    cy.get('.cart_item').should('be.visible');
    cy.get('.summary_info').should('be.visible');
      
  })

  it('Cancel checkout product in step two', () => {

    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('.shopping_cart_link').click()
    cy.get('#checkout').click()

    cy.get('#first-name').type('Jhon').should('have.value', 'Jhon')
    cy.get('#last-name').type('Due').should('have.value', 'Due')
    cy.get('#postal-code').type('14045').should('have.value', '14045')

    cy.get('#continue').click()
    cy.get('#cancel').click();

    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')

  })

  it('Checkout product until succes ', () => {

    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('.shopping_cart_link').click()
    cy.get('#checkout').click()

    cy.get('#first-name').type('Jhon').should('have.value', 'Jhon')
    cy.get('#last-name').type('Due').should('have.value', 'Due')
    cy.get('#postal-code').type('14045').should('have.value', '14045')

    cy.get('#continue').click()
    cy.get('#finish').click()

    cy.get('.complete-header').should('have.text','THANK YOU FOR YOUR ORDER');
    cy.get('.complete-text').should('have.text','Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    cy.get('.pony_express').should('be.visible')
      
  })

  it('Checkout 5 product until succes ', () => {

    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('#add-to-cart-sauce-labs-bike-light').click()
    cy.get('#add-to-cart-sauce-labs-onesie').click()
    cy.get('#add-to-cart-sauce-labs-bolt-t-shirt').click()
    cy.get('#add-to-cart-sauce-labs-fleece-jacket').click()

    
    cy.get('.shopping_cart_link').click()
    cy.get('#checkout').click()

    cy.get('#first-name').type('Jhon').should('have.value', 'Jhon')
    cy.get('#last-name').type('Due').should('have.value', 'Due')
    cy.get('#postal-code').type('14045').should('have.value', '14045')

    cy.get('#continue').click()
    cy.get('#finish').click()

    cy.get('.complete-header').should('have.text','THANK YOU FOR YOUR ORDER');
    cy.get('.complete-text').should('have.text','Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    cy.get('.pony_express').should('be.visible')
      
  })

})


describe('Checkout Product - Negative', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
    cy.get('#user-name')
      .type('standard_user')
      .should('have.value', 'standard_user')

    cy.get('#password')
      .type('secret_sauce')
      .should('have.value', 'secret_sauce')

    cy.get('#login-button').click()
  
  })

  it('Checkout product in step one fill input first name is blank', () => {

    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('.shopping_cart_link').click()
    cy.get('#checkout').click()

    cy.get('#continue').click();
    cy.get('.error-message-container').should('be.visible')
    cy.xpath('//*[@id="checkout_info_container"]/div/form/div[1]/div[4]/h3').should('have.text','Error: First Name is required');
      
  })

  it('Checkout product in step one fill input last name is blank', () => {

    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('.shopping_cart_link').click()
    cy.get('#checkout').click()

    cy.get('#first-name').type('Jhon').should('have.value', 'Jhon')
    cy.get('#continue').click();

    cy.get('.error-message-container').should('be.visible')
    cy.xpath('//*[@id="checkout_info_container"]/div/form/div[1]/div[4]/h3').should('have.text','Error: Last Name is required');
      
  })

  it('Checkout product in step one fill input post code/ zip is blank', () => {

    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('.shopping_cart_link').click()
    cy.get('#checkout').click()

    cy.get('#first-name').type('Jhon').should('have.value', 'Jhon')
    cy.get('#last-name').type('Due').should('have.value', 'Due')
    cy.get('#continue').click();

    cy.get('.error-message-container').should('be.visible')
    cy.xpath('//*[@id="checkout_info_container"]/div/form/div[1]/div[4]/h3').should('have.text','Error: Postal Code is required');
      
  })

  it('Checkout product in step one fill input first name and last name with number and unique character', () => {

    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('.shopping_cart_link').click()
    cy.get('#checkout').click()

    cy.get('#first-name').type('123456!@#$%^&').should('have.value', '123456!@#$%^&')
    cy.get('#last-name').type('123456!@#$%^&').should('have.value', '123456!@#$%^&')
    cy.get('#postal-code').type('14045').should('have.value', '14045')
    cy.get('#continue').click();

      
  })

  it('Checkout product in step one fill input zip with alphabet and unique character', () => {

    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('.shopping_cart_link').click()
    cy.get('#checkout').click()

    cy.get('#first-name').type('Jhon').should('have.value', 'Jhon')
    cy.get('#last-name').type('Due').should('have.value', 'Due')
    cy.get('#postal-code').type('ABSRT!@#$').should('have.value', 'ABSRT!@#$')
    cy.get('#continue').click();

      
  })

  it('Checkout without product until succes ', () => {

    cy.get('.shopping_cart_link').click()
    cy.get('#checkout').click()

    cy.get('#first-name').type('Jhon').should('have.value', 'Jhon')
    cy.get('#last-name').type('Due').should('have.value', 'Due')
    cy.get('#postal-code').type('14045').should('have.value', '14045')

    cy.get('#continue').click()
    cy.get('#finish').click()

    cy.get('.complete-header').should('have.text','THANK YOU FOR YOUR ORDER');
    cy.get('.complete-text').should('have.text','Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    cy.get('.pony_express').should('be.visible')
      
  })


})


