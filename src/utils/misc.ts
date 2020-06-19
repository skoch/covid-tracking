const formatNumber = (num: number) => {
  return Math.floor(num)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const statesData = [
  {
    state: 'Alabama',
    slug: 'alabama',
    code: 'AL',
  },
  {
    state: 'Alaska',
    slug: 'alaska',
    code: 'AK',
  },
  {
    state: 'Arizona',
    slug: 'arizona',
    code: 'AZ',
  },
  {
    state: 'Arkansas',
    slug: 'arkansas',
    code: 'AR',
  },
  {
    state: 'California',
    slug: 'california',
    code: 'CA',
  },
  {
    state: 'Colorado',
    slug: 'colorado',
    code: 'CO',
  },
  {
    state: 'Connecticut',
    slug: 'connecticut',
    code: 'CT',
  },
  {
    state: 'Delaware',
    slug: 'delaware',
    code: 'DE',
  },
  {
    state: 'District of Columbia',
    slug: 'district-of-columbia',
    code: 'DC',
  },
  {
    state: 'Florida',
    slug: 'florida',
    code: 'FL',
  },
  {
    state: 'Georgia',
    slug: 'georgia',
    code: 'GA',
  },
  {
    state: 'Hawaii',
    slug: 'hawaii',
    code: 'HI',
  },
  {
    state: 'Idaho',
    slug: 'idaho',
    code: 'ID',
  },
  {
    state: 'Illinois',
    slug: 'illinois',
    code: 'IL',
  },
  {
    state: 'Indiana',
    slug: 'indiana',
    code: 'IN',
  },
  {
    state: 'Iowa',
    slug: 'iowa',
    code: 'IA',
  },
  {
    state: 'Kansas',
    slug: 'kansas',
    code: 'KS',
  },
  {
    state: 'Kentucky',
    slug: 'kentucky',
    code: 'KY',
  },
  {
    state: 'Louisiana',
    slug: 'louisiana',
    code: 'LA',
  },
  {
    state: 'Maine',
    slug: 'maine',
    code: 'ME',
  },
  {
    state: 'Maryland',
    slug: 'maryland',
    code: 'MD',
  },
  {
    state: 'Massachusetts',
    slug: 'massachusetts',
    code: 'MA',
  },
  {
    state: 'Michigan',
    slug: 'michigan',
    code: 'MI',
  },
  {
    state: 'Minnesota',
    slug: 'minnesota',
    code: 'MN',
  },
  {
    state: 'Mississippi',
    slug: 'mississippi',
    code: 'MS',
  },
  {
    state: 'Missouri',
    slug: 'missouri',
    code: 'MO',
  },
  {
    state: 'Montana',
    slug: 'montana',
    code: 'MT',
  },
  {
    state: 'Nebraska',
    slug: 'nebraska',
    code: 'NE',
  },
  {
    state: 'Nevada',
    slug: 'nevada',
    code: 'NV',
  },
  {
    state: 'New Hampshire',
    slug: 'new-hampshire',
    code: 'NH',
  },
  {
    state: 'New Jersey',
    slug: 'new-jersey',
    code: 'NJ',
  },
  {
    state: 'New Mexico',
    slug: 'new-mexico',
    code: 'NM',
  },
  {
    state: 'New York',
    slug: 'new-york',
    code: 'NY',
  },
  {
    state: 'North Carolina',
    slug: 'north-carolina',
    code: 'NC',
  },
  {
    state: 'North Dakota',
    slug: 'north-dakota',
    code: 'ND',
  },
  {
    state: 'Ohio',
    slug: 'ohio',
    code: 'OH',
  },
  {
    state: 'Oklahoma',
    slug: 'oklahoma',
    code: 'OK',
  },
  {
    state: 'Oregon',
    slug: 'oregon',
    code: 'OR',
  },
  {
    state: 'Pennsylvania',
    slug: 'pennsylvania',
    code: 'PA',
  },
  {
    state: 'Rhode Island',
    slug: 'rhode-island',
    code: 'RI',
  },
  {
    state: 'South Carolina',
    slug: 'south-carolina',
    code: 'SC',
  },
  {
    state: 'South Dakota',
    slug: 'south-dakota',
    code: 'SD',
  },
  {
    state: 'Tennessee',
    slug: 'tennessee',
    code: 'TN',
  },
  {
    state: 'Texas',
    slug: 'texas',
    code: 'TX',
  },
  {
    state: 'Utah',
    slug: 'utah',
    code: 'UT',
  },
  {
    state: 'Vermont',
    slug: 'vermont',
    code: 'VT',
  },
  {
    state: 'Virginia',
    slug: 'virginia',
    code: 'VA',
  },
  {
    state: 'Washington',
    slug: 'washington',
    code: 'WA',
  },
  {
    state: 'West Virginia',
    slug: 'west-virginia',
    code: 'WV',
  },
  {
    state: 'Wisconsin',
    slug: 'wisconsin',
    code: 'WI',
  },
  {
    state: 'Wyoming',
    slug: 'wyoming',
    code: 'WY',
  },
  {
    state: 'Puerto Rico',
    slug: 'puerto-rico',
    code: 'PR',
  },
  {
    state: 'American Samoa',
    slug: 'american-samoa',
    code: 'AS',
  },
  {
    state: 'Guam',
    slug: 'guam',
    code: 'GU',
  },
  {
    state: 'Virgin Islands',
    slug: 'virgin-islands',
    code: 'VI',
  },
  {
    state: 'Northern Mariana Islands',
    slug: 'northern-mariana-islands',
    code: 'MP',
  },
];

export default formatNumber;
