# Music Playlist

Place your music files in this folder to create a custom playlist for the game.

## Required Files

- `track1.mp3` - First track
- `track2.mp3` - Second track
- `track3.mp3` - Third track
- `track4.mp3` - Fourth track
- `track5.mp3` - Fifth track

## Supported Formats

- MP3 (recommended for best browser compatibility)
- WAV
- OGG

## Adding More Tracks

To add more tracks beyond the default 5:

1. Add your music files to this folder (e.g., `track6.mp3`, `track7.mp3`)
2. Edit `game.js` and add them to the playlist array:

```javascript
this.playlist = [
    { title: 'Chill Vibes', src: 'music/track1.mp3' },
    { title: 'Game On', src: 'music/track2.mp3' },
    { title: 'Focus Time', src: 'music/track3.mp3' },
    { title: 'Winning Streak', src: 'music/track4.mp3' },
    { title: 'Electronic Dreams', src: 'music/track5.mp3' },
    { title: 'Your Track Name', src: 'music/track6.mp3' }
];
```

## Tips

- Use royalty-free music or music you have rights to use
- Keep files at a reasonable size (3-5 MB per track is good)
- Consider using instrumental or low-distraction music for better gameplay focus
- Name your files with the track titles for easier organization

## Free Music Resources

- YouTube Audio Library
- Free Music Archive
- Incompetech
- Bensound
- Purple Planet
