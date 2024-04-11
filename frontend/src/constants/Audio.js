// audio.js

const keySounds = {

  pianoWhiteKeys: {
    C3: require('../audio/piano/C3.mp3'),
    D3: require('../audio/piano/D3.mp3'),
    E3: require('../audio/piano/E3.mp3'),
    F3: require('../audio/piano/F3.mp3'),
    G3: require('../audio/piano/G3.mp3'),
    A3: require('../audio/piano/A3.mp3'),
    B3: require('../audio/piano/B3.mp3'),
  
  },


  pianoBlackKeys: {
    Cb3: require('../audio/piano/C3.mp3'),
    Db3: require('../audio/piano/Db3.mp3'),
    Fb3: require('../audio/piano/F3.mp3'),
    Gb3: require('../audio/piano/Gb3.mp3'),
    Ab3: require('../audio/piano/Ab3.mp3'),

  },


  guitar: {
    A: 'guitar-a.mp3',
    B: 'guitar-b.mp3',
    C: 'guitar-c.mp3',
    D: 'guitar-d.mp3',
    E: 'guitar-e.mp3',
    F: 'guitar-f.mp3',
   
  },

  drum: {
    kick: 'drum-kick.mp3',
    snare: 'drum-snare.mp3',
    hiHat: 'drum-hihat.mp3',
   
  },
};

export default keySounds;
