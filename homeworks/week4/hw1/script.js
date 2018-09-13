// Simplify query selector
let q = (selector) => document.querySelector(selector);

// Change theme
q(".theme-btn-purple").addEventListener('click', e => {
  q('.wrapper').classList.add('purple'); // wrong: q('.wrapper').className += 'purple'; => class='wrapperpurple'
})
q(".theme-btn-blue").addEventListener('click', e => {
  q('.wrapper').classList.remove('purple');
})

// Operations
let operator = '',
    operand = '0',
    hasOperator = false;

q('.btn').addEventListener('click', e => {
  
  // Input numbers
  if (e.target.className === 'num') {

    // Right after an operation
    if (q('.result-input').innerText !== '') {

      q('.result-input').innerText = '';
      operator = '';
      
      if (e.target.innerText === '.') {
        q('.result-output').innerText = '0.';
      } else {
        q('.result-output').innerText = e.target.innerText;
      }
      
    } else if (!hasOperator) {
      
      // If 0
      if (q('.result-output').innerText === '0') {

        // To avoid 00
        if (e.target.innerText !== '00') {

          if (e.target.innerText === '.') {
            // To avoid 2 dots
            if (!q('.result-output').innerText.includes('.')) {
              q('.result-output').innerText += '.';
            }

          } else {
            q('.result-output').innerText = e.target.innerText;
          }
        }

      // If !0
      } else {

        if (e.target.innerText === '.') {
          // To avoid 2 dots
          if (!q('.result-output').innerText.includes('.')) {
            q('.result-output').innerText += '.';
          }

        } else {
          q('.result-output').innerText += e.target.innerText;
        }
      }
    
    // The first number pressing after the operator
    } else {

      if (e.target.innerText === '.') {
        q('.result-output').innerText = '0.';
      } else if (e.target.innerText === '00') {
        q('.result-output').innerText = '0';
      } else {
        q('.result-output').innerText = e.target.innerText;
      }
      hasOperator = false;
    }
  }

  // Input operator + − × ÷
  if (e.target.className === 'opr') {

    if (q('.result-input').innerText !== '') q('.result-input').innerText = '';

    operand = q('.result-output').innerText;
    operator = e.target.innerText;
    hasOperator = true;
  }

  // Press 'equal'
  if (e.target.id === 'equal') {

    let rawResult;
    switch (operator) {
      case '+':
        q('.result-input').innerText = operand + '+' + q('.result-output').innerText;
        rawResult = parseFloat(operand) + parseFloat(q('.result-output').innerText);
        break;
      case '−':
        q('.result-input').innerText = operand + '−' + q('.result-output').innerText;
        rawResult = parseFloat(operand) - parseFloat(q('.result-output').innerText);
        break;
      case '×':
        q('.result-input').innerText = operand + '×' + q('.result-output').innerText;
        rawResult = parseFloat(operand) * parseFloat(q('.result-output').innerText);
        break;
      case '÷':
        q('.result-input').innerText = operand + '÷' + q('.result-output').innerText;
        rawResult = parseFloat(operand) / parseFloat(q('.result-output').innerText);
        break;
    }

    // Decide the length of result to display
    if (rawResult.toString().length <= 10) {
      q('.result-output').innerText = rawResult;
    
    // Format rawResult using fixed-point notation
    } else {
      switch (parseInt(rawResult).toString().length) {
        case 10:
          q('.result-output').innerText = Math.round(rawResult);
          break;
        case 9:
          q('.result-output').innerText = rawResult.toFixed(1);
          break;
        case 8:
          q('.result-output').innerText = rawResult.toFixed(2);
          break;
        case 7:
          q('.result-output').innerText = rawResult.toFixed(3);
          break;
        case 6:
          q('.result-output').innerText = rawResult.toFixed(4);
          break;
        case 5:
          q('.result-output').innerText = rawResult.toFixed(5);
          break;
        case 4:
          q('.result-output').innerText = rawResult.toFixed(6);
          break;
        case 3:
          q('.result-output').innerText = rawResult.toFixed(7);
          break;
        case 2:
          q('.result-output').innerText = rawResult.toFixed(8);
          break;
        case 1:
          q('.result-output').innerText = rawResult.toFixed(9);
          break;

        // If rawResult > billion 
        default: 
          q('.result-output').innerText = 'error';
          break;
      }
    }
  }

  // Press 'AC'
  if (e.target.id === 'ac') {

    q('.result-input').innerText = '';
    q('.result-output').innerText = '0';
    operator = '';
    operand = '0';
  }

  // Press 'C'
  if (e.target.id === 'c') {

    if (q('.result-input').innerText === '') {
      q('.result-output').innerText = '0';
    } else {
      q('.result-input').innerText = '';
      q('.result-output').innerText = '0';
    }
  }
})
