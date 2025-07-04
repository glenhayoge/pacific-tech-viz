# Pacific Connectivity 2050

  
A data-driven web visualization built for the **Pacific DataViz Challenge 2025** — showcasing technology access, digital skills, and connectivity across Pacific Island nations in line with the **Blue Pacific 2050 Strategy**.


## 2025 Data Visualisation Theme


**Blue Pacific 2050 – Technology and Connectivity**


This app visualizes how Pacific Island countries are advancing (or falling behind) in areas such as:

- Mobile phone ownership

- Internet usage

- Broadband penetration

- 4G network coverage

- Cybersecurity readiness

- Digital literacy

  

These insights help highlight key disparities and opportunities for regional collaboration and investment by 2050.

  

---

  
## Live Demo

  

> [Coming Soon – deploy to Netlify/Github and will paste link here]

  

---

  
## Visualizations

  

Built using [Recharts](https://recharts.org/) and later enhanced with [React Graph Gallery](https://www.react-graph-gallery.com/) for high-impact visuals.

  

- **Internet Usage Over Time** – Track internet adoption per country (2000–2024)

- **4G Coverage Snapshot** – Rank countries by mobile network access

- **Digital Skills Radar** – Compare digital literacy across nations

- **Cybersecurity vs. Internet Penetration** – See which countries are digitally prepared

  

---

  

## Tech Stack

  

- **React** with **Vite** for blazing fast development

- **Recharts** for initial chart components

- **React Graph Gallery (D3-based)** for advanced visuals

- **Tailwind CSS** for modern, responsive design

- **Papaparse / D3.csv** for CSV parsing

  

---

  
## Dataset

This app uses official data from the Pacific Data Hub:

- [Blue Pacific 2050 Indicators – Technology & Connectivity](https://pacificdata.org/data/dataset/blue-pacific-2050-technology-and-connectivity-thematic-area-7-df-bp50-7)
- **File**: `SPC_Tech_Connectivity_2025.csv` (1,835 records)

### Key Indicators

- **IT_USE_ii99** - Internet usage by individuals (756 records)
- **IT_NET_BBND** - Broadband network access (357 records)  
- **IT_MOB_4GNTWK** - 4G mobile network coverage (56 records)
- **IT_MOB_OWN** - Mobile phone ownership (26 records)
- **NCSI_RANK** - National Cybersecurity Index ranking (4 records)

### Sample Data Records

```csv
INDICATOR,Pacific Island Countries,TIME_PERIOD,OBS_VALUE,UNIT_MEASURE
IT_USE_ii99,Tuvalu,2019,84,PERCENT
IT_USE_ii99,Vanuatu,2019,59.5,PERCENT  
IT_USE_ii99,Kiribati,2020,37.6,PERCENT
IT_MOB_OWN,Tuvalu,2019,78,units
IT_NET_BBND,Fiji,2022,41.3,PERCENT
```

### Coverage

- **Time range**: 2003–2024 (peak data from 2013-2021)
- **Countries**: 15+ Pacific Island nations including Fiji, Tonga, Vanuatu, Samoa, Kiribati, Tuvalu, etc.
- **Demographics**: Breakdown by age, gender, urban/rural, education level

  
---


## How to Use



```bash

# Clone the repo

git clone https://github.com/your-username/pacific-connectivity-2050.git

cd pacific-connectivity-2050

  

# Install dependencies

npm install

  

# Run the dev server

npm run dev

```


## Submission

This project was created as an entry for the Pacific DataViz Challenge 2025, hosted at

🔗 pacificdatavizchallenge.org


The challenge explores creative uses of official Pacific data to inform, educate, and inspire regional action.


## License

MIT License — free to use, adapt, or build on.

## Acknowledgments & Credits

- SPC & Pacific Data Hub for open access to high-quality datasets

- Recharts & React Graph Gallery for powerful data visualizations

- Netlify/Github for smooth deployment workflows

  
> From the Papua New Guinea 🇵🇬 for the Pacific.
> Visualizing the digital journey to 2050.
> Glen Hayoge