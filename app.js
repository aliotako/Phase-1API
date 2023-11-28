const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Spotify API credentials
';

// Spotify23 API endpoint
const spotifyApiUrl = 'https://spotify23.p.rapidapi.com';

// Middleware to set headers for API requests

  next();
});

// Route to search for playlists by genre
app.get('/search/:genre', async (req, res) => {
  try {
    // Get access token from Spotify
    const { data: { access_token } } = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        q: '<REQUIRED>',
    type: 'multi',
    offset: '0',
    limit: '10',
    numberOfTopResults: '5'
        grant_type: 'client_credentials',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
    });

    // Search for playlists by genre using Spotify23 API
    const genre = req.params.genre;
    const { data: { playlists } } = await axios.get(`${spotifyApiUrl}/search/playlist`, {
      params: {
        genre,
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Extract relevant information (e.g., playlist names and tracks)
    const results = playlists.slice(0, 10).map(playlist => ({
      name: playlist.name,
      tracks: playlist.tracks.map(track => track.name),
    }));

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
