import React from 'react';

function luhnSteps(cardNumber) {
  const numbers = cardNumber.replace(/\D/g, '');
  let steps = [];
  let sum = 0;
  let isEven = false;
  for (let i = numbers.length - 1; i >= 0; i--) {
    let digit = parseInt(numbers.charAt(i), 10);
    let orig = digit;
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    steps.unshift({
      idx: i,
      orig,
      processed: digit,
      doubled: isEven,
    });
    sum += digit;
    isEven = !isEven;
  }
  return { steps, sum, valid: numbers.length > 0 && sum % 10 === 0 };
}

const EducationalMode = ({ cardNumber }) => {
  const { steps, sum, valid } = luhnSteps(cardNumber || '');
  return (
    <div className="educational-mode" style={{ margin: '16px 0' }}>
      <strong>Luhn Algorithm Steps:</strong>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '8px 0' }}>
        {steps.map((s, i) => (
          <span key={i} style={{
            background: s.doubled ? '#42a5f5' : '#eee',
            color: s.doubled ? '#fff' : '#333',
            borderRadius: 6,
            padding: '2px 8px',
            fontWeight: s.doubled ? 'bold' : 'normal',
            minWidth: 28,
            display: 'inline-block',
            textAlign: 'center',
          }}>
            {s.processed}
          </span>
        ))}
      </div>
      <div>Sum: <b>{sum}</b> {steps.length > 0 && <span>({valid ? 'Valid' : 'Invalid'})</span>}</div>
    </div>
  );
};

export default EducationalMode;
