# DATA_NOTES — Hospital maternal mortality (PLOS ONE, 2019)

Source: Bwana VM, Rumisha SF, Mremi IR, Lyimo EP, Mboera LEG (2019). "Patterns and causes of
hospital maternal mortality in Tanzania: A 10-year retrospective analysis." PLoS ONE 14(4):
e0214807. https://doi.org/10.1371/journal.pone.0214807

Extraction: pdfplumber with word-coordinate reconstruction (the PDF's text layer drops spaces;
the odd bullet glyph "�" is the decimal point). Every numeric row carries a source_page.

## Confidence: HIGH (recomputed and reconciled)

- **Scale:** 40,052 women aged 15-49 died in the 34 hospitals; 1,987 (5.0%) were maternal. ✓
- **Age (Table 1):** the seven age-group death counts (271/417/515/402/287/76/19) sum to exactly
  1,987, and each recomputed percentage matches the paper. 20-34 = 1,334 = 67.1% ✓.
- **Year (Table 2):** the ten yearly death counts sum to exactly 1,987. MMR spot-checks reproduce
  the paper: 2006 138/342,959 = 40.24; 2011 269/386,276 = 69.64; 2015 241/415,953 = 57.94 ✓.
- **Causes (Fig 6 / abstract):** eclampsia 34.0% (669), haemorrhage 24.6% (488), sepsis 16.7%
  (336), abortion 10.8% (215), ruptured uterus 7.1% (140); indirect anaemia 14.9% (295),
  cardiovascular 14.0% (274). Recomputed percentages match within rounding (e.g. 669/1,987 =
  33.7% vs stated 34.0%). Direct 83.8% + indirect 16.2% = 100 ✓. Note: a death could be
  attributed to up to three direct causes, so cause shares overlap and don't sum to 100 — they
  are the share of deaths *involving* each cause, not mutually exclusive.

## Discrepancy found IN the source (logged, not corrected)
- The paper's five-year split reads "62.15% (n=1,235) in 2011-2015" and "37.85% (n=755) in
  2006-2010". 1,235 + 755 = 1,990, three more than the 1,987 total — a rounding/transcription
  wobble in the paper. We use the stated percentages (62.15% / 37.85%) and note the counts are
  approximate.

## Not ingested
- Figures 2, 5, 7-11 (age/zone/network plots) are image-only; their narrative results are captured
  in `findings.csv` (e.g. eclampsia leads in the young, haemorrhage in the older) but not as
  per-point numbers.
- Table 3 (co-morbid cause pairs, n=1,666) and Table 4 (cause ranking by age) are summarised in
  prose, not stored as separate figures.

## Method caveats (surfaced on the site as "what to keep in mind")
- Hospital-based only (34 public hospitals) — not population-representative.
- The MMR denominator is an estimate: population live births × 50% (facility births) × 40%
  (hospital share), so ratios are indicative, not exact.
- Rising facility-birth rates over the decade inflate the count of hospital-recorded deaths.
