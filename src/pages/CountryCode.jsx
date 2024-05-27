export default function getCountries() {
    const countriesArray = [
        {
            "label": "India (+91)",
            "value": "+91",
            "data-countryCode": "IN"
        },
        {
            "label": "Algeria (+213)",
            "value": "+213",
            "data-countryCode": "DZ"
        },
        {
            "label": "Andorra (+376)",
            "value": "+376",
            "data-countryCode": "AD"
        },
        {
            "label": "Angola (+244)",
            "value": "+244",
            "data-countryCode": "AO"
        },
        {
            "label": "Anguilla (+1264)",
            "value": "+1264",
            "data-countryCode": "AI"
        },
        {
            "label": "Antigua & Barbuda (+1268)",
            "value": "+1268",
            "data-countryCode": "AG"
        },
        {
            "label": "Argentina (+54)",
            "value": "+54",
            "data-countryCode": "AR"
        },
        {
            "label": "Armenia (+374)",
            "value": "+374",
            "data-countryCode": "AM"
        },
        {
            "label": "Aruba (+297)",
            "value": "+297",
            "data-countryCode": "AW"
        },
        {
            "label": "Australia (+61)",
            "value": "+61",
            "data-countryCode": "AU"
        },
        {
            "label": "Austria (+43)",
            "value": "+43",
            "data-countryCode": "AT"
        },
        {
            "label": "Azerbaijan (+994)",
            "value": "+994",
            "data-countryCode": "AZ"
        },
        {
            "label": "Bahamas (+1242)",
            "value": "+1242",
            "data-countryCode": "BS"
        },
        {
            "label": "Bahrain (+973)",
            "value": "+973",
            "data-countryCode": "BH"
        },
        {
            "label": "Bangladesh (+880)",
            "value": "+880",
            "data-countryCode": "BD"
        },
        {
            "label": "Barbados (+1246)",
            "value": "+1246",
            "data-countryCode": "BB"
        },
        {
            "label": "Belarus (+375)",
            "value": "+375",
            "data-countryCode": "BY"
        },
        {
            "label": "Belgium (+32)",
            "value": "+32",
            "data-countryCode": "BE"
        },
        {
            "label": "Belize (+501)",
            "value": "+501",
            "data-countryCode": "BZ"
        },
        {
            "label": "Benin (+229)",
            "value": "+229",
            "data-countryCode": "BJ"
        },
        {
            "label": "Bermuda (+1441)",
            "value": "+1441",
            "data-countryCode": "BM"
        },
        {
            "label": "Bhutan (+975)",
            "value": "+975",
            "data-countryCode": "BT"
        },
        {
            "label": "Bolivia (+591)",
            "value": "+591",
            "data-countryCode": "BO"
        },
        {
            "label": "Bosnia Herzegovina (+387)",
            "value": "+387",
            "data-countryCode": "BA"
        },
        {
            "label": "Botswana (+267)",
            "value": "+267",
            "data-countryCode": "BW"
        },
        {
            "label": "Brazil (+55)",
            "value": "+55",
            "data-countryCode": "BR"
        },
        {
            "label": "Brunei (+673)",
            "value": "+673",
            "data-countryCode": "BN"
        },
        {
            "label": "Bulgaria (+359)",
            "value": "+359",
            "data-countryCode": "BG"
        },
        {
            "label": "Burkina Faso (+226)",
            "value": "+226",
            "data-countryCode": "BF"
        },
        {
            "label": "Burundi (+257)",
            "value": "+257",
            "data-countryCode": "BI"
        },
        {
            "label": "Cambodia (+855)",
            "value": "+855",
            "data-countryCode": "KH"
        },
        {
            "label": "Cameroon (+237)",
            "value": "+237",
            "data-countryCode": "CM"
        },
        {
            "label": "Canada (+1)",
            "value": "+1",
            "data-countryCode": "CA"
        },
        {
            "label": "Cape Verde Islands (+238)",
            "value": "+238",
            "data-countryCode": "CV"
        },
        {
            "label": "Cayman Islands (+1345)",
            "value": "+1345",
            "data-countryCode": "KY"
        },
        {
            "label": "Central African Republic (+236)",
            "value": "+236",
            "data-countryCode": "CF"
        },
        {
            "label": "Chile (+56)",
            "value": "+56",
            "data-countryCode": "CL"
        },
        {
            "label": "China (+86)",
            "value": "+86",
            "data-countryCode": "CN"
        },
        {
            "label": "Colombia (+57)",
            "value": "+57",
            "data-countryCode": "CO"
        },
        {
            "label": "Comoros (+269)",
            "value": "+269",
            "data-countryCode": "KM"
        },
        {
            "label": "Congo (+242)",
            "value": "+242",
            "data-countryCode": "CG"
        },
        {
            "label": "Cook Islands (+682)",
            "value": "+682",
            "data-countryCode": "CK"
        },
        {
            "label": "Costa Rica (+506)",
            "value": "+506",
            "data-countryCode": "CR"
        },
        {
            "label": "Croatia (+385)",
            "value": "+385",
            "data-countryCode": "HR"
        },
        {
            "label": "Cuba (+53)",
            "value": "+53",
            "data-countryCode": "CU"
        },
        {
            "label": "Cyprus North (+90392)",
            "value": "+90392",
            "data-countryCode": "CY"
        },
        {
            "label": "Cyprus South (+357)",
            "value": "+357",
            "data-countryCode": "CY"
        },
        {
            "label": "Czech Republic (+42)",
            "value": "+42",
            "data-countryCode": "CZ"
        },
        {
            "label": "Denmark (+45)",
            "value": "+45",
            "data-countryCode": "DK"
        },
        {
            "label": "Djibouti (+253)",
            "value": "+253",
            "data-countryCode": "DJ"
        },
        {
            "label": "Dominica (+1809)",
            "value": "+1809",
            "data-countryCode": "DM"
        },
        {
            "label": "Dominican Republic (+1809)",
            "value": "+1809",
            "data-countryCode": "DO"
        },
        {
            "label": "Ecuador (+593)",
            "value": "+593",
            "data-countryCode": "EC"
        },
        {
            "label": "Egypt (+20)",
            "value": "+20",
            "data-countryCode": "EG"
        },
        {
            "label": "El Salvador (+503)",
            "value": "+503",
            "data-countryCode": "SV"
        },
        {
            "label": "Equatorial Guinea (+240)",
            "value": "+240",
            "data-countryCode": "GQ"
        },
        {
            "label": "Eritrea (+291)",
            "value": "+291",
            "data-countryCode": "ER"
        },
        {
            "label": "Estonia (+372)",
            "value": "+372",
            "data-countryCode": "EE"
        },
        {
            "label": "Ethiopia (+251)",
            "value": "+251",
            "data-countryCode": "ET"
        },
        {
            "label": "Falkland Islands (+500)",
            "value": "+500",
            "data-countryCode": "FK"
        },
        {
            "label": "Faroe Islands (+298)",
            "value": "+298",
            "data-countryCode": "FO"
        },
        {
            "label": "Fiji (+679)",
            "value": "+679",
            "data-countryCode": "FJ"
        },
        {
            "label": "Finland (+358)",
            "value": "+358",
            "data-countryCode": "FI"
        },
        {
            "label": "France (+33)",
            "value": "+33",
            "data-countryCode": "FR"
        },
        {
            "label": "French Guiana (+594)",
            "value": "+594",
            "data-countryCode": "GF"
        },
        {
            "label": "French Polynesia (+689)",
            "value": "+689",
            "data-countryCode": "PF"
        },
        {
            "label": "Gabon (+241)",
            "value": "+241",
            "data-countryCode": "GA"
        },
        {
            "label": "Gambia (+220)",
            "value": "+220",
            "data-countryCode": "GM"
        },
        {
            "label": "Georgia (+7880)",
            "value": "+7880",
            "data-countryCode": "GE"
        },
        {
            "label": "Germany (+49)",
            "value": "+49",
            "data-countryCode": "DE"
        },
        {
            "label": "Ghana (+233)",
            "value": "+233",
            "data-countryCode": "GH"
        },
        {
            "label": "Gibraltar (+350)",
            "value": "+350",
            "data-countryCode": "GI"
        },
        {
            "label": "Greece (+30)",
            "value": "+30",
            "data-countryCode": "GR"
        },
        {
            "label": "Greenland (+299)",
            "value": "+299",
            "data-countryCode": "GL"
        },
        {
            "label": "Grenada (+1473)",
            "value": "+1473",
            "data-countryCode": "GD"
        },
        {
            "label": "Guadeloupe (+590)",
            "value": "+590",
            "data-countryCode": "GP"
        },
        {
            "label": "Guam (+671)",
            "value": "+671",
            "data-countryCode": "GU"
        },
        {
            "label": "Guatemala (+502)",
            "value": "+502",
            "data-countryCode": "GT"
        },
        {
            "label": "Guinea (+224)",
            "value": "+224",
            "data-countryCode": "GN"
        },
        {
            "label": "Guinea - Bissau (+245)",
            "value": "+245",
            "data-countryCode": "GW"
        },
        {
            "label": "Guyana (+592)",
            "value": "+592",
            "data-countryCode": "GY"
        },
        {
            "label": "Haiti (+509)",
            "value": "+509",
            "data-countryCode": "HT"
        },
        {
            "label": "Honduras (+504)",
            "value": "+504",
            "data-countryCode": "HN"
        },
        {
            "label": "Hong Kong (+852)",
            "value": "+852",
            "data-countryCode": "HK"
        },
        {
            "label": "Hungary (+36)",
            "value": "+36",
            "data-countryCode": "HU"
        },
        {
            "label": "Iceland (+354)",
            "value": "+354",
            "data-countryCode": "IS"
        },
        {
            "label": "Indonesia (+62)",
            "value": "+62",
            "data-countryCode": "ID"
        },
        {
            "label": "Iran (+98)",
            "value": "+98",
            "data-countryCode": "IR"
        },
        {
            "label": "Iraq (+964)",
            "value": "+964",
            "data-countryCode": "IQ"
        },
        {
            "label": "Ireland (+353)",
            "value": "+353",
            "data-countryCode": "IE"
        },
        {
            "label": "Israel (+972)",
            "value": "+972",
            "data-countryCode": "IL"
        },
        {
            "label": "Italy (+39)",
            "value": "+39",
            "data-countryCode": "IT"
        },
        {
            "label": "Jamaica (+1876)",
            "value": "+1876",
            "data-countryCode": "JM"
        },
        {
            "label": "Japan (+81)",
            "value": "+81",
            "data-countryCode": "JP"
        },
        {
            "label": "Jordan (+962)",
            "value": "+962",
            "data-countryCode": "JO"
        },
        {
            "label": "Kazakhstan (+7)",
            "value": "+7",
            "data-countryCode": "KZ"
        },
        {
            "label": "Kenya (+254)",
            "value": "+254",
            "data-countryCode": "KE"
        },
        {
            "label": "Kiribati (+686)",
            "value": "+686",
            "data-countryCode": "KI"
        },
        {
            "label": "Korea North (+850)",
            "value": "+850",
            "data-countryCode": "KP"
        },
        {
            "label": "Korea South (+82)",
            "value": "+82",
            "data-countryCode": "KR"
        },
        {
            "label": "Kuwait (+965)",
            "value": "+965",
            "data-countryCode": "KW"
        },
        {
            "label": "Kyrgyzstan (+996)",
            "value": "+996",
            "data-countryCode": "KG"
        },
        {
            "label": "Laos (+856)",
            "value": "+856",
            "data-countryCode": "LA"
        },
        {
            "label": "Latvia (+371)",
            "value": "+371",
            "data-countryCode": "LV"
        },
        {
            "label": "Lebanon (+961)",
            "value": "+961",
            "data-countryCode": "LB"
        },
        {
            "label": "Lesotho (+266)",
            "value": "+266",
            "data-countryCode": "LS"
        },
        {
            "label": "Liberia (+231)",
            "value": "+231",
            "data-countryCode": "LR"
        },
        {
            "label": "Libya (+218)",
            "value": "+218",
            "data-countryCode": "LY"
        },
        {
            "label": "Liechtenstein (+417)",
            "value": "+417",
            "data-countryCode": "LI"
        },
        {
            "label": "Lithuania (+370)",
            "value": "+370",
            "data-countryCode": "LT"
        },
        {
            "label": "Luxembourg (+352)",
            "value": "+352",
            "data-countryCode": "LU"
        },
        {
            "label": "Macao (+853)",
            "value": "+853",
            "data-countryCode": "MO"
        },
        {
            "label": "Macedonia (+389)",
            "value": "+389",
            "data-countryCode": "MK"
        },
        {
            "label": "Madagascar (+261)",
            "value": "+261",
            "data-countryCode": "MG"
        },
        {
            "label": "Malawi (+265)",
            "value": "+265",
            "data-countryCode": "MW"
        },
        {
            "label": "Malaysia (+60)",
            "value": "+60",
            "data-countryCode": "MY"
        },
        {
            "label": "Maldives (+960)",
            "value": "+960",
            "data-countryCode": "MV"
        },
        {
            "label": "Mali (+223)",
            "value": "+223",
            "data-countryCode": "ML"
        },
        {
            "label": "Malta (+356)",
            "value": "+356",
            "data-countryCode": "MT"
        },
        {
            "label": "Marshall Islands (+692)",
            "value": "+692",
            "data-countryCode": "MH"
        },
        {
            "label": "Martinique (+596)",
            "value": "+596",
            "data-countryCode": "MQ"
        },
        {
            "label": "Mauritania (+222)",
            "value": "+222",
            "data-countryCode": "MR"
        },
        {
            "label": "Mayotte (+269)",
            "value": "+269",
            "data-countryCode": "YT"
        },
        {
            "label": "Mexico (+52)",
            "value": "+52",
            "data-countryCode": "MX"
        },
        {
            "label": "Micronesia (+691)",
            "value": "+691",
            "data-countryCode": "FM"
        },
        {
            "label": "Moldova (+373)",
            "value": "+373",
            "data-countryCode": "MD"
        },
        {
            "label": "Monaco (+377)",
            "value": "+377",
            "data-countryCode": "MC"
        },
        {
            "label": "Mongolia (+976)",
            "value": "+976",
            "data-countryCode": "MN"
        },
        {
            "label": "Montserrat (+1664)",
            "value": "+1664",
            "data-countryCode": "MS"
        },
        {
            "label": "Morocco (+212)",
            "value": "+212",
            "data-countryCode": "MA"
        },
        {
            "label": "Mozambique (+258)",
            "value": "+258",
            "data-countryCode": "MZ"
        },
        {
            "label": "Myanmar (+95)",
            "value": "+95",
            "data-countryCode": "MM"
        },
        {
            "label": "Namibia (+264)",
            "value": "+264",
            "data-countryCode": "NA"
        },
        {
            "label": "Nauru (+674)",
            "value": "+674",
            "data-countryCode": "NR"
        },
        {
            "label": "Nepal (+977)",
            "value": "+977",
            "data-countryCode": "NP"
        },
        {
            "label": "Netherlands (+31)",
            "value": "+31",
            "data-countryCode": "NL"
        },
        {
            "label": "New Caledonia (+687)",
            "value": "+687",
            "data-countryCode": "NC"
        },
        {
            "label": "New Zealand (+64)",
            "value": "+64",
            "data-countryCode": "NZ"
        },
        {
            "label": "Nicaragua (+505)",
            "value": "+505",
            "data-countryCode": "NI"
        },
        {
            "label": "Niger (+227)",
            "value": "+227",
            "data-countryCode": "NE"
        },
        {
            "label": "Nigeria (+234)",
            "value": "+234",
            "data-countryCode": "NG"
        },
        {
            "label": "Niue (+683)",
            "value": "+683",
            "data-countryCode": "NU"
        },
        {
            "label": "Norfolk Islands (+672)",
            "value": "+672",
            "data-countryCode": "NF"
        },
        {
            "label": "Northern Marianas (+670)",
            "value": "+670",
            "data-countryCode": "MP"
        },
        {
            "label": "Norway (+47)",
            "value": "+47",
            "data-countryCode": "NO"
        },
        {
            "label": "Oman (+968)",
            "value": "+968",
            "data-countryCode": "OM"
        },
        {
            "label": "Palau (+680)",
            "value": "+680",
            "data-countryCode": "PW"
        },
        {
            "label": "Panama (+507)",
            "value": "+507",
            "data-countryCode": "PA"
        },
        {
            "label": "Papua New Guinea (+675)",
            "value": "+675",
            "data-countryCode": "PG"
        },
        {
            "label": "Paraguay (+595)",
            "value": "+595",
            "data-countryCode": "PY"
        },
        {
            "label": "Peru (+51)",
            "value": "+51",
            "data-countryCode": "PE"
        },
        {
            "label": "Philippines (+63)",
            "value": "+63",
            "data-countryCode": "PH"
        },
        {
            "label": "Poland (+48)",
            "value": "+48",
            "data-countryCode": "PL"
        },
        {
            "label": "Portugal (+351)",
            "value": "+351",
            "data-countryCode": "PT"
        },
        {
            "label": "Puerto Rico (+1787)",
            "value": "+1787",
            "data-countryCode": "PR"
        },
        {
            "label": "Qatar (+974)",
            "value": "+974",
            "data-countryCode": "QA"
        },
        {
            "label": "Reunion (+262)",
            "value": "+262",
            "data-countryCode": "RE"
        },
        {
            "label": "Romania (+40)",
            "value": "+40",
            "data-countryCode": "RO"
        },
        {
            "label": "Russia (+7)",
            "value": "+7",
            "data-countryCode": "RU"
        },
        {
            "label": "Rwanda (+250)",
            "value": "+250",
            "data-countryCode": "RW"
        },
        {
            "label": "San Marino (+378)",
            "value": "+378",
            "data-countryCode": "SM"
        },
        {
            "label": "Sao Tome & Principe (+239)",
            "value": "+239",
            "data-countryCode": "ST"
        },
        {
            "label": "Saudi Arabia (+966)",
            "value": "+966",
            "data-countryCode": "SA"
        },
        {
            "label": "Senegal (+221)",
            "value": "+221",
            "data-countryCode": "SN"
        },
        {
            "label": "Serbia (+381)",
            "value": "+381",
            "data-countryCode": "RS"
        },
        {
            "label": "Seychelles (+248)",
            "value": "+248",
            "data-countryCode": "SC"
        },
        {
            "label": "Sierra Leone (+232)",
            "value": "+232",
            "data-countryCode": "SL"
        },
        {
            "label": "Singapore (+65)",
            "value": "+65",
            "data-countryCode": "SG"
        },
        {
            "label": "Slovak Republic (+421)",
            "value": "+421",
            "data-countryCode": "SK"
        },
        {
            "label": "Slovenia (+386)",
            "value": "+386",
            "data-countryCode": "SI"
        },
        {
            "label": "Solomon Islands (+677)",
            "value": "+677",
            "data-countryCode": "SB"
        },
        {
            "label": "Somalia (+252)",
            "value": "+252",
            "data-countryCode": "SO"
        },
        {
            "label": "South Africa (+27)",
            "value": "+27",
            "data-countryCode": "ZA"
        },
        {
            "label": "Spain (+34)",
            "value": "+34",
            "data-countryCode": "ES"
        },
        {
            "label": "Sri Lanka (+94)",
            "value": "+94",
            "data-countryCode": "LK"
        },
        {
            "label": "St. Helena (+290)",
            "value": "+290",
            "data-countryCode": "SH"
        },
        {
            "label": "St. Kitts (+1869)",
            "value": "+1869",
            "data-countryCode": "KN"
        },
        {
            "label": "St. Lucia (+1758)",
            "value": "+1758",
            "data-countryCode": "LC"
        },
        {
            "label": "Sudan (+249)",
            "value": "+249",
            "data-countryCode": "SD"
        },
        {
            "label": "Suriname (+597)",
            "value": "+597",
            "data-countryCode": "SR"
        },
        {
            "label": "Swaziland (+268)",
            "value": "+268",
            "data-countryCode": "SZ"
        },
        {
            "label": "Sweden (+46)",
            "value": "+46",
            "data-countryCode": "SE"
        },
        {
            "label": "Switzerland (+41)",
            "value": "+41",
            "data-countryCode": "CH"
        },
        {
            "label": "Syria (+963)",
            "value": "+963",
            "data-countryCode": "SY"
        },
        {
            "label": "Taiwan (+886)",
            "value": "+886",
            "data-countryCode": "TW"
        },
        {
            "label": "Tajikistan (+992)",
            "value": "+992",
            "data-countryCode": "TJ"
        },
        {
            "label": "Thailand (+66)",
            "value": "+66",
            "data-countryCode": "TH"
        },
        {
            "label": "Togo (+228)",
            "value": "+228",
            "data-countryCode": "TG"
        },
        {
            "label": "Tonga (+676)",
            "value": "+676",
            "data-countryCode": "TO"
        },
        {
            "label": "Trinidad & Tobago (+1868)",
            "value": "+1868",
            "data-countryCode": "TT"
        },
        {
            "label": "Tunisia (+216)",
            "value": "+216",
            "data-countryCode": "TN"
        },
        {
            "label": "Turkey (+90)",
            "value": "+90",
            "data-countryCode": "TR"
        },
        {
            "label": "Turkmenistan (+993)",
            "value": "+993",
            "data-countryCode": "TM"
        },
        {
            "label": "Turks & Caicos Islands (+1649)",
            "value": "+1649",
            "data-countryCode": "TC"
        },
        {
            "label": "Tuvalu (+688)",
            "value": "+688",
            "data-countryCode": "TV"
        },
        {
            "label": "Uganda (+256)",
            "value": "+256",
            "data-countryCode": "UG"
        },
        {
            "label": "Ukraine (+380)",
            "value": "+380",
            "data-countryCode": "UA"
        },
        {
            "label": "United Arab Emirates (+971)",
            "value": "+971",
            "data-countryCode": "AE"
        },
        {
            "label": "Uruguay (+598)",
            "value": "+598",
            "data-countryCode": "UY"
        },
        {
            "label": "Uzbekistan (+998)",
            "value": "+998",
            "data-countryCode": "UZ"
        },
        {
            "label": "Vanuatu (+678)",
            "value": "+678",
            "data-countryCode": "VU"
        },
        {
            "label": "Vatican City (+379)",
            "value": "+379",
            "data-countryCode": "VA"
        },
        {
            "label": "Venezuela (+58)",
            "value": "+58",
            "data-countryCode": "VE"
        },
        {
            "label": "Vietnam (+84)",
            "value": "+84",
            "data-countryCode": "VN"
        },
        {
            "label": "Virgin Islands - British (+1284)",
            "value": "+1284",
            "data-countryCode": "VG"
        },
        {
            "label": "Virgin Islands - US (+1340)",
            "value": "+1340",
            "data-countryCode": "VI"
        },
        {
            "label": "Wallis & Futuna (+681)",
            "value": "+681",
            "data-countryCode": "WF"
        },
        {
            "label": "Yemen (North)(+969)",
            "value": "+969",
            "data-countryCode": "YE"
        },
        {
            "label": "Yemen (South)(+967)",
            "value": "+967",
            "data-countryCode": "YE"
        },
        {
            "label": "Zambia (+260)",
            "value": "+260",
            "data-countryCode": "ZM"
        },
        {
            "label": "Zimbabwe (+263)",
            "value": "+263",
            "data-countryCode": "ZW"
        }
    ];
    

    return countriesArray;
}