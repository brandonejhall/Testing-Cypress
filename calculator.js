'use strict';

window.calculator = window.calculator || {};

(function() {
	var checkforInt = function(id) {
		return Number.isInteger(document.getElementById(id).value);
	}

	var memoryLastResult = [];
	//document.getElementById('memoryList').innerHTML = memoryLastResult.toString()

	var getIntById = function(id){
		if (checkforInt(id)) {
			return parseInt(document.getElementById(id).value, 10);
		}
		else{
			return parseFloat(document.getElementById(id).value);
		}
	}
	

	var calculate = function() {
		if (calculate){
		var sum = getIntById('x') + getIntById('y');
		document.getElementById('result').innerHTML = isNaN(sum) ? 'ERROR' : sum;

		if (!isNaN(sum)){
			updateMemory('add')
		}

		}
	};

	var subtract = function() {
		if (subtract){
		var difference = getIntById('x') - getIntById('y');
		document.getElementById('result').innerHTML = isNaN(difference) ? 'ERROR' : difference;
		
		if (!isNaN(difference)){
			updateMemory('subtract')
		}

	}
	}

	var quotient = function(){
		
			var quotient = getIntById('x')/getIntById('y')
			document.getElementById('result').innerHTML = isNaN(quotient) || !isFinite(quotient) ? 'ERROR' : quotient;
			if (!isNaN(quotient)){
				updateMemory('division')
			}
		
	}

	var squareRoot = function(){
			var square = Math.sqrt(getIntById('x'));
			document.getElementById('result').innerHTML = isNaN(square) ? 'ERROR' : square;
			if (!isNaN(square)){
				updateMemory('square')
			}
		
	}

	var multiply = function() {
		var x = parseFloat(document.getElementById('x').value);
		var y = parseFloat(document.getElementById('y').value);
		var product = x * y;
		document.getElementById('result').innerHTML = isNaN(product) ? 'ERROR' : product;
		
		if (!isNaN(product)){
		updateMemory('multiply');
		}
	  };

	var updateMemory = function(operation){	
		memoryLastResult.push([operation, parseFloat(document.getElementById('result').innerHTML)])
		document.getElementById('memoryList').innerHTML = JSON.stringify(memoryLastResult)
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
				document.getElementById('memoryList').innerHTML = JSON.stringify([])
			}
		}
		return operation
		}

	}
	
	var memoryMinus = function(){
		retrieveMemory()
		subtract()

	}

	var equal = function (){
		var lastOperation = memoryLastResult[memoryLastResult.length - 1]
		document.getElementById('x').value = lastOperation[1]
		//console.log(lastOperation[0])
		switch (lastOperation[0]) {
			case 'add':
			  calculate();
			  break;
			case 'subtract':
			  subtract();
			  break;
			case 'multiply':
			  multiply();
			  break;
			case 'division':
			  quotient();
			  break;
			case 'percent':
			  percent();
			  break;
			case 'square':
			  squareRoot();
			  break;
			case '':
			  'ERROR'
			  break;
			default:
			  break;
		  }
	}

	var memoryPlus = function(){
		retrieveMemory()
		calculate()
		
	}

	var onoff = function(){
		document.getElementById('x').value = ''
		document.getElementById('y').value = ''
		document.getElementById('result').innerHTML = ''
		document.getElementById('memoryList').innerHTML = '[]'
		memoryLastResult = []
		}

	var percent = function(){
		
			var percent = getIntById('x')/100
			document.getElementById('result').innerHTML = isNaN(percent) ? 'ERROR' : percent;
			if (!isNaN(percent)){
				updateMemory('percent')
			}

		
	}

	window.calculator.init = function() {
		document.getElementById('add').addEventListener('click', calculate);
		document.getElementById('subtract').addEventListener('click', subtract);
		document.getElementById('division').addEventListener('click', quotient);
		document.getElementById('square-root').addEventListener('click', squareRoot);
		document.getElementById('memory').addEventListener('click',retrieveMemory);
		document.getElementById('percent').addEventListener('click',percent);
		document.getElementById('memoryMinus').addEventListener('click',memoryMinus);
		document.getElementById('memoryPlus').addEventListener('click',memoryPlus);
		document.getElementById('on/off').addEventListener('click',onoff);
		document.getElementById('multiply').addEventListener('click',multiply);
		document.getElementById('equal').addEventListener('click',equal);
	};


	
})();