# Arosa Meta hackathon: Wave 2 runbook

Continuation of the Meta hackathon handoff after the Wave 1 parallel work. Product scope and boundaries live in `docs/hackathon-housing.md`. Statuses below were verified on 2026-10-27 after the screen-review fixes shipped; recheck live state before relying on them.

## Where things stand

| Work | State |
|---|---|
| Modeling on Meta | Live. The production research service runs with `MODELING_RESEARCH_ENGINE=meta` and a configured `MODEL_API_KEY` (verified by key presence on the host, Oct 27). Modeling runs use Muse Spark through `acres-research/meta.mjs`; Underwriting keeps its existing engine. |
| Walkthrough | Merged (#535) and deployed, then corrected from the owner's screen review (#538): real shadows, context-loss recovery, one-click Walk inside, largest-living-room start, first-person drag, wider zoom, move stick for every pointer, capped resolution on a 30 fps clock. Still visibly computer-generated; real-device checks remain open. The 3D model now preloads in the background once the plan paints, and the headless viewer smoke passes. |
| Photo to illustration | Live (#530, #536, #538). SAM masks with match confidence, Muse Image illustration carrying a provenance record (model, goal, input and output hashes, concept id and version) with a JSON download. By design the image is not saved in the project. Live provider and billing settlement still need a signed-in run to verify. |
| Library and address entry | Live (#538). One library with origin badges; new models start from a verified NYC GeoSearch address carrying its BBL, with a labeled no-parcel fallback. Explore search resolves any NYC address to underwrite. |
| Earlier Meta engine, PR #509 | Closed as superseded by the Modeling-specific approach in #528. Remote branch retained for possible extraction. Do not switch Underwriting to Meta. |
| Improvement loop | Generation 29 of 50 and Design 22 of 50 on merged-per-label GitHub evidence (`gh pr list --state all --limit 400`, branch pattern `(generation\|design)-\d+-(\d+)`). Branch names overstate completion. Guardrail from #517: price rental comparisons on completed-building taxes; do not repeat the lot-assessment basis error and do not revalue live listings without a separate authorized workflow. |
| Public extraction | Prepared locally (clean tree, contribution map from git history, SAM license, host-interface stubs, synthetic samples, setup README). Not yet published: confirm the eligible window, project license, and repository host with the organizers and owner first. |

## T1 live run: three-parcel core journey (needs a signed-in session)

The live app sits behind Cloudflare Access, so this run needs Michael's signed-in browser session. Local evidence is green (full test suite plus headless viewer smoke), but every fixture is synthetic. No real-parcel end-to-end claim exists yet.

Parcels and purpose:

1. Primary: 23 to 29 Broadway (previously exercised for sourced research findings).
2. Unrelated: one property in a different borough and zoning district, chosen fresh at run time.
3. Held-out or conflicting: one property with incomplete or conflicting public data (missing BBL, split lot, or mismatched sources). The test proxies for this case are `bbl=null` and the 409 concept-version conflict.

For each parcel, in a Modeling project (never through Underwriting):

1. Enter the address and a housing goal. Confirm parcel resolution, retrieved property and zoning sources with citations, stated assumptions, and named missing information.
2. Check two sample claims and two dimensions against the official source documents.
3. Select a hypothesis, edit the proposal, and confirm the geometry and displayed modeled measurements change.
4. Save, reload, and confirm the proposal, its revision, and its source and assumption context survive.
5. Capture the baseline versus proposal comparison. Leave unit counts, zoning floor area, egress, and any other unverified check explicitly unknown. Make no optimal or legally compliant claim.
6. Confirm Underwriting saved state is unchanged before and after (compare a saved plan's version and fields).

Record per-parcel: address, BBL, sources opened, claims checked, edits made, save and reload result, gaps found. Any missing capability is a build item, not a demo workaround.

## Three-minute demo script

Automated claims stay honest: SAM highlights guide the illustration and do not enforce exact placement; generated images are conceptual, not editable geometry, surveyed dimensions, compliance proof, or a permit.

1. (0:00 to 0:30) The problem and the path: from a site to more homes. Open Modeling, enter the primary address and goal.
2. (0:30 to 1:15) Evidence: parcel and zoning findings with numbered citations opened live; name one assumption and one unknown out loud.
3. (1:15 to 2:00) Editable proposal: pick the hypothesis, change one dimension, show measurements update, save and reload.
4. (2:00 to 2:35) See it: walk the model, then upload a rights-cleared site photo, select the region with SAM, generate the labeled conceptual illustration, and show its provenance download.
5. (2:35 to 3:00) Share: open the share view with assumptions, sources, and limitations. Close on who it serves: homeowners, small builders, architects, nonprofits, and community land trusts.

Keep a recorded video backup of the same flow. Rehearse once on the demo machine with the exact account, parcel, and photo that will be shown.

## Public submission package

Do not public-fork this repository: a fork exposes the full history (858 commits, author emails, infrastructure, underwriting, and billing code). Publish a new clean repository with a squashed initial commit or a curated history starting at the confirmed baseline, containing only the extraction set. A prepared extraction tree with this structure, a generated `CONTRIBUTIONS.md`, host-interface stubs for the Meta research client, the SAM license, synthetic samples, and a setup README is the starting point; verify it on a clean machine before publishing.

Contribution map method:

1. Get the eligible event window in writing from the organizers.
2. Baseline: last `origin/main` commit before the window (provisional `fdb0cb9`, 2026-10-26).
3. Pre-existing: `git ls-tree` at the baseline. New or modified: `git log baseline..submission --date=short` plus per-path first-seen via `git log --diff-filter=A`.
4. Ship `CONTRIBUTIONS.md`: path, pre-existing / new / modified, first commit and date, PR.

Include: `acres-research/meta.mjs`, `meta-visual.mjs` and their tests (Meta research behind documented host stubs); the concept, architecture, walkthrough, and visual-workbench viewers with their pure-module tests; the NYC address module; the planning IFC intake subset; `licenses/SAM-LICENSE.txt` plus the project license (owner to confirm) and NOTICE with asset credits; `docs/hackathon-housing.md`; rights-cleared samples (synthetic plan, GLB, manifest); `.env.example` with names only; a setup README (Node 24, tests run without credentials through stub fetchers, `MODEL_API_KEY` only for live calls).

Exclude: `infra/`, deploy scripts, wallet, billing, pro-forma, market, CRM, alerts, and underwriting modules, Stripe payments, `acres-mcp` unless judged, `site/`, real-parcel fixtures and reports, internal handoff and sign-off notes, browser artifacts, and worker binaries (install script only).

Before publishing: full-history secret scan (gitleaks and trufflehog) on the extraction repository, tracked-name sweep for `.env`, keys, and tokens, license review (SAM restrictions travel with the parser; GPL components such as plyfile, Blender, and Bonsai; CC-BY asset attribution), and a clean-machine setup run.

Organizer checklist: eligible window dates; whether disclosed pre-existing code is allowed; new repository versus public fork; license requirements; SAM parser redistribution; Meta API keys or credits for judges; whether the demo may use real public parcel data; nonpolitical housing framing; team and company IP eligibility; submission receipt and demo access method.

## Remaining risks

- Real-device walkthrough checks are still open: first load, resize, tab return, room change, context loss on hardware, frame rate, and legibility. Code, unit, and headless-Chrome evidence exist; device evidence does not.
- The live Meta provider path (account access, rate limits, billing settlement) is configured and engine-verified, but a full signed-in Modeling run plus a billed visual call have not been observed end to end.
- The demo depends on the T1 live run passing on the demo parcel with the demo account. Run it before recording.
- User evidence is not yet collected. If intended users are available, measure the journey on a small sample and document its size and limitations.
