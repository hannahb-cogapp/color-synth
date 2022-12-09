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

// Call this function when a color is input into any of the input fields
function inputHandler(event) {
  console.log('input triggered');
  // Find the input number
  let inputNumber = event.closest('[data-color]').getAttribute('data-color');
  if (!inputNumber) return;

  console.log(colorInputs[inputNumber-1].value.length);

  // If that number input has a value, then run the changeColor function, passing in it the relevant trigger
  if (colorInputs[inputNumber-1].value.length > 0) {
    // Get the relevant trigger to add to the function
    let trigger = triggers[inputNumber-1];

    changeColor(colorInputs[inputNumber-1].value, trigger);
  } else {
    console.log('equals 0');
    // Get the relevant trigger to add to the function
    let trigger = triggers[inputNumber-1];

    changeColor('C0C0C0', trigger);
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

  // If that number input has a value, then run the makeSound function, passing it the relevant hex code
  if (colorInputs[colorNumber-1].value) {
    makeSound(colorInputs[colorNumber-1].value.convertToRGB());
  }
}

function makeSound(rgb) {
  console.log(rgb);

  let brightness = rgb.reduce((partialSum, a) => partialSum + a, 0) / 3;

  // Empty synth variable
  let synth;

  // Empty effect variables
  let distortion;
  let reverb;
  let tremolo;
  let wave;
  let synthType;

  // Red effect - amount of distortion, reverb and tremolo
  if (rgb[0] > 0) {
    let amount = 1/255 * rgb[0];
    distortion = new Tone.Distortion(amount).toDestination();
    reverb = new Tone.JCReverb(amount).connect(Tone.Master).toDestination();
    //create a tremolo and start it's LFO
    tremolo = new Tone.Tremolo(9, amount).toDestination().start()
  } else if (rgb[0] === 0) {
    distortion = new Tone.Distortion(0).toDestination();
    reverb = new Tone.JCReverb(0).connect(Tone.Master).toDestination();
    tremolo = new Tone.Tremolo(9, 0).toDestination().start()
  }

  // Green effect - type of wave
  switch(true) {
    case (rgb[1] < 65):
      wave = "sine";
      break;
    case (rgb[1] >= 65 && rgb[1] < 129):
      wave = "square";
      break;
    case (rgb[1] >= 129 && rgb[1] < 193):
      wave = "triangle";
      break;
    case (rgb[1] >= 193 && rgb[1] < 256):
      wave = "sawtooth";
      break;
    default:
  }

  // Blue effect - type of synth
  switch(true) {
    case (rgb[2] < 65):
      //create a synth and connect it to the main output (your speakers)
      synth = new Tone.Synth({
        oscillator : {
          type : wave
        }
      }).toDestination().chain(distortion, reverb, tremolo);
      break;
    case (rgb[2] >= 65 && rgb[2] < 129):
      synth = new Tone.FMSynth({
        harmonicity : 3 ,
        modulationIndex : 10 ,
        detune : 0 ,
        oscillator : {
        type : wave
        } ,
        envelope : {
        attack : 0.01 ,
        decay : 0.01 ,
        sustain : 1 ,
        release : 0.5
        } ,
        modulation : {
        type : "square"
        } ,
        modulationEnvelope : {
        attack : 0.5 ,
        decay : 0 ,
        sustain : 1 ,
        release : 0.5
        }
      }).toDestination().chain(distortion, reverb, tremolo);
      break;
    case (rgb[2] >= 129 && rgb[2] < 193):
      synth = new Tone.DuoSynth({
        vibratoAmount : 0.5 ,
        vibratoRate : 5 ,
        harmonicity : 1.5 ,
        voice0 : {
        volume : -10 ,
        portamento : 0 ,
        oscillator : {
        type : wave
        } ,
        filterEnvelope : {
        attack : 0.01 ,
        decay : 0 ,
        sustain : 1 ,
        release : 0.5
        } ,
        envelope : {
        attack : 0.01 ,
        decay : 0 ,
        sustain : 1 ,
        release : 0.5
        }
        } ,
        voice1 : {
        volume : -10 ,
        portamento : 0 ,
        oscillator : {
        type : wave
        } ,
        filterEnvelope : {
        attack : 0.01 ,
        decay : 0 ,
        sustain : 1 ,
        release : 0.5
        } ,
        envelope : {
        attack : 0.01 ,
        decay : 0 ,
        sustain : 1 ,
        release : 0.5
        }
        }
      }).toDestination().chain(distortion, reverb, tremolo);
      break;
    case (rgb[2] >= 193 && rgb[2] < 256):
      synth = new Tone.MonoSynth({
        frequency : "C4",
        detune : 0 ,
        oscillator : {
        type : wave
        } ,
        filter : {
        Q : 6 ,
        type : "lowpass",
        rolloff : -24
        } ,
        envelope : {
        attack : 0.005 ,
        decay : 0.1 ,
        sustain : 0.9 ,
        release : 1
        } ,
        filterEnvelope : {
        attack : 0.06 ,
        decay : 0.2 ,
        sustain : 0.5 ,
        release : 2 ,
        baseFrequency : 200 ,
        octaves : 7 ,
        exponent : 2
        }
      }).toDestination().chain(distortion, reverb, tremolo);
      break;
    default:
      synth = new Tone.Synth({
        oscillator : {
          type : wave
        }
      }).toDestination().chain(distortion, reverb, tremolo);
      break;
  }

  // Assign a pitch based on the brightness of the color
  switch(true) {
    // Todo: Is there a way to simplify this code? Could you do it in a way that would make it easier to change to a minor key?
    // Perhaps you could put all of the notes in an array, and assign an incremented array index every 'x' times e.g. 6.
    // Is there a way to loop and say every 6 loops move to the next index? loop.index?
    case (brightness < 7):
      //play a 'C2' for the duration of an 8th note
      synth.triggerAttackRelease("C2", "8n");
      break;
    case (brightness >= 7 && brightness < 12):
      synth.triggerAttackRelease("D2", "8n");
      break;
    case (brightness >= 12 && brightness < 18):
      synth.triggerAttackRelease("E2", "8n");
      break;
    case (brightness >= 18 && brightness < 24):
      synth.triggerAttackRelease("F2", "8n");
      break;
    case (brightness >= 24 && brightness < 32):
      synth.triggerAttackRelease("G2", "8n");
      break;
    case (brightness >= 32 && brightness < 38):
      synth.triggerAttackRelease("A2", "8n");
      break;
    case (brightness >= 38 && brightness < 44):
      synth.triggerAttackRelease("B2", "8n");
      break;
    case (brightness >= 44 && brightness < 50):
      synth.triggerAttackRelease("C3", "8n");
      break;
    case (brightness >= 50 && brightness < 56):
      synth.triggerAttackRelease("D3", "8n");
      break;
    case (brightness >= 56 && brightness < 62):
      synth.triggerAttackRelease("E3", "8n");
      break;
    case (brightness >= 62 && brightness < 68):
      synth.triggerAttackRelease("F3", "8n");
      break;
    case (brightness >= 68 && brightness < 74):
      synth.triggerAttackRelease("G3", "8n");
      break;
    case (brightness >= 74 && brightness < 80):
      synth.triggerAttackRelease("A3", "8n");
      break;
    case (brightness >= 80 && brightness < 86):
      synth.triggerAttackRelease("B3", "8n");
      break;
    case (brightness >= 86 && brightness < 92):
      synth.triggerAttackRelease("C4", "8n");
      break;
    case (brightness >= 92 && brightness < 98):
      synth.triggerAttackRelease("D4", "8n");
      break;
    case (brightness >= 98 && brightness < 104):
      synth.triggerAttackRelease("E4", "8n");
      break;
    case (brightness >= 104 && brightness < 110):
      synth.triggerAttackRelease("F4", "8n");
      break;
    case (brightness >= 110 && brightness < 116):
      synth.triggerAttackRelease("G4", "8n");
      break;
    case (brightness >= 116 && brightness < 122):
      synth.triggerAttackRelease("A4", "8n");
      break;
    case (brightness >= 122 && brightness < 128):
      synth.triggerAttackRelease("B4", "8n");
      break;
    case (brightness >= 128 && brightness < 134):
      synth.triggerAttackRelease("C5", "8n");
      break;
    case (brightness >= 134 && brightness < 140):
      synth.triggerAttackRelease("D5", "8n");
      break;
    case (brightness >= 140 && brightness < 146):
      synth.triggerAttackRelease("E5", "8n");
      break;
    case (brightness >= 146 && brightness < 152):
      synth.triggerAttackRelease("F5", "8n");
      break;
    case (brightness >= 152 && brightness < 158):
      synth.triggerAttackRelease("G5", "8n");
      break;
    case (brightness >= 158 && brightness < 164):
      synth.triggerAttackRelease("A5", "8n");
      break;
    case (brightness >= 164 && brightness < 170):
      synth.triggerAttackRelease("B5", "8n");
      break;
    case (brightness >= 170 && brightness < 176):
      synth.triggerAttackRelease("C6", "8n");
      break;
    case (brightness >= 176 && brightness < 182):
      synth.triggerAttackRelease("D6", "8n");
      break;
    case (brightness >= 182 && brightness < 188):
      synth.triggerAttackRelease("E6", "8n");
      break;
    case (brightness >= 188 && brightness < 194):
      synth.triggerAttackRelease("F6", "8n");
      break;
    case (brightness >= 194 && brightness < 200):
      synth.triggerAttackRelease("G6", "8n");
      break;
    case (brightness >= 200 && brightness < 206):
      synth.triggerAttackRelease("A6", "8n");
      break;
    case (brightness >= 206 && brightness < 212):
      synth.triggerAttackRelease("B6", "8n");
      break;
    case (brightness >= 212 && brightness < 218):
      synth.triggerAttackRelease("C7", "8n");
      break;
    case (brightness >= 218 && brightness < 224):
      synth.triggerAttackRelease("D7", "8n");
      break;
    case (brightness >= 224 && brightness < 230):
      synth.triggerAttackRelease("E7", "8n");
      break;
    case (brightness >= 230 && brightness < 236):
      synth.triggerAttackRelease("F7", "8n");
      break;
    case (brightness >= 236 && brightness < 242):
      synth.triggerAttackRelease("G7", "8n");
      break;
    case (brightness >= 242 && brightness < 248):
      synth.triggerAttackRelease("A7", "8n");
      break;
    case (brightness >= 248 && brightness < 256):
      synth.triggerAttackRelease("B7", "8n");
      break;
    default:
      synth.triggerAttackRelease("C4", "8n");
      break;
  }
}

// When a colour is input, change the trigger to that colour
document.addEventListener('input', function (event) {
  if (event.target.matches('.color-input')) {
    inputHandler(event.target);
  }
});

// Listen for click events
document.addEventListener('mouseover', mouseHandler);
