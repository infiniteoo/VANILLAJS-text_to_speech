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