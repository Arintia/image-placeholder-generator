import React from 'react';

function FontStyleOption({fontName}) {
  return (
    <option value={fontName}>
        {fontName}
    </option>
  );
}

export default FontStyleOption;