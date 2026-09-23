'use strict';
const elaLevels = [
  {
    "id": "foundations",
    "name": "Foundations",
    "description": "Build grammar, punctuation, and vocabulary skills.",
    "questions": [
      {
        "topic": "Agreement",
        "question": "Choose the correct sentence.",
        "choices": [
          "The basket of books is heavy.",
          "The basket of books are heavy.",
          "The basket of books be heavy.",
          "The basket of books were heavy today."
        ],
        "answer": 0,
        "explanation": "The subject is the singular noun basket. “Of books” does not change the subject, so use is.",
        "passage": ""
      },
      {
        "topic": "Complete sentences",
        "question": "Which is a complete sentence?",
        "choices": [
          "Because Maya finished.",
          "Maya finished her draft.",
          "After the final bell.",
          "The very quiet library."
        ],
        "answer": 1,
        "explanation": "A complete sentence expresses a full thought with a subject and a verb.",
        "passage": ""
      },
      {
        "topic": "Punctuation",
        "question": "Choose the sentence with correct punctuation.",
        "choices": [
          "After practice we, walked home.",
          "After, practice we walked home.",
          "After practice, we walked home.",
          "After practice, we walked, home."
        ],
        "answer": 2,
        "explanation": "The comma separates the introductory phrase from the main sentence.",
        "passage": ""
      },
      {
        "topic": "Possessives",
        "question": "One student owns a notebook. Choose the correct phrase.",
        "choices": [
          "the students notebook",
          "the students’ notebook",
          "the student notebook’s",
          "the student’s notebook"
        ],
        "answer": 3,
        "explanation": "For one student, add an apostrophe and s: student’s.",
        "passage": ""
      },
      {
        "topic": "Word choice",
        "question": "Choose the correct word: “___ bringing their books.”",
        "choices": [
          "They’re",
          "Their",
          "There",
          "Theirs"
        ],
        "answer": 0,
        "explanation": "They’re means they are. Their shows ownership, and there refers to a place.",
        "passage": ""
      },
      {
        "topic": "Verb tense",
        "question": "Choose the sentence with consistent past tense.",
        "choices": [
          "We packed our bags and walk outside.",
          "We packed our bags and walked outside.",
          "We pack our bags and walked outside.",
          "We packing our bags and walked outside."
        ],
        "answer": 1,
        "explanation": "Packed and walked are both past-tense verbs describing completed actions.",
        "passage": ""
      },
      {
        "topic": "Context clues",
        "question": "What does “reluctant” mean here?",
        "choices": [
          "Very noisy",
          "Certain to win",
          "Unwilling at first",
          "Unable to hear"
        ],
        "answer": 2,
        "explanation": "Her hesitation and wish to stay seated show that she did not want to volunteer at first.",
        "passage": "Nia was reluctant to volunteer. She kept her hand down until her friend encouraged her."
      },
      {
        "topic": "Reading details",
        "question": "Why did Leo return to the gym?",
        "choices": [
          "To watch a new game",
          "To find his homework",
          "To meet his sister",
          "To collect his water bottle"
        ],
        "answer": 3,
        "explanation": "The passage directly says he had left his water bottle on the bench.",
        "passage": "Leo reached the bus stop, then hurried back to the gym. His water bottle was still on the bench."
      },
      {
        "topic": "Sentence clarity",
        "question": "Which sentence is the most precise?",
        "choices": [
          "The red backpack rests beside the door.",
          "The thing is over there.",
          "It is somewhere near that.",
          "Something rests by something."
        ],
        "answer": 0,
        "explanation": "The sentence names the object and gives a clear location.",
        "passage": ""
      },
      {
        "topic": "Combining sentences",
        "question": "Combine without changing the meaning: “Ava read the draft. Ava corrected two errors.”",
        "choices": [
          "Ava read two errors and corrected the draft twice.",
          "Ava read the draft and corrected two errors.",
          "Ava corrected the draft before she read it.",
          "Ava read the draft because it had no errors."
        ],
        "answer": 1,
        "explanation": "The correct choice preserves both actions and avoids repeating the subject.",
        "passage": ""
      }
    ]
  },
  {
    "id": "stretch",
    "name": "Stretch",
    "description": "Grade 7 practice: grammar, inference, evidence, and clear writing.",
    "questions": [
      {
        "topic": "Agreement",
        "question": "Choose the correct verb: “Each of the players ___ a notebook.”",
        "choices": [
          "has",
          "have",
          "are having",
          "were having"
        ],
        "answer": 0,
        "explanation": "Each is singular, even though players is plural. Use has.",
        "passage": ""
      },
      {
        "topic": "Sentence boundaries",
        "question": "Which correctly joins two complete thoughts?",
        "choices": [
          "The rain stopped we went outside.",
          "The rain stopped, so we went outside.",
          "The rain stopped, we went outside.",
          "The rain stopped so, we went outside."
        ],
        "answer": 1,
        "explanation": "A comma plus the coordinating conjunction so joins the two independent clauses.",
        "passage": ""
      },
      {
        "topic": "Pronoun clarity",
        "question": "Which revision makes it clear that the folder belongs to Maya?",
        "choices": [
          "Maya handed Zoe her folder.",
          "She handed her the folder.",
          "Maya handed Zoe Maya’s folder.",
          "Maya and Zoe had her folder."
        ],
        "answer": 2,
        "explanation": "Repeating Maya’s name removes uncertainty about whose folder it is.",
        "passage": ""
      },
      {
        "topic": "Possessives",
        "question": "Several teachers share one lounge. Choose the correct phrase.",
        "choices": [
          "the teacher’s lounge",
          "the teachers lounge’s",
          "the teachers’s lounge",
          "the teachers’ lounge"
        ],
        "answer": 3,
        "explanation": "For a plural noun ending in s, place the possessive apostrophe after the s.",
        "passage": ""
      },
      {
        "topic": "Context clues",
        "question": "What does “meticulous” suggest?",
        "choices": [
          "Very careful about details",
          "Always in a hurry",
          "Uninterested in the task",
          "Unable to make choices"
        ],
        "answer": 0,
        "explanation": "Checking every label twice and aligning the headings show close attention to detail.",
        "passage": "Sam was meticulous: he checked every label twice and made sure every heading lined up."
      },
      {
        "topic": "Inference",
        "question": "What can you reasonably infer about Iris?",
        "choices": [
          "She has never seen the speech before.",
          "She is nervous but prepared.",
          "She wants the event canceled.",
          "She has forgotten all her notes."
        ],
        "answer": 1,
        "explanation": "Shaking hands suggest nerves; practicing three times suggests preparation.",
        "passage": "Iris’s hands shook as she stepped toward the microphone. She took a breath and remembered the speech she had practiced three times."
      },
      {
        "topic": "Evidence",
        "question": "Which detail best supports the idea that the team is inclusive?",
        "choices": [
          "Their uniforms were blue.",
          "Practice began at four.",
          "They invited the new player to join their warm-up.",
          "The gym had two scoreboards."
        ],
        "answer": 2,
        "explanation": "Inviting a newcomer to participate directly supports inclusion.",
        "passage": ""
      },
      {
        "topic": "Theme",
        "question": "Which theme best fits the passage?",
        "choices": [
          "Talent makes effort unnecessary.",
          "Winning is the only reason to practice.",
          "Mistakes should be hidden.",
          "Improvement can come from steady practice."
        ],
        "answer": 3,
        "explanation": "The character improves by practicing and learning from mistakes.",
        "passage": "At first, Lena missed most of her free throws. Each afternoon she practiced ten shots and adjusted her stance. A month later, her aim was steadier."
      },
      {
        "topic": "Transitions",
        "question": "Choose the transition showing a contrast: “The route was longer. ___, it avoided the flooded bridge.”",
        "choices": [
          "However",
          "For example",
          "Similarly",
          "In addition"
        ],
        "answer": 0,
        "explanation": "However signals a contrast between a drawback and a benefit.",
        "passage": ""
      },
      {
        "topic": "Concise writing",
        "question": "Which revision keeps the meaning with the fewest unnecessary words?",
        "choices": [
          "We returned back again to the library.",
          "We returned to the library.",
          "We went to the library for the first time.",
          "We never returned to the library."
        ],
        "answer": 1,
        "explanation": "Returned already means went back, so back again is unnecessary.",
        "passage": ""
      }
    ]
  },
  {
    "id": "challenge",
    "name": "Challenge",
    "description": "Stretch your editing, analysis, and evidence-based reasoning.",
    "questions": [
      {
        "topic": "Modifiers",
        "question": "Choose the sentence that makes the actor clear.",
        "choices": [
          "Walking to school, Maya spotted a hawk.",
          "Walking to school, a hawk was spotted.",
          "Walking to school, the trees were tall.",
          "Walking to school, the backpack felt heavy."
        ],
        "answer": 0,
        "explanation": "The opening phrase describes Maya, who is the subject immediately after the comma.",
        "passage": ""
      },
      {
        "topic": "Parallel structure",
        "question": "Which list uses parallel grammatical forms?",
        "choices": [
          "She enjoys reading, to draw, and swimming.",
          "She enjoys reading, drawing, and swimming.",
          "She enjoys to read, drawing, and swims.",
          "She enjoys reading, drawing, and to swim."
        ],
        "answer": 1,
        "explanation": "Reading, drawing, and swimming use the same grammatical form.",
        "passage": ""
      },
      {
        "topic": "Semicolons",
        "question": "Which sentence uses a semicolon correctly?",
        "choices": [
          "Because the gym; was closed, we left.",
          "The gym was; closed today.",
          "The gym was closed; we practiced outside.",
          "We brought; shoes and water."
        ],
        "answer": 2,
        "explanation": "A semicolon can connect two closely related independent clauses.",
        "passage": ""
      },
      {
        "topic": "Word meaning",
        "question": "What does “qualified support” mean in this passage?",
        "choices": [
          "Support from an athlete",
          "Complete rejection",
          "Support without any concerns",
          "Support with reservations"
        ],
        "answer": 3,
        "explanation": "The writer supports the idea but sets a condition about quiet spaces.",
        "passage": "The editor offered qualified support for longer library hours: the change would help students, provided quiet study spaces remained available."
      },
      {
        "topic": "Inference & evidence",
        "question": "Which inference is best supported?",
        "choices": [
          "Jules values fairness more than easy credit.",
          "Jules dislikes all group work.",
          "Jules wants to cancel the project.",
          "Jules did none of the research."
        ],
        "answer": 0,
        "explanation": "Correcting the credit even when it could benefit Jules supports a concern for fairness.",
        "passage": "The teacher praised Jules for the group’s research. Jules pointed to Ren and said, “Ren found most of our sources. We should explain that in the credits.”"
      },
      {
        "topic": "Theme vs. summary",
        "question": "Which statement is a theme rather than a plot summary?",
        "choices": [
          "Jules corrected the project credits.",
          "Honesty can require giving up an advantage.",
          "Ren found several sources.",
          "A teacher praised a student."
        ],
        "answer": 1,
        "explanation": "A theme expresses an idea that extends beyond the specific events and characters.",
        "passage": ""
      },
      {
        "topic": "Evidence quality",
        "question": "Which evidence best supports extending library hours to help students study?",
        "choices": [
          "The library’s walls were repainted blue.",
          "One student said the building looked nice.",
          "A student survey found many could visit only after current closing time.",
          "The librarian likes mystery novels."
        ],
        "answer": 2,
        "explanation": "The survey directly addresses whether current hours prevent students from using the library.",
        "passage": ""
      },
      {
        "topic": "Author’s purpose",
        "question": "What is the passage mainly trying to do?",
        "choices": [
          "Tell a fictional adventure",
          "Explain how to repair a fountain",
          "Describe a historical battle",
          "Persuade readers to support a change"
        ],
        "answer": 3,
        "explanation": "The writer gives a reason and calls for a specific improvement.",
        "passage": "Our courtyard needs a refill station. Students could refill reusable bottles instead of buying disposable ones. Let’s ask the school council to consider it."
      },
      {
        "topic": "Tone",
        "question": "Which word best describes the narrator’s tone?",
        "choices": [
          "Appreciative",
          "Mocking",
          "Furious",
          "Indifferent"
        ],
        "answer": 0,
        "explanation": "The narrator notices and values a quiet act of kindness.",
        "passage": "No one asked Mr. Chen to stay late, yet there he was, carefully repairing our torn display. His quiet kindness made the room feel warmer."
      },
      {
        "topic": "Revising claims",
        "question": "Which claim is specific and avoids an unsupported absolute?",
        "choices": [
          "Reading always fixes every problem.",
          "A ten-minute reading break may help some students refocus.",
          "Every student learns in exactly the same way.",
          "No one ever needs a break."
        ],
        "answer": 1,
        "explanation": "May and some keep the claim appropriately limited; the other statements make sweeping claims without evidence.",
        "passage": ""
      }
    ]
  }
];
let elaLevel='stretch',elaSet=[],elaIndex=0,elaScore=0,elaAnswered=false;
const elaQueues={};
function startELA(){
 const level=elaLevels.find(l=>l.id===elaLevel);let queue=elaQueues[elaLevel]||[];const picked=[];
 while(picked.length<5){if(!queue.length){queue=level.questions.filter(q=>!picked.includes(q));for(let i=queue.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[queue[i],queue[j]]=[queue[j],queue[i]];}}picked.push(queue.pop());}
 elaQueues[elaLevel]=queue;elaSet=picked;elaIndex=0;elaScore=0;elaAnswered=false;
}
function elaPage(){
 if(elaLevels.some(l=>l.id===state.elaLevel))elaLevel=state.elaLevel;
 return intro('ELA','Read closely. Write clearly.','Grade 7 practice, one small win at a time.')+`<div class="trip-toolbar ela-toolbar"><label for="ela-level">Practice level<select id="ela-level">${elaLevels.map(l=>`<option value="${l.id}" ${l.id===elaLevel?'selected':''}>${l.name}</option>`).join('')}</select></label><button class="small-button" id="ela-new">Start new set</button></div><p class="muted" id="ela-description">${escapeHTML(elaLevels.find(l=>l.id===elaLevel).description)}</p><p class="note">30 original questions across three levels. Five questions per set, with grammar, vocabulary, reading, and writing practice. These are practice materials, not teacher-assigned quiz questions. Starting a set or changing levels resets this score.</p><div class="two-col"><section class="panel" id="ela-quiz" aria-label="ELA practice"></section><aside class="panel"><h2>Find the evidence</h2><ol class="steps"><li>Read the full sentence or passage.</li><li>Look for words that support your answer.</li><li>Read the explanation, even when you get it right.</li></ol><p class="note">No timer. Your selected level stays on this device; scores last for the current set.</p></aside></div>`;
}
function bindELA(){startELA();drawELA();document.querySelector('#ela-new').onclick=()=>{startELA();drawELA();};document.querySelector('#ela-level').onchange=e=>{elaLevel=e.target.value;state.elaLevel=elaLevel;save();document.querySelector('#ela-description').textContent=elaLevels.find(l=>l.id===elaLevel).description;startELA();drawELA();};}
function drawELA(){
 const target=document.querySelector('#ela-quiz');
 if(elaIndex===elaSet.length){target.innerHTML=`<div class="eyebrow">PRACTICE COMPLETE</div><h2 tabindex="-1">One set stronger.</h2><p>You got <strong>${elaScore} of ${elaSet.length}</strong> correct.</p><button class="primary" id="ela-restart">Try another set</button>`;document.querySelector('#ela-restart').onclick=()=>{startELA();drawELA();};return;}
 const q=elaSet[elaIndex];target.innerHTML=`<div class="progress-label">Question ${elaIndex+1} of ${elaSet.length}</div><progress max="5" value="${elaIndex}" aria-label="ELA questions completed"></progress><div class="eyebrow">${escapeHTML(q.topic)}</div>${q.passage?`<div class="ela-passage"><h3>Read this original passage</h3>${escapeHTML(q.passage)}</div>`:''}<h2 class="question" tabindex="-1">${escapeHTML(q.question)}</h2><div class="choices ela-choices">${q.choices.map((c,i)=>`<button class="choice" data-ela-answer="${i}">${escapeHTML(c)}</button>`).join('')}</div><div class="feedback" role="status"></div>`;
 target.querySelectorAll('[data-ela-answer]').forEach(b=>b.onclick=()=>{if(elaAnswered)return;elaAnswered=true;const correct=Number(b.dataset.elaAnswer)===q.answer;if(correct)elaScore++;target.querySelectorAll('[data-ela-answer]').forEach(option=>{option.disabled=true;if(Number(option.dataset.elaAnswer)===q.answer)option.classList.add('correct');else if(option===b)option.classList.add('wrong');});target.querySelector('.feedback').innerHTML=correct?'<strong>You’ve got it.</strong><br>'+escapeHTML(q.explanation):'<strong>Keep going.</strong><br>Correct answer: '+escapeHTML(q.choices[q.answer])+'<br>'+escapeHTML(q.explanation);const next=document.createElement('button');next.className='primary quiz-next';next.textContent=elaIndex===4?'See my score':'Next question';next.onclick=()=>{elaIndex++;elaAnswered=false;drawELA();target.querySelector('h2').focus();};target.append(next);});
 mountFruit(target,q,'[data-ela-answer]');
}
