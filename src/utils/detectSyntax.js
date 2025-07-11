export const detectSyntax = (input) => {
  const trimmed = input.trim();
  
  // JSON detection
  if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || 
      (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
    try {
      JSON.parse(trimmed);
      return 'json';
    } catch (e) {
      // Continue to other checks
    }
  }
  
  // HTML detection
  if (trimmed.includes('<') && trimmed.includes('>')) {
    const htmlTags = ['html', 'head', 'body', 'div', 'span', 'p', 'h1', 'h2', 'h3'];
    const hasHtmlTags = htmlTags.some(tag => 
      trimmed.includes(`<${tag}`) || trimmed.includes(`</${tag}`)
    );
    if (hasHtmlTags) return 'html';
  }
  
  // CSS detection
  if (trimmed.includes('{') && trimmed.includes('}') && trimmed.includes(':')) {
    const cssPatterns = [
      /[a-zA-Z-]+\s*:\s*[^;]+;/,
      /\.[a-zA-Z-]+\s*{/,
      /#[a-zA-Z-]+\s*{/,
      /[a-zA-Z]+\s*{/
    ];
    if (cssPatterns.some(pattern => pattern.test(trimmed))) {
      return 'css';
    }
  }
  
  // JavaScript detection
  const jsKeywords = ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return'];
  const hasJsKeywords = jsKeywords.some(keyword => 
    new RegExp(`\\b${keyword}\\b`).test(trimmed)
  );
  if (hasJsKeywords) return 'javascript';
  
  // Default to javascript
  return 'javascript';
};

export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};