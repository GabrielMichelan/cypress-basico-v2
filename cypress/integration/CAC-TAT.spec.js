// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() { /// Roda o comando antes de cada início de teste
        cy.visit('./src/index.html') //Visita essa URL 
    }) 

    


    it('verifica o título da aplicação', function() {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') 
        // Busca o título presente na aba da página aberta, e através do should vai ser validado se está presente
        //o título informado da página
    })


    
    it('preenche os campos obrigatórios e envia o formulário', function() {
        //Declarando variável no Cypress
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'

        //cy.get localiza o elemento que queremos interagir fazendo algo: Clicando, digitando etc... 
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Michelan')
        cy.get('#email').type('michelan2@hotmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0 })
        cy.get('button[type="submit"]').click()
        
        //cy.contains('button', 'Enviar').click() --> Utilizar esse comando ao invés "cy.get('button[type="submit"]').click()" caso necessário
        cy.get('.success').should('be.visible') // Verificação de resultado esperado!
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        //cy.get localiza o elemento que queremos interagir fazendo algo: Clicando, digitando etc... 
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Michelan')
        cy.get('#email').type('michelan2hotmail.com')
        cy.get('#open-text-area').type('teste')

        //cy.contains('button', 'Enviar').click() --> Utilizar esse comando ao invés "cy.get('button[type="submit"]').click()" caso necessário
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible') // Verificação de resultado esperado!
    })


    it('Valor não-númerico campo Telefone', function() {
        cy.get('#phone')  
          .type('abc')               //Campo Telefone ficará vazio, pois está sendo digitado letras e o campo só aceita números.
          .should('have.value', ' ') //Validando se o campo Telefone está vazio pois ele não aceita caracteres apenas aceita números.
    })


    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        
      //cy.get localiza o elemento que queremos interagir fazendo algo: Clicando, digitando etc... 
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Michelan')
        cy.get('#email').type('michelan@2hotmail.com')
        cy.get('#open-text-area').type('teste')
        cy.get('#phone-checkbox').check()
        cy.get('#phone')
          .clear()
          .should('have.value', ' ') //Validando se o campo Telefone está vazio pois no campo não foi digitado nada


        //cy.contains('button', 'Enviar').click() --> Utilizar esse comando ao invés "cy.get('button[type="submit"]').click()" caso necessário
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible') // Verificação de resultado esperado!
    })



    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        //cy.get localiza o elemento que queremos interagir fazendo algo: Clicando, digitando etc... 
        cy.get('#firstName').type('Gabriel').should('have.value', 'Gabriel').clear().should('have.value', '')
        cy.get('#lastName').type('Michelan').should('have.value', 'Michelan').clear().should('have.value', '')
        cy.get('#email').type('michelan2@hotmail.com').should('have.value', 'michelan2@hotmail.com').clear().should('have.value', '')
        cy.get('#phone').type('994212998').should('have.value', '994212998').clear().should('have.value', '')   
        
      })


    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        //cy.get localiza o elemento que queremos interagir fazendo algo: Clicando, digitando etc... 
        cy.get('button[type="submit"]').click()

        //cy.contains('button', 'Enviar').click() --> Utilizar esse comando ao invés "cy.get('button[type="submit"]').click()" caso necessário
        cy.get('.error').should('be.visible') // Verificação de resultado esperado!
        
      })


    it('Envia o formuário com sucesso usando um comando customizado', function() {
        
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible') // Verificação de resultado esperado!
     
    })


    it('Seleciona um produto (YouTube) por seu texto', function() {
        
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
     
    })


    it('Seleciona um produto (Mentoria) por seu valor (value)', function() {
        
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
     
    })

    it('Seleciona um produto (Blog) por seu índice', function() {
        
        cy.get('#product').select(1).should('have.value', 'blog')
     
    })

    it('Marca o tipo de atendimento "Feedback"', function() {
        
        cy.get('input[value="feedback"]').check().should('have.value', 'feedback')
     
    })

    it('marca cada tipo de atendimento', function() {
        
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).check().should('be.checked')
          })
     
    })

    it('Marca ambos checkboxes, depois desmarca o último', function() {
        
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')
     
    })


    it('Seleciona um arquivo da pasta fixtures', function() {
        
        cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
     
    })

  })


  // Bloco Describe é suíte de teste!! 
  // Bloco it é o caso de teste!! 