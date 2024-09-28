Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {  // Criando comando customizado
    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Michelan')
    cy.get('#email').type('michelan2@hotmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
} )
