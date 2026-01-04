# 2048 Game with Music Playlist and Custom Tiles

A feature-rich implementation of the popular 2048 game with added music playlist functionality and support for custom tile images.

## Features

- **Classic 2048 Gameplay**: Merge tiles to reach 2048 and beyond
- **Music Playlist**: Integrated music player with playlist management
  - Play/Pause controls
  - Previous/Next track navigation
  - Shuffle mode
  - Volume control with mute option
  - Visual playlist with track selection
- **Custom Tile Images**: Support for custom images on tiles when you upgrade
- **Score Tracking**: Current score and best score (saved in browser)
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Animations**: Tile movements and merges with visual effects

## How to Play

1. Open `index.html` in a web browser
2. Use arrow keys (↑ ↓ ← →) to move tiles
3. When two tiles with the same number touch, they merge into one
4. Try to reach the 2048 tile!

## Adding Custom Music

To add your own music to the playlist:

1. Place your MP3 files in the `music/` folder
2. Name them as follows:
   - `track1.mp3`
   - `track2.mp3`
   - `track3.mp3`
   - `track4.mp3`
   - `track5.mp3`
3. (Optional) Edit `game.js` to change track titles in the playlist array

## Adding Custom Tile Images

To use custom images for tiles:

1. Create PNG images for each tile value (2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048)
2. Place them in the `images/` folder with these names:
   - `tile-2.png`
   - `tile-4.png`
   - `tile-8.png`
   - `tile-16.png`
   - `tile-32.png`
   - `tile-64.png`
   - `tile-128.png`
   - `tile-256.png`
   - `tile-512.png`
   - `tile-1024.png`
   - `tile-2048.png`
3. Recommended image size: 100x100 pixels or larger (will be scaled to fit)

If custom images are not found, the game will display tiles with colored backgrounds and numbers (classic style).

## File Structure

```
Game/
├── index.html          # Main HTML file
├── style.css           # Game and music player styles
├── game.js             # Game logic and music player code
├── music/              # Folder for music files
│   ├── track1.mp3
│   ├── track2.mp3
│   ├── track3.mp3
│   ├── track4.mp3
│   └── track5.mp3
└── images/             # Folder for custom tile images
    ├── tile-2.png
    ├── tile-4.png
    ├── tile-8.png
    └── ...
```

## Music Player Controls

- **Play/Pause (▶/⏸)**: Start or pause the current track
- **Previous (⏮)**: Go to the previous track
- **Next (⏭)**: Skip to the next track
- **Shuffle (🔀)**: Enable/disable random track order
- **Volume (🔊/🔇)**: Mute/unmute audio
- **Volume Slider**: Adjust the volume level
- **Playlist**: Click any track in the playlist to play it

## Browser Compatibility

This game works in all modern browsers that support:
- HTML5
- CSS3 (Grid, Flexbox, Animations)
- ES6 JavaScript (Classes, Arrow Functions)
- HTML5 Audio API

## Local Storage

The game saves your best score in the browser's local storage, so it persists between sessions.

## Credits

Based on the original 2048 game by Gabriele Cirulli.
Enhanced with music playlist and custom tile image support.
