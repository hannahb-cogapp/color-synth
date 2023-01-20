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
  // Find the input number
  let inputNumber = event.closest('[data-color]').getAttribute('data-color');
  if (!inputNumber) return;

  // If that number input has a value, then run the changeColor function, passing in it the relevant trigger
  if (colorInputs[inputNumber-1].value.length > 0) {
    // Get the relevant trigger to add to the function
    let trigger = triggers[inputNumber-1];

    changeColor(colorInputs[inputNumber-1].value, trigger);
  } else {
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
        // Todo: Change this to a secondWave variable?
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

  // Create a nested array with all mappings from brightness to note
  let noteBrightness = [["C2", 7], ["D2", 12], ["E2", 18], ["F2", 24], ["G2", 32], ["A2", 38], ["B2", 44], ["C3", 50], ["D3", 56], ["E3", 62], ["F3", 68], ["G3", 74], ["A3", 80], ["B3", 86],
                        ["C4", 92], ["D4", 98], ["E4", 104], ["F4", 110], ["G4", 116], ["A4", 122], ["B4", 128], ["C5", 134], ["D5", 140], ["E5", 146], ["F5", 152], ["G5", 158], ["A5", 164], ["B5", 170],
                        ["C6", 176], ["D6", 182], ["E6", 188], ["F6", 194], ["G6", 200], ["A6", 206], ["B6", 212], ["C7", 218], ["D7", 224], ["E7", 232], ["F7", 238], ["G7", 244], ["A7", 250], ["B7", 256]];

  // Function to check if brightness is less than element[1]
  function calculateNote(element) {
    if (brightness < element[1]) {
      return element;
    }
  }

  // Find the first array where brightness is less than array[1] 
  let noteArray = noteBrightness.find(calculateNote); 

  // Play the relevant note on the synch
  synth.triggerAttackRelease(noteArray[0], "8n");
}

// When a colour is input, change the trigger to that colour
document.addEventListener('input', function (event) {
  if (event.target.matches('.color-input')) {
    inputHandler(event.target);
  }
});

// Listen for click events
document.addEventListener('mouseover', mouseHandler);
