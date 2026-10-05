'use strict';
// Original Fall of Rome practice. Answers are zero-based choice indexes.
// Targets the Rome One-Pager skills: state a claim, then support it with an accurate fact.
const historyLevels = [
  {
    id: 'rome-claims',
    name: 'Fall of Rome · Claim and evidence',
    description: 'Practice from the Rome One-Pager: make a specific claim, then back it with an accurate fact, date, or cause. 12 original questions, five at a time.',
    questions: [
      {
        topic: 'Stronger claim',
        type: 'stronger-claim',
        question: 'Which is the stronger claim about the fall of the Western Roman Empire?',
        choices: [
          'Rome had some problems.',
          'The Western Roman Empire weakened over time because several pressures hit at once, including unstable leadership, money troubles, and attacks along the borders.',
          'Everything in history is connected.',
          'People in the past were different from people today.'
        ],
        answer: 1,
        explanation: 'A strong claim is specific, and someone could agree or disagree using evidence. The second choice names a clear argument and the kinds of facts that could support it. The others only summarize and do not take a position.'
      },
      {
        topic: 'Stronger claim',
        type: 'stronger-claim',
        question: 'Which claim is specific enough to support with evidence?',
        choices: [
          'The fall of Rome was bad.',
          'Rome fell for many reasons.',
          'The Visigoth sack of Rome in 410 CE shows that the Western Roman Empire could not protect the city of Rome.',
          'History is important to learn.'
        ],
        answer: 2,
        explanation: 'The third choice makes a debatable point and names a real event and date. “Was bad” and “many reasons” are vague summaries. By 410 the western government was in Ravenna, so this claim is about the city of Rome, not about a one-day end of the whole empire.'
      },
      {
        topic: 'Stronger claim',
        type: 'stronger-claim',
        question: 'Which claim is a clear argument rather than only a summary?',
        choices: [
          'There were emperors, taxes, and armies.',
          'The Roman Empire existed for a long time.',
          'Things changed in the ancient world.',
          'After 395 CE, ruling the empire as two halves made the Western Roman Empire harder to defend on its own.'
        ],
        answer: 3,
        explanation: 'The last choice states a cause-and-effect argument. Theodosius I, who died in 395 CE, was the last emperor to rule both halves; after that the west had to manage its own defense. The other sentences only describe the topic.'
      },
      {
        topic: 'Best evidence',
        type: 'best-evidence',
        question: 'Claim: “Political instability made it harder for Rome to respond to other problems.” Which evidence best supports that claim?',
        choices: [
          'During the Crisis of the Third Century (about 235–284 CE), many emperors ruled for only a short time and were often overthrown.',
          'The city of Rome was built on seven hills.',
          'Romans spoke Latin.',
          'Constantine dedicated a new capital at Constantinople in 330 CE.'
        ],
        answer: 0,
        explanation: 'Short reigns and frequent overthrow show unstable leadership, which supports the claim. The hills, the Latin language, and the new capital are real facts, but they do not show that unstable politics got in the way of handling other problems.'
      },
      {
        topic: 'Best evidence',
        type: 'best-evidence',
        question: 'Claim: “476 CE is a traditional marker for the end of the Western Roman Empire, not the end of every part of the Roman world.” Which evidence best supports that claim?',
        choices: [
          'In 476 CE, Odoacer removed Romulus Augustulus from power in the west.',
          'In 476 CE, Odoacer removed Romulus Augustulus in the west, while the Eastern Roman Empire kept its own emperor and continued for many more centuries.',
          'Julius Caesar became dictator in the first century BCE.',
          'The Roman Republic began around 509 BCE.'
        ],
        answer: 1,
        explanation: 'The claim has two parts: the 476 date, and the idea that the whole Roman world did not end. Only the second choice includes both the change in the west and the surviving eastern empire. The first choice supports only the western half of the claim.'
      },
      {
        topic: 'Best evidence',
        type: 'best-evidence',
        question: 'Claim: “Military pressure was one cause of the Western Roman Empire’s decline.” Which fact best supports that claim?',
        choices: [
          'Romans built roads and aqueducts.',
          'The Colosseum could hold tens of thousands of spectators.',
          'Latin influenced later European languages.',
          'The Visigoths sacked the city of Rome in 410 CE.'
        ],
        answer: 3,
        explanation: 'A sack of the city of Rome is direct evidence of military pressure. Roads, the Colosseum, and the Latin language show Roman achievements. They do not support a claim about military causes of decline.'
      },
      {
        topic: 'Historical accuracy',
        type: 'historical-accuracy',
        question: 'Which sentence has a historical accuracy problem?',
        choices: [
          'The Visigoths, led by Alaric, sacked Rome in 410 CE.',
          'The Vandals sacked Rome in 455 CE.',
          'The Western Roman Empire ended in 476 CE when tanks broke through the walls of Rome.',
          'Historians often use 476 CE as the traditional end of the Western Roman Empire.'
        ],
        answer: 2,
        explanation: 'Tanks did not exist in the ancient world. That is an anachronism: a detail from the wrong time. The 410 and 455 sacks are real events, and 476 CE is the usual date for the end of the western empire, when Odoacer removed Romulus Augustulus.'
      },
      {
        topic: 'Historical accuracy',
        type: 'historical-accuracy',
        question: 'Which sentence gets the history wrong?',
        choices: [
          'Julius Caesar’s assassination in 44 BCE caused the fall of the Western Roman Empire in the 400s CE.',
          'Diocletian became emperor in 284 CE and tried to restore order after a period of short reigns.',
          'Theodosius I, who died in 395 CE, was the last emperor to rule both the eastern and western halves.',
          'Romulus Augustulus was removed from power in the west in 476 CE.'
        ],
        answer: 0,
        explanation: 'Caesar was killed in 44 BCE, more than 500 years before 476 CE. His death belongs to the end of the Republic, not to the fall of the Western Roman Empire. The other sentences use the usual dates for Diocletian, the split after Theodosius I, and Romulus Augustulus.'
      },
      {
        topic: 'Historical accuracy',
        type: 'historical-accuracy',
        question: 'Which sentence makes an unsupported leap?',
        choices: [
          'Heavy taxes and a shrinking tax base strained the western economy.',
          'Because one emperor was unpopular, every Roman person immediately stopped farming and the empire ended the next day.',
          'Defending long borders was expensive for the Roman government.',
          'Civil wars used soldiers and money that could have defended the frontiers.'
        ],
        answer: 1,
        explanation: 'The second sentence jumps from one opinion to a sudden, total collapse. The western empire’s decline took many years and had several causes. The other sentences stay with real pressures: taxes, the cost of borders, and civil war.'
      },
      {
        topic: 'Claim and evidence',
        type: 'claim-and-evidence',
        question: 'Which sentence best pairs a claim with concrete evidence?',
        choices: [
          'Military pressure reached the city of Rome itself; the Visigoths sacked Rome in 410 CE.',
          'Rome fell because of stuff that happened.',
          'Rome was an empire, and empires are places with emperors.',
          'Many things occurred before the empire changed.'
        ],
        answer: 0,
        explanation: 'The first sentence states a claim, then gives a specific event and date as evidence. The others summarize or define a word. A definition or a vague summary does not prove a point.'
      },
      {
        topic: 'Claim and evidence',
        type: 'claim-and-evidence',
        question: 'Which revision best fixes this summary? “The economy was a problem.”',
        choices: [
          'The economy was a problem, and that is why.',
          'The economy was bad in every single year for every single person.',
          'Economic strain contributed to the decline: the government raised taxes to pay the army, while trade was disrupted and Roman coins lost value.',
          'Rome had an economy.'
        ],
        answer: 2,
        explanation: 'The third choice keeps a careful claim (“contributed”) and adds concrete economic evidence. The first adds no facts. The second is an absolute leap. The last only names the topic.'
      },
      {
        topic: 'Claim and evidence',
        type: 'claim-and-evidence',
        question: 'Which sentence is the stronger claim-and-evidence pair?',
        choices: [
          'Politics happened in Rome.',
          'Rome fell only because people stopped liking the emperor, so the date must have been 44 BCE.',
          'There were many reasons, probably, in some way.',
          'Political instability mattered because, in the Crisis of the Third Century (about 235–284 CE), emperors often ruled briefly and were overthrown, which disrupted steady government.'
        ],
        answer: 3,
        explanation: 'The last sentence makes a claim and supports it with a named period and a specific pattern: short reigns and overthrow. The first and third stay vague. The second uses a wrong cause and the wrong date.'
      }
    ]
  }
];

let historyLevel = 'rome-claims';
let historySet = [];
let historyIndex = 0;
let historyScore = 0;
let historyAnswered = false;
const historyQueues = {};

function startHistory() {
  const level = historyLevels.find(item => item.id === historyLevel);
  let queue = historyQueues[historyLevel] || [];
  const picked = [];
  while (picked.length < Math.min(5, level.questions.length)) {
    if (!queue.length) {
      queue = level.questions.filter(question => !picked.includes(question));
      for (let i = queue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [queue[i], queue[j]] = [queue[j], queue[i]];
      }
    }
    picked.push(queue.pop());
  }
  historyQueues[historyLevel] = queue;
  historySet = picked;
  historyIndex = 0;
  historyScore = 0;
  historyAnswered = false;
}

function historyPage() {
  const level = historyLevels.find(item => item.id === historyLevel);
  const total = historyLevels.reduce((count, item) => count + item.questions.length, 0);
  return intro('HISTORY', 'Make a claim. Back it up.', 'Fall of Rome practice for critical thinking and historical accuracy.') +
    `<section class="panel team-schedule" aria-labelledby="history-practice-title"><div class="eyebrow">WORLD HISTORY 7 · MRS. PHAN · ROME ONE-PAGER</div><h2 id="history-practice-title">Critical thinking and historical accuracy</h2><p>This practice targets Critical Thinking and Historical Accuracy from the Rome One-Pager rubric. On that assignment (about September 16), both skills scored a 2. Vocab is no longer the weak spot: the Fall of Rome vocab quiz is now a 3.</p><p><strong>State a claim</strong> that is specific enough to debate. Then <strong>support it with accurate facts or evidence</strong>, such as a date, a cause, or a real event. Summarizing the topic is not enough, and a wrong date or a made-up detail makes the history inaccurate.</p><p class="note">Practice only, not a real grade. No timer. These are original questions, not a copy of the class one-pager.</p><button class="primary" id="history-start">Practice claim and evidence</button></section><div class="trip-toolbar"><button class="small-button" id="history-new">Start new set</button></div><p class="muted" id="history-description">${escapeHTML(level.description)}</p><p class="note">${total} original questions. Each set has five. Starting a new set resets this score.</p><div class="two-col"><section class="panel" id="history-quiz" aria-label="History practice"></section><aside class="panel"><h2>Claim, then proof</h2><ol class="steps"><li>Ask what the sentence is arguing.</li><li>Check the fact, the date, and the cause.</li><li>Choose the answer that pairs a clear claim with real evidence.</li></ol><p class="note">No timer. Read the explanation after every answer, including the ones you get right.</p></aside></div>`;
}

function bindHistory() {
  startHistory();
  drawHistory();
  document.querySelector('#history-start').onclick = () => {
    const heading = document.querySelector('#history-quiz h2');
    if (heading) heading.focus();
  };
  document.querySelector('#history-new').onclick = () => {
    startHistory();
    drawHistory();
  };
}

function drawHistory() {
  const target = document.querySelector('#history-quiz');
  if (historyIndex === historySet.length) {
    target.innerHTML = `<div class="eyebrow">PRACTICE COMPLETE</div><h2 tabindex="-1">One set stronger.</h2><p>You got <strong>${historyScore} of ${historySet.length}</strong> correct. The goal is a clear claim plus an accurate fact.</p><button class="primary" id="history-restart">Try another set</button>`;
    document.querySelector('#history-restart').onclick = () => {
      startHistory();
      drawHistory();
    };
    return;
  }
  const question = historySet[historyIndex];
  target.innerHTML = `<div class="progress-label">Question ${historyIndex + 1} of ${historySet.length}</div><progress max="${historySet.length}" value="${historyIndex}" aria-label="History questions completed"></progress><div class="eyebrow">${escapeHTML(question.topic)}</div><h2 class="question" tabindex="-1">${escapeHTML(question.question)}</h2><div class="choices history-choices">${question.choices.map((choice, index) => `<button class="choice" data-history-answer="${index}">${escapeHTML(choice)}</button>`).join('')}</div><div class="feedback" role="status" aria-live="polite"></div>`;
  target.querySelectorAll('[data-history-answer]').forEach(button => {
    button.onclick = () => {
      if (historyAnswered) return;
      historyAnswered = true;
      const correct = Number(button.dataset.historyAnswer) === question.answer;
      if (correct) historyScore++;
      target.querySelectorAll('[data-history-answer]').forEach(option => {
        option.disabled = true;
        if (Number(option.dataset.historyAnswer) === question.answer) option.classList.add('correct');
        else if (option === button) option.classList.add('wrong');
      });
      target.querySelector('.feedback').innerHTML = correct
        ? '<strong>You’ve got it.</strong><br>' + escapeHTML(question.explanation)
        : '<strong>Keep going.</strong><br>Correct answer: ' + escapeHTML(question.choices[question.answer]) + '<br>' + escapeHTML(question.explanation);
      const next = document.createElement('button');
      next.className = 'primary quiz-next';
      next.textContent = historyIndex === historySet.length - 1 ? 'See my score' : 'Next question';
      next.onclick = () => {
        historyIndex++;
        historyAnswered = false;
        drawHistory();
        const heading = target.querySelector('h2');
        if (heading) heading.focus();
      };
      target.append(next);
    };
  });
  mountFruit(target, question, '[data-history-answer]');
}
