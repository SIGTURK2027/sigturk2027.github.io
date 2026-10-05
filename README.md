# SIGTURK 2027 Shared Task

The shared task evaluates cultural and linguistic understanding in Turkish, Azerbaijani, Uzbek, Kazakh, and Uyghur.

[Website](https://sigturk2027.github.io/)

## Tracks and tasks

| Track | Tasks |
| --- | --- |
| Text / LLM | T1 Cultural Knowledge and References; T2 Idioms and Conventional Expressions; T3 Turkic Reading Comprehension; T4 Cross-Lingual Cultural Understanding |
| Vision / VLM | V1 Visual Cultural Grounding |

Teams may enter either track or both. A Text submission uses one system across T1–T4; a Vision submission uses one for V1. The same system may serve both tracks, with separate submissions and evaluations.

## Participant information

- [Tasks and examples](https://sigturk2027.github.io/tasks.html)
- [Participation rules](https://sigturk2027.github.io/rules.html)
- [Leaderboards and model-size bands](https://sigturk2027.github.io/leaderboards.html)
- [Important dates](https://sigturk2027.github.io/dates.html)
- [Contact](https://sigturk2027.github.io/contact.html)

Questions: [nlp@ceng.metu.edu.tr](mailto:nlp@ceng.metu.edu.tr).

## Website maintenance

The site uses plain HTML, CSS, and JavaScript. Pages are at the repository root; `assets/` contains styles, scripts, and images, and `tr/` contains redirects to English pages.

For a local preview, run from the repository root:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000/.

GitHub Pages deploys `main` from `/(root)` on each push. `.nojekyll` disables Jekyll processing. Check the Actions tab for build and deployment status.
