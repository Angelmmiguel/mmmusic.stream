const channels = require('./channels.json').channels;
const genres = ['All'];
// Load all genres
channels.forEach((channel) => {
  channel.genres.forEach((genre) => {
    if (genres.indexOf(genre) === -1) {
      genres.push(genre);
    }
  });
});

// next.config.js
module.exports = {
  exportPathMap: () => {
    const routes = {
      '/': { page: '/' }
    };

    genres.forEach((g) => {
      const encodeGenre = g.replace(' ', '-');
      routes[`/genre/${encodeGenre}`] = {
        page: '/',
        query: { genre: g }
      }
    });

    return routes;
  }
}
