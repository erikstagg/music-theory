getNoteFromQWERTY = function (key) {
  var note;
  var invalidNote = false;

  switch (event.key) {
    case 'a':
    case 'k':
      note = music_theory.notes[0];
      break;
    case 'w':
    case 'o':
      note = music_theory.notes[1];
      break;
    case 's':
    case 'l':
      note = music_theory.notes[2];
      break;
    case 'e':
    case 'p':
      note = music_theory.notes[3];
      break;
    case 'd':
    case ';':
      note = music_theory.notes[4];
      break;
    case 'f':
    case '\'':
      note = music_theory.notes[5];
      break;
    case 't':
      note = music_theory.notes[6];
      break;
    case 'g':
      note = music_theory.notes[7];
      break;
    case 'y':
      note = music_theory.notes[8];
      break;
    case 'h':
      note = music_theory.notes[9];
      break;
    case 'u':
      note = music_theory.notes[10];
      break;
    case 'j':
      note = music_theory.notes[11];
      break;
    default:
      invalidNote = true;
  }

  if (!invalidNote) {
    return note;
  } else {
    return false;
  }
}

// log midi input in console. If status indicates a piano key was pressed, record the note.
function onDeviceInput({ status, input, value
}) {
  //console.log('onDeviceInput!', status, input, value);
  if (status == 144) {
    recordNote(music_theory.notes[input % 12]);
  } else {
    console.log("midi message was not recorded as a note.")
  }
}