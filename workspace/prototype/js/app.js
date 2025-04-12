// Quran Companion Prototype Scripts

// Sample data for the prototype
const sampleVerses = [
  {
    id: 1,
    surah: 1,
    ayah: 1,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    transliteration: "Bismillahir rahmanir raheem"
  },
  {
    id: 2,
    surah: 1,
    ayah: 2,
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translation: "All praise is due to Allah, Lord of the worlds.",
    transliteration: "Alhamdu lillahi rabbil 'alamin"
  },
  {
    id: 3,
    surah: 1,
    ayah: 3,
    arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "The Entirely Merciful, the Especially Merciful,",
    transliteration: "Ar-rahmanir-raheem"
  },
  {
    id: 4,
    surah: 1,
    ayah: 4,
    arabic: "مَالِكِ يَوْمِ الدِّينِ",
    translation: "Sovereign of the Day of Recompense.",
    transliteration: "Maliki yawmid-deen"
  },
  {
    id: 5,
    surah: 1,
    ayah: 5,
    arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    translation: "It is You we worship and You we ask for help.",
    transliteration: "Iyyaka na'budu wa iyyaka nasta'een"
  }
];

// Sample prayer times
const samplePrayerTimes = {
  fajr: "5:23 AM",
  sunrise: "6:46 AM",
  dhuhr: "12:15 PM",
  asr: "3:45 PM",
  maghrib: "6:32 PM",
  isha: "8:01 PM"
};

// DOM elements
document.addEventListener('DOMContentLoaded', function() {
  // Render sample verses
  renderVerses();
  
  // Render prayer times
  renderPrayerTimes();
  
  // Setup event listeners
  setupEventListeners();
});

// Render verses to the DOM
function renderVerses() {
  const versesContainer = document.getElementById('verses-container');
  if (!versesContainer) return;
  
  versesContainer.innerHTML = '';
  
  sampleVerses.forEach(verse => {
    const verseElement = document.createElement('div');
    verseElement.className = 'verse-container';
    verseElement.innerHTML = `
      <div class="verse-arabic">${verse.arabic}</div>
      <div class="verse-translation">
        <span class="verse-number">${verse.ayah}</span>
        ${verse.translation}
      </div>
      <div class="verse-actions">
        <button class="bookmark-btn" data-verse-id="${verse.id}">
          <i class="fas fa-bookmark"></i> Bookmark
        </button>
        <button class="audio-btn" data-verse-id="${verse.id}">
          <i class="fas fa-play"></i> Play
        </button>
        <button class="tafsir-btn" data-verse-id="${verse.id}">
          <i class="fas fa-book"></i> Tafsir
        </button>
      </div>
    `;
    versesContainer.appendChild(verseElement);
  });
}

// Render prayer times to the DOM
function renderPrayerTimes() {
  const prayerTimesContainer = document.getElementById('prayer-times-container');
  if (!prayerTimesContainer) return;
  
  const prayers = [
    { name: 'Fajr', time: samplePrayerTimes.fajr },
    { name: 'Sunrise', time: samplePrayerTimes.sunrise },
    { name: 'Dhuhr', time: samplePrayerTimes.dhuhr },
    { name: 'Asr', time: samplePrayerTimes.asr },
    { name: 'Maghrib', time: samplePrayerTimes.maghrib },
    { name: 'Isha', time: samplePrayerTimes.isha }
  ];
  
  prayers.forEach(prayer => {
    const prayerElement = document.createElement('div');
    prayerElement.className = 'prayer-time-card';
    prayerElement.innerHTML = `
      <h4>${prayer.name}</h4>
      <div class="prayer-time">${prayer.time}</div>
    `;
    prayerTimesContainer.appendChild(prayerElement);
  });
}

// Setup event listeners
function setupEventListeners() {
  // Surah selector
  const surahSelector = document.getElementById('surah-selector');
  if (surahSelector) {
    surahSelector.addEventListener('change', function() {
      // In a real app, this would load the selected surah
      console.log('Selected Surah:', this.value);
    });
  }
  
  // Translation selector
  const translationSelector = document.getElementById('translation-selector');
  if (translationSelector) {
    translationSelector.addEventListener('change', function() {
      // In a real app, this would change the translation
      console.log('Selected Translation:', this.value);
    });
  }
  
  // Search button
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        // In a real app, this would search for the text
        console.log('Search Query:', searchInput.value);
        alert('Search feature would show results for: ' + searchInput.value);
      }
    });
  }
  
  // Bookmark buttons
  document.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const verseId = this.getAttribute('data-verse-id');
      // In a real app, this would toggle bookmark status
      console.log('Bookmark Verse:', verseId);
      alert('Verse ' + verseId + ' has been bookmarked!');
    });
  });
  
  // Audio buttons
  document.querySelectorAll('.audio-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const verseId = this.getAttribute('data-verse-id');
      // In a real app, this would play audio
      console.log('Play Audio for Verse:', verseId);
      alert('Playing audio for verse ' + verseId);
    });
  });
  
  // Tafsir buttons
  document.querySelectorAll('.tafsir-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const verseId = this.getAttribute('data-verse-id');
      // In a real app, this would show tafsir
      console.log('Show Tafsir for Verse:', verseId);
      alert('Showing tafsir for verse ' + verseId);
    });
  });
  
  // Location button for prayer times
  const locationBtn = document.getElementById('location-btn');
  if (locationBtn) {
    locationBtn.addEventListener('click', function() {
      // In a real app, this would get user's location
      console.log('Get User Location');
      alert('Prayer times would update based on your location.');
    });
  }
}

// Function to toggle between light and dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Function to navigate between pages in the prototype
function navigateTo(page) {
  // In a real app, this would use a router
  console.log('Navigate to:', page);
  alert('This would navigate to the ' + page + ' page in the full app.');
}