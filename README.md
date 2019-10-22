# music-theory
A music theory training javascript web application with polyphonic synthesiser (using tone.js) playable by mouse, keyboard, and midi keyboard

https://erikstagg.github.io/music-theory/

## Notes:
- Clicking on notes on the GUI piano does not work with the trainer bar.
- The trainer bar listens to all incoming midi devices, even if not selected by the tone.js synthesiser.
- If notes get stuck, play the stuck note again to unstick it.
- When using the play button, changing anything except for the BPM will require playback to be restarted before taking effect. 