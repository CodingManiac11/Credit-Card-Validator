import React, { useEffect, useRef } from 'react';

const GamifiedValidation = ({ isValid }) => {
  const confettiRef = useRef(null);

  useEffect(() => {
    if (isValid && confettiRef.current) {
      confettiRef.current.classList.add('show');
      setTimeout(() => {
        confettiRef.current && confettiRef.current.classList.remove('show');
      }, 1200);
    }
  }, [isValid]);

  return (
    <div className="gamified-validation" style={{ position: 'relative', minHeight: 40 }}>
      {isValid && (
        <span style={{
          background: '#ffd600',
          color: '#1976d2',
          borderRadius: 8,
          padding: '4px 12px',
          fontWeight: 'bold',
          marginRight: 12,
        }}>
          🏅 Card Master!
        </span>
      )}
      <div
        ref={confettiRef}
        className="confetti"
        style={{
          opacity: 0,
          pointerEvents: 'none',
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: 40,
          transition: 'opacity 0.4s',
          zIndex: 2,
        }}
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 80}%`,
              fontSize: 18 + Math.random() * 10,
              color: ['#ffd600', '#1976d2', '#dc004e', '#42a5f5'][i % 4],
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            🎉
          </span>
        ))}
      </div>
      <style>{`
        .confetti.show { opacity: 1 !important; }
      `}</style>
    </div>
  );
};

export default GamifiedValidation;
