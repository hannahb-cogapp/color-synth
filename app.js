// Get an array of all inputs and all trigger buttons
let colorInputs = document.querySelectorAll('.color-input');
let triggers = document.querySelectorAll('.trigger');

// Function to convert hex to rgb
// https://convertingcolors.com/blog/article/convert_hex_to_rgb_with_javascript.html
String.prototype.convertToRGB = function(){
    if(this.length != 6){
        throw "Only six-digit hex colors are allowed.";
    }

    var aRgbHex = this.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return aRgb;
}

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
  let color = '#' + value;

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
    makeSound(colorInputs[colorNumber-1].value.convertToRGB());
  }
}

function makeSound(rgb) {
  console.log(rgb);

  let brightness = rgb.reduce((partialSum, a) => partialSum + a, 0) / 3;

  // Empty effect variables
  let distortion;
  let reverb;
  let tremolo;
  let wave;

  // Red effect
  if (rgb[0] > 0) {
    let amount = 1/255 * rgb[0];
    console.log(amount);
    distortion = new Tone.Distortion(amount).toDestination();
    reverb = new Tone.JCReverb(amount).connect(Tone.Master).toDestination();
    //create a tremolo and start it's LFO
    tremolo = new Tone.Tremolo(9, amount).toDestination().start()
  } else {
    distortion = new Tone.Distortion(0).toDestination();
    reverb = new Tone.JCReverb(0).connect(Tone.Master).toDestination();
    tremolo = new Tone.Tremolo(9, 0).toDestination().start()
  }


  // Green effect
  // const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
  // var delay = new Tone.FeedbackDelay(1).toDestination();

  // Blue effect - type of wave
  switch(true) {
    case (rgb[2] < 65):
      console.log('sine');
      wave = "sine";
      break;
    case (rgb[2] >= 65 && rgb[2] < 129):
    console.log('square');
      wave = "square";
      break;
    case (rgb[2] >= 129 && rgb[2] < 193):
    console.log('triangle');
      wave = "triangle";
      break;
    case (rgb[2] >= 193 && rgb[2] < 256):
    console.log('sawtooth');
      wave = "sawtooth";
      break;
    default:
  }

  //create a synth and connect it to the main output (your speakers)
  const synth = new Tone.Synth({
    oscillator : {
      type : wave
    }
  }).toDestination().chain(tremolo, distortion, reverb);

  // Assign a pitch based on the brightness of the color
  switch(true) {
    // Todo: Is there a way to simplify this code? Could you do it in a way that would make it easier to change to a minor key?
    // Perhaps you could put all of the notes in an array, and assign an incremented array index every 'x' times e.g. 6
    case (brightness < 7):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("C2", "8n");
      break;
    case (brightness >= 7 && brightness < 12):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("D2", "8n");
      break;
    case (brightness >= 12 && brightness < 18):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("E2", "8n");
      break;
    case (brightness >= 18 && brightness < 24):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("F2", "8n");
      break;
    case (brightness >= 24 && brightness < 32):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("G2", "8n");
      break;
    case (brightness >= 32 && brightness < 38):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("A2", "8n");
      break;
    case (brightness >= 38 && brightness < 44):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("B2", "8n");
      break;
    case (brightness >= 44 && brightness < 50):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("C3", "8n");
      break;
    case (brightness >= 50 && brightness < 56):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("D3", "8n");
      break;
    case (brightness >= 56 && brightness < 62):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("E3", "8n");
      break;
    case (brightness >= 62 && brightness < 68):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("F3", "8n");
      break;
    case (brightness >= 68 && brightness < 74):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("G3", "8n");
    case (brightness >= 74 && brightness < 80):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("A3", "8n");
      break;
    case (brightness >= 80 && brightness < 86):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("B3", "8n");
      break;
    case (brightness >= 86 && brightness < 92):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("C4", "8n");
      break;
    case (brightness >= 92 && brightness < 98):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("D4", "8n");
      break;
    case (brightness >= 98 && brightness < 104):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("E4", "8n");
      break;
    case (brightness >= 104 && brightness < 110):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("F4", "8n");
      break;
    case (brightness >= 110 && brightness < 116):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("G4", "8n");
      break;
    case (brightness >= 116 && brightness < 122):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("A4", "8n");
      break;
    case (brightness >= 122 && brightness < 128):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("B4", "8n");
      break;
    case (brightness >= 128 && brightness < 134):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("C5", "8n");
      break;
    case (brightness >= 134 && brightness < 140):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("D5", "8n");
      break;
    case (brightness >= 140 && brightness < 146):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("E5", "8n");
      break;
    case (brightness >= 146 && brightness < 152):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("F5", "8n");
      break;
    case (brightness >= 152 && brightness < 158):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("G5", "8n");
      break;
    case (brightness >= 158 && brightness < 164):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("A5", "8n");
      break;
    case (brightness >= 164 && brightness < 170):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("B5", "8n");
      break;
    case (brightness >= 170 && brightness < 176):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("C6", "8n");
      break;
    case (brightness >= 176 && brightness < 182):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("D6", "8n");
      break;
    case (brightness >= 182 && brightness < 188):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("E6", "8n");
      break;
    case (brightness >= 188 && brightness < 194):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("F6", "8n");
      break;
    case (brightness >= 194 && brightness < 200):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("G6", "8n");
      break;
    case (brightness >= 200 && brightness < 206):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("A6", "8n");
      break;
    case (brightness >= 212 && brightness < 218):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("B6", "8n");
      break;
    case (brightness >= 218 && brightness < 224):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("C7", "8n");
      break;
    case (brightness >= 224 && brightness < 230):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("D7", "8n");
      break;
    case (brightness >= 230 && brightness < 236):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("E7", "8n");
      break;
    case (brightness >= 236 && brightness < 242):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("F7", "8n");
      break;
    case (brightness >= 242 && brightness < 248):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("G7", "8n");
      break;
    case (brightness >= 248 && brightness < 254):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("A7", "8n");
      break;
    case (brightness >= 254 && brightness < 256):
      //play a 'C0' for the duration of an 8th note
      synth.triggerAttackRelease("B7", "8n");
      break;
    default:
    // Todo: Add default code
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
