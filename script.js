document.querySelectorAll('.white-key, .black-key').forEach(key => {
    key.addEventListener('mousedown', () => playNote(key.dataset.note));
    key.addEventListener('mouseup', () => stopNote(key.dataset.note));
});

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const oscillators = {};

function playNote(note) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = getFrequency(note);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillators[note] = oscillator;
}

function stopNote(note) {
    if (oscillators[note]) {
        oscillators[note].stop();
        oscillators[note].disconnect();
        delete oscillators[note];
    }
}

function getFrequency(note) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const keyNumber = notes.indexOf(note);
    const octave = 4;
    return 440 * Math.pow(2, (keyNumber - 9 + (octave - 4) * 12) / 12);
}
