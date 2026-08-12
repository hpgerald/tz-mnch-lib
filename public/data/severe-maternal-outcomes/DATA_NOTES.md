# DATA_NOTES — Severe maternal outcomes (Obstetrics and Gynecology International, 2020)

Source: Lilungulu A, Bintabara D, Mujungu S, Chiwanga E, Chetto P, Nassoro M (2020). "Incidence
and Predictors of Maternal and Perinatal Mortality among Women with Severe Maternal Outcomes: A
Tanzanian Facility-Based Survey for Improving Maternal and Newborn Care." Obstet Gynecol Int
2020: 5390903. https://doi.org/10.1155/2020/5390903

Single facility: Dodoma Regional Referral Hospital (Central Tanzania), Oct 2015 – Jan 2016.
Extraction: pdfplumber with word-coordinate reconstruction (the text layer drops spaces).

## Confidence: HIGH (every ratio recomputed; all table categories reconcile)

Sample: 3,600 obstetric admissions; 140 severe maternal outcomes (SMO) = 124 near-miss (MNM) +
16 maternal deaths (MD). Hospital total births 3,601; live births 3,480; perinatal deaths 39.

Every headline ratio recomputes to the paper's stated value:
- SMO incidence 140/3,480×1,000 = **40.23** ✓
- MNM incidence 124/3,480×1,000 = **35.63** ✓
- Institutional MMR 16/3,480×100,000 = **459.77** ✓
- MNM-to-death ratio 124/16 = **7.75** ✓
- Case fatality rate 16/140 = **11.43%** ✓
- Perinatal mortality rate 39/3,601×1,000 = **10.83** ✓
- Perinatal morbidity rate (24+39)/3,601×1,000 = **17.50** ✓; poor perinatal outcome 63/140 = **45.0%** ✓

Table 1 (n=140): every category sums to 140 (age 27+83+30; parity 48+61+31; ANC 126+14;
referral 53+87; time 54+86; shock 52+58+30; BP 118+22; mode of birth 79+61). Perinatal
outcome 77+24+39 = 140.

Table 3 (causes): direct morbidity 104 and indirect 36 sum to 140; direct mortality 10 and
indirect 6 sum to 16 — both reconcile. Leading death causes: hypertensive disorders 4 (25%),
PPH 3 (18.75%), severe anaemia 3 (18.75%), cardiovascular 3 (18.75%).

## Discrepancy found IN the source (logged, not used)
- Table 1 **residence** row is internally inconsistent: "Rural 59 (49.29%)" and "Urban 71
  (50.71%)" sum to 130, not 140, and 59/140 = 42.1% (not 49.29%). The stated 49.29% implies a
  rural count of 69. Because the row doesn't reconcile, residence is **not used** anywhere in
  the explainer.
- The text calls postpartum haemorrhage "the number one killer," while Table 3 shows hypertensive
  disorders slightly higher among deaths (4 vs 3). We present both as the leading causes and note
  bleeding as the most common cause of severe illness (17.9% of the 140 cases).

## Not ingested
- Table 4 (logistic-regression beta coefficients for three models) is captured qualitatively in
  findings (per-protocol management protective for maternal death; older age raises perinatal
  mortality; vaginal birth and severe shock raise neonatal complications) rather than as odds
  ratios, since the paper reports betas with wide standard errors on only 16 deaths.
- Figure 2 (intervention percentages) is image-only; the blood-transfusion figures (73 needed,
  ~40% inadequate) are taken from the text.
