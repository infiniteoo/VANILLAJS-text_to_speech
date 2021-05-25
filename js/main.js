// init speech synthesis API
const synth = window.speechSynthesis;

// DOM element reference vars
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

// init voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();

    // loop through voices and create an option for each one

    voices.forEach(voice => {
        // create an option element 
        const option = document.createElement('option');
        // fill the option with the voice and language
        option.textContent = voice.name + "(" + voice.lang + ")";
        // set needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);

    });
  
}

getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;

}

// speak
const speak = () => {
    // check if speaking
    if(synth.speaking){
        console.error('Already speaking...');
        return;
    }
    if(textInput.value !== ''){
        // get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        // speak end
        speakText.onend = e => {
            console.log('Done speaking..');

        }

        // speak error
        speakText.onerror = e => {
            console.error('something went wrong!');
        }

        // selected voice 
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // loop through voices 
        voices.forEach(voice => {
            if(voice.name === selectedVoice){
                speakText.voice = voice;

            }            
        });

        // set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // speak!
        synth.speak(speakText);


    }
};

// event listeners

// text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
})

// rate value change
rate.addEventListener('change', e => rateValue.textContent = rate.value);

// pitch value change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

// Voice select change
voiceSelect.addEventListener('change', e => speak());
