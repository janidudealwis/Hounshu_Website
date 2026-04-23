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
  'Forklifts',
  'Motor Graders',
  'Road Rollers',
  'Special Equipment',
  'Winches',
  'Electric hoist',
  'Wheel Loaders',
];

export const CATEGORY_OPTIONS = [
  { value: '', label: 'All Categories' },
  ...PRODUCT_CATEGORIES.map((c) => ({ value: c, label: c })),
];

/**
 * Per-category field definitions for the product form.
 *
 * Each field:
 *   name        — key used in state and stored in the `specs` JSONB column
 *   label       — display label
 *   type        — 'text' | 'number' | 'select'
 *   placeholder — hint text (text/number only)
 *   options     — array of strings (select only)
 *   required    — true = must be filled before submitting
 *   mapTo       — if present, value is saved to this top-level DB column
 *                 ('capacity' or 'fuel_type') instead of into `specs`
 */
export const CATEGORY_FIELDS = {
  'Generators (Diesel)': [
    { name: 'powerOutput',   label: 'Power Output (KVA)',  type: 'text',   placeholder: 'e.g., 25 KVA',        required: true,  mapTo: 'capacity'  },
    { name: 'fuelType',      label: 'Fuel Type',           type: 'select', options: ['Diesel'],                 required: false, mapTo: 'fuel_type' },
    { name: 'phase',         label: 'Phase',               type: 'select', options: ['Single Phase', 'Three Phase'], required: true  },
    { name: 'frequency',     label: 'Frequency',           type: 'select', options: ['50 Hz', '60 Hz'],         required: true  },
    { name: 'voltageOutput', label: 'Voltage Output',      type: 'text',   placeholder: 'e.g., 230V / 415V',   required: false },
    { name: 'engineModel',   label: 'Engine Model',        type: 'text',   placeholder: 'e.g., Kubota V2203',  required: false },
    { name: 'altBrand',      label: 'Alternator Brand',    type: 'text',   placeholder: 'e.g., Stamford',      required: false },
    { name: 'powerFactor',   label: 'Power Factor',        type: 'text',   placeholder: 'e.g., 0.8',           required: false },
  ],

  'Generators (Petrol)': [
    { name: 'powerOutput',   label: 'Power Output (KVA)',  type: 'text',   placeholder: 'e.g., 5 KVA',         required: true,  mapTo: 'capacity'  },
    { name: 'fuelType',      label: 'Fuel Type',           type: 'select', options: ['Petrol'],                 required: false, mapTo: 'fuel_type' },
    { name: 'phase',         label: 'Phase',               type: 'select', options: ['Single Phase', 'Three Phase'], required: true  },
    { name: 'frequency',     label: 'Frequency',           type: 'select', options: ['50 Hz', '60 Hz'],         required: true  },
    { name: 'voltageOutput', label: 'Voltage Output',      type: 'text',   placeholder: 'e.g., 230V',          required: false },
    { name: 'engineModel',   label: 'Engine Model',        type: 'text',   placeholder: 'e.g., Honda GX390',   required: false },
    { name: 'ratedPower',    label: 'Rated Power (kW)',    type: 'text',   placeholder: 'e.g., 4.0 kW',        required: false },
    { name: 'powerFactor',   label: 'Power Factor',        type: 'text',   placeholder: 'e.g., 1.0',           required: false },
  ],

  'Excavators': [
    { name: 'operatingWeight', label: 'Operating Weight',    type: 'text', placeholder: 'e.g., 20,000 kg',     required: true,  mapTo: 'capacity' },
    { name: 'enginePower',     label: 'Engine Power',        type: 'text', placeholder: 'e.g., 103 kW / 138 HP', required: false },
    { name: 'bucketCapacity',  label: 'Bucket Capacity',     type: 'text', placeholder: 'e.g., 0.8 m³',        required: false },
    { name: 'maxDigDepth',     label: 'Max Dig Depth',       type: 'text', placeholder: 'e.g., 6.7 m',         required: false },
    { name: 'maxReach',        label: 'Max Reach',           type: 'text', placeholder: 'e.g., 10.1 m',        required: false },
    { name: 'swingTorque',     label: 'Swing Torque',        type: 'text', placeholder: 'e.g., 56 kN·m',       required: false },
  ],

  'Dozers': [
    { name: 'operatingWeight', label: 'Operating Weight',    type: 'text', placeholder: 'e.g., 11,000 kg',     required: true,  mapTo: 'capacity' },
    { name: 'enginePower',     label: 'Engine Power',        type: 'text', placeholder: 'e.g., 75 kW / 100 HP', required: false },
    { name: 'bladeCapacity',   label: 'Blade Capacity',      type: 'text', placeholder: 'e.g., 2.4 m³',        required: false },
    { name: 'bladeWidth',      label: 'Blade Width',         type: 'text', placeholder: 'e.g., 3,725 mm',      required: false },
    { name: 'gradeability',    label: 'Gradeability',        type: 'text', placeholder: 'e.g., 30°',           required: false },
  ],

  'Tractors (4 wheel)': [
    { name: 'horsepower',      label: 'Horsepower',          type: 'text', placeholder: 'e.g., 75 HP',         required: true,  mapTo: 'capacity' },
    { name: 'engineType',      label: 'Engine Type',         type: 'text', placeholder: 'e.g., 4-cylinder Diesel', required: false },
    { name: 'transmission',    label: 'Transmission',        type: 'text', placeholder: 'e.g., 8F + 2R Synchro', required: false },
    { name: 'liftCapacity',    label: 'Rear Lift Capacity',  type: 'text', placeholder: 'e.g., 2,000 kg',      required: false },
    { name: 'ptoSpeed',        label: 'PTO Speed',           type: 'text', placeholder: 'e.g., 540 / 1000 rpm', required: false },
    { name: 'fuelType',        label: 'Fuel Type',           type: 'select', options: ['Diesel', 'Petrol'],     required: false, mapTo: 'fuel_type' },
  ],

  'Tractors (2 wheel)': [
    { name: 'horsepower',      label: 'Horsepower',          type: 'text', placeholder: 'e.g., 12 HP',         required: true,  mapTo: 'capacity' },
    { name: 'engineType',      label: 'Engine Type',         type: 'text', placeholder: 'e.g., Diesel, Air-cooled', required: false },
    { name: 'tireSize',        label: 'Tyre Size',           type: 'text', placeholder: 'e.g., 5.00-12',       required: false },
    { name: 'rotavatorWidth',  label: 'Rotavator Width',     type: 'text', placeholder: 'e.g., 900 mm',        required: false },
    { name: 'fuelType',        label: 'Fuel Type',           type: 'select', options: ['Diesel', 'Petrol'],     required: false, mapTo: 'fuel_type' },
  ],

  'Hand tractors': [
    { name: 'enginePower',     label: 'Engine Power',        type: 'text', placeholder: 'e.g., 8.5 HP',        required: true,  mapTo: 'capacity' },
    { name: 'engineType',      label: 'Engine Type',         type: 'text', placeholder: 'e.g., Diesel',        required: false },
    { name: 'workingWidth',    label: 'Working Width',       type: 'text', placeholder: 'e.g., 900 mm',        required: false },
    { name: 'fuelType',        label: 'Fuel Type',           type: 'select', options: ['Diesel', 'Petrol'],     required: false, mapTo: 'fuel_type' },
  ],

  'Small harvest tractors': [
    { name: 'horsepower',      label: 'Horsepower',          type: 'text', placeholder: 'e.g., 35 HP',         required: true,  mapTo: 'capacity' },
    { name: 'cuttingWidth',    label: 'Cutting Width',       type: 'text', placeholder: 'e.g., 1.2 m',         required: false },
    { name: 'grainTank',       label: 'Grain Tank Capacity', type: 'text', placeholder: 'e.g., 500 L',         required: false },
    { name: 'engineType',      label: 'Engine Type',         type: 'text', placeholder: 'e.g., Diesel',        required: false },
    { name: 'fuelType',        label: 'Fuel Type',           type: 'select', options: ['Diesel', 'Petrol'],     required: false, mapTo: 'fuel_type' },
  ],

  'Compressor': [
    { name: 'airDelivery',     label: 'Air Delivery',        type: 'text', placeholder: 'e.g., 400 L/min',     required: true,  mapTo: 'capacity' },
    { name: 'maxPressure',     label: 'Max Pressure',        type: 'text', placeholder: 'e.g., 10 bar',        required: false },
    { name: 'tankCapacity',    label: 'Tank Capacity',       type: 'text', placeholder: 'e.g., 100 L',         required: false },
    { name: 'motorPower',      label: 'Motor Power',         type: 'text', placeholder: 'e.g., 3 kW / 4 HP',   required: false },
    { name: 'compressorType',  label: 'Compressor Type',     type: 'select', options: ['Piston', 'Screw', 'Scroll', 'Rotary'], required: false },
  ],

  'Small compressor': [
    { name: 'airDelivery',     label: 'Air Delivery',        type: 'text', placeholder: 'e.g., 100 L/min',     required: true,  mapTo: 'capacity' },
    { name: 'maxPressure',     label: 'Max Pressure',        type: 'text', placeholder: 'e.g., 8 bar',         required: false },
    { name: 'tankCapacity',    label: 'Tank Capacity',       type: 'text', placeholder: 'e.g., 24 L',          required: false },
    { name: 'motorPower',      label: 'Motor Power',         type: 'text', placeholder: 'e.g., 1.5 kW',        required: false },
  ],

  'Tyres': [
    { name: 'tireSize',        label: 'Tyre Size',           type: 'text', placeholder: 'e.g., 265/70R17',     required: true,  mapTo: 'capacity' },
    { name: 'tireType',        label: 'Tyre Type',           type: 'select', options: ['Radial', 'Bias', 'Tubeless', 'Tube-type'], required: false },
    { name: 'loadRating',      label: 'Load Rating',         type: 'text', placeholder: 'e.g., 112T',          required: false },
    { name: 'speedRating',     label: 'Speed Rating',        type: 'text', placeholder: 'e.g., T (190 km/h)',  required: false },
    { name: 'application',     label: 'Application',         type: 'text', placeholder: 'e.g., All-terrain',   required: false },
  ],

  'Foot Bicycles': [
    { name: 'wheelSize',       label: 'Wheel Size',          type: 'text', placeholder: 'e.g., 26 inch',       required: true,  mapTo: 'capacity' },
    { name: 'frameSize',       label: 'Frame Size',          type: 'text', placeholder: 'e.g., 17 inch',       required: false },
    { name: 'gears',           label: 'Number of Gears',     type: 'text', placeholder: 'e.g., 21 Speed',      required: false },
    { name: 'frameMaterial',   label: 'Frame Material',      type: 'select', options: ['Alloy', 'Steel', 'Carbon', 'Aluminium'], required: false },
    { name: 'bikeType',        label: 'Bike Type',           type: 'select', options: ['Mountain', 'Road', 'Hybrid', 'City', 'BMX'], required: false },
  ],

  'Roughter Cranes': [
    { name: 'liftCapacity',    label: 'Lifting Capacity',    type: 'text', placeholder: 'e.g., 25 tons',       required: true,  mapTo: 'capacity' },
    { name: 'boomLength',      label: 'Boom Length',         type: 'text', placeholder: 'e.g., 30 m',          required: false },
    { name: 'maxRadius',       label: 'Max Working Radius',  type: 'text', placeholder: 'e.g., 25 m',          required: false },
    { name: 'enginePower',     label: 'Engine Power',        type: 'text', placeholder: 'e.g., 150 kW',        required: false },
    { name: 'fuelType',        label: 'Fuel Type',           type: 'select', options: ['Diesel', 'Petrol'],     required: false, mapTo: 'fuel_type' },
  ],

  'Forklifts': [
    { name: 'liftCapacity',  label: 'Lift Capacity',       type: 'text',   placeholder: 'e.g., 3 Ton',          required: true,  mapTo: 'capacity'  },
    { name: 'fuelType',      label: 'Fuel Type',           type: 'select', options: ['Diesel', 'Petrol', 'Battery Electric', 'LPG'], required: false, mapTo: 'fuel_type' },
    { name: 'liftHeight',    label: 'Max Lift Height',     type: 'text',   placeholder: 'e.g., 3,000 mm',       required: false },
    { name: 'mastType',      label: 'Mast Type',           type: 'select', options: ['Simplex', 'Duplex', 'Triplex'], required: false },
    { name: 'engineModel',   label: 'Engine Model',        type: 'text',   placeholder: 'e.g., Toyota 4Y',      required: false },
    { name: 'travelSpeed',   label: 'Travel Speed',        type: 'text',   placeholder: 'e.g., 18 km/h',        required: false },
  ],

  'Motor Graders': [
    { name: 'enginePower',     label: 'Engine Power',      type: 'text',   placeholder: 'e.g., 125 HP / 93 kW', required: true,  mapTo: 'capacity'  },
    { name: 'bladeWidth',      label: 'Blade Width',       type: 'text',   placeholder: 'e.g., 3,660 mm',       required: false },
    { name: 'operatingWeight', label: 'Operating Weight',  type: 'text',   placeholder: 'e.g., 12,700 kg',      required: false },
    { name: 'engineModel',     label: 'Engine Model',      type: 'text',   placeholder: 'e.g., Komatsu SAA4D107E', required: false },
    { name: 'gradeability',    label: 'Gradeability',      type: 'text',   placeholder: 'e.g., 44.7%',          required: false },
  ],

  'Road Rollers': [
    { name: 'operatingWeight', label: 'Operating Weight',  type: 'text',   placeholder: 'e.g., 8,000 kg',       required: true,  mapTo: 'capacity'  },
    { name: 'rollerType',      label: 'Roller Type',       type: 'select', options: ['Tandem Vibratory', 'Single Drum Vibratory', 'Pneumatic Tyre', 'Combination'], required: false },
    { name: 'enginePower',     label: 'Engine Power',      type: 'text',   placeholder: 'e.g., 56 kW / 75 HP',  required: false },
    { name: 'drumWidth',       label: 'Drum Width',        type: 'text',   placeholder: 'e.g., 1,680 mm',       required: false },
    { name: 'vibrationFreq',   label: 'Vibration Frequency', type: 'text', placeholder: 'e.g., 50 Hz',          required: false },
  ],

  'Special Equipment': [
    { name: 'equipmentType',   label: 'Equipment Type',    type: 'text',   placeholder: 'e.g., Hydraulic Drilling Rig', required: true, mapTo: 'capacity' },
    { name: 'drillingDepth',   label: 'Max Drilling Depth', type: 'text',  placeholder: 'e.g., 30 m',           required: false },
    { name: 'drillingDia',     label: 'Drilling Diameter', type: 'text',   placeholder: 'e.g., 600 mm',         required: false },
    { name: 'enginePower',     label: 'Engine Power',      type: 'text',   placeholder: 'e.g., 75 kW',          required: false },
    { name: 'operatingWeight', label: 'Operating Weight',  type: 'text',   placeholder: 'e.g., 8,000 kg',       required: false },
  ],

  'Winches': [
    { name: 'pullingCapacity', label: 'Pulling Capacity',    type: 'text', placeholder: 'e.g., 5 tons',        required: true,  mapTo: 'capacity' },
    { name: 'ropeLength',      label: 'Rope Length',         type: 'text', placeholder: 'e.g., 30 m',          required: false },
    { name: 'ropeDiameter',    label: 'Rope Diameter',       type: 'text', placeholder: 'e.g., 12 mm',         required: false },
    { name: 'motorPower',      label: 'Motor Power',         type: 'text', placeholder: 'e.g., 2 kW',          required: false },
    { name: 'winchType',       label: 'Winch Type',          type: 'select', options: ['Electric', 'Hydraulic', 'Manual'], required: false },
  ],

  'Electric hoist': [
    { name: 'liftCapacity',    label: 'Lifting Capacity',    type: 'text', placeholder: 'e.g., 1 ton',         required: true,  mapTo: 'capacity' },
    { name: 'liftHeight',      label: 'Lift Height',         type: 'text', placeholder: 'e.g., 6 m',           required: false },
    { name: 'liftSpeed',       label: 'Lift Speed',          type: 'text', placeholder: 'e.g., 8 m/min',       required: false },
    { name: 'motorPower',      label: 'Motor Power',         type: 'text', placeholder: 'e.g., 0.75 kW',       required: false },
    { name: 'voltage',         label: 'Voltage',             type: 'text', placeholder: 'e.g., 380V 3-Phase',  required: false },
  ],

  'Wheel Loaders': [
    { name: 'operatingWeight', label: 'Operating Weight',  type: 'text',   placeholder: 'e.g., 18,600 kg',       required: true,  mapTo: 'capacity' },
    { name: 'enginePower',     label: 'Engine Power',      type: 'text',   placeholder: 'e.g., 206 kW / 276 HP', required: false },
    { name: 'bucketCapacity',  label: 'Bucket Capacity',   type: 'text',   placeholder: 'e.g., 4.2 m³',          required: false },
    { name: 'maxSpeed',        label: 'Max Speed',         type: 'text',   placeholder: 'e.g., 38 km/h',         required: false },
    { name: 'transmission',    label: 'Transmission',      type: 'text',   placeholder: 'e.g., 4F/4R Auto',      required: false },
    { name: 'fuelType',        label: 'Fuel Type',         type: 'select', options: ['Diesel', 'Petrol'],         required: false, mapTo: 'fuel_type' },
  ],
};
