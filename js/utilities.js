getNoteFromQWERTY = function (key) {
  var note;
  var invalidNote = false;

  switch (event.key) {
    case 'a':
      note = 'c';
      break;
    case 'w':
      note = 'c#';
      break;
    case 's':
      note = 'd';
      break;
    case 'e':
      note = 'd#';
      break;
    case 'd':
      note = 'e';
      break;
    case 'f':
      note = 'f';
      break;
    case 't':
      note = 'f#';
      break;
    case 'g':
      note = 'g';
      break;
    case 'y':
      note = 'g#';
      break;
    case 'h':
      note = 'a';
      break;
    case 'u':
      note = 'a#';
      break;
    case 'j':
      note = 'b';
      break;
    case 'k':
      note = 'c';
      break;
    case 'o':
      note = 'c#';
      break;
    case 'l':
      note = 'd';
      break;
    case 'p':
      note = 'd#';
      break;
    case ';':
      note = 'e';
      break;
    case '\'':
      note = 'f';
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

class MIDIAccess {
  constructor(args = {}) {
    this.onDeviceInput = args.onDeviceInput || console.log;
  }

  start() {
    return new Promise((resolve, reject) => {
      this._requestAccess().then(access => {
        this.initialize(access);
        resolve();
      }).catch(() => reject('Something went wrong.'));
    });
  }

  initialize(access) {
    const devices = access.inputs.values();
    for (let device of devices) this.initializeDevice(device);
  }

  initializeDevice(device) {
    device.onmidimessage = this.onMessage.bind(this);
  }
  
  onMessage(message) {
    let [status, input, value] = message.data;
    this.onDeviceInput({ status, input, value });
  }

  _requestAccess() {
    return new Promise((resolve, reject) => {
      if (navigator.requestMIDIAccess)
        navigator.requestMIDIAccess()
          .then(resolve)
          .catch(reject);
      else reject();
    });
  }
}

function onDeviceInput({ status, input, value }) {
  //console.log('onDeviceInput!', status, input, value);
  if (status == 144) {
    //console.log("noteID: " + input);
    console.log(music_theory.notes[input%12]);
  }
}
