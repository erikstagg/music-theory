$( document ).ready(function() {

  var exercises = {
    scale: "scale",
  }
  
  /*
  Nav Dropdowns
*/

$.each(exercises,function(val, text) {
  $("#exercise-selector").append($('<option></option>').val(val).html(text));
});

$("#exercise-selector").change(function() {
  $('#selectors .dynamicSelector').remove();
  switch($('#exercise-selector').val()) {
    case exercises.scale:

      //generate and populate a dropdown for the root note
      $('#selectors').append('<select id="rootNote" class="dynamicSelector"></select>');
      for (var i=0; i<music_theory.notes.length; i++) {
        $("#rootNote").append(`<option value="${music_theory.notes[i]}">${music_theory.notes[i]}</option>`);
      }

      //generate and populate a dropdown for the scale
      $('#selectors').append('<select id="scale" class="dynamicSelector"></select>');
      for (var scaleName in music_theory.scales) {
        if (Object.prototype.hasOwnProperty.call(music_theory.scales, scaleName)) {
          $("#scale").append(`<option value="${scaleName}">${scaleName.replace('_', ' ')}</option>`);
        }
      }
      break;
    default:
      // do nothing
  }
});
// end nav dropdowns

});