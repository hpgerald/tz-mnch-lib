# DATA_NOTES — Missing Babies (PLOS One, 2026)

Source: Shabani J, et al. "Counting missing babies in Tanzania: Neonatal mortality data
quality from Tanzania's District Health Information System across 28 Regional and 7 Tertiary
hospitals (2015–2024)." PLOS One 21(7): e0348874. https://doi.org/10.1371/journal.pone.0348874

Extraction method: pdfplumber over all 20 pages. Every numeric row carries `source_page`.
No number is invented; unknowns are left **blank** and listed below.

## Confidence: HIGH (verified against source)

- **Table 1 → `timeseries.csv`** (120 rows). Extracted counts sum to **16,433,501 live births**
  and **85,588 neonatal deaths** over 2015–2024 — these EXACTLY match the totals the paper
  prints for Fig 1 (N = 16,433,501 and N = 85,588). Strong independent validation.
- **`fig1_shares.csv`** — facility-level percentages recomputed by us from Table 1 raw counts
  (source_page 8). RRH = 33.4% of deaths, tertiary = 6.6%. These agree with the **abstract**
  ("RRHs 30–40% of reported deaths, tertiary 4–11%").
- **Table 2 → `facilities.csv`** completeness columns (`months_reported`, `completeness_pct`).
- **Table 3 → `monthly_reporting.csv`** (facilities reporting per year).
- **Table 4 → `facilities.csv`** consistency columns (`mean_nmr_21_23`, `nmr_2024`,
  `consistency_ratio`). `is_consistent` derived by us using the paper's stated WHO rule
  (consistent when ratio is between 0.67 and 1.33).
- **Headline figures** (58.3% completeness; 5.9 vs 24 vs 21 per 1,000; >8,500 vs 48,000
  deaths/year; 8/28 RRH and 0/7 tertiary above 75%) — all quoted directly from abstract/results
  with source pages.

## Post-extraction audit (line-by-line re-check against source)

A second pass re-parsed Tables 2 and 4 directly from the PDF and diffed them against the CSV.
Results:

- **Table 2 (completeness):** all 35 facilities match exactly (months + %). No changes.
- **Table 4 (consistency), clean 6-number rows:** all match; `is_consistent` derived by the
  0.67–1.33 rule reproduces the paper's exact count — **10 hospitals (28.6%) = 7 RRH + 3
  tertiary** (paper p11). Independent confirmation of both the ratios and the rule.
- **35-hospital scale:** RRH+tertiary 10-year totals recomputed = **34,190 deaths** and
  **1,408,159 births**, matching the paper's "34,190 neonatal deaths" and ">1.4 million
  institutional births" (p14) to the digit.

### One extraction error found and FIXED
- **RRH18** was misread. The PDF row `RRH18 1.97 10.58 22.03 4.18 5.27` had been stored as
  mean=5.27 / nmr_2024=4.18 / ratio=blank. Correct reading (proven by two identities:
  22.03/4.18 = 5.27 and (1.97+10.58)/3 = 4.18) is **mean=4.18, nmr_2024=22.03, ratio=5.27,
  is_consistent=no**. CSV corrected. (Does not change the consistency count — 5.27 is outside
  the band either way.)

### Ambiguous rows BLANKED (year could not be assigned safely)
These facilities printed only a partial NMR line in Table 4 with no derivable year mapping;
the affected numeric cells are now blank rather than possibly-mislabelled:
- **RRH6** (`28.15` only) — was stored as nmr_2024; year unknown → blanked.
- **RRH21** (`55.08` only) — was stored as mean; year unknown → blanked.
- **Tertiary6** (`7.75 14.85 2.58 5.76`) — no mean/ratio identity holds → blanked.
- (**Tertiary2** `0.25 61.41 8.47 23.38` and **RRH24** `48.86 44.94 91.66 31.27 2.93` were
  re-verified as CORRECT via the mean/ratio identities and left unchanged.)

## Cross-check against a second, independent extraction (reconciled)

A separately-extracted copy of all five tables was compared against ours. Where they disagreed,
the tiebreaker was a **coordinate-based re-extraction** of the PDF (mapping each number to its
column by x-position, anchored on complete rows like RRH12). Findings:

- **Table 1 live births** — identical in both; correct.
- **Table 1 neonatal deaths** — the external copy had two wrong tertiary cells (2023 as 777 and
  2024 as 3787). Ours (773 and 787) is correct: it's the only reading consistent with the
  printed column totals (2024 column sums to 10,486 only with 787). No change.
- **Table 2 completeness** — the external copy is internally inconsistent (its month totals don't
  match its own percentages; e.g. it lists Tertiary5 = 120 months yet 50%, Tertiary1 = 27 yet
  75.8%). Ours matches the PDF's printed percentage column for all 35 facilities. No change.
- **Table 3** — external gives 2024 total = 310 (implies 73.8%); the PDF prints 313 = 74.5%.
  Ours (313) is correct. No change.
- **Table 4 (consistency)** — reconciled cell-by-cell via coordinates. **Both** prior extractions
  had column-shift errors on the sparse rows. Final authoritative values applied:
  - **RRH4**: mean = 0.45, 2024 = 1.36 (previously swapped in our CSV). Ratio 3.02 = 1.36/0.45 ✓.
  - **RRH6**: 2024 = 28.15 (sits in the 2024 column; restored). No mean/ratio printed.
  - **RRH21**: 2024 = 55.08 (2024 column; restored). No mean/ratio printed.
  - **Tertiary6**: 2023 = 7.75, 2024 = 14.85, mean = 2.58, ratio = 5.76 (14.85/2.58 ✓; restored).
  - **RRH18**: mean = 4.18, 2024 = 22.03, ratio = 5.27 (confirmed).
  - All other rows matched; consistency count unchanged at **10 (7 RRH + 3 tertiary)**.
- **Table 5** (per-facility deaths & births 2021–2024) — the external copy's Table 5 is clearly
  garbled (e.g. it lists RRH18 live births of 42,670–81,280, physically impossible for an RRH,
  and death/birth counts that don't reconcile). This confirms our decision to EXCLUDE Table 5;
  use the source XLSX (S3) if a per-facility yearly view is ever needed.
- **"8.7% / 38.4%" summary figures** — the external summary repeats the paper's p10 sentence.
  Note that **8.7%** actually equals the RRH+tertiary combined share of *live births* (our exact
  recomputation: 1,408,159 / 16,433,501 = 8.57%), not of deaths. The combined *deaths* share is
  ~40% (34,190 / 85,588). We therefore rely on the abstract's clearer wording (RRHs 30–40% of
  deaths; tertiary 4–11%) and Table 1, not this sentence.

## Third extraction cross-check (a "corrected" external copy) — reconciled

A third external extraction was compared. It self-falsifies in ways that confirm OUR data:

- **Table 4 consistency — decisive test.** The external copy marks **12** facilities "Yes"
  (consistent) while its own summary claims 10. Its two false positives are **RRH20** and
  **Tertiary2** — exactly the rows where it column-shifted its NMR values. Our coordinate-verified
  set is **7 RRH + 3 tertiary = 10**, matching the paper's explicit wording ("seven of 28 RRHs and
  three of the seven tertiary hospitals," p8). Our reading wins on physical evidence + the paper.
- **±50% sensitivity — independent confirmation.** Computing the ±50% band (0.50–1.50) from OUR
  ratios yields **exactly 14 (40.0%)** — matching the paper's sensitivity result — adding RRH11,
  RRH13, RRH14, RRH16. New column `is_consistent_50` added to `facilities.csv`.
- **58.3% vs 52.2% completeness — both real, resolved.** 58.3% is the **median** of the 35
  facilities' completeness (the abstract's headline, alongside RRH median 61.7% / tertiary 50%).
  52.2% is the **pooled** facility-months (2191/4200). We keep 58.3% as the headline figure
  (matches the abstract) and note the pooled rate here.
- **">75% reporting" denominator.** External uses 8/35 = 22.9%; the paper uses 8/28 RRHs = 28.5%
  (no tertiary qualified). We follow the paper (8 of 28 RRHs).
- **Table 2 percentages (external).** The external copy overrode the paper's PRINTED percent column
  with values recomputed from its own reconstructed monthly cells (which contain errors — e.g. it
  reports Tertiary5/Tertiary7 = 100%, but the paper prints 50.0%). We keep the paper's printed
  totals/percentages. No change.
- **Table 1 deaths.** External now agrees with us (tertiary 2024 = 787, not 3787).

### Data ADDED as a result of this cross-check (all text-verified)
- `facilities.csv` → **`is_consistent_50`** column (validated: 14/40%, matches paper).
- **`nid_comparison.csv`** — the 7 NEST360 hospitals (named on p6) with only the DIRECTION the main
  text states (3 RRHs — RRH1/RRH16/RRH27 — higher in DHIS2; Tertiary3 similar in later years, p8).
  The external copy supplied per-year NID point values (e.g. RRH1 2021 NID = 33.52); these appear
  **only in the Fig 4 image**, not the text, so per the "never invent a number" rule they are NOT
  ingested. Only the verified qualitative direction is stored.
- **`biases.csv`** — 6 sources of under-counting, each cited to the paper's MAIN-TEXT discussion
  (pp 6, 8, 14, 15, 16), not to the unverifiable S1 supplement.

### Rejected from the external copy
- **Table 5A/5B (per-facility deaths & births)** — still garbled (e.g. RRH18 live births
  42,670–81,280; RRH17 2024 = 44,200 — impossible for regional hospitals). Remains EXCLUDED.
- **DHIS2-vs-NID per-year point values** — unverifiable (image-only). Not ingested.

## Discrepancies found IN the source (logged, not corrected in data)

1. **Page 10 sentence** states "regional referral hospitals and tertiary hospitals accounting
   for 8.7% and 38.4% of total neonatal deaths, respectively." This appears to be a
   **swap/typo in the paper**: our Table 1 recomputation and the paper's own abstract give
   RRH ≈ 33.4% and tertiary ≈ 6.6%. We use the Table 1 / abstract figures. Flag on any page
   that cites this.

## Gaps / blanks (left empty on purpose)

- **`facilities.csv` consistency**: RRH6, RRH21, Tertiary2, Tertiary6 have blank cells where
  the source (Table 4) shows no reported NMR ("grey shaded — no inpatient NMR reported").
  RRH18 shows a mean but the paper prints no ratio; left blank. `is_consistent` is blank
  wherever the ratio is blank.
- **Fig 1 exact percentages**: the paper renders these only inside an image chart, not as text.
  We reconstructed them from Table 1 counts (see `fig1_shares.csv`) rather than reading pixels.
- **Fig 2 (average completeness trend)**: image-only; the underlying yearly completeness is
  represented instead via `monthly_reporting.csv` (Table 3), which is text.
- **Table 5** (per-facility deaths & live births 2021–2024) was NOT converted to a CSV — its
  printed column headers are mislabelled (all four years appear as "2021") and several cells
  are blank/misaligned in the PDF text layer. It is redundant with Table 4 for our purposes.
  If a per-facility yearly deaths view is needed later, re-extract from the source XLSX
  (S3 Table) rather than the PDF.
- **Fig 4 forest plot** (DHIS2 vs NID per hospital) values are image-only; we capture the
  narrative result (3 RRHs higher, 1 tertiary matching) in `findings.csv` but not per-point
  numbers. Source XLSX S3 Table sheet 1 has these if needed.

## Spot-checks performed (source page in parens)

- RRH27 completeness = 114/120 = 95.0% ✓ (p9)
- Tertiary6 completeness = 1/120 = 0.8% ✓ (p9)
- Overall completeness 58.3% ✓ (abstract, p2)
- 2024 adjusted NMR: 0.2×4.9 + 4.9 = 5.88 ≈ 5.9 ✓ (p8)
- Table 1 grand totals per year match printed "Total" row for all 10 years ✓ (p7)
- 10-year death total 85,588 and birth total 16,433,501 match Fig 1 N values ✓ (p8)
