const whiteKeys = [
  { keyName: "C3", audio: require("../../audio/guitar/C3.mp3"), keyValue: "65" },
  { keyName: "D3", audio: require("../../audio/guitar/D3.mp3"), keyValue: "83" },
  { keyName: "E3", audio: require("../../audio/guitar/E3.mp3"), keyValue: "68" },
  { keyName: "F3", audio: require("../../audio/guitar/F3.mp3"), keyValue: "70" },
  { keyName: "G3", audio: require("../../audio/guitar/G3.mp3"), keyValue: "71" },
  { keyName: "A3", audio: require("../../audio/guitar/A3.mp3"), keyValue: "72" },
  { keyName: "B3", audio: require("../../audio/guitar/B3.mp3"), keyValue: "74" },
  { keyName: "C4", audio: require("../../audio/guitar/C4.mp3"), keyValue: "75" },
  { keyName: "D4", audio: require("../../audio/guitar/D4.mp3"), keyValue: "76" },
  { keyName: "E4", audio: require("../../audio/guitar/E4.mp3"), keyValue: "186" },
  { keyName: "F4", audio: require("../../audio/guitar/F4.mp3"), keyValue: "222" },
  { keyName: "G4", audio: require("../../audio/guitar/G3.mp3"), keyValue: "220" },
  { keyName: "A4", audio: require("../../audio/guitar/A4.mp3"), keyValue: "46" },
  { keyName: "B4", audio: require("../../audio/guitar/B4.mp3"), keyValue: "35" },
  { keyName: "C5", audio: require("../../audio/guitar/C5.mp3"), keyValue: "34" },
];

const blackKeys = [
  { keyName: "Cb3", audio: require("../../audio/guitar/C3.mp3"), keyValue: "87" },
  { keyName: "Db3", audio: require("../../audio/guitar/C3.mp3"), keyValue: "69" },
  { keyName: "", audio: require("../../audio/guitar/C3.mp3"), keyValue: "" },
  { keyName: "Fb3", audio: require("../../audio/guitar/C3.mp3"), keyValue: "84" },
  { keyName: "Gb3", audio: require("../../audio/guitar/C3.mp3"), keyValue: "89" },
  { keyName: "Ab3", audio: require("../../audio/guitar/C3.mp3"), keyValue: "85" },
  { keyName: "", audio: require("../../audio/guitar/C3.mp3"), keyValue: "" },
  { keyName: "Cb4", audio: require("../../audio/guitar/C3.mp3"), keyValue: "79" },
  { keyName: "Db4", audio: require("../../audio/guitar/C3.mp3"), keyValue: "80" },
  { keyName: "", audio: require("../../audio/guitar/C3.mp3"), keyValue: "" },
  { keyName: "Fb4", audio: require("../../audio/guitar/C3.mp3"), keyValue: "221" },
  { keyName: "Gb4", audio: require("../../audio/guitar/C3.mp3"), keyValue: "45" },
  { keyName: "Ab4", audio: require("../../audio/guitar/C3.mp3"), keyValue: "36" },
  { keyName: "", audio: require("../../audio/guitar/C3.mp3"), keyValue: "" },
];

const guitarSound = { whiteKeys, blackKeys };

export default guitarSound;
