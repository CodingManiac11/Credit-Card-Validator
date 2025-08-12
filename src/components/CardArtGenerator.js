import React, { useState } from 'react';

const defaultColors = [
  '#1976d2', '#42a5f5', '#ffd600', '#dc004e', '#43a047', '#fff', '#333'
];

const CardArtGenerator = ({ onArtChange }) => {
  const [color, setColor] = useState('#1976d2');

  const handleColorChange = (e) => {
    setColor(e.target.value);
    onArtChange && onArtChange(e.target.value);
  };

  return (
    <div className="card-art-generator" style={{ margin: '16px 0' }}>
      <label style={{ fontWeight: 'bold', marginRight: 8 }}>Card Background:</label>
      <input type="color" value={color} onChange={handleColorChange} style={{ marginRight: 8 }} />
      {defaultColors.map((c) => (
        <button
          key={c}
          style={{
            background: c,
            border: color === c ? '2px solid #000' : '1px solid #ccc',
            width: 24,
            height: 24,
            borderRadius: '50%',
            margin: '0 4px',
            cursor: 'pointer',
          }}
          onClick={() => handleColorChange({ target: { value: c } })}
        />
      ))}
    </div>
  );
};

export default CardArtGenerator;
