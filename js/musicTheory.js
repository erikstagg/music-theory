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
    getScaleWithOctave
    get a specific scale with octave of notes by passing the base note and type of scale as arguements
  */
  getScaleWithOctave: function(note, type, octave) {
    var notesShifted = this.notes.slice();
    var numShifted = 0;
    for (numShifted; numShifted < this.notes.indexOf(note); numShifted++) {     // shift the notes so that position 0 in the array is the first note in the scale
      var noteToShift = notesShifted.shift();
      notesShifted.push(noteToShift);
    }

    var thisNote, lastNote, scale = [];
    for (var i = 0; i < this.scales[type].length; i++) {     // use the scale interval object to assign the notes of the scale
      scaleNotePos = this.scales[type][i];
      thisNote = notesShifted[scaleNotePos];
      if (this.notes.indexOf(thisNote) < this.notes.indexOf(lastNote)){
        octave++;
      }
      scale.push(thisNote + octave);
      lastNote = thisNote;
    };
    return scale;
  },

  /*
    getScale
    get the notes in a scale by passing the base note and type of scale as arguements
  */
  getScale: function(note, type) {
    var notesShifted = this.notes.slice();
    var numShifted = 0;
    for (numShifted; numShifted < this.notes.indexOf(note); numShifted++) {     // shift the notes so that position 0 in the array is the first note in the scale
      var noteToShift = notesShifted.shift();
      notesShifted.push(noteToShift);
    }

    var thisNote, scale = [];
    for (var i = 0; i < this.scales[type].length; i++) {     // use the scale interval object to assign the notes of the scale
      scaleNotePos = this.scales[type][i];
      thisNote = notesShifted[scaleNotePos];
      scale.push(thisNote);
    };
    return scale;
  },

  isInKey: function(noteToTest, rootNote, scaleType) {
    if (this.getScale(rootNote, scaleType).includes(noteToTest)) {
      return true;
    } else {
      return false;
    }
  }
}