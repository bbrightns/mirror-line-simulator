# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Engineers and the maintenance team at the MIRROR line (AFT painting rooms). They open the simulator to understand how the Base and Top paint rooms behave, troubleshoot, and check what happens when parameters change.

## Product Purpose
A browser simulator of the MIRROR line's Base paint and Top paint rooms (flow coater). Its main job is parameter tuning and what-if exploration: change layout, speeds, glass sizes and settings and see the effect on gaps, speed-up reference (A), charge and the paint result, before touching the real PLC. It reproduces the Siemens (FC0/FC1/FC2–FC5/FC10/FC12) and Mitsubishi logic layers, sensors, encoders, faults and recipe/HMI behavior.

## Positioning
A simulator built from this line's own ladder printout and glass-size data, covering the specific roller layout, sensors, encoders and PLC logic of the AFT Base/Top paint rooms, rather than a generic conveyor demo.

## Operating Context
- MIRROR line sequence: Loading → Washing → Chemical → Metal Dry → Base paint → Base oven → Top paint → Top oven → Recleaning → Unloading. The simulator models only Base paint and Top paint; other sections may be added later.
- Source documents, most to least reliable: ladder printout (`info/AFT SP MIR-SB03 Book_file_.pdf`) > `info/Glass_size.xlsx` > `info/Logic.xlsx` (its K/Gs rules are outdated). Sensor positions: `info/position_sensor.pdf`.
- Real machine values are still being collected online per `info/PLC_online_checklist.csv` (items #1–74).
- Logic documentation lives in `MIRROR-Line-Logic.md` (Thai).

## Capabilities and Constraints
- Single self-contained HTML file (`flow-coater-simulator-10.html`); it must keep opening offline with no build step or server. Earlier versions are kept in `old-backup/`.
- Two rooms, Base and Top, switched in the UI.
- Many numbers (A, Charge Too Long, speeds/ramp, encoder resolution, layout distances, gaps, Puls lifting DB values) are unconfirmed simulator defaults pending the PLC online checklist. Logic is confirmed from the ladder; values are not.

## Brand Commitments
Room color coding stays recognizable: Base is orange, Top is blue-grey.

## Evidence on Hand
- Ladder printout, glass-size sheet, logic sheet, sensor position PDF and PLC online checklist in `info/`.
- Logos in `assets/` (`logo.png`, `logo_2.png`).
- No confirmed online PLC values yet; do not present simulator defaults as measured line data.

## Product Principles
- Separate confirmed logic from unconfirmed values wherever numbers are shown.
- What-if tuning must be fast to try and easy to compare against the baseline.
- Faithfulness to the ladder logic outranks visual flourish.
- Stay focused on the two paint rooms; keep room for other line sections later.
