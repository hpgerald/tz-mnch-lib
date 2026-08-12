# Adding a paper (deep-dive explainer)

The structure is generic. Turning a registry paper into a full explainer is
data entry, not code. Every paper already has a slug and an internal page — a
record page until its explainer data exists, then the full walkthrough.

## To build a deep dive for a paper

1. Find the paper's row in `public/data/library.csv` and note its `slug`.
2. Create a folder `public/data/<slug>/` and copy the headered CSVs from
   `paper-template/` into it.
3. Fill them in from the source (every numeric row needs a `source_page`;
   leave unknowns blank — never guess):
   - `sections.csv` — the plain-language sections (the numbered index).
   - `findings.csv` — key findings, each with a "why it matters" (`so_what`).
   - `figures.csv` — every figure as a comparison (`value` vs `comparator_value`);
     mark 2–3 with `headline=yes`; set `section` to the `section_id` it belongs to.
   - `glossary.csv`, `timeline.csv`, `biases.csv`, `personas.csv` — as available.
   - Add a `DATA_NOTES.md` recording confidence, gaps and any corrections.
4. In `library.csv`, set that row's `has_explainer` to `yes`.
5. (Optional, for the evidence map) tag the paper into the analytical coding:
   add rows to `paper_topics.csv` and `paper_facets.csv` using its `paper_id`.

That's it. The card flips from "Record →" to "Explainer →", the full paper
pages (overview, numbers, timeline, what-it-means, data, about, sections) light
up, and the paper threads onto the evidence map automatically.

## Column reference

See any built paper (`public/data/missing-babies/` or
`public/data/mch-star-rating/`) for a worked example of every file.
