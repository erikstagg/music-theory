$(document).ready(function() {

  // var exercises = {
  //   scale: "scale",
  // }

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

});