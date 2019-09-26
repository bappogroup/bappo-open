// @flow

// Adding a CSS rule to display non-selectable texts. Those texts
// will be displayed as pseudo elements to prevent them from being copied
// to clipboard. It's not possible to style pseudo elements with inline
// styles, so, we're dynamically creating a <style> tag with the rule.
if (document && document.head) {
  const textAsPseudoElement =
    '[data-text-as-pseudo-element]::before { content: attr(data-text-as-pseudo-element); }';
  const head = document.head;
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(textAsPseudoElement));
  head.appendChild(style);
}
