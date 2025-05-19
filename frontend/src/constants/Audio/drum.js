const whiteKeys = [
  { keyName: "C3", audio: require("../../audio/drum/1.wav"), keyValue: "65" },
  { keyName: "D3", audio: require("../../audio/drum/2.mp3"), keyValue: "83" },
  { keyName: "E3", audio: require("../../audio/drum/3.wav"), keyValue: "68" },
  { keyName: "F3", audio: require("../../audio/drum/4.wav"), keyValue: "70" },
  { keyName: "G3", audio: require("../../audio/drum/5.wav"), keyValue: "71" },
  { keyName: "A3", audio: require("../../audio/drum/6.wav"), keyValue: "72" },
  { keyName: "B3", audio: require("../../audio/drum/7.wav"), keyValue: "74" },
  { keyName: "C4", audio: require("../../audio/drum/8.wav"), keyValue: "75" },
  { keyName: "D4", audio: require("../../audio/drum/9.wav"), keyValue: "76" },
  { keyName: "E4", audio: require("../../audio/drum/10.wav"), keyValue: "186" },
  { keyName: "F4", audio: require("../../audio/drum/11.wav"), keyValue: "222" },
  { keyName: "G4", audio: require("../../audio/drum/13.wav"), keyValue: "220" },
  { keyName: "A4", audio: require("../../audio/drum/14.wav"), keyValue: "46" },
  { keyName: "B4", audio: require("../../audio/drum/15.wav"), keyValue: "35" },
  { keyName: "C5", audio: require("../../audio/drum/16.wav"), keyValue: "34" },
];

const blackKeys = [
  { keyName: "Cb3", audio: require("../../audio/drum/17.wav"), keyValue: "87" },
  { keyName: "Db3", audio: require("../../audio/drum/18.mp3"), keyValue: "69" },
  { keyName: "", audio: require("../../audio/drum/19.mp3"), keyValue: "" },
  { keyName: "Fb3", audio: require("../../audio/drum/20.mp3"), keyValue: "84" },
  { keyName: "Gb3", audio: require("../../audio/drum/21.mp3"), keyValue: "89" },
  { keyName: "Ab3", audio: require("../../audio/drum/22.mp3"), keyValue: "85" },
  { keyName: "", audio: require("../../audio/drum/19.mp3"), keyValue: "" },
  { keyName: "Cb4", audio: require("../../audio/drum/23.mp3"), keyValue: "79" },
  { keyName: "Db4", audio: require("../../audio/drum/19.mp3"), keyValue: "80" },
  { keyName: "", audio: require("../../audio/drum/19.mp3"), keyValue: "" },
  { keyName: "Fb4", audio: require("../../audio/drum/24.mp3"), keyValue: "221" },
  { keyName: "Gb4", audio: require("../../audio/drum/25.mp3"), keyValue: "45" },
  { keyName: "Ab4", audio: require("../../audio/drum/26.mp3"), keyValue: "36" },
  { keyName: "", audio: require("../../audio/drum/19.mp3"), keyValue: "" },
];

const drumSound = { whiteKeys, blackKeys };

export default drumSound;
