$(document).ready(function () {

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
  
});