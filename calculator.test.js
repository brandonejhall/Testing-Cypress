/*
 * Unit tests for lib/calculator.js
 */


var updateMemory = function(operation){	
  memoryLastResult.push([operation, parseFloat(document.getElementById('result').innerHTML)])
  //console.log(memoryLastResult);
}

var retrieveMemory = function(){
  //console.log(memoryLastResult)
  if(memoryLastResult != []){
  const [operation, result] = memoryLastResult[memoryLastResult.length - 1];
  document.getElementById('y').value = result;
  updateMemory('memory')
  if (memoryLastResult.length >= 2)
  {
    if (memoryLastResult[memoryLastResult.length - 1][0] == 'memory' & memoryLastResult[memoryLastResult.length - 2][0]=='memory'){
      memoryLastResult = []
    }
  }
  }
}

describe('Calculator', function() {// what a describe does it is used to block of a suit of tests

  // inject the HTML fixture for the tests
  beforeEach(function() {// this represents before each of the test run we want to do something in this scenario we create a var varaible
    
    var fixture = 
      '<div id="fixture"><input id="x" type="text">' + 
      '<input id="y" type="text">' + 
      '<input id="add" type="button" value="Add Numbers">' +
      '<input id="subtract" type="button" value="Subtract Numbers">' +
      '<input id="division" type="button" value="Divide Numbers">'+
      '<input id="multiply" type="button" value="Multiply Numbers">'+
      '<input id="square-root" type="button" value="Square-Root of Numbers ">'+
      '<input id="memory" type="button" value="Memory ">'+
      '<input id="percent" type="button" value="Percent ">'+
      '<input id="memoryMinus" type="button" value="Memory Minus">' +
      '<input id="memoryPlus" type="button" value="Memory Plus">'+
      '<input id="on/off" type="button" value="On Off Clear">'+
      '<input id="equal" type="button" value="Equal">'+
      '<br>'+
      'Result: <span id="result" ></span>'+
      '<br>' +
      'Memory: <span id="memoryList">[]</span></div>'
    // inject html to the body of dom
    document.body.insertAdjacentHTML(
      'afterbegin', 
      fixture);
      
  });

  // remove the html fixture from the DOM
  afterEach(function() {
    document.body.removeChild(document.getElementById('fixture'));
  });



  // call the init function of calculator to register DOM elements
  beforeEach(function() {
    window.calculator.init();
    document.getElementById('memoryList').innerHTML = '[]'
    
  });

  afterEach(function() {
    document.getElementById('memoryList').innerHTML = '[]'
  })

  it('should return 3 for 1 + 2', function() {
    document.getElementById('x').value = 1;
    document.getElementById('y').value = 2;
    document.getElementById('add').click();
    expect(document.getElementById('result').innerHTML).toBe('3');
  });

  it('should calculate zero for invalid x value', function() {
    document.getElementById('x').value = "hello";
    document.getElementById('add').click();
    expect(document.getElementById('result').innerHTML).toBe('ERROR');
  });

  it('should have no value set by default', function() {
    expect(document.getElementById('x').value).toBe('');
    expect(document.getElementById('y').value).toBe('');
  });

  it('should calculate zero for invalid y value', function() {
    document.getElementById('y').value = "hello";
    document.getElementById('add').click();
    expect(document.getElementById('result').innerHTML).toBe('ERROR');
  });

  it('should return a value that is equal or less than zero if both values are equal or less than zero', function(){
    document.getElementById('x').value = -1;
    document.getElementById('y').value = -2;
    document.getElementById('add').click();
    expect(parseInt(document.getElementById('result').innerHTML)).toBeLessThanOrEqual(0);
  });

  it('should return a value that is positive if zero added to a positive integer ', function(){
    document.getElementById('x').value = 2;
    document.getElementById('y').value = 0;
    document.getElementById('add').click();
    expect(document.getElementById('result').innerHTML).toBe('2')
    expect(parseInt(document.getElementById('result').innerHTML)).toBeGreaterThanOrEqual(0);
  });

  it('should not overflow when adding two very large integers', function() {
    const maxint = Number.MAX_SAFE_INTEGER;
    document.getElementById('x').value = maxint.toString();
    document.getElementById('y').value = maxint.toString();
    document.getElementById('add').click();
    const expected = maxint + maxint;
    expect(Number(document.getElementById('result').innerHTML)).toBe(expected);
  });

  
  it('should return a float when atleast one of the the numbers entered are floats', function(){
    const maxint = Number.MAX_SAFE_INTEGER;
    document.getElementById('x').value = '1.5';
    document.getElementById('y').value = '2';
    document.getElementById('add').click();
    expect(Number.isInteger(document.getElementById('result').innerHTML)).toBe(false);
  })

  it('should return a 3.5 when 2 + 1.5 is added', function(){
    document.getElementById('x').value = '1.5';
    document.getElementById('y').value = '2';
    document.getElementById('add').click();
    expect(parseFloat(document.getElementById('result').innerHTML)).toBe(3.5)
  })

  //SUBTRACT

  it('should return 1 for 2 - 1', function() {
    document.getElementById('x').value = 2;
    document.getElementById('y').value = 1;
    document.getElementById('subtract').click();
    expect(document.getElementById('result').innerHTML).toBe('1');
  });

  it('should calculate zero for invalid x value', function() {
    document.getElementById('x').value = "hello";
    document.getElementById('subtract').click();
    expect(document.getElementById('result').innerHTML).toBe('ERROR');
  });

  it('should have no value set by default', function() {
    expect(document.getElementById('x').value).toBe('');
    expect(document.getElementById('y').value).toBe('');
  });

  it('should calculate zero for invalid y value', function() {
    document.getElementById('y').value = "hello";
    document.getElementById('subtract').click();
    expect(document.getElementById('result').innerHTML).toBe('ERROR');
  });

  it('should return a postive value if a larger number subtracts a smaller number', function(){
    document.getElementById('x').value = -1;
    document.getElementById('y').value = -2;
    document.getElementById('subtract').click();
    expect(parseInt(document.getElementById('result').innerHTML)).toBeGreaterThanOrEqual(0);
  });

  it('should return a value that is positive if zero added to a positive integer ', function(){
    document.getElementById('x').value = 2;
    document.getElementById('y').value = 0;
    document.getElementById('subtract').click();
    expect(document.getElementById('result').innerHTML).toBe('2')
    expect(parseInt(document.getElementById('result').innerHTML)).toBeGreaterThanOrEqual(0);
  });

  it('should not overflow when subtacting two very large integers', function() {
    const maxint = Number.MAX_SAFE_INTEGER;
    document.getElementById('x').value = maxint.toString();
    document.getElementById('y').value = maxint.toString();
    document.getElementById('subtract').click();
    const expected = maxint - maxint;
    expect(Number(document.getElementById('result').innerHTML)).toBe(expected);
  });

  
  it('should return a float when atleast one of the the numbers entered are floats', function(){
    document.getElementById('x').value = '1.5';
    document.getElementById('y').value = '2';
    document.getElementById('subtract').click();
    expect(Number.isInteger(document.getElementById('result').innerHTML)).toBe(false);
  })

  it('should return a 0.5 when 2 - 1.5 ', function(){
    document.getElementById('x').value = '2';
    document.getElementById('y').value = '1.5';
    document.getElementById('subtract').click();
    expect(parseFloat(document.getElementById('result').innerHTML)).toBe(0.5)
  })

  //Division
  it('should return a 4 when 8 / 2 ', function(){
    document.getElementById('x').value = '8';
    document.getElementById('y').value = '2';
    document.getElementById('division').click();
    expect(parseFloat(document.getElementById('result').innerHTML)).toBe(4)
  })

  it('should return a 1.5 when 3 / 2 is divided', function(){
    document.getElementById('x').value = '3';
    document.getElementById('y').value = '2';
    document.getElementById('division').click();
    expect(document.getElementById('result').innerHTML).toBe('1.5');
  });
  
  it('should return a -4 when -12 / 3 is divided', function(){
    document.getElementById('x').value = '-12';
    document.getElementById('y').value = '3';
    document.getElementById('division').click();
    expect(document.getElementById('result').innerHTML).toBe('-4');
  });
  
  it('should return an error when dividing by zero', function(){
    document.getElementById('x').value = '8';
    document.getElementById('y').value = '0';
    document.getElementById('division').click();
    expect(document.getElementById('result').innerHTML).toBe('ERROR');
  });
  
  it('should return Infinity when dividing a number by zero', function(){
    document.getElementById('x').value = '10';
    document.getElementById('y').value = '0';
    document.getElementById('division').click();
    expect(document.getElementById('result').innerHTML).toBe('ERROR');
  });




// square root
it('should return ERROR when square rooting a negative number', function(){
  document.getElementById('x').value = '-4';
  document.getElementById('square-root').click();
  expect(document.getElementById('result').innerHTML).toBe('ERROR');
});

it('should return 0 when square rooting 0', function(){
  document.getElementById('x').value = '0';
  document.getElementById('square-root').click();
  expect(parseFloat(document.getElementById('result').innerHTML)).toBe(0);
});

it('should return 2 when square rooting 4', function(){
  document.getElementById('x').value = '4';
  document.getElementById('square-root').click();
  expect(parseFloat(document.getElementById('result').innerHTML)).toBe(2);
});

it('should return ERROR when square rooting a non-numeric value', function(){
  document.getElementById('x').value = 'abc';
  document.getElementById('square-root').click();
  expect(document.getElementById('result').innerHTML).toBe('ERROR');
});


//percent

it('should return 0.1 when 10 is input', function(){
  document.getElementById('x').value = '10';
  document.getElementById('percent').click();
  expect(parseFloat(document.getElementById('result').innerHTML)).toBe(0.1);
});

it('should return 0.5 when 50 is input', function(){
  document.getElementById('x').value = '50';
  document.getElementById('percent').click();
  expect(parseFloat(document.getElementById('result').innerHTML)).toBe(0.5);
});

it('should return 0.005 when 0.5 is input', function(){
  document.getElementById('x').value = '0.5';
  document.getElementById('percent').click();
  expect(parseFloat(document.getElementById('result').innerHTML)).toBe(0.005);
});

it('should return "ERROR" when input is not a number', function(){
  document.getElementById('x').value = 'abc';
  document.getElementById('percent').click();
  expect(document.getElementById('result').innerHTML).toBe('ERROR');
});

//onoff

it('should set the value of x and y to empty string', function(){
  document.getElementById('x').value = '10';
  document.getElementById('y').value = '5';
  document.getElementById('result').innerHTML = '15';
  document.getElementById('on/off').click();
  expect(document.getElementById('x').value).toEqual('');
  expect(document.getElementById('y').value).toEqual('');
});

it('should set the innerHTML of result to empty string', function(){
  document.getElementById('x').value = '10';
  document.getElementById('y').value = '5';
  document.getElementById('result').innerHTML = '15';
  document.getElementById('on/off').click();
  expect(document.getElementById('result').innerHTML).toEqual('');
});


it('should clear all inputs and memory when called', function(){
  memoryLastResult = []
  document.getElementById('x').value = '10';
  document.getElementById('y').value = '5';
  document.getElementById('add').click();
  document.getElementById('on/off').click();
  expect(document.getElementById('x').value).toEqual('');
  expect(document.getElementById('y').value).toEqual('');
  expect(document.getElementById('result').innerHTML).toEqual('');
  expect(memoryLastResult).toEqual([]);
});


//retrieveMemory

it('should retrieve last memory result if available and update memory', function(){
  document.getElementById('x').value = '10';
  document.getElementById('y').value = '5';
  document.getElementById('add').click();
  document.getElementById('memory').click();
  expect(document.getElementById('y').value).toEqual('15');
});





it('should clear memoryLastResult if last two memory entries are memory', function(){
  document.getElementById('x').value = '10';
  document.getElementById('y').value = '5';
  document.getElementById('add').click();
  document.getElementById('memory').click();
  document.getElementById('memory').click();
  expect(document.getElementById('memoryList').innerHTML).toBe('[]')
  
});

// multiply

it('should return correct multiplication of two positive integers', function() {
  document.getElementById('x').value = '4';
  document.getElementById('y').value = '5';
  document.getElementById('multiply').click();
  expect(document.getElementById('result').innerHTML).toBe('20');
});

it('should return correct multiplication of two negative integers', function() {
  document.getElementById('x').value = '-4';
  document.getElementById('y').value = '-5';
  document.getElementById('multiply').click();
  expect(document.getElementById('result').innerHTML).toBe('20');
});

it('should return correct multiplication of one positive and one negative integer', function() {
  document.getElementById('x').value = '4';
  document.getElementById('y').value = '-5';
  document.getElementById('multiply').click();
  expect(document.getElementById('result').innerHTML).toBe('-20');
});

it('should return correct multiplication of one integer and one floating point number', function() {
  document.getElementById('x').value = '4';
  document.getElementById('y').value = '5.5';
  document.getElementById('multiply').click();
  expect(document.getElementById('result').innerHTML).toBe('22');
});

it('should return "ERROR" when multiplying a number with a non-numeric value', function() {
  document.getElementById('x').value = '4';
  document.getElementById('y').value = 'abc';
  document.getElementById('multiply').click();
  expect(document.getElementById('result').innerHTML).toBe('ERROR');
});

//memeory minus

describe('Memory functions', function() {
  describe('memoryMinus', function() {
    it('should subtract memory value from the result when the function is called', function() {
      document.getElementById('x').value = '10';
      document.getElementById('y').value = '5';
      
      document.getElementById('add').click();
      document.getElementById('memoryMinus').click();
      expect(document.getElementById('result').innerHTML).toBe('-5');
    });

    it('should do nothing if there is no value in the memory', function() {
      document.getElementById('memoryMinus').click();
      expect(document.getElementById('result').innerHTML).toBe('ERROR');
    });
  });

  describe('memoryPlus', function() {
    it('should do nothing if the current result is NaN', function() {
      document.getElementById('x').value = 'a';
      document.getElementById('y').value = 'b';
      document.getElementById('add').click();
      document.getElementById('memoryPlus').click();
      expect(memoryLastResult.length).toBe(0);
    });

    it('should do nothing if the current result is Infinity or -Infinity', function() {
      document.getElementById('x').value = '1';
      document.getElementById('y').value = '0';
      document.getElementById('division').click();
      document.getElementById('memoryPlus').click();
      expect(memoryLastResult.length).toBe(0);
      document.getElementById('x').value = '-1';
      document.getElementById('y').value = '0';
      document.getElementById('division').click();
      document.getElementById('memoryPlus').click();
      expect(memoryLastResult.length).toBe(0);
    });


    it('should add memory value from the result when the function is called', function() {
      document.getElementById('x').value = '10';
      document.getElementById('y').value = '5';
      
      document.getElementById('add').click();
      document.getElementById('memoryPlus').click();
      expect(document.getElementById('result').innerHTML).toBe('25');
    });
  });
});



//equal


it('should call addition if addition was the last operation', function (){
  document.getElementById('x').value = 1;
  document.getElementById('y').value = 2;
  document.getElementById('add').click();
  document.getElementById('equal').click();
  expect(document.getElementById('result').innerHTML).toBe('5');


})

it('should call subtraction if addition was the last operation', function (){
  document.getElementById('x').value = 1;
  document.getElementById('y').value = 2;
  document.getElementById('subtract').click();
  expect(document.getElementById('result').innerHTML).toBe('-1');
  document.getElementById('equal').click();
  expect(document.getElementById('result').innerHTML).toBe('-3');


})

it('should call subtraction if divide was the last operation', function (){
  document.getElementById('x').value = 1;
  document.getElementById('y').value = 2;
  document.getElementById('division').click();
  expect(document.getElementById('result').innerHTML).toBe('0.5');
  document.getElementById('equal').click();
  expect(document.getElementById('result').innerHTML).toBe('0.25');
})


it('should call subtraction if mulitply was the last operation', function (){
  document.getElementById('x').value = 1;
  document.getElementById('y').value = 2;
  document.getElementById('multiply').click();
  expect(document.getElementById('result').innerHTML).toBe('2');
  document.getElementById('equal').click();
  expect(document.getElementById('result').innerHTML).toBe('4');
})


it('should call division if division was the last operation', function (){
  document.getElementById('x').value = 1;
  document.getElementById('y').value = 2;
  document.getElementById('division').click();
  expect(document.getElementById('result').innerHTML).toBe('0.5');
  document.getElementById('equal').click();
  expect(document.getElementById('result').innerHTML).toBe('0.25');
})

it('should call sqaure root again if sqaure root was the last operation', function (){
  document.getElementById('x').value = 121;
  document.getElementById('square-root').click();
  expect(document.getElementById('result').innerHTML).toBe('11');
  document.getElementById('equal').click();
  expect(document.getElementById('result').innerHTML).toBe('3.3166247903554');
})


it('should call percent again if percent was the last operation', function (){
  document.getElementById('x').value = 10;
  document.getElementById('percent').click();
  expect(document.getElementById('result').innerHTML).toBe('0.1');
  document.getElementById('equal').click();
  expect(document.getElementById('result').innerHTML).toBe('0.001');
})



});


