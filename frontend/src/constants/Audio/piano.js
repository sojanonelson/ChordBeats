const whiteKeys = [
  { keyName: "C3", audio: require("../../audio/piano/C3.mp3"), keyValue: "65" },
  { keyName: "D3", audio: require("../../audio/piano/D3.mp3"), keyValue: "83" },
  { keyName: "E3", audio: require("../../audio/piano/E3.mp3"), keyValue: "68" },
  { keyName: "F3", audio: require("../../audio/piano/F3.mp3"), keyValue: "70" },
  { keyName: "G3", audio: require("../../audio/piano/G3.mp3"), keyValue: "71" },
  { keyName: "A3", audio: require("../../audio/piano/A3.mp3"), keyValue: "72" },
  { keyName: "B3", audio: require("../../audio/piano/B3.mp3"), keyValue: "74" },
  { keyName: "C4", audio: require("../../audio/piano/C4.mp3"), keyValue: "75" },
  { keyName: "D4", audio: require("../../audio/piano/D4.mp3"), keyValue: "76" },
  { keyName: "E4", audio: require("../../audio/piano/E4.mp3"), keyValue: "186" },
  { keyName: "F4", audio: require("../../audio/piano/F4.mp3"), keyValue: "222" },
  { keyName: "G4", audio: require("../../audio/piano/G4.mp3"), keyValue: "220" },
  { keyName: "A4", audio: require("../../audio/piano/A4.mp3"), keyValue: "46" },
  { keyName: "B4", audio: require("../../audio/piano/B4.mp3"), keyValue: "35" },
  { keyName: "C5", audio: require("../../audio/piano/C5.mp3"), keyValue: "34" },
];

const blackKeys = [
  { keyName: "Cb3", audio: require("../../audio/piano/C3.mp3"), keyValue: "87" },
  { keyName: "Db3", audio: require("../../audio/piano/C3.mp3"), keyValue: "69" },
  { keyName: "", audio: require("../../audio/piano/C3.mp3"), keyValue: "" },
  { keyName: "Fb3", audio: require("../../audio/piano/C3.mp3"), keyValue: "84" },
  { keyName: "Gb3", audio: require("../../audio/piano/C3.mp3"), keyValue: "89" },
  { keyName: "Ab3", audio: require("../../audio/piano/C3.mp3"), keyValue: "85" },
  { keyName: "", audio: require("../../audio/piano/C3.mp3"), keyValue: "" },
  { keyName: "Cb4", audio: require("../../audio/piano/C3.mp3"), keyValue: "79" },
  { keyName: "Db4", audio: require("../../audio/piano/C3.mp3"), keyValue: "80" },
  { keyName: "", audio: require("../../audio/piano/C3.mp3"), keyValue: "" },
  { keyName: "Fb4", audio: require("../../audio/piano/C3.mp3"), keyValue: "221" },
  { keyName: "Gb4", audio: require("../../audio/piano/C3.mp3"), keyValue: "45" },
  { keyName: "Ab4", audio: require("../../audio/piano/C3.mp3"), keyValue: "36" },
  { keyName: "", audio: require("../../audio/piano/C3.mp3"), keyValue: "" },
];

const pianoSound = { whiteKeys, blackKeys };

export default pianoSound;
