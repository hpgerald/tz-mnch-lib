# DATA_NOTES — MCH Star Rating (Reproductive Health, 2025)

Source: Kinyenje ES, Degeh MM, Hokororo JC, et al. "Quality of maternal and child health
services in Tanzanian primary healthcare: a 2021–2022 star rating review." Reproductive Health
(2025) 22:180. https://doi.org/10.1186/s12978-025-02105-y

Extraction method: pdfplumber over all 16 pages, including word-coordinate re-extraction of
Table 2. Every numeric row carries `source_page`. No number is invented.

## Confidence: HIGH (double-verified)

### The 12 MCH indicators (Fig 2 / Results text, p5)
Fig 2 is an image, so the values were read from the explicit counts in the Results text and each
percentage was **recomputed from its count and denominator** — all 12 match the stated figure
exactly:

| Indicator | Count | Denom | % (recomputed) | Stated |
|---|---|---|---|---|
| Maternal death reviews (MPDSR) | 2,057 | 2,583 | 79.6 | 79.6 |
| Integrated management tools (IMPAC) | 1,467 | 2,583 | 56.8 | 56.8 |
| Family planning | 1,247 | 2,583 | 48.3 | 48.3 |
| Partogram completed | 1,238 | 2,583 | 47.9 | 47.9 |
| Immunisation | 1,197 | 2,583 | 46.3 | 46.3 |
| Child growth monitoring (IMCI) | 1,054 | 2,583 | 40.8 | 40.8 |
| Antenatal care (ANC) | 1,035 | 2,583 | 40.1 | 40.1 |
| BEmONC/CEmONC trained staff | 995 | 2,583 | 38.5 | 38.5 |
| BEmONC/CEmONC services | 816 | 2,583 | 31.6 | 31.6 |
| Emergency obstetric supplies | 424 | 2,583 | 16.4 | 16.4 |
| Postnatal & newborn care | 60 | **394** | 15.2 | 15.2 |
| Cervical cancer screening | 199 | 2,583 | 7.7 | 7.7 |

Note the **denominator for postnatal/newborn care is 394** (hospitals + health centres only),
not 2,583 — captured in the data and stated in the figure's `value_label`/`comparator_label`.
Overall: 280 / 2,583 = 10.8% met the standard ✓.

### Table 2 (regression predictors, p6) — coordinate-verified
Re-extracted by word x-position. All AOR/CI values confirmed. Independent internal check: the
**facility-type, ownership and location strata each total 2,583**, and the "Yes" (met-standard)
column sums to exactly **280** — matching the headline. Staffing/management strata total 2,354–
2,358 (some facilities have missing staffing/team data), and functional QIT = 560 of 2,358 = 24% ✓.

Stored predictor findings use the adjusted odds ratios: Health Centre AOR 7.21 (4.37–11.9),
Hospital 34.7 (14.6–84.3), Public 2.94 (1.80–5.05), Nurse staffing 2.12 (1.34–3.53),
Functional HFMT 1.62 (1.15–2.27), Functional QIT 1.71 (1.20–2.43), Urban 1.07 (0.69–1.62, ns).

### Discrepancy found IN the source (logged, not propagated)
- The **narrative on p5** prints the QIT confidence interval as "1.20, 82.43". **Table 2** (the
  authoritative source, coordinate-verified) gives **1.20, 2.43**. The 82.43 is a typo; we use
  2.43.

### Descriptive stats (used in copy)
2,583 facilities: 2,189 dispensaries (84.7%), 303 health centres (11.7%), 91 hospitals (3.5%);
2,068 public (80.1%); 2,139 rural (82.8%). All recompute to the stated percentages. 10 regions,
census population 17,554,018 (~30% of 59,517,754).

## Not ingested
- **Fig 1** (map of regions) — geographic image, no tabular data needed.
- **Table 1 / Appendix 1** — indicator *descriptions and scoring rules* (qualitative); summarised
  in `glossary.csv` and section copy, not stored as numbers.
- Datasets that don't apply to this paper (facilities, timeseries, comparisons, etc.) are simply
  absent from this folder; the site renders only the datasets present.
