export const getDynamicIcon = (input) => {
  const get = (name) => `https://api.iconify.design/twemoji:${name}.svg`;
  const defaultIcon = get('sparkles');

  // 1. Safety Check: If input is null/undefined
  if (!input) return defaultIcon;

  // 2. Extract Text: Handle if input is a String OR an Object
  let text = "";
  if (typeof input === 'string') {
    text = input;
  } else if (typeof input === 'object' && input.text) {
    text = input.text;
  } else {
    return defaultIcon; // Unknown format
  }

  // 3. Process Text
  const t = text.toLowerCase();
  // Health / Body
  if (t.includes('energy') || t.includes('muscle')) return get('flexed-biceps');
  if (t.includes('digestion') || t.includes('tummy') || t.includes('stomach')) return get('pot-of-food');
  if (t.includes('bone') || t.includes('teeth')) return get('bone');
  if (t.includes('eye') || t.includes('vision') || t.includes('look')) return get('eye');
  if (t.includes('blood') || t.includes('heart')) return get('red-heart');
  if (t.includes('brain') || t.includes('memory') || t.includes('smart')) return get('brain');
  if (t.includes('skin') || t.includes('face')) return get('sparkles');
  if (t.includes('sleep') || t.includes('calm')) return get('sleeping-face');
  if (t.includes('immun') || t.includes('sick') || t.includes('heal')) return get('shield');
  if (t.includes('hydrat') || t.includes('cool')) return get('droplet');

  // Food / Makes
  if (t.includes('juice') || t.includes('drink') || t.includes('tea')) return get('tropical-drink');
  if (t.includes('ice cream') || t.includes('sorbet')) return get('ice-cream');
  if (t.includes('cake') || t.includes('bread') || t.includes('tart')) return get('shortcake');
  if (t.includes('jam') || t.includes('jelly')) return get('jar');
  if (t.includes('salad') || t.includes('rojak')) return get('green-salad');
  if (t.includes('candy') || t.includes('sweet') || t.includes('gummies')) return get('candy');
  
  // Nature / Facts
  if (t.includes('tree') || t.includes('plant') || t.includes('leaf')) return get('deciduous-tree');
  if (t.includes('seed')) return get('seedling');
  if (t.includes('king') || t.includes('queen')) return get('crown');
  if (t.includes('plane')) return get('airplane');
  if (t.includes('smell')) return get('nose');

  // Default
  return get('sparkles');
};