import React from 'react';

const formatCardNumber = (number) => {
  // Pad with dots for missing digits (max 16 for standard cards)
  const clean = number.replace(/\D/g, '');
  let padded = clean.padEnd(16, '•');
  // Group into 4s
  return padded.match(/.{1,4}/g).join(' ');
};



const CARD_TYPE_ICONS = {
  Visa: (
    <svg width="48" height="16" viewBox="0 0 48 16"><text x="0" y="14" fontSize="14" fontWeight="bold" fill="#fff">VISA</text></svg>
  ),
  MasterCard: (
    <svg width="48" height="16" viewBox="0 0 48 16">
      <circle cx="14" cy="8" r="7" fill="#eb001b" />
      <circle cx="24" cy="8" r="7" fill="#f79e1b" />
    </svg>
  ),
  'American Express': (
    <svg width="48" height="16" viewBox="0 0 48 16"><text x="0" y="14" fontSize="12" fontWeight="bold" fill="#fff">AMEX</text></svg>
  ),
  Discover: (
    <svg width="48" height="16" viewBox="0 0 48 16"><text x="0" y="14" fontSize="12" fontWeight="bold" fill="#fff">DISC</text></svg>
  ),
  Unknown: null
};


const randomName = () => {
  const names = [
    'ALEX JOHNSON', 'PRIYA SINGH', 'JORDAN LEE', 'EMMA WILSON', 'RAHUL PATEL', 'LISA CHEN', 'MARIO ROSSI', 'SOFIA GARCIA'
  ];
  return names[Math.floor(Math.random() * names.length)];
};

const getRandomExpiry = () => {
  const now = new Date();
  const year = now.getFullYear() + Math.floor(Math.random() * 5) + 1;
  const month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
  return `${month}/${year.toString().slice(-2)}`;
};

const getRandomCVV = () => {
  return ('' + Math.floor(100 + Math.random() * 900));
};

const CardNumberVisualization = ({ cardNumber, cardBg, cardType, isValid, small }) => {
  const formatted = formatCardNumber(cardNumber || '');
  const background = cardBg && cardBg !== '#1976d2'
    ? cardBg
    : 'linear-gradient(120deg, #1976d2 60%, #42a5f5 100%)';

  // For the fixed preview, always use small size and random details
  const isPreview = small;
  const name = React.useMemo(randomName, []);
  const expiry = React.useMemo(getRandomExpiry, []);
  const cvv = React.useMemo(getRandomCVV, []);

  if ((isValid && cardType) || isPreview) {
    // If small preview and invalid, show only number and invalid message
    if (isPreview && cardNumber && isValid === false) {
      return (
        <div className="card-number-visualization">
          <div
            className="real-credit-card"
            style={{
              background: 'repeating-linear-gradient(135deg, #b71c1c, #d32f2f 10px, #b71c1c 20px)',
              minWidth: 220,
              minHeight: 120,
              padding: '16px 18px 12px 18px',
              fontSize: '1.1rem',
              filter: 'grayscale(0.3)',
              opacity: 0.85,
              border: '2px solid #fff',
              position: 'relative',
            }}
          >
            <div className="real-card-number" style={{ fontSize: '1.1rem', marginBottom: 8, color: '#fff', textShadow: '1px 1px 2px #0008' }}>{formatted}</div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem', marginTop: 6 }}>Invalid Card Number</div>
          </div>
          <style>{`
            .card-number-visualization {
              margin: 12px 0;
              display: flex;
              justify-content: center;
            }
            .real-credit-card {
              border-radius: 14px;
              box-shadow: 0 4px 16px rgba(183, 28, 28, 0.18);
              color: #fff;
              position: relative;
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
              align-items: flex-start;
              overflow: hidden;
            }
          `}</style>
        </div>
      );
    }
    // Otherwise, show normal card
    return (
      <div className="card-number-visualization">
        <div
          className="real-credit-card"
          style={{
            background,
            minWidth: isPreview ? 220 : 340,
            minHeight: isPreview ? 120 : 160,
            padding: isPreview ? '16px 18px 12px 18px' : '32px 36px 24px 36px',
            fontSize: isPreview ? '1.1rem' : '2.1rem',
          }}
        >
          <div className="card-type-icon" style={{ top: isPreview ? 8 : 18, right: isPreview ? 10 : 24 }}>
            {CARD_TYPE_ICONS[cardType]}
          </div>
          <div className="real-card-number" style={{ fontSize: isPreview ? '1.1rem' : '2.1rem', marginBottom: isPreview ? 8 : 18 }}>{formatted}</div>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="real-card-label" style={{ fontSize: isPreview ? '0.7rem' : '1.1rem' }}>{cardType}</div>
            <div className="real-card-cvv" style={{ fontSize: isPreview ? '0.7rem' : '1.1rem', opacity: 0.7 }}>CVV {cvv}</div>
          </div>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: isPreview ? 4 : 10 }}>
            <div className="real-card-name" style={{ fontSize: isPreview ? '0.8rem' : '1.1rem', fontWeight: 500 }}>{name}</div>
            <div className="real-card-expiry" style={{ fontSize: isPreview ? '0.8rem' : '1.1rem', opacity: 0.8 }}>EXP {expiry}</div>
          </div>
        </div>
        <style>{`
          .card-number-visualization {
            margin: 12px 0;
            display: flex;
            justify-content: center;
          }
          .real-credit-card {
            border-radius: 14px;
            box-shadow: 0 4px 16px rgba(25, 118, 210, 0.18);
            color: #fff;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
            background: ${background};
            overflow: hidden;
          }
          .card-type-icon {
            position: absolute;
          }
          .real-card-number {
            letter-spacing: 0.22em;
            font-family: 'Courier New', Courier, monospace;
            text-shadow: 1px 1px 2px #0008;
          }
          .real-card-label {
            opacity: 0.85;
            font-weight: 500;
            letter-spacing: 0.1em;
          }
        `}</style>
      </div>
    );
  }

  // Show invalid card if user has entered something and isValid is false
  if (cardNumber && isValid === false) {
    return (
      <div className="card-number-visualization">
        <div
          className="real-credit-card"
          style={{
            background: 'repeating-linear-gradient(135deg, #b71c1c, #d32f2f 10px, #b71c1c 20px)',
            minWidth: small ? 220 : 340,
            minHeight: small ? 120 : 160,
            padding: small ? '16px 18px 12px 18px' : '32px 36px 24px 36px',
            fontSize: small ? '1.1rem' : '2.1rem',
            filter: 'grayscale(0.3)',
            opacity: 0.85,
            border: '2px solid #fff',
            position: 'relative',
          }}
        >
          <div className="real-card-number" style={{ fontSize: small ? '1.1rem' : '2.1rem', marginBottom: small ? 8 : 18, color: '#fff', textShadow: '1px 1px 2px #0008' }}>{formatted}</div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: small ? '0.8rem' : '1.2rem', marginTop: small ? 6 : 12 }}>Invalid Card Number</div>
        </div>
        <style>{`
          .card-number-visualization {
            margin: 12px 0;
            display: flex;
            justify-content: center;
          }
          .real-credit-card {
            border-radius: 14px;
            box-shadow: 0 4px 16px rgba(183, 28, 28, 0.18);
            color: #fff;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
            overflow: hidden;
          }
        `}</style>
      </div>
    );
  }

  // Default animated card for input
  return (
    <div className="card-number-visualization">
      <div className="card-visual" style={{ background }}>
        {formatted.split('').map((char, idx) => (
          <span
            key={idx}
            className={`card-digit${cardNumber.replace(/\D/g, '').length === idx ? ' active' : ''}`}
            style={{ transitionDelay: `${idx * 30}ms` }}
          >
            {char}
          </span>
        ))}
      </div>
      <style>{`
        .card-number-visualization {
          margin: 24px 0;
          display: flex;
          justify-content: center;
        }
        .card-visual {
          border-radius: 16px;
          padding: 24px 32px;
          box-shadow: 0 4px 16px rgba(25, 118, 210, 0.15);
          font-size: 2rem;
          letter-spacing: 0.2em;
          color: #fff;
          display: flex;
          gap: 0.2em;
          min-width: 340px;
        }
        .card-digit {
          opacity: 0.7;
          transform: translateY(10px);
          transition: all 0.3s cubic-bezier(.4,2,.6,1) 0ms;
        }
        .card-digit.active {
          opacity: 1;
          color: #ffd600;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default CardNumberVisualization;
