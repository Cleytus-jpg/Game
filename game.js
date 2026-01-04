// 2048 Game with Music Playlist and Custom Tile Images

class Game2048 {
    constructor() {
        this.gridSize = 4;
        this.grid = [];
        this.score = 0;
        this.bestScore = localStorage.getItem('bestScore') || 0;
        this.gameWon = false;
        this.gameOver = false;
        
        this.initGrid();
        this.setupUI();
        this.setupControls();
        this.startGame();
    }

    initGrid() {
        this.grid = Array(this.gridSize).fill(null).map(() => 
            Array(this.gridSize).fill(null)
        );
    }

    setupUI() {
        const gridContainer = document.getElementById('grid-container');
        gridContainer.innerHTML = '';
        
        // Create grid cells
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            gridContainer.appendChild(cell);
        }
        
        // Set grid container size based on first cell
        const cellSize = gridContainer.querySelector('.grid-cell').offsetWidth;
        gridContainer.style.height = `${cellSize * 4 + 30}px`;
        
        this.updateScore();
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (this.gameOver || this.gameWon) return;
            
            let moved = false;
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    moved = this.move('up');
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    moved = this.move('down');
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    moved = this.move('left');
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    moved = this.move('right');
                    break;
            }
            
            if (moved) {
                this.addRandomTile();
                this.updateUI();
                this.checkGameState();
            }
        });

        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('retry-btn').addEventListener('click', () => {
            this.startGame();
        });
    }

    startGame() {
        this.initGrid();
        this.score = 0;
        this.gameWon = false;
        this.gameOver = false;
        this.addRandomTile();
        this.addRandomTile();
        this.updateUI();
        this.hideMessage();
    }

    addRandomTile() {
        const emptyCells = [];
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.grid[row][col] === null) {
                    emptyCells.push({ row, col });
                }
            }
        }

        if (emptyCells.length > 0) {
            const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.grid[row][col] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    move(direction) {
        let moved = false;
        const oldGrid = JSON.stringify(this.grid);

        if (direction === 'left' || direction === 'right') {
            for (let row = 0; row < this.gridSize; row++) {
                const line = this.grid[row].filter(cell => cell !== null);
                const merged = this.mergeLine(line, direction === 'right');
                const newLine = this.padLine(merged, direction === 'right');
                this.grid[row] = newLine;
            }
        } else {
            for (let col = 0; col < this.gridSize; col++) {
                const line = [];
                for (let row = 0; row < this.gridSize; row++) {
                    if (this.grid[row][col] !== null) {
                        line.push(this.grid[row][col]);
                    }
                }
                const merged = this.mergeLine(line, direction === 'down');
                const newLine = this.padLine(merged, direction === 'down');
                for (let row = 0; row < this.gridSize; row++) {
                    this.grid[row][col] = newLine[row];
                }
            }
        }

        moved = oldGrid !== JSON.stringify(this.grid);
        return moved;
    }

    mergeLine(line, reverse) {
        if (reverse) line.reverse();
        
        const merged = [];
        let i = 0;
        
        while (i < line.length) {
            if (i < line.length - 1 && line[i] === line[i + 1]) {
                const newValue = line[i] * 2;
                merged.push(newValue);
                this.score += newValue;
                i += 2;
            } else {
                merged.push(line[i]);
                i++;
            }
        }
        
        if (reverse) merged.reverse();
        return merged;
    }

    padLine(line, reverse) {
        const padding = Array(this.gridSize - line.length).fill(null);
        return reverse ? padding.concat(line) : line.concat(padding);
    }

    updateUI() {
        const gridContainer = document.getElementById('grid-container');
        const existingTiles = gridContainer.querySelectorAll('.tile');
        existingTiles.forEach(tile => tile.remove());

        const cellSize = gridContainer.querySelector('.grid-cell').offsetWidth;

        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const value = this.grid[row][col];
                if (value !== null) {
                    const tile = document.createElement('div');
                    tile.className = `tile tile-${value} tile-position-${row}-${col}`;
                    tile.style.width = `${cellSize}px`;
                    tile.style.height = `${cellSize}px`;
                    
                    // Check if custom image exists for this tile
                    const img = new Image();
                    img.src = `images/tile-${value}.png`;
                    img.onerror = () => {
                        // If image doesn't exist, show number
                        tile.innerHTML = `<span class="tile-number">${value}</span>`;
                    };
                    img.onload = () => {
                        // If image exists, use it as background
                        tile.style.backgroundImage = `url('images/tile-${value}.png')`;
                        tile.classList.add('has-image');
                    };
                    
                    // Show number by default until image loads or fails
                    tile.innerHTML = `<span class="tile-number">${value}</span>`;
                    
                    gridContainer.appendChild(tile);
                }
            }
        }

        this.updateScore();
    }

    updateScore() {
        document.getElementById('score').textContent = this.score;
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('bestScore', this.bestScore);
        }
        document.getElementById('best-score').textContent = this.bestScore;
    }

    checkGameState() {
        // Check for 2048 tile (win condition)
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.grid[row][col] === 2048 && !this.gameWon) {
                    this.gameWon = true;
                    this.showMessage('You Win! 🎉');
                    return;
                }
            }
        }

        // Check for possible moves
        if (!this.canMove()) {
            this.gameOver = true;
            this.showMessage('Game Over! 😢');
        }
    }

    canMove() {
        // Check for empty cells
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.grid[row][col] === null) return true;
            }
        }

        // Check for possible merges
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const current = this.grid[row][col];
                if (col < this.gridSize - 1 && current === this.grid[row][col + 1]) return true;
                if (row < this.gridSize - 1 && current === this.grid[row + 1][col]) return true;
            }
        }

        return false;
    }

    showMessage(text) {
        document.getElementById('message-text').textContent = text;
        document.getElementById('game-message').classList.remove('hidden');
    }

    hideMessage() {
        document.getElementById('game-message').classList.add('hidden');
    }
}

// Music Player
class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('audio-player');
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.isShuffled = false;
        this.isMuted = false;
        
        // Playlist with sample tracks
        this.playlist = [
            { title: 'Chill Vibes', src: 'music/track1.mp3' },
            { title: 'Game On', src: 'music/track2.mp3' },
            { title: 'Focus Time', src: 'music/track3.mp3' },
            { title: 'Winning Streak', src: 'music/track4.mp3' },
            { title: 'Electronic Dreams', src: 'music/track5.mp3' }
        ];
        
        this.setupControls();
        this.renderPlaylist();
        this.loadTrack(0);
    }

    setupControls() {
        const playPauseBtn = document.getElementById('play-pause-btn');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const shuffleBtn = document.getElementById('shuffle-btn');
        const volumeBtn = document.getElementById('volume-btn');
        const volumeSlider = document.getElementById('volume-slider');

        playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        prevBtn.addEventListener('click', () => this.previousTrack());
        nextBtn.addEventListener('click', () => this.nextTrack());
        shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        volumeBtn.addEventListener('click', () => this.toggleMute());
        volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));

        // Auto play next track when current ends
        this.audio.addEventListener('ended', () => this.nextTrack());

        // Set initial volume
        this.setVolume(70);
    }

    renderPlaylist() {
        const playlistContainer = document.getElementById('playlist');
        playlistContainer.innerHTML = '';

        this.playlist.forEach((track, index) => {
            const item = document.createElement('div');
            item.className = 'playlist-item';
            if (index === this.currentTrackIndex) {
                item.classList.add('active');
            }
            item.textContent = `${index + 1}. ${track.title}`;
            item.addEventListener('click', () => this.loadTrack(index));
            playlistContainer.appendChild(item);
        });
    }

    loadTrack(index) {
        this.currentTrackIndex = index;
        const track = this.playlist[index];
        
        // Try to load the track, but handle missing files gracefully
        this.audio.src = track.src;
        this.audio.load();
        
        document.getElementById('current-track').textContent = `Now Playing: ${track.title}`;
        this.renderPlaylist();

        // Auto-play if was playing before
        if (this.isPlaying) {
            this.audio.play().catch(() => {
                // Handle error silently - file might not exist yet
                console.log(`Could not load ${track.src}`);
            });
        }
    }

    togglePlayPause() {
        const playPauseBtn = document.getElementById('play-pause-btn');
        
        if (this.isPlaying) {
            this.audio.pause();
            playPauseBtn.textContent = '▶';
            this.isPlaying = false;
        } else {
            this.audio.play().catch(() => {
                console.log('Audio file not found - this is expected for demo');
                alert('Music files not found. Add MP3 files to the "music" folder:\n' +
                      'track1.mp3, track2.mp3, track3.mp3, track4.mp3, track5.mp3');
            });
            playPauseBtn.textContent = '⏸';
            this.isPlaying = true;
        }
    }

    previousTrack() {
        let newIndex = this.currentTrackIndex - 1;
        if (newIndex < 0) newIndex = this.playlist.length - 1;
        this.loadTrack(newIndex);
    }

    nextTrack() {
        let newIndex;
        if (this.isShuffled) {
            newIndex = Math.floor(Math.random() * this.playlist.length);
        } else {
            newIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        }
        this.loadTrack(newIndex);
    }

    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        const shuffleBtn = document.getElementById('shuffle-btn');
        if (this.isShuffled) {
            shuffleBtn.classList.add('active');
        } else {
            shuffleBtn.classList.remove('active');
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        this.audio.muted = this.isMuted;
        const volumeBtn = document.getElementById('volume-btn');
        volumeBtn.textContent = this.isMuted ? '🔇' : '🔊';
    }

    setVolume(value) {
        this.audio.volume = value / 100;
        document.getElementById('volume-slider').value = value;
    }
}

// Initialize the game and music player when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Game2048();
    new MusicPlayer();
});
