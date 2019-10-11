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

        break;
      default:
        // do nothing
    }
  });

  //generate and populate a dropdown for the root note
  generateNoteSelector = function () {
    $('#selectors').append('<div class="col"><select id="rootNote" class="dynamicSelector form-control"></select></div>');
    for (var i = 0; i < music_theory.notes.length; i++) {
      $("#rootNote").append(`<option value="${music_theory.notes[i]}">${music_theory.notes[i]}</option>`);
    }
  }

  //generate and populate a dropdown for the scale
  generateScaleSelector = function () {
    $('#selectors').append('<div class="col"><select id="scale" class="dynamicSelector form-control"></select></div>');
    for (var scaleName in music_theory.scales) {
      if (Object.prototype.hasOwnProperty.call(music_theory.scales, scaleName)) {
        $("#scale").append(`<option value="${scaleName}">${scaleName.replace('_', ' ')}</option>`);
      }
    }
  }

  generateScalePatternSelector = function () {
    $('#selectors').append(`<div class="col"><select id="scalePattern" class="dynamicSelector form-control">
      <option value="up">up</option>
      <option value="down">down</option>
      <option value="upDown">upDown</option>
      <option value="downUp">downUp</option>
      <option value="alternateUp">alternateUp</option>
      <option value="alternateDown">alternateDown</option>
      <option value="random">random</option>
      <option value="randomWalk">randomWalk</option>
      <option value="randomOnce">randomOnce</option>
    </select></div>`);
  }

  generateOctaveSelector = function () {
    $('#selectors').append(`<div class="col"><select id="octave" class="dynamicSelector form-control">
      <option value="0">octave 0</option>
      <option value="1">octave 1</option>
      <option value="2">octave 2</option>
      <option value="3">octave 3</option>
      <option value="4" selected>octave 4</option>
      <option value="5">octave 5</option>
      <option value="6">octave 6</option>
      `)
  }

  generateNoteDurationSelector = function () {
    $('#selectors').append(`<div class="col"><select id="noteDuration" class="dynamicSelector form-control">
      <option value="16">16th notes</option>
      <option value="8">8th notes</option>
      <option value="4" selected>quarter notes</option>
      <option value="2">half notes</option>
      <option value="1">whole notes</option>
    `)
    $('#selectors').append(`<div class="col"><select id="noteDurationMod" class="dynamicSelector form-control">
      <option value="n" selected>No Tuplet</option>
      <option value="t">Triples</option>
      <option value="n.">dotted</option>
    `)
  }

  var playButtonHtml = `<div class="col btnPlay"><button id="btnPlaySequence" type="button" class="btn btn-success form-control dynamicSelector"><img class="icon" src="./icons/triangle-right.svg"></button></div>`;
  var stopButtonHtml = `<div class="col btnStop"><button id="btnStopSequence" type="button" class="btn btn-danger form-control dynamicSelector"><img class="icon" src="./icons/primitive-square.svg"></button></div>`;
  generatePlayPauseButtons = function () {
    $('#selectors').append(playButtonHtml);
    $('#selectors').append(stopButtonHtml);
    $('.col.btnStop').hide();
    $('#btnPlaySequence').click(function () {
      playSequence(music_theory.getScale($('#rootNote').val(), $('#scale').val(), $('#octave').val()), $('#noteDuration').val() + $('#noteDurationMod').val(), $("#scalePattern").val());
    });
    $('#btnStopSequence').click(function () {
      stopSequence();
    });
  }

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
});