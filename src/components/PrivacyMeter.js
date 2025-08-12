import React from 'react';

function isRealisticCardNumber(cardNumber) {
  const num = cardNumber.replace(/\D/g, '');
  return num.length >= 13 && num.length <= 19;
}

function isLikelyExpiry(expiry) {
  // MM/YY or MM/YYYY, and not expired
  if (!expiry) return false;
  const match = expiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2,4})$/);
  if (!match) return false;
  let year = match[2].length === 2 ? 2000 + parseInt(match[2], 10) : parseInt(match[2], 10);
  let month = parseInt(match[1], 10);
  let now = new Date();
  let expDate = new Date(year, month - 1, 1);
  return expDate >= new Date(now.getFullYear(), now.getMonth(), 1);
}

function isLikelyCVV(cvv) {
  return cvv && /^[0-9]{3,4}$/.test(cvv);
}

const PrivacyMeter = ({ cardNumber, expiry, cvv }) => {
  const num = cardNumber.replace(/\D/g, '');
  const hasRealCard = isRealisticCardNumber(cardNumber);
  const hasExpiry = isLikelyExpiry(expiry);
  const hasCVV = isLikelyCVV(cvv);

  // Privacy logic: more real info = lower privacy
  let score = 100;
  let warnings = [];
  if (hasRealCard) {
    score -= 50;
    warnings.push('Full card number entered');
  } else if (num.length > 0) {
    score -= 20;
    warnings.push('Partial card number entered');
  }
  if (hasExpiry) {
    score -= 25;
    warnings.push('Expiry date entered');
  }
  if (hasCVV) {
    score -= 25;
    warnings.push('CVV entered');
  }
  let color = score > 70 ? '#43a047' : score > 40 ? '#ffd600' : '#dc004e';

  return (
    <div className="privacy-meter" style={{ margin: '16px 0' }}>
      <label style={{ fontWeight: 'bold', marginRight: 8 }}>Privacy Meter:</label>
      <span style={{
        background: color,
        color: '#fff',
        borderRadius: 8,
        padding: '2px 12px',
        fontWeight: 'bold',
        marginLeft: 8,
      }}>
        {score}%
      </span>
      <span style={{ marginLeft: 12, color: color }}>{score > 70 ? 'Safe' : score > 40 ? 'Caution' : 'Low Privacy'}</span>
      {warnings.length > 0 && (
        <ul style={{ margin: '8px 0 0 0', padding: 0, color: color, fontSize: '0.95em' }}>
          {warnings.map((w, i) => <li key={i}>{w}</li>)}
        </ul>
      )}
      {score < 70 && (
        <div style={{ color: color, marginTop: 4, fontWeight: 'bold' }}>
          Warning: Avoid sharing full card details online!
        </div>
      )}
    </div>
  );
};

export default PrivacyMeter;
