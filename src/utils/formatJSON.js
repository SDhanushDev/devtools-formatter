export const formatJSON = (input) => {
  try {
    const parsed = JSON.parse(input);
    return {
      formatted: JSON.stringify(parsed, null, 2),
      error: null,
    };
  } catch (error) {
    return {
      formatted: null,
      error: `Invalid JSON: ${error.message}`,
    };
  }
};

export const formatJavaScript = (input) => {
  try {
    // Simple JavaScript formatting - add proper indentation
    const lines = input.split('\n');
    let formatted = '';
    let indentLevel = 0;
    
    for (let line of lines) {
      const trimmed = line.trim();
      
      if (trimmed.includes('}') || trimmed.includes(']')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }
      
      formatted += '  '.repeat(indentLevel) + trimmed + '\n';
      
      if (trimmed.includes('{') || trimmed.includes('[')) {
        indentLevel++;
      }
    }
    
    return {
      formatted: formatted.trim(),
      error: null,
    };
  } catch (error) {
    return {
      formatted: null,
      error: `Formatting error: ${error.message}`,
    };
  }
};

export const formatHTML = (input) => {
  try {
    // Simple HTML formatting
    const formatted = input
      .replace(/></g, '>\n<')
      .replace(/^\s*\n/gm, '')
      .split('\n')
      .map((line, index, array) => {
        const trimmed = line.trim();
        if (!trimmed) return '';
        
        let indentLevel = 0;
        for (let i = 0; i < index; i++) {
          const prevLine = array[i].trim();
          if (prevLine.includes('<') && !prevLine.includes('</') && !prevLine.includes('/>')) {
            indentLevel++;
          }
          if (prevLine.includes('</')) {
            indentLevel--;
          }
        }
        
        return '  '.repeat(Math.max(0, indentLevel)) + trimmed;
      })
      .join('\n');
    
    return {
      formatted,
      error: null,
    };
  } catch (error) {
    return {
      formatted: null,
      error: `HTML formatting error: ${error.message}`,
    };
  }
};

export const formatCSS = (input) => {
  try {
    // Simple CSS formatting
    const formatted = input
      .replace(/\s*{\s*/g, ' {\n  ')
      .replace(/;\s*/g, ';\n  ')
      .replace(/\s*}\s*/g, '\n}\n\n')
      .replace(/,\s*/g, ',\n')
      .trim();
    
    return {
      formatted,
      error: null,
    };
  } catch (error) {
    return {
      formatted: null,
      error: `CSS formatting error: ${error.message}`,
    };
  }
};