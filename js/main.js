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
        generatePlayButton();

        break;
      default:
        // do nothing
    }
  });

  //generate and populate a dropdown for the root note
  generateNoteSelector = function () {
    $('#selectors').append('<select id="rootNote" class="dynamicSelector form-control"></select>');
    for (var i = 0; i < music_theory.notes.length; i++) {
      $("#rootNote").append(`<option value="${music_theory.notes[i]}">${music_theory.notes[i]}</option>`);
    }
  }

  //generate and populate a dropdown for the scale
  generateScaleSelector = function () {
    $('#selectors').append('<select id="scale" class="dynamicSelector form-control"></select>');
    for (var scaleName in music_theory.scales) {
      if (Object.prototype.hasOwnProperty.call(music_theory.scales, scaleName)) {
        $("#scale").append(`<option value="${scaleName}">${scaleName.replace('_', ' ')}</option>`);
      }
    }
  }

  generatePlayButton = function () {
    $('#selectors').append('<button id="btnPlaySequence" type="button" class="btn btn-success form-control">Play</button>');
    generateOctaveSelector();
    $('#selectors').append('')
    $('#btnPlaySequence').click(function () {
      playSequence(music_theory.getScale($('#rootNote').val(), $('#scale').val()), $('#octave').val(), 1);
    });
  }

  generateOctaveSelector = function () {
    $('#selectors').append(`<select id="octave" class="dynamicSelector form-control">
                              <option value="0">octave 0</option>
                              <option value="1">octave 1</option>
                              <option value="2">octave 2</option>
                              <option value="3" selected>octave 3</option>
                              <option value="4">octave 4</option>
                              <option value="5">octave 5</option>
                              <option value="6">octave 6</option>
                          `)
  }

  // end nav dropdowns

  playSequence = function (sequence, octave, noteDur) {
    for (let i = 0; i < sequence.length; i++) {
      if (i==sequence.length - 1) {
        octave++;
      }
      synth.triggerAttackRelease(sequence[i] + octave, 0.5, i*noteDur);
    }
  }

});