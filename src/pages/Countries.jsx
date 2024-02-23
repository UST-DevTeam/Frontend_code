export default function getCountriesName() {
    const countriesArray = [
        {
            "label": "India",
            "value": "india"
        },
        {
            "label": "Algeria",
            "value": "algeria"
        },
        {
            "label": "Andorra",
            "value": "andorra"
        },
        {
            "label": "Angola",
            "value": "angola"
        },
        {
            "label": "Anguilla",
            "value": "anguilla"
        },
        {
            "label": "Antigua & Barbuda",
            "value": "antigua_barbuda"
        },
        {
            "label": "Argentina",
            "value": "argentina"
        },
        {
            "label": "Armenia",
            "value": "armenia"
        },
        {
            "label": "Aruba",
            "value": "aruba"
        },
        {
            "label": "Australia",
            "value": "australia"
        },
        {
            "label": "Austria",
            "value": "austria"
        },
        {
            "label": "Azerbaijan",
            "value": "azerbaijan"
        },
        {
            "label": "Bahamas",
            "value": "bahamas"
        },
        {
            "label": "Bahrain",
            "value": "bahrain"
        },
        {
            "label": "Bangladesh",
            "value": "bangladesh"
        },
        {
            "label": "Barbados",
            "value": "barbados"
        },
        {
            "label": "Belarus",
            "value": "belarus"
        },
        {
            "label": "Belgium",
            "value": "belgium"
        },
        {
            "label": "Belize",
            "value": "belize"
        },
        {
            "label": "Benin",
            "value": "benin"
        },
        {
            "label": "Bermuda",
            "value": "bermuda"
        },
        {
            "label": "Bhutan",
            "value": "bhutan"
        },
        {
            "label": "Bolivia",
            "value": "bolivia"
        },
        {
            "label": "Bosnia Herzegovina",
            "value": "bosnia_herzegovina"
        },
        {
            "label": "Botswana",
            "value": "botswana"
        },
        {
            "label": "Brazil",
            "value": "brazil"
        },
        {
            "label": "Brunei",
            "value": "brunei"
        },
        {
            "label": "Bulgaria",
            "value": "bulgaria"
        },
        {
            "label": "Burkina Faso",
            "value": "burkina_faso"
        },
        {
            "label": "Burundi",
            "value": "burundi"
        },
        {
            "label": "Cambodia",
            "value": "cambodia"
        },
        {
            "label": "Cameroon",
            "value": "cameroon"
        },
        {
            "label": "Canada",
            "value": "canada"
        },
        {
            "label": "Cape Verde Islands",
            "value": "cape_verde_islands"
        },
        {
            "label": "Cayman Islands",
            "value": "cayman_islands"
        },
        {
            "label": "Central African Republic",
            "value": "central_african_republic"
        },
        {
            "label": "Chile",
            "value": "chile"
        },
        {
            "label": "China",
            "value": "china"
        },
        {
            "label": "Colombia",
            "value": "colombia"
        },
        {
            "label": "Comoros",
            "value": "comoros"
        },
        {
            "label": "Congo",
            "value": "congo"
        },
        {
            "label": "Cook Islands",
            "value": "cook_islands"
        },
        {
            "label": "Costa Rica",
            "value": "costa_rica"
        },
        {
            "label": "Croatia",
            "value": "croatia"
        },
        {
            "label": "Cuba",
            "value": "cuba"
        },
        {
            "label": "Cyprus North",
            "value": "cyprus_north"
        },
        {
            "label": "Cyprus South",
            "value": "cyprus_south"
        },
        {
            "label": "Czech Republic",
            "value": "czech_republic"
        },
        {
            "label": "Denmark",
            "value": "denmark"
        },
        {
            "label": "Djibouti",
            "value": "djibouti"
        },
        {
            "label": "Dominica",
            "value": "dominica"
        },
        {
            "label": "Dominican Republic",
            "value": "dominican_republic"
        },
        {
            "label": "Ecuador",
            "value": "ecuador"
        },
        {
            "label": "Egypt",
            "value": "egypt"
        },
        {
            "label": "El Salvador",
            "value": "el_salvador"
        },
        {
            "label": "Equatorial Guinea",
            "value": "equatorial_guinea"
        },
        {
            "label": "Eritrea",
            "value": "eritrea"
        },
        {
            "label": "Estonia",
            "value": "estonia"
        },
        {
            "label": "Ethiopia",
            "value": "ethiopia"
        },
        {
            "label": "Falkland Islands",
            "value": "falkland_islands"
        },
        {
            "label": "Faroe Islands",
            "value": "faroe_islands"
        },
        {
            "label": "Fiji",
            "value": "fiji"
        },
        {
            "label": "Finland",
            "value": "finland"
        },
        {
            "label": "France",
            "value": "france"
        },
        {
            "label": "French Guiana",
            "value": "french_guiana"
        },
        {
            "label": "French Polynesia",
            "value": "french_polynesia"
        },
        {
            "label": "Gabon",
            "value": "gabon"
        },
        {
            "label": "Gambia",
            "value": "gambia"
        },
        {
            "label": "Georgia",
            "value": "georgia"
        },
        {
            "label": "Germany",
            "value": "germany"
        },
        {
            "label": "Ghana",
            "value": "ghana"
        },
        {
            "label": "Gibraltar",
            "value": "gibraltar"
        },
        {
            "label": "Greece",
            "value": "greece"
        },
        {
            "label": "Greenland",
            "value": "greenland"
        },
        {
            "label": "Grenada",
            "value": "grenada"
        },
        {
            "label": "Guadeloupe",
            "value": "guadeloupe"
        },
        {
            "label": "Guam",
            "value": "guam"
        },
        {
            "label": "Guatemala",
            "value": "guatemala"
        },
        {
            "label": "Guinea",
            "value": "guinea"
        },
        {
            "label": "Guinea - Bissau",
            "value": "guinea_bissau"
        },
        {
            "label": "Guyana",
            "value": "guyana"
        },
        {
            "label": "Haiti",
            "value": "haiti"
        },
        {
            "label": "Honduras",
            "value": "honduras"
        },
        {
            "label": "Hong Kong",
            "value": "hong_kong"
        },
        {
            "label": "Hungary",
            "value": "hungary"
        },
        {
            "label": "Iceland",
            "value": "iceland"
        },
        {
            "label": "Indonesia",
            "value": "indonesia"
        },
        {
            "label": "Iran",
            "value": "iran"
        },
        {
            "label": "Iraq",
            "value": "iraq"
        },
        {
            "label": "Ireland",
            "value": "ireland"
        },
        {
            "label": "Israel",
            "value": "israel"
        },
        {
            "label": "Italy",
            "value": "italy"
        },
        {
            "label": "Jamaica",
            "value": "jamaica"
        },
        {
            "label": "Japan",
            "value": "japan"
        },
        {
            "label": "Jordan",
            "value": "jordan"
        },
        {
            "label": "Kazakhstan",
            "value": "kazakhstan"
        },
        {
            "label": "Kenya",
            "value": "kenya"
        },
        {
            "label": "Kiribati",
            "value": "kiribati"
        },
        {
            "label": "Korea North",
            "value": "korea_north"
        },
        {
            "label": "Korea South",
            "value": "korea_south"
        },
        {
            "label": "Kuwait",
            "value": "kuwait"
        },
        {
            "label": "Kyrgyzstan",
            "value": "kyrgyzstan"
        },
        {
            "label": "Laos",
            "value": "laos"
        },
        {
            "label": "Latvia",
            "value": "latvia"
        },
        {
            "label": "Lebanon",
            "value": "lebanon"
        },
        {
            "label": "Lesotho",
            "value": "lesotho"
        },
        {
            "label": "Liberia",
            "value": "liberia"
        },
        {
            "label": "Libya",
            "value": "libya"
        },
        {
            "label": "Liechtenstein",
            "value": "liechtenstein"
        },
        {
            "label": "Lithuania",
            "value": "lithuania"
        },
        {
            "label": "Luxembourg",
            "value": "luxembourg"
        },
        {
            "label": "Macao",
            "value": "macao"
        },
        {
            "label": "Macedonia",
            "value": "macedonia"
        },
        {
            "label": "Madagascar",
            "value": "madagascar"
        },
        {
            "label": "Malawi",
            "value": "malawi"
        },
        {
            "label": "Malaysia",
            "value": "malaysia"
        },
        {
            "label": "Maldives",
            "value": "maldives"
        },
        {
            "label": "Mali",
            "value": "mali"
        },
        {
            "label": "Malta",
            "value": "malta"
        },
        {
            "label": "Marshall Islands",
            "value": "marshall_islands"
        },
        {
            "label": "Martinique",
            "value": "martinique"
        },
        {
            "label": "Mauritania",
            "value": "mauritania"
        },
        {
            "label": "Mauritius",
            "value": "mauritius"
        },
        {
            "label": "Mayotte",
            "value": "mayotte"
        },
        {
            "label": "Mexico",
            "value": "mexico"
        },
        {
            "label": "Moldova",
            "value": "moldova"
        },
        {
            "label": "Monaco",
            "value": "monaco"
        },
        {
            "label": "Mongolia",
            "value": "mongolia"
        },
        {
            "label": "Montserrat",
            "value": "montserrat"
        },
        {
            "label": "Morocco",
            "value": "morocco"
        },
        {
            "label": "Mozambique",
            "value": "mozambique"
        },
        {
            "label": "Myanmar",
            "value": "myanmar"
        },
        {
            "label": "Namibia",
            "value": "namibia"
        },
        {
            "label": "Nauru",
            "value": "nauru"
        },
        {
            "label": "Nepal",
            "value": "nepal"
        },
        {
            "label": "Netherlands",
            "value": "netherlands"
        },
        {
            "label": "New Caledonia",
            "value": "new_caledonia"
        },
        {
            "label": "New Zealand",
            "value": "new_zealand"
        },
        {
            "label": "Nicaragua",
            "value": "nicaragua"
        },
        {
            "label": "Niger",
            "value": "niger"
        },
        {
            "label": "Nigeria",
            "value": "nigeria"
        },
        {
            "label": "Niue",
            "value": "niue"
        },
        {
            "label": "Norfolk Islands",
            "value": "norfolk_islands"
        },
        {
            "label": "Northern Mariana Islands",
            "value": "northern_mariana_islands"
        },
        {
            "label": "Norway",
            "value": "norway"
        },
        {
            "label": "Oman",
            "value": "oman"
        },
        {
            "label": "Pakistan",
            "value": "pakistan"
        },
        {
            "label": "Palau",
            "value": "palau"
        },
        {
            "label": "Panama",
            "value": "panama"
        },
        {
            "label": "Papua New Guinea",
            "value": "papua_new_guinea"
        },
        {
            "label": "Paraguay",
            "value": "paraguay"
        },
        {
            "label": "Peru",
            "value": "peru"
        },
        {
            "label": "Philippines",
            "value": "philippines"
        },
        {
            "label": "Poland",
            "value": "poland"
        },
        {
            "label": "Portugal",
            "value": "portugal"
        },
        {
            "label": "Puerto Rico",
            "value": "puerto_rico"
        },
        {
            "label": "Qatar",
            "value": "qatar"
        },
        {
            "label": "Reunion",
            "value": "reunion"
        },
        {
            "label": "Romania",
            "value": "romania"
        },
        {
            "label": "Russia",
            "value": "russia"
        },
        {
            "label": "Rwanda",
            "value": "rwanda"
        },
        {
            "label": "Saint Helena",
            "value": "saint_helena"
        },
        {
            "label": "Saint Kitts & Nevis",
            "value": "saint_kitts_nevis"
        },
        {
            "label": "Saint Lucia",
            "value": "saint_lucia"
        },
        {
            "label": "Saint Pierre & Miquelon",
            "value": "saint_pierre_miquelon"
        },
        {
            "label": "Saint Vincent & Grenadines",
            "value": "saint_vincent_grenadines"
        },
        {
            "label": "Samoa",
            "value": "samoa"
        },
        {
            "label": "San Marino",
            "value": "san_marino"
        },
        {
            "label": "Sao Tome & Principe",
            "value": "sao_tome_principe"
        },
        {
            "label": "Saudi Arabia",
            "value": "saudi_arabia"
        },
        {
            "label": "Senegal",
            "value": "senegal"
        },
        {
            "label": "Seychelles",
            "value": "seychelles"
        },
        {
            "label": "Sierra Leone",
            "value": "sierra_leone"
        },
        {
            "label": "Singapore",
            "value": "singapore"
        },
        {
            "label": "Slovakia",
            "value": "slovakia"
        },
        {
            "label": "Slovenia",
            "value": "slovenia"
        },
        {
            "label": "Solomon Islands",
            "value": "solomon_islands"
        },
        {
            "label": "Somalia",
            "value": "somalia"
        },
        {
            "label": "South Africa",
            "value": "south_africa"
        },
        {
            "label": "Spain",
            "value": "spain"
        },
        {
            "label": "Sri Lanka",
            "value": "sri_lanka"
        },
        {
            "label": "Sudan",
            "value": "sudan"
        },
        {
            "label": "Suriname",
            "value": "suriname"
        },
        {
            "label": "Swaziland",
            "value": "swaziland"
        },
        {
            "label": "Sweden",
            "value": "sweden"
        },
        {
            "label": "Switzerland",
            "value": "switzerland"
        },
        {
            "label": "Syria",
            "value": "syria"
        },
        {
            "label": "Taiwan",
            "value": "taiwan"
        },
        {
            "label": "Tajikistan",
            "value": "tajikistan"
        },
        {
            "label": "Tanzania",
            "value": "tanzania"
        },
        {
            "label": "Thailand",
            "value": "thailand"
        },
        {
            "label": "Togo",
            "value": "togo"
        },
        {
            "label": "Tonga",
            "value": "tonga"
        },
        {
            "label": "Trinidad & Tobago",
            "value": "trinidad_tobago"
        },
        {
            "label": "Tunisia",
            "value": "tunisia"
        },
        {
            "label": "Turkey",
            "value": "turkey"
        },
        {
            "label": "Turkmenistan",
            "value": "turkmenistan"
        },
        {
            "label": "Turks & Caicos Islands",
            "value": "turks_caicos_islands"
        },
        {
            "label": "Tuvalu",
            "value": "tuvalu"
        },
        {
            "label": "Uganda",
            "value": "uganda"
        },
        {
            "label": "Ukraine",
            "value": "ukraine"
        },
        {
            "label": "United Arab Emirates",
            "value": "united_arab_emirates"
        },
        {
            "label": "United Kingdom",
            "value": "united_kingdom"
        },
        {
            "label": "Uruguay",
            "value": "uruguay"
        },
        {
            "label": "Uzbekistan",
            "value": "uzbekistan"
        },
        {
            "label": "Vanuatu",
            "value": "vanuatu"
        },
        {
            "label": "Vatican City",
            "value": "vatican_city"
        },
        {
            "label": "Venezuela",
            "value": "venezuela"
        },
        {
            "label": "Vietnam",
            "value": "vietnam"
        },
        {
            "label": "Virgin Islands - British",
            "value": "virgin_islands_british"
        },
        {
            "label": "Virgin Islands - US",
            "value": "virgin_islands_us"
        },
        {
            "label": "Wallis & Futuna",
            "value": "wallis_futuna"
        },
        {
            "label": "Yemen (North)",
            "value": "yemen_north"
        },
        {
            "label": "Yemen (South)",
            "value": "yemen_south"
        },
        {
            "label": "Zambia",
            "value": "zambia"
        },
        {
            "label": "Zimbabwe",
            "value": "zimbabwe"
        }
    ]
    
    return countriesArray;
}