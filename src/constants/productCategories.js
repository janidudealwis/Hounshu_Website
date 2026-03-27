export const PRODUCT_CATEGORIES = [
  'Generators (Diesel)',
  'Generators (Petrol)',
  'Excavators',
  'Dozers',
  'Tractors (4 wheel)',
  'Tractors (2 wheel)',
  'Hand tractors',
  'Small harvest tractors',
  'Compressor',
  'Small compressor',
  'Tyres',
  'Foot Bicycles',
  'Roughter Cranes',
  'Winches',
  'Electric hoist'
];

export const CATEGORY_OPTIONS = [
  { value: '', label: 'All Categories' },
  ...PRODUCT_CATEGORIES.map(category => ({
    value: category,
    label: category
  }))
];