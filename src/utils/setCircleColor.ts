const colors: any = {
  JavaScript: '#FFF200',
  TypeScript: '#000080',
  HTML: '#FF4500',
  CSS: '#CC8899',
  JAVA: '#B5651D',
  Python: '#00008B',
  Vue: '#228B22',
  PHP: 'ACACE6',
  Ruby: '#691734',
  Swift: '#FF5349',
  Go: 'skyblue',
  'C#': 'green',
  'Jupyter Notebook': '#DC5539',
  Dart: '#005666',
  Shell: '#60FBC5',
  Rust: '#FBCEB1',
  'Objective-C': '#0067A3',
  Kotlin: '#4D377B',
};

export const setCircleColor = (language: string): string => colors[language] ?? 'white';
