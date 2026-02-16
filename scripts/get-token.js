const path = require('path');
const { exec } = require('child_process');
const SpotifyWebApi = require('spotify-web-api-node');
const readline = require('readline');

// LOAD ENV
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const clientId = process.env.SPOTIFY_ID;
const clientSecret = process.env.SPOTIFY_SECRET;
// Use the Vercel URL as redirect to avoid HTTP/Localhost issues
const redirectUri = 'https://perfiljeff.vercel.app';

if (!clientId || !clientSecret) {
    console.error('Error: SPOTIFY_ID or SPOTIFY_SECRET not found in .env.local');
    process.exit(1);
}

const spotifyApi = new SpotifyWebApi({
    clientId,
    clientSecret,
    redirectUri,
});

const scopes = [
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-read-playback-state',
];

const authorizeURL = spotifyApi.createAuthorizeURL(scopes);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('\n1. Opening browser for Spotify Authorization...');
console.log('--- IF IT DOES NOT OPEN, COPY AND PASTE THIS URL IN YOUR BROWSER: ---');
console.log(authorizeURL);
console.log('--------------------------------------------------------------------\n');
console.log('2. After you authorize, you will be redirected to your site.');
console.log('3. LOOK AT THE URL in your browser. It will have a "?code=..." part.');
console.log('4. Copy EVERYTHING after "code=" and paste it here.\n');

// Open browser (Platform specific)
const start = process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open';
exec(`${start} "${authorizeURL}"`);

rl.question('Paste the code from the URL here: ', async (code) => {
    if (code) {
        try {
            // If they pasted the whole URL, extract the code
            if (code.includes('code=')) {
                code = new URL(code).searchParams.get('code');
            }

            const data = await spotifyApi.authorizationCodeGrant(code);
            const refreshToken = data.body['refresh_token'];

            console.log('\n-----------------------------------');
            console.log('REFRESH TOKEN OBTAINED:');
            console.log(refreshToken);
            console.log('-----------------------------------\n');
            console.log('1. Copy the token above.');
            console.log('2. Add it to .env.local: SPOTIFY_REFRESH_TOKEN=' + refreshToken);
            console.log('3. Restart your dev server.');

        } catch (err) {
            console.error('Error getting token:', err.message);
        }
    }
    rl.close();
});
