// Edit this file to personalize the hub. Keep IDs stable to preserve saved checkmarks.
// Use generic details on a public website; this file is visible to visitors.
window.HUB_CONTENT = {
  name: 'Madison',
  math: [
    { question: 'What is 3/4 + 1/8?', choices: ['4/12', '7/8', '1/2', '5/8'], answer: 1, explanation: '3/4 is 6/8. Add 1/8 to get 7/8.' },
    { question: 'What is 25% of 80?', choices: ['20', '25', '40', '60'], answer: 0, explanation: '25% is one quarter. 80 ÷ 4 = 20.' },
    { question: 'Solve: 3x + 5 = 20', choices: ['3', '4', '5', '6'], answer: 2, explanation: 'Subtract 5 from both sides, then divide by 3: x = 5.' },
    { question: 'A rectangle is 8 cm by 5 cm. What is its area?', choices: ['13 cm²', '26 cm²', '35 cm²', '40 cm²'], answer: 3, explanation: 'Area = length × width. 8 × 5 = 40 cm².' },
    { question: 'What is −4 + 9?', choices: ['−13', '−5', '5', '13'], answer: 2, explanation: 'Start at −4 and move 9 steps to the right: you reach 5.' }
  ],
  basketball: [
    { id: 'handles', title: 'Find your handle', detail: '3 minutes · Alternate right and left hands, then try controlled crossovers.' },
    { id: 'form', title: 'Start close. Finish strong.', detail: '5 minutes · Practice close-range form shots. Focus on balance and follow-through.' },
    { id: 'footwork', title: 'Move with purpose', detail: '3 minutes · Practice jump stops and pivots, keeping your head up.' },
    { id: 'free-throws', title: 'Build your routine', detail: '4 minutes · Take 10 free throws with the same setup each time.' }
  ],
  trip: { title: 'A weekend by the coast', subtitle: 'Sample trip · Make it your own', stops: [
    { time: 'Morning', title: 'Head out & explore', detail: 'Pick a scenic stop and bring a road-trip playlist.' },
    { time: 'Afternoon', title: 'Beach time', detail: 'Walk the shoreline, have a picnic, and take a few photos.' },
    { time: 'Evening', title: 'A good end to the day', detail: 'Try a local dinner spot and choose tomorrow’s adventure.' }
  ] },
  packing: [{id:'water',title:'Water bottle'},{id:'layers',title:'An extra layer'},{id:'charger',title:'Charger'},{id:'book',title:'Book or headphones'},{id:'sun',title:'Hat & sunscreen'}],
  school: [
    { id: 'reading', title: 'Read for 20 minutes', detail: 'English · Choose a book you enjoy.' },
    { id: 'math-review', title: 'Review fractions', detail: 'Math · Try the practice set in your hub.' },
    { id: 'science', title: 'Look over science notes', detail: 'Science · Write down one question for class.' },
    { id: 'bag', title: 'Pack for tomorrow', detail: 'Planner, homework, water bottle. Ready to go.' }
  ]
};
