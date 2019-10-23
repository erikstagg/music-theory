
  /* 
    Input Interceptors - intercepts and identifies notes
    being played
  */

  // intercept clicked notes
  document.addEventListener('mousedown', event => {
    var path = event.path || (event.composedPath && event.composedPath());
    if (path) {
      if (path[3].localName == 'tone-keyboard-note') {
        var noteNum = path[3].getAttribute('note');
        //var octave = path[7].getAttribute('octave');
        recordNote(getNoteFromNoteNum(noteNum));
      }
    } else {
      console.log("Clicking piano keys cannot be intercepted by this browser.");
    }
  });

  // intercept qwerty keyboard notes
  $("body").keypress(function(event) {
    if (getNoteFromQWERTY(event.key, false)) {
      recordNote(getNoteFromQWERTY(event.key, false));
    } else {
      console.log('Key played is not a note.');
    }
  });

  // intercept midi keyboard presses
  const midiIntercept = new MIDIAccess({
    onDeviceInput
  });
  midiIntercept.start().then(() => {
    console.log('MIDI INTERCEPT STARTED!');
  }).catch(console.error);
  // end interceptors