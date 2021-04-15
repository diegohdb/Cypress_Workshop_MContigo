/// <reference types="cypress" /> 

const faker = require('faker')

describe('Sign Up', () => {
    it('Validate a sucessful new user registration', () => {
        cy.visit('http://automationpractice.com/index.php')
        cy.get('.login').click()
        cy.get('#email_create').type(faker.internet.email())
        cy.get('#SubmitCreate').click()
        cy.contains('Your personal information')

        cy.get('#id_gender1').check()
        cy.get('#customer_firstname').type(faker.name.firstName())
        cy.get('#customer_lastname').type(faker.name.lastName())
        cy.get('#passwd').type(faker.internet.password())
        cy.get('#days').select('16')
        cy.get('#months').select('April')
        cy.get('#years').select('2000')

        cy.get('#address1').type(faker.address.streetAddress())
        cy.get('#city').type(faker.address.city())
        cy.get('#id_state').select('Indiana')
        cy.get('#postcode').type('12345')
        cy.get('#phone_mobile').type(faker.phone.phoneNumberFormat())
        cy.get('#submitAccount').click()
        cy.contains('Welcome to your account. Here you can manage all of your personal information and orders.')

    });
});

describe('Login', () => {
    it('Successful login', () => {
        cy.visit('http://automationpractice.com/index.php?controller=authentication&back=my-account')
        cy.get('#email').type('test@tester.com')
        cy.get('#passwd').type('123test')
        cy.get('#SubmitLogin').click()
        cy.contains('Welcome to your account. Here you can manage all of your personal information and orders.')
        cy.url().should('equal', 'http://automationpractice.com/index.php?controller=my-account')                
    });

    it('Unsuccessful login', () => {
        cy.visit('http://automationpractice.com/index.php?controller=authentication&back=my-account')
        cy.get('#email').type('email@test.com')
        cy.get('#passwd').type('123test')
        cy.get('#SubmitLogin').click()
        cy.contains('Authentication failed.')
    });
});

describe('Shopping', () => {
    it.only('Add a blouse to chart', () => {
        cy.visit('http://automationpractice.com/index.php?controller=authentication&back=my-account')
        cy.get('#email').type('test@tester.com')
        cy.get('#passwd').type('123test')
        cy.get('#SubmitLogin').click()
        cy.contains('Welcome to your account. Here you can manage all of your personal information and orders.')
        
        cy.get('a[title="My Store"]').click()
        cy.get('#search_query_top').type('Blouse')
        cy.get('.button-search').click()
        cy.get('.heading-counter').should('not.equal', '0 results have been found.') 
        cy.get('.product_img_link').click()
        cy.get('#add_to_cart').click()
        cy.contains('Product successfully added to your shopping cart')
        cy.get('#layer_cart_product_title').contains('Blouse')
    });
});
