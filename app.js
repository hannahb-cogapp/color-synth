// Get an array of all inputs and all trigger buttons
let colorInputs = document.querySelectorAll('.color-input');
let triggers = document.querySelectorAll('.trigger');

// Todo: Does it work to set these up globally? How else will you be able to stop the sound with the button?
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = audioCtx.createOscillator();

// Call this function when a color is input into any of the input fields
function inputHandler(event) {

  // Find the input number
  let inputNumber = event.closest('[data-color]').getAttribute('data-color');
  if (!inputNumber) return;

  // If that number input has a value, then run the changeColor function, passing in it the relevant trigger
  if (colorInputs[inputNumber-1].value) {
      // Get the relevant trigger to add to the function
      let trigger = triggers[inputNumber-1];

      changeColor(colorInputs[inputNumber-1].value, trigger);
  }
}

// A function to change the color of the trigger button to the input value
function changeColor(value, trigger) {
  let color = 'rgb(' + value + ')';

  trigger.style.backgroundColor = color;
}


// Call this function when one of the triggers is moused over
function mouseHandler(event) {
  // Get the number of the trigger button that was moused over
  let triggerNumber = event.target.closest('[data-trigger]');
  if (!triggerNumber) return;

  // Use this to get the colour number
  let colorNumber = triggerNumber.getAttribute('data-trigger');
  if (!colorNumber) return;

  console.log(colorNumber);

  // If that number input has a value, then run the makeSound function, passing it the relevant hex code
  if (colorInputs[colorNumber-1].value) {
    makeSound(colorInputs[colorNumber-1].value);
  }
}

function makeSound(rgb) {
  console.log(typeof rgb[0]);

  let brightness = rgb.split(',').map(function(str) {
         // using map() to convert array of strings to numbers
         return parseInt(str); }).reduce((partialSum, a) => partialSum + a, 0) / 3;

  console.log(brightness);

  //create a synth and connect it to the main output (your speakers)
  const synth = new Tone.Synth().toDestination();

  switch(true) {
    case (brightness < 5):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("C0", "8n");
      break;
    case (brightness >= 5 && brightness < 9):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("D0", "8n");
      break;
    case (brightness >= 9 && brightness < 13):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("E0", "8n");
      break;
    case (brightness >= 13 && brightness < 17):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("F0", "8n");
      break;
    case (brightness >= 17 && brightness < 21):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("G0", "8n");
      break;
    case (brightness >= 21 && brightness < 25):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("A0", "8n");
      break;
    case (brightness >= 25 && brightness < 29):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("B0", "8n");
      break;
    case (brightness >= 29 && brightness < 33):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("C1", "8n");
      break;
    case (brightness >= 33 && brightness < 37):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("D1", "8n");
      break;
    case (brightness >= 37 && brightness < 41):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("E1", "8n");
      break;
    case (brightness >= 41 && brightness < 45):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("F1", "8n");
      break;
    case (brightness >= 45 && brightness < 49):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("G1", "8n");
      break;
    case (brightness >= 49 && brightness < 53):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("A1", "8n");
      break;
    case (brightness >= 53 && brightness < 57):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("B1", "8n");
      break;
    case (brightness >= 57 && brightness < 61):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("C2", "8n");
      break;
    case (brightness >= 61 && brightness < 65):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("D2", "8n");
      break;
    case (brightness >= 65 && brightness < 69):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("E2", "8n");
      break;
    case (brightness >= 69 && brightness < 72):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("F2", "8n");
      break;
    case (brightness >= 72 && brightness < 76):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("G2", "8n");
      break;
    case (brightness >= 76 && brightness < 80):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("A2", "8n");
      break;
    case (brightness >= 80 && brightness < 84):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("B2", "8n");
      break;
    case (brightness >= 84 && brightness < 88):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("C3", "8n");
      break;
    case (brightness >= 88 && brightness < 92):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("D3", "8n");
      break;
    case (brightness >= 92 && brightness < 96):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("E3", "8n");
      break;
    case (brightness >= 96 && brightness < 100):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("F3", "8n");
      break;
    case (brightness >= 100 && brightness < 104):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("G3", "8n");
    case (brightness >= 104 && brightness < 108):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("A3", "8n");
      break;
    case (brightness >= 108 && brightness < 112):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("B3", "8n");
      break;
    case (brightness >= 112 && brightness < 116):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("C4", "8n");
      break;
    case (brightness >= 116 && brightness < 120):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("D4", "8n");
      break;
    case (brightness >= 120 && brightness < 124):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("E4", "8n");
      break;
    case (brightness >= 124 && brightness < 128):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("F4", "8n");
      break;
    case (brightness >= 128 && brightness < 132):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("G4", "8n");
      break;
    case (brightness >= 132 && brightness < 136):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("A4", "8n");
      break;
    case (brightness >= 136 && brightness < 140):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("B4", "8n");
      break;
    case (brightness >= 140 && brightness < 144):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("C5", "8n");
      break;
    case (brightness >= 144 && brightness < 148):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("D5", "8n");
      break;
    case (brightness >= 148 && brightness < 152):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("E5", "8n");
      break;
    case (brightness >= 152 && brightness < 156):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("F5", "8n");
      break;
    case (brightness >= 156 && brightness < 160):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("G5", "8n");
      break;
    case (brightness >= 160 && brightness < 164):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("A5", "8n");
      break;
    case (brightness >= 164 && brightness < 168):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("B5", "8n");
      break;
    case (brightness >= 168 && brightness < 172):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("C6", "8n");
      break;
    case (brightness >= 172 && brightness < 176):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("D6", "8n");
      break;
    case (brightness >= 176 && brightness < 180):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("E6", "8n");
      break;
    case (brightness >= 180 && brightness < 184):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("F6", "8n");
      break;
    case (brightness >= 184 && brightness < 188):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("G6", "8n");
      break;
    case (brightness >= 188 && brightness < 192):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("A6", "8n");
      break;
    case (brightness >= 192 && brightness < 196):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("B6", "8n");
      break;
    case (brightness >= 196 && brightness < 200):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("C7", "8n");
      break;
    case (brightness >= 200 && brightness < 204):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("D7", "8n");
      break;
    case (brightness >= 204 && brightness < 208):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("E7", "8n");
      break;
    case (brightness >= 208 && brightness < 212):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("F7", "8n");
      break;
    case (brightness >= 212 && brightness < 216):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("G7", "8n");
      break;
    case (brightness >= 216 && brightness < 220):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("A7", "8n");
      break;
    case (brightness >= 220 && brightness < 224):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("B7", "8n");
      break;
    case (brightness >= 224 && brightness < 228):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("C8", "8n");
      break;
    case (brightness >= 228 && brightness < 232):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("D8", "8n");
      break;
    case (brightness >= 232 && brightness < 236):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("E8", "8n");
      break;
    case (brightness >= 236 && brightness < 240):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("F8", "8n");
      break;
    case (brightness >= 240 && brightness < 244):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("G8", "8n");
      break;
    case (brightness >= 244 && brightness < 248):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("A8", "8n");
      break;
    case (brightness >= 248 && brightness < 256):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("B8", "8n");
      break;
    default:
      // code block
  }

  // var osc = new Tone.Oscillator(440, "sine").toMaster();
}

function generateSound () {

  let color = colorOneInput.value;

  document.body.style.backgroundColor = color;

  // Step One: Choose soundwave (based on first digit of hex code)
  // Turn color string into an array
  let colorArray = color.split('');

  console.log(typeof colorArray[1]);

  // Todo: Continue this to determine the type of wave:
  if (colorArray[1].match(/[0-3]/) ) {
    console.log('it matches');
  }

  oscillator.type = "sine";
  // oscillator.type = "square";
  // oscillator.type = "triangle";
  // oscillator.type = "sawtooth";

  // Set Two: Generate frequency
  // The piano has 88 keys which span the frequency range 27.5 Hz (A0) to 4186 Hz (C8).
  // Map this to the hex code somehow
  var frequency = 460.5;
  oscillator.frequency.value = frequency;

  // Step Three: Apply a filter
  // Will this be doing anything when only playing one note? I think so?
  let filter = audioCtx.createBiquadFilter();

  // filter.type = 'lowpass';
  // filter.type = 'highpass';
  // filter.type = 'bandpass';
  filter.type = 'lowshelf';
  // filter.type = 'highshelf';
  // filter.type = 'peaking';
  // filter.type = 'notch';
  // filter.type = 'allpass';

  // What does this bit do? Will it make filters more interesting, as many of them sound the same
  // filter.frequency.setTargetAtTime(2000, audioCtx.currentTime, 0);

  oscillator.connect(filter);
  filter.connect(audioCtx.destination);


  // Step Four: Add Distortion
  // How can you create different types of distortion? You'll also need to randomise them based on the hex code.
  // https://codepen.io/gregh/pen/OWrjOb
  let distortion = audioCtx.createWaveShaper();
  let gain = audioCtx.createGain();

  gain.gain.value = 10;
  distortion.curve = makeDistortionCurve(400);

  // oscillator.connect(distortion);
  // distortion.connect(audioCtx.destination);

  // OR...
  oscillator.connect(gain);
  gain.connect(distortion);
  distortion.connect(audioCtx.destination);



  function makeDistortionCurve(amount) {
    const k = typeof amount === "number" ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;

    for (let i = 0; i < n_samples; i++) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }


  // Step Five: Add Convolver
  // What's a convolver and how do I use it?
  // How do you add this effect to the base sound?
  // https://noisehack.com/custom-audio-effects-javascript-web-audio-api/
  // var effect = (function() {
  //   var convolver = audioContext.createConvolver(),
  //     noiseBuffer = audioContext.createBuffer(2, 0.5 * audioContext.sampleRate, audioContext.sampleRate),
  //     left = noiseBuffer.getChannelData(0),
  //     right = noiseBuffer.getChannelData(1);
  //   for (var i = 0; i < noiseBuffer.length; i++) {
  //     left[i] = Math.random() * 2 - 1;
  //     right[i] = Math.random() * 2 - 1;
  //   }
  //   convolver.buffer = noiseBuffer;
  //   return convolver;
  // })();

  // const gainNode = audioCtx.createGain();

  // oscillator.connect(gainNode);
  // gainNode.connect(audioCtx.destination);

  oscillator.start(0);
  filter.start(0);
}


// When a colour is input, change the trigger to that colour
document.addEventListener('input', function (event) {
  if (event.target.matches('.color-input')) {
    inputHandler(event.target);
  }
});

// Listen for click events
document.addEventListener('mouseover', mouseHandler);
