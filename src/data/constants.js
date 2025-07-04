// Constants for Pacific connectivity data

// Pacific Island Countries and Territories (based on actual data)
export const PACIFIC_COUNTRIES = [
  { code: 'CK', name: 'Cook Islands' },
  { code: 'FJ', name: 'Fiji' },
  { code: 'KI', name: 'Kiribati' },
  { code: 'MH', name: 'Marshall Islands' },
  { code: 'FM', name: 'Micronesia (Federated States of)' },
  { code: 'NR', name: 'Nauru' },
  { code: 'NU', name: 'Niue' },
  { code: 'PW', name: 'Palau' },
  { code: 'PG', name: 'Papua New Guinea' },
  { code: 'WS', name: 'Samoa' },
  { code: 'SB', name: 'Solomon Islands' },
  { code: 'TO', name: 'Tonga' },
  { code: 'TV', name: 'Tuvalu' },
  { code: 'VU', name: 'Vanuatu' },
  { code: 'PF', name: 'French Polynesia' },
  { code: 'NC', name: 'New Caledonia' }
];

// Country codes to names mapping
export const COUNTRY_NAMES = PACIFIC_COUNTRIES.reduce((acc, country) => {
  acc[country.code] = country.name;
  return acc;
}, {});

// Key indicators for visualization (based on actual data)
export const INDICATORS = {
  INTERNET_USAGE: 'IT_USE_ii99',           // Proportion of individuals using the Internet
  BROADBAND_NETWORK: 'IT_NET_BBND',       // Broadband network access  
  MOBILE_OWNERSHIP: 'IT_MOB_OWN',         // Mobile phone ownership
  FOUR_G_COVERAGE: 'IT_MOB_4GNTWK',       // 4G mobile network coverage
  CYBERSECURITY_RANK: 'NCSI_RANK',       // National Cybersecurity Index ranking
  CYBERSECURITY_POLICY: 'NCSI_POLI',     // Cybersecurity policy indicators
  ROADS_UNPAVED: 'BPI_PRU',              // Infrastructure - unpaved roads
  AIRPORTS_UNPAVED: 'BPI_PAU',           // Infrastructure - unpaved airports
  EMAIL_SKILLS: 'MAILFILE',              // Digital skills - email with attachments
  SOFTWARE_SKILLS: 'DOWNSOFT'            // Digital skills - software downloads
};

// Color palette for Pacific theme
export const PACIFIC_COLORS = {
  primary: '#0ea5e9',    // Sky blue
  secondary: '#10b981',  // Emerald green
  accent: '#f59e0b',     // Amber
  success: '#22c55e',    // Green
  warning: '#eab308',    // Yellow
  error: '#ef4444',      // Red
  neutral: '#6b7280'     // Gray
};

// Time range for data (based on actual data availability)
export const TIME_RANGE = {
  START_YEAR: 2003,
  END_YEAR: 2024,
  PEAK_YEARS: [2013, 2019, 2015, 2021] // Years with most data availability
};