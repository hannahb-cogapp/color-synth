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
  let color = value;

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

function makeSound(hex) {
  console.log(hex);
  //create a synth and connect it to the main output (your speakers)
  const synth = new Tone.Synth().toDestination();

  //play a middle 'C' for the duration of an 8th note
  synth.triggerAttackRelease("C4", "8n");

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
