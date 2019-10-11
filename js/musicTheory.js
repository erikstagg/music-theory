var music_theory = {

  // one octave of notes starting with C
  notes: ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"],

  // scale note positions based on intervals
  scales: {
    major: [0, 2, 4, 5, 7, 9, 11, 0], // w-w-h-w-w-w-h
    natural_minor: [0, 2, 3, 5, 7, 8, 10, 0], // w-h-w-w-h-w-w
    harmonic_minor: [0, 2, 3, 5, 7, 8, 11, 0], // w-h-w-w-h-1.5-h
    melodic_minor: [0, 2, 3, 5, 7, 9, 11, 0], // w-h-w-w-w-w-h
    major_pentatonic: [0, 2, 4, 7, 9, 0], // Natural minor without degrees 4 and 7 (array positions 4 and 5)
    minor_pentatonic: [0, 3, 5, 7, 10, 0], // Natural minor without degrees 2 and 6 (array positions 1 and 5)
  },

  /*
    getScale
    get a specific scale by passing the base note and type of scale as arguements
  */
  getScale: function(note, type, octave) {
    var notesShifted = this.notes.slice();
    var numShifted = 0;
    for (numShifted; numShifted < this.notes.indexOf(note); numShifted++) {     // shift the notes so that position 0 in the array is the first note in the scale
      var noteToShift = notesShifted.shift();
      notesShifted.push(noteToShift);
    }

    var scale = [];
    for (var i = 0; i < this.scales[type].length; i++) {     // use the scale interval object to assign the notes of the scale
      if (i == (this.scales[type].length - numShifted)){ octave++; }
      scaleNotePos = this.scales[type][i];
      scale.push(notesShifted[scaleNotePos] + octave);
    };
    return scale;
  }
}