const rssFeedUrl = 'https://feeds.feedburner.com/bugando';

async function fetchAndDisplayRSSFeed() {
  try {
    const response = await fetch(rssFeedUrl);
    const text = await response.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');

    const items = xmlDoc.querySelectorAll('item');

    const rssFeedContainer = document.getElementById('rss-feed');

    rssFeedContainer.innerHTML = '';

    items.forEach((item, index) => {
      const title = item.querySelector('title').textContent;
      const originalDescription = item.querySelector('description').textContent;
      const link = item.querySelector('link').textContent;

      const description = limitDescription(originalDescription, 150);

      const card = document.createElement('div');
      card.className = 'rss-card';
      card.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
        <a href="${link}" target="_blank">Leia mais</a>
      `;

      rssFeedContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Ocorreu um erro ao buscar o RSS feed:', error);
  }
}

function limitDescription(description, maxLength) {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + '...';
  }
  return description;
}

fetchAndDisplayRSSFeed();