const rssFeedUrl = 'https://bugando.com.br/feed.php';

async function fetchAndDisplayRSSFeed() {
  try {
    const response = await fetch(rssFeedUrl);
    const data = await response.json();

    const rssFeedContainer = document.getElementById('rss-feed');
    rssFeedContainer.innerHTML = '';

    data.forEach((item, index) => {
      const title = item.title;
      const originalDescription = item.description;
      const link = item.link;

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
