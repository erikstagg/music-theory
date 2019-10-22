$(document).ready(function () {

  var notesCorrect = 0, notesWrong = 0;

  // var exercises = {
  //   scale: "scale",
  // }

  /*
  Nav Dropdowns
  */

  // $.each(exercises, function (val, text) {
  //   $("#exercise-selector").append($('<option></option>').val(val).html(text));
  // });

  // $("#exercise-selector").change(function () {
  //   $('#selectors .dynamicSelector form-control').remove();
  //   switch ($('#exercise-selector').val()) {
  //     case exercises.scale:

  generateNoteSelector();
  generateScaleSelector();
  generatePlayPauseButtons();
  generateNoteDurationSelector();
  generateOctaveSelector();
  generateScalePatternSelector();
  $('#trainerBar').show();

  //       break;
  //     default:
  //       destroySelectors();
  //       $('#trainerBar').hide();
  //   }
  // });

  // end nav dropdowns

  /* 
    Note Interceptors - intercepts and identifies notes
    being played
  */

  $("body").keypress(function (event) {
    if (getNoteFromQWERTY(event.key, false)) {
      recordNote(getNoteFromQWERTY(event.key, false));
    } else {
      console.log('Key played is not a note.');
    }
  });

  // intercept midi keyboard presses to identify notes being played
  const midiIntercept = new MIDIAccess({
    onDeviceInput
  });
  midiIntercept.start().then(() => {
    console.log('MIDI INTERCEPT STARTED!');
  }).catch(console.error);
  // end interceptors

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

});