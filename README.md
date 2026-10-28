# Arosa housing modeling: Meta hackathon extraction

Give more people the power to imagine and create homes in their neighborhoods. This package extracts the hackathon's new zoning and architectural work from Arosa: Modeling research on Meta's Model API, SAM 3.1 photo selection with Muse Image illustration, the editable floor-plan and building-model viewers with the first-person walkthrough, NYC address resolution, and the IFC model intake. Arosa's private application and Underwriting are not included and stay independent. A concept from this work is not a permit or a professional zoning determination.

Start from `docs/hackathon-housing.md` for scope and boundaries, `CONTRIBUTIONS.md` for what is new versus pre-existing, and `LICENSES.md` before redistributing anything.

## What runs standalone

- `acres-research/meta-visual.mjs` (SAM segmentation and Muse Image illustration) with its tests. Live calls need `MODEL_API_KEY`; tests run on stub fetchers with no credentials.
- `app-starter/public/nyc-address.mjs` (NYC GeoSearch address resolution) with its tests.
- The pure viewer modules and their tests under `app-starter/tests/` (architecture model, loaders, interior layout and materials, photo scene, black-frame and context recovery), against the synthetic sample plan in `samples/`.

```bash
node --test acres-research/meta-visual.test.mjs app-starter/tests/nyc-address.test.mjs
```

Node 24 is expected. Install dependencies first (`npm install`): `@meta-sam/parser` is distributed under `licenses/SAM-LICENSE.txt`, which must accompany any distribution of it.

## What needs a host

- `acres-research/meta.mjs` (Muse Spark research) imports six host modules for tools, prompt context, run shaping, and abort composition. Minimal stubs sit beside it so the contract is readable; see `acres-research/host-stubs.md`. Executing research means implementing that interface or running inside Arosa's research service.
- The React viewers (`app-starter/frontend/`) need the application shell: React 19, three, @react-three/fiber and drei, camera-controls, three-mesh-bvh, plus project authorization, a saved concept to capture, and the project-scoped API routes the visual workbench calls. They are included as the exact shipped source, not a standalone app.
- `planning/model_intake.py` imports and exports IFC through Bonsai (IfcOpenShell); see `LICENSES.md` for its GPL terms. Python dependencies are the host's to install.

## Samples

`samples/` holds a synthetic apartment floor plan (`sample-plan.json`), its walkthrough manifest, and the built GLB. They are generated fixtures with no customer or parcel data, safe to redistribute, and they drive the viewer tests.

## Environment

Copy `.env.example` and set `MODEL_API_KEY` only for live Meta calls. No other credential is needed for the standalone tests.

## License

Project-authored code in this package is released under the MIT License (see `LICENSE`). Third-party components keep their own terms; `LICENSES.md` is the per-component inventory, including the SAM License that covers `@meta-sam/parser`.
