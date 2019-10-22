$(document).ready(function () {

  var exercises = {
    scale: "scale",
  }

  /*
  Nav Dropdowns
  */

  $.each(exercises, function (val, text) {
    $("#exercise-selector").append($('<option></option>').val(val).html(text));
  });

  $("#exercise-selector").change(function () {
    $('#selectors .dynamicSelector form-control').remove();
    switch ($('#exercise-selector').val()) {
      case exercises.scale:

        generateNoteSelector();
        generateScaleSelector();
        generatePlayPauseButtons();
        generateNoteDurationSelector();
        generateOctaveSelector();
        generateScalePatternSelector();
        $('#trainerBar').show();

        break;
      default:
        destroySelectors();
        $('#trainerBar').hide();
    }
  });

  // end nav dropdowns

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

  $("body").keypress(function (event) {
    if (getNoteFromQWERTY(event.key, false)) {
      $('#trainerBar').html(getNoteFromQWERTY(event.key, false));
    } else {
      $('#trainerBar').html('Key played is not a note.');
    }
  });

  // intercept midi keyboard presses to identify notes being played
  const midiIntercept = new MIDIAccess({ onDeviceInput });
  midiIntercept.start().then(() => {
    console.log('MIDI INTERCEPT STARTED!');
  }).catch(console.error);
  
});