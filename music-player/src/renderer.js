/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

console.log('👋 This message is being logged by "renderer.js", included via Vite');

document.addEventListener('DOMContentLoaded', () => {
    const playlist = document.getElementById('playlist');
    const nowPlaying = document.getElementById('now-playing');
    const playPauseButton = document.getElementById('play-pause');
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');

    // Fetch songs dynamically from the folders 
    const songs = [
        { title: 'Take Me', artist: 'G Dragon' },
        { title: 'Song 2', artist: 'Artist 2' },
        { title: 'Song 3', artist: 'Artist 3' },
    ];

    let currentSongIndex = 0;
    let isPlaying = false;

    function updatePlaylist() {
        playlist.innerHTML = '';
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<a class="has-text-white">${song.title} - ${song.artist}</a>`;
            li.addEventListener('click', () => playSong(index));
            playlist.appendChild(li);
        });
    }

    function playSong(index) {
        currentSongIndex = index;
        nowPlaying.textContent = `Now Playing: ${songs[index].title} - ${songs[index].artist}`;
        isPlaying = true;
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    }

    playPauseButton.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playPauseButton.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    });

    nextButton.addEventListener('click', () => {
        // Making sure it goes back to the beginning if the current song is the last one
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playSong(currentSongIndex);
    });

    prevButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playSong(currentSongIndex);
    });

    updatePlaylist();
    playSong(0);
});
