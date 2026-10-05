if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Figtree"]')) {
  const fontStylesheet = document.createElement('link');
  fontStylesheet.rel = 'stylesheet';
  fontStylesheet.href = 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap';
  document.head.append(fontStylesheet);
}

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#site-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open', !isOpen);
  });
}

const pageLanguage = 'en';

// Shared typography and alignment hooks. Pages use these classes as the
// component contract instead of accumulating page-specific measurements.
document.querySelectorAll('h1').forEach((heading) => heading.classList.add('type-page-title'));
document.querySelectorAll('h2').forEach((heading) => {
  heading.classList.add(heading.closest('.milestone-card') ? 'type-card-title' : 'type-section-title');
});
document.querySelectorAll('h3').forEach((heading) => heading.classList.add('type-subtitle'));
document.querySelectorAll('.kicker, .section-label, .eyebrow, .track-type, .leaderboard-kicker, .example-label').forEach((label) => label.classList.add('type-meta'));
document.querySelectorAll('.task-detail h3').forEach((heading) => heading.classList.add('layout-task-heading'));
document.querySelectorAll('.leaderboard-section > header').forEach((heading) => heading.classList.add('indexed-heading'));
document.querySelectorAll('.rule-list article, .participation-steps li').forEach((row) => row.classList.add('layout-step-row'));

if (navigation) {
  const rulesLink = navigation.querySelector('a[href="rules.html"]');
  if (rulesLink && !navigation.querySelector('a[href="participate.html"]')) {
    const participateLink = document.createElement('a');
    participateLink.href = 'participate.html';
    participateLink.textContent = 'Participate';
    if (location.pathname.endsWith('/participate.html')) participateLink.setAttribute('aria-current', 'page');
    rulesLink.before(participateLink);
  }
}

const footer = document.querySelector('.site-footer');
if (footer) {
  const labels = { title: 'SIGTURK 2027 Shared Task', official: 'SIGTURK', join: 'Join SIGTURK', ethics: 'Code of Ethics and Conduct', workshop: 'SIGTURK 2027 Workshop · details forthcoming', language: 'en' };
  footer.innerHTML = `<div class="footer-meta"><strong>${labels.title}</strong><span>© <span id="year"></span></span></div><nav class="footer-links" aria-label="Related links"><a href="https://sigturk.github.io/">${labels.official}</a><a href="https://sigturk.github.io/join-sigturk/">${labels.join}</a><a href="https://sigturk.github.io/coec/">${labels.ethics}</a><span>${labels.workshop}</span></nav>`;
}

const homeSections = document.querySelectorAll('.home-section');
if (homeSections.length) {
  const updates = document.createElement('section');
  updates.className = 'home-section updates-section';
  updates.innerHTML = '<p class="section-label">LATEST UPDATES</p><h2>Schedule and announcements</h2><ol class="update-list"><li><time>15 October 2026</time><span>Validation data release</span></li><li><time>20 October 2026</time><span>Public leaderboards open</span></li><li><time>To be announced</time><span>Submission rules and registration details</span></li></ol><a class="text-link" href="dates.html">View all important dates →</a>';
  homeSections[homeSections.length - 1].after(updates);
}

const copy = { answer: 'Answer:', accepted: 'Accepted answer:', completion: 'Illustrative open-ended completion', examples: 'examples', imageSource: 'Source', archived: 'archived candidate · not a released item', candidateSource: 'Candidate source', mcqa: 'Illustrative MCQA', nativeReview: 'native review required', next: 'Next example', passage: 'Passage.', previous: 'Previous example' };

const textElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = text;
  return element;
};

const renderSlide = (rawExample, index, total, sourcePrefix, displayPrefix) => {
  const example = { ...rawExample, subtask: rawExample.subtask.replace(sourcePrefix, displayPrefix) };
  const slide = document.createElement('article');
  slide.className = 'example-slide';
  slide.setAttribute('role', 'group');
  slide.setAttribute('aria-label', `${index + 1} / ${total} · ${example.subtask}`);
  const format = example.format === 'mcqa' ? copy.mcqa : copy.completion;
  const review = example.archivedCandidate ? ` · ${copy.archived}` : example.nativeReview ? ` · ${copy.nativeReview}` : '';
  slide.append(textElement('p', 'example-label', `${example.subtask} · ${format}${review}`));

  if (example.image) {
    const figure = document.createElement('figure');
    figure.className = 'example-figure';
    const image = document.createElement('img');
    image.src = example.image.src;
    image.alt = example.image.alt[pageLanguage];
    image.loading = 'lazy';
    const caption = document.createElement('figcaption');
    caption.append(document.createTextNode(`${example.image.caption[pageLanguage]} `));
    const source = document.createElement('a');
    source.href = example.image.href;
    source.textContent = copy.imageSource;
    caption.append(source);
    figure.append(image, caption);
    slide.append(figure);
  }
  if (example.passage) {
    const passage = textElement('p', 'passage', example.passage);
    const label = document.createElement('strong');
    label.textContent = `${copy.passage} `;
    passage.prepend(label);
    slide.append(passage);
  }
  if (example.parallel) {
    const parallel = document.createElement('div');
    parallel.className = 'parallel-example';
    example.parallel.forEach((item) => {
      const row = document.createElement('div');
      row.lang = item.language;
      const label = document.createElement('strong');
      label.textContent = `${item.label}: `;
      row.append(label, document.createTextNode(item.text));
      parallel.append(row);
    });
    slide.append(parallel);
  }
  if (example.prompt) slide.append(textElement('p', 'question-tr', example.prompt));
  if (example.translation) slide.append(textElement('p', 'translation', example.translation));
  if (example.options) {
    const options = document.createElement('ol');
    options.className = 'options';
    options.type = 'A';
    example.options.forEach((option) => options.append(textElement('li', '', option)));
    slide.append(options);
  }
  const answer = document.createElement('p');
  answer.className = 'answer';
  const label = document.createElement('strong');
  label.textContent = example.format === 'mcqa' ? copy.answer : copy.accepted;
  answer.append(label, document.createTextNode(` ${example.answer}.`));
  slide.append(answer);
  if (example.sourceUrl) {
    const sourceLine = document.createElement('p');
    sourceLine.className = 'source-link';
    const sourceLabel = document.createElement('strong');
    sourceLabel.textContent = `${copy.candidateSource}: `;
    const source = document.createElement('a');
    source.href = example.sourceUrl;
    source.textContent = example.sourceUrl;
    source.target = '_blank';
    source.rel = 'noopener noreferrer';
    sourceLine.append(sourceLabel, source);
    slide.append(sourceLine);
  }
  return slide;
};

document.querySelectorAll('[data-example-carousel]').forEach((carousel) => {
  const displayTask = carousel.dataset.task;
  const sourceTask = carousel.dataset.sourceTask || displayTask;
  const examples = window.SIGTURK_EXAMPLES?.[sourceTask] || [];
  if (!examples.length) return;
  const slides = examples.map((example, index) => renderSlide(example, index, examples.length, sourceTask, displayTask));
  const toolbar = document.createElement('div');
  toolbar.className = 'example-toolbar';
  toolbar.append(textElement('p', 'example-note', `${examples.length} ${copy.examples}`));
  const controls = document.createElement('div');
  controls.className = 'example-controls';
  const previous = textElement('button', '', '←');
  previous.type = 'button'; previous.setAttribute('aria-label', copy.previous);
  const counter = textElement('span', 'example-counter', '');
  const next = textElement('button', '', '→');
  next.type = 'button'; next.setAttribute('aria-label', copy.next);
  controls.append(previous, counter, next); toolbar.append(controls);
  const viewport = document.createElement('div');
  viewport.className = 'example-viewport'; viewport.append(...slides);
  carousel.replaceChildren(toolbar, viewport);
  carousel.tabIndex = 0;
  let current = 0;
  const show = (requested) => {
    current = (requested + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => { slide.hidden = slideIndex !== current; });
    counter.textContent = `${current + 1} / ${slides.length}`;
  };
  previous.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
  });
  show(0);
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

