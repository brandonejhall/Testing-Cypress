describe('Calculator', () => {
  beforeEach(() => {
    cy.visit('./index.html') 
  })

  it('should return 3 for 1 + 2', () => {
    cy.get('#x').type('1')
    cy.get('#y').type('2')
    cy.get('#add').click()
    cy.get('#result').should('have.text', '3')
  })
  it('should calculate zero for invalid x value', () => {
    cy.get('#x').type('hello');
    cy.get('#add').click();
    cy.get('#result').should('have.text', 'ERROR');
  });

  it('should have no value set by default', () => {
    cy.get('#x').should('have.value', '');
    cy.get('#y').should('have.value', '');
  });

  it('should calculate zero for invalid y value', () => {
    cy.get('#y').type('hello');
    cy.get('#add').click();
    cy.get('#result').should('have.text', 'ERROR');
  });

  it('should return a value that is equal or less than zero if both values are equal or less than zero', () => {
    cy.get('#x').type('-1');
    cy.get('#y').type('-2');
    cy.get('#add').click();
    cy.get('#result').should('have.text', '-3');
  });

  it('should return a value that is positive if zero added to a positive integer', () => {
    cy.get('#x').type('2');
    cy.get('#y').type('0');
    cy.get('#add').click();
    cy.get('#result').should('have.text', '2');
    cy.get('#result').should('not.have.text', '-');
  });

  it('should not overflow when adding two very large integers', () => {
    const maxint = Number.MAX_SAFE_INTEGER;
    cy.get('#x').type(maxint.toString());
    cy.get('#y').type(maxint.toString());
    cy.get('#add').click();
    const expected = maxint + maxint;
    cy.get('#result').should('have.text', expected.toString());
  });

  it('should return a float when at least one of the numbers entered are floats', () => {
    cy.get('#x').type('1.5');
    cy.get('#y').type('2');
    cy.get('#add').click();
    cy.get('#result').then(($result) => {
      expect(Number.isInteger(parseFloat($result.text()))).to.be.false;
    });
  });

  it('should return 3.5 when 2 + 1.5 is added', () => {
    cy.get('#x').type('1.5');
    cy.get('#y').type('2');
    cy.get('#add').click();
    cy.get('#result').should('have.text', '3.5');
  });

  it('should return 1 for 2 - 1', function() {
    cy.get('#x').type('2');
    cy.get('#y').type('1');
    cy.get('#subtract').click();
    cy.get('#result').should('have.text', '1');
  });

  it('should calculate zero for invalid x value', function() {
    cy.get('#x').type('hello');
    cy.get('#subtract').click();
    cy.get('#result').should('have.text', 'ERROR');
  });

  it('should have no value set by default', function() {
    cy.get('#x').should('have.value', '');
    cy.get('#y').should('have.value', '');
  });

  it('should calculate zero for invalid y value', function() {
    cy.get('#y').type('hello');
    cy.get('#subtract').click();
    cy.get('#result').should('have.text', 'ERROR');
  });

  it('should return a postive value if a larger number subtracts a smaller number', function(){
    cy.get('#x').type('-1');
    cy.get('#y').type('-2');
    cy.get('#subtract').click();
    cy.get('#result').invoke('text').then(parseFloat).should('be.gte', 0);
  });

  it('should return a value that is positive if zero added to a positive integer ', function(){
    cy.get('#x').type('2');
    cy.get('#y').type('0');
    cy.get('#subtract').click();
    cy.get('#result').should('have.text', '2');
    cy.get('#result').invoke('text').then(parseFloat).should('be.gte', 0);
  });

  it('should not overflow when subtacting two very large integers', function() {
    const maxint = Number.MAX_SAFE_INTEGER;
    cy.get('#x').type(maxint.toString());
    cy.get('#y').type(maxint.toString());
    cy.get('#subtract').click();
    const expected = maxint - maxint;
    cy.get('#result').invoke('text').then(parseFloat).should('be.eq', expected);
  });

  it('should return a float when atleast one of the the numbers entered are floats', function(){
    cy.get('#x').type('1.5');
    cy.get('#y').type('2');
    cy.get('#subtract').click();
    cy.get('#result').invoke('text').then(Number.isInteger).should('be.eq', false);
  })

  it('should return a 0.5 when 2 - 1.5 ', function(){
    cy.get('#x').type('2');
    cy.get('#y').type('1.5');
    cy.get('#subtract').click();
    cy.get('#result').invoke('text').then(parseFloat).should('be.eq', 0.5);
  })


  it('should return a 4 when 8 / 2 ', function(){
    cy.get('#x').type('8');
    cy.get('#y').type('2');
    cy.get('#division').click();
    cy.get('#result').invoke('text').then(parseFloat).should('be.eq', 4);
  })

  it('should return a 1.5 when 3 / 2 is divided', function(){
    cy.get('#x').type('3');
    cy.get('#y').type('2');
    cy.get('#division').click();
    cy.get('#result').should('have.text', '1.5');
  });

  it('should return a 4 when 12 / 3 is divided', function(){
    cy.get('#x').type('12');
    cy.get('#y').type('3');
    cy.get('#division').click();
    cy.get('#result').should('have.text', '4');
  });

  it('should return a -4 when -12 / 3 is divided', function(){
    cy.get('#x').type('-12');
    cy.get('#y').type('3');
    cy.get('#division').click();
    cy.get('#result').should('have.text', '-4');
  });

  it('should return an error when dividing by zero', function(){
    cy.get('#x').type('8');
    cy.get('#y').type('0');
    cy.get('#division').click();
    cy.get('#result').should('have.text', 'ERROR');
  });

  it('should return an error when dividing a number by zero', function(){
    cy.get('#x').type('10');
    cy.get('#y').type('0');
    cy.get('#division').click();
    cy.get('#result').should('have.text', 'ERROR');
  });


  it('should return ERROR when square rooting a negative number', () => {
    cy.get('#x').type('-4');
    cy.get('#square-root').click();
    cy.get('#result').should('have.text', 'ERROR');
  });
  
  it('should return 0 when square rooting 0', () => {
    cy.get('#x').type('0');
    cy.get('#square-root').click();
    cy.get('#result').should('have.text', '0');
  });
  
  it('should return 2 when square rooting 4', () => {
    cy.get('#x').type('4');
    cy.get('#square-root').click();
    cy.get('#result').should('have.text', '2');
  });
  
  it('should return ERROR when square rooting a non-numeric value', () => {
    cy.get('#x').type('abc');
    cy.get('#square-root').click();
    cy.get('#result').should('have.text', 'ERROR');
  });
  
})
