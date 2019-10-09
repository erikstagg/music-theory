var music_theory = {
  notes: ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"],
  scales: {
    major: [0, 2, 4, 5, 7, 9, 11, 0], // w-w-h-w-w-w-h
    natural_minor: [0, 2, 3, 5, 7, 8, 10, 0], // w-h-w-w-h-w-w
    harmonic_minor: [0, 2, 3, 5, 7, 8, 11, 0], // w-h-w-w-h-1.5-h
    melodic_minor: [0, 2, 3, 5, 7, 9, 11, 0], // w-h-w-w-w-w-h
    major_pentatonic: [0, 2, 4, 7, 9, 0], // Natural minor without degrees 4 and 7 (array positions 4 and 5)
    minor_pentatonic: [0, 3, 5, 7, 10, 0], // Natural minor without degrees 2 and 6 (array positions 1 and 5)
  },

  // get a specific scale by passing the base note and type of scale as arguements
  getScale: function(note, type) {
    var notesShifted = this.notes.slice();
    // shift the notes so that position 0 in the array is the first note in the scale
    for (var i = 0; i < this.notes.indexOf(note); i++) {
      var noteToShift = notesShifted.shift();
      notesShifted.push(noteToShift);
    }
    var scale = [];
    // use the scale interval object to assign the notes of the scale
    this.scales[type].forEach(notePos => {
      scale.push(notesShifted[notePos]);
    });
    return scale;
  }
}