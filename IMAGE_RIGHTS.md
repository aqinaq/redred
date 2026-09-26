# Image rights and provenance

Reviewed: 26 September 2026

## Published image set

Every bitmap referenced in `src/content.js` was generated specifically for the fictional OFF//RECORD portfolio concept with OpenAI's image-generation tool. No third-party photographs, logos, recognizable public figures, named artists, branded products or supplied reference images were used as inputs.

OpenAI's applicable terms state that, as between the user and OpenAI and to the extent permitted by law, the user owns the output and OpenAI assigns its interest in that output. This makes these outputs suitable for the owner's portfolio use, subject to the terms and applicable law. AI output may not be unique, so this ledger records provenance rather than promising copyright exclusivity.

Terms checked: https://openai.com/policies/terms-of-use/

| Site role | Published source | Generation output ID | Review |
| --- | --- | --- | --- |
| Hero / art essay | `concept-hero.jpg` | `exec-78e4301a-30b4-46a9-9e6a-305b06dfd532` | Original prompt; no external image input; no visible brand/text/landmark |
| City essay | `concept-city.jpg` | `exec-0f010356-6a32-4243-b81b-7077f950bfd3` | Original prompt; no external image input; fictional subject |
| Fashion editorial | `concept-fashion.jpg` | `exec-e7279b03-d01b-43f6-ba2e-c3a0ecbe3a09` | Original prompt; generic unbranded clothing; fictional subjects |
| Music essay | `concept-music.jpg` | `exec-65fe3f4a-3945-4104-8c2a-4f3e9560dfc0` | Original prompt; generic instruments; fictional subjects |
| Dance essay | `concept-dance.jpg` | `exec-377ee07f-7af1-4936-a180-9c796d6c405d` | Original prompt; abstract projection; no referenced artwork |
| Visual notebook | `concept-metro.jpg` | `exec-aaf4be82-d5ba-47b0-a5f0-08c787e341ac` | Original prompt; fictional transit architecture; no transit branding |

Each `.jpg` has a corresponding `-640.webp` and `-1600.webp` derivative created locally from the same generated PNG. The `.png` generation masters are retained in `artwork-source/`, outside the public deployment directory.

## Publication rule

Only files prefixed `concept-` are approved for published editorial use. Older unprefixed files have been quarantined in `legacy-unverified-images/`, outside the public deployment directory; they have undocumented provenance and must not be reintroduced without a separate rights record.

This is a project provenance audit, not legal advice. Recheck the linked terms before transferring the assets or using them outside this portfolio project.
