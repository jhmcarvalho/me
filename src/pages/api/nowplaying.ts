import { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

const api = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
        if (!refreshToken) {
            return res.status(400).json({ error: 'Missing refresh token' });
        }

        api.setRefreshToken(refreshToken);
        const data = await api.refreshAccessToken();
        const accessToken = data.body['access_token'];
        api.setAccessToken(accessToken);

        // Try to get currently playing track
        const currentlyPlaying = await api.getMyCurrentPlayingTrack();

        if (currentlyPlaying.body && currentlyPlaying.body.item) {
            const track = currentlyPlaying.body.item as any;
            return res.status(200).json({
                isPlaying: true,
                name: track.name,
                artists: track.artists,
                album: track.album,
                external_urls: track.external_urls,
            });
        }

        // Fallback to recently played
        const recentTracks = await api.getMyRecentlyPlayedTracks({ limit: 1 });
        if (recentTracks.body.items.length > 0) {
            const track = recentTracks.body.items[0].track;
            return res.status(200).json({
                isPlaying: false,
                name: track.name,
                artists: track.artists,
                album: track.album,
                external_urls: track.external_urls,
            });
        }

        return res.status(200).json({ isPlaying: false, message: 'No tracks found' });
    } catch (err: any) {
        console.error('Spotify API Error:', err.message);
        res.status(500).json({ error: 'Failed to fetch Spotify data' });
    }
};

export default handler;
