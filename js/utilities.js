getNoteFromQWERTY = function (key, withOctave) {
  var note;
  var invalidNote = false;

  switch (event.key) {
    case 'a':
      note = 'c4';
      break;
    case 'w':
      note = 'c#4';
      break;
    case 's':
      note = 'd4';
      break;
    case 'e':
      note = 'd#4';
      break;
    case 'd':
      note = 'e4';
      break;
    case 'f':
      note = 'f4';
      break;
    case 't':
      note = 'f#4';
      break;
    case 'g':
      note = 'g4';
      break;
    case 'y':
      note = 'g#4';
      break;
    case 'h':
      note = 'a4';
      break;
    case 'u':
      note = 'a#4';
      break;
    case 'j':
      note = 'b4';
      break;
    case 'k':
      note = 'c5';
      break;
    case 'o':
      note = 'c#5';
      break;
    case 'l':
      note = 'd5';
      break;
    case 'p':
      note = 'd#5';
      break;
    case ';':
      note = 'e5';
      break;
    case '\'':
      note = 'f5';
      break;
    default:
      invalidNote = true;
  }

  if (!invalidNote) {
    if (withOctave = true) {
      return note;
    } else {
      return note.substring(0, note.length - 1);
    }
  } else {
    return false;
  }
}