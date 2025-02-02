import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  flowchart: {
    curve: 'basis'
  },
  sequence: {
    showSequenceNumbers: true
  },
  journey: {
    taskMargin: 40
  }
}); 