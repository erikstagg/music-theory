var notesCorrect = 0, notesWrong = 0;

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

recordNote = function (note) {
  if (music_theory.isInKey(note, $('#rootNote').val(), $('#scale').val())) {
    //console.log("in key!");
    notesCorrect++;
    $('#trainerBar').removeClass("bad");
    $('#trainerBar').addClass("good");
  } else {
    notesWrong++;
    $('#trainerBar').removeClass("good");
    $('#trainerBar').addClass("bad");
  }
  var score = notesCorrect - notesWrong;
  $('#notesCorrect').html("Notes Correct: " + notesCorrect);
  $('#notesWrong').html("Notes Wrong: " + notesWrong);
  $('#score').html("Score: " + score);
  $('#notePlayedLast').html("Note Played Last: " + note.toUpperCase());
  if (!$('#trainerBar #btnClear').length) {
    $('#trainerBar').append('<span id="btnClear" class="button" onClick="resetTrainerBar()">Clear</span>');
  }
}

playSequence = function (sequence, noteDur, patternName) {
  $('.col.btnPlay').hide();
  $('.col.btnStop').show();

  var synthSequence = new Tone.PolySynth(3, Tone.Synth).toMaster();

  console.log("sequence: " + sequence);
  console.log("noteDur: " + noteDur);
  console.log("patternName: " + patternName);

  var pattern = new Tone.Pattern(function (time, note) {
    //the order of the notes passed in depends on the pattern
    synthSequence.triggerAttackRelease(note, noteDur, time);
  }, sequence, patternName).start(0);

  Tone.Transport.bpm.value = currentTempo;
  synthSequence.volume.value = currentVolume;
  Tone.Transport.start("+0.1");
}

stopSequence = function () {
  $('.col.btnStop').hide();
  $('.col.btnPlay').show();

  Tone.Transport.stop();
  Tone.Transport.cancel(0);
}

resetTrainerBar = function () {
  notesCorrect = 0;
  notesWrong = 0;
  $('#trainerBar').removeClass("good bad")
  $('#notesCorrect').html("");
  $('#notesWrong').html("");
  $('#score').html("");
  $('#notePlayedLast').html("Play in the selected scale.");
  $('#trainerBar #btnClear').remove();
}