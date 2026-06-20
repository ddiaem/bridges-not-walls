
const DISSEMINATION_COUNTRIES = [
  {
    flag: '🇦🇲',
    name: 'Armenia',
    photo: 'armenia.JPG',
    meta: 'Interactive workshop · ages 13–18',
    paragraphs: [
      'We organized an interactive workshop for young people aged 13–18 to share the experience and knowledge gained through our Erasmus+ youth exchange in Croatia.',
      'The workshop began with an introduction to Erasmus+ — its opportunities, benefits, and application process — followed by a presentation of our project, its objectives, and the main topics we explored, particularly conflict management and effective resolution approaches.',
      'As part of the activity, we introduced the <strong>High Five Method</strong> as a practical tool for managing everyday conflicts, and ran a True/False &amp; 50/50 quiz, a Forum Theatre role-play, and a repeat quiz to measure how participants\' understanding had evolved.',
      'The session raised awareness of Erasmus+ opportunities while building practical conflict-resolution skills, critical thinking, and teamwork.'
    ],
    download: { file: 'armenia.pdf', label: 'High Five Method' }
  },
  {
    flag: '🇷🇴',
    name: 'Romania',
    photo: 'romania.jpg',
    meta: '2 presentations',
    paragraphs: [
      'Denis-Răzvan Crișan and Rad Sergiu Bogdan held two presentations in front of an audience to share their experience and what they learned during the youth exchange "Bridges, Not Walls" in Radoboj, Croatia (07–16 May 2026).',
      'Participants were informed about the project, what the team learned during it, and about Erasmus+ in general — including how they could take part in a similar experience themselves.',
      'The presentations had a strong impact on the audience, with several participants visibly interested in joining an Erasmus+ project of their own.'
    ]
  },
  {
    flag: '🇪🇸',
    name: 'Spain',
    photo: 'spain.jpg',
    meta: 'Dissemination event & workshop',
    paragraphs: [
      'As part of the Erasmus+ project, a dissemination event was organized to share the experience and results with other young people and the local community.',
      'Participants presented what they had learned throughout the project — especially conflict resolution, communication, and intercultural understanding — aiming to spread awareness of peaceful dialogue and cooperation between cultures.',
      'The event included presentations, group reflections, and interactive activities where the audience could try small exercises related to teamwork and problem-solving, alongside personal stories about how the exchange improved participants\' social skills, confidence, and ability to work in international teams.'
    ]
  },
  {
    flag: '🇺🇦',
    name: 'Ukraine',
    photo: 'Ukraine.jpg',
    meta: 'Online event',
    paragraphs: [
      'The Ukrainian team held an online dissemination event to reach young people who couldn\'t join in person. Using a presentation built around the project, the team explained what Erasmus+ offers — from international experience and Youthpass to soft skills, networking, and practising English — and walked participants through the activities and methods used during the exchange in Croatia.',
      'Participants asked questions about the application process and what everyday life on an exchange looks like, and several said they wanted to apply for a future mobility themselves.',
      'The online session brought together young people eager to learn more about international youth exchanges.'
    ]
  },
  {
    flag: '🇲🇩',
    name: 'Moldova',
    photo: 'moldova.jpg',
    meta: 'Offline event',
    paragraphs: [
      'The Moldovan team organized an offline dissemination event, bringing together young people to share their Erasmus+ experience face to face.',
      'The team talked through the project\'s goals and activities, focusing on the conflict-resolution and communication tools practised in Croatia, and answered questions from the audience about how to get involved in future Erasmus+ exchanges.',
      'The event gave participants a first-hand look at what a youth exchange involves and encouraged several attendees to consider applying themselves.'
    ]
  },
  {
    flag: '🇭🇷',
    name: 'Croatia',
    photo: null, // no dissemination photo received yet — renders as "still loading"
    meta: 'Offline event · small group',
    paragraphs: [
      'The Croatian participants held a small offline dissemination meeting with friends and peers to share their experience from the exchange in Radoboj.',
      'In an informal setting, they talked about the project\'s focus on conflict resolution and mediation, shared highlights from the workshops and cultural nights, and encouraged those interested to look into future Erasmus+ opportunities.',
      'Although the group was small, the relaxed format sparked genuine conversations and questions about how to take part in similar projects.'
    ]
  }
];

(function () {
  const grid = document.getElementById('disseminationGrid');
  if (!grid) return;
  if (!DISSEMINATION_COUNTRIES.length) return; // keep whatever markup is already in the HTML

  grid.innerHTML = '';

  DISSEMINATION_COUNTRIES.forEach(country => {
    const card = document.createElement('article');
    card.className = 'dissem-card';

    /* ── image / loading placeholder ── */
    const imgWrap = document.createElement('div');
    imgWrap.className = 'dissem-img-wrap';

    if (country.photo) {
      const img = document.createElement('img');
      img.src = `assets/images/gallery/${country.photo}`;
      img.alt = `Dissemination in ${country.name}`;
      img.className = 'dissem-img';
      img.loading = 'lazy';
      // If the file fails to load for any reason, fall back to the
      // same "still loading" placeholder used for missing photos.
      img.onerror = function () {
        imgWrap.classList.add('dissem-img-wrap--loading');
        imgWrap.innerHTML = dissemLoadingMarkup();
      };
      imgWrap.appendChild(img);
    } else {
      imgWrap.classList.add('dissem-img-wrap--loading');
      imgWrap.innerHTML = dissemLoadingMarkup();
    }

    const flag = document.createElement('span');
    flag.className = 'dissem-flag';
    flag.textContent = `${country.flag} ${country.name}`;
    imgWrap.appendChild(flag);

    /* ── text body ── */
    const body = document.createElement('div');
    body.className = 'dissem-body';

    const meta = document.createElement('span');
    meta.className = 'dissem-meta';
    meta.textContent = country.meta;
    body.appendChild(meta);

    country.paragraphs.forEach(text => {
      const p = document.createElement('p');
      p.innerHTML = text;
      body.appendChild(p);
    });

    if (country.download) {
      const link = document.createElement('a');
      link.href = `assets/docs/${country.download.file}`;
      link.setAttribute('download', '');
      link.className = 'dissem-download';
      link.innerHTML = `<span>📄</span> ${country.download.label}`;
      body.appendChild(link);
    }

    card.appendChild(imgWrap);
    card.appendChild(body);
    grid.appendChild(card);
  });

  // Shared markup for "photo not loaded yet" placeholder cards.
  function dissemLoadingMarkup() {
    return `
      <div class="dissem-img-fallback" aria-hidden="true">
        <span class="dissem-spinner"></span>
        <span class="dissem-fallback-text">Photo loading…</span>
      </div>
    `;
  }
})();
