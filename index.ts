import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';
import hobos from './hobos';

const allChars = hobos.flatMap((hobo: string) => hobo.split(''));
const uniqueChars = [...new Set(['reserved', ...allChars])];
const charIndex = uniqueChars.map((char: string, i: number) => ({ [char]: i++ }));

const stringToInt = (input: string): number[] =>
  input.split('').map((item) => {
    const val = charIndex.find((char) => item === Object.keys(char)[0])!;
    return val[item];
  });

const intToString = (ints: number[]): string =>
  ints
    .filter((item) => item !== 0)
    .map((int) => {
      const val = charIndex.find((char) => int === Object.values(char)[0])!;
      return Object.keys(val)[0];
    })
    .join('');

const seqLength = 32;
const hoboLen = hobos.map((hobo) => hobo.length);
const numHobos = hobos.map((hobo) => {
  if (stringToInt(hobo).length > seqLength) {
    return stringToInt(hobo).slice(0, seqLength);
  } else {
    const charInt = stringToInt(hobo);
    for (let i = charInt.length; i < seqLength; i++) {
      charInt.push(0);
    }
    return charInt;
  }
});

const inputsAndTargets = numHobos.map((hobo) => ({
  input: hobo.slice(0, hobo.length - 1),
  target: hobo.slice(1)
}));

console.log(inputsAndTargets[1]);

// console.log(intToString(inputsAndTargets[0].input));
// console.log(numHobos[0]);

// const model = tf.sequential();
// model.add(tf.layers.lstm({
//     inputShape: [seqLength - 1, hobos.length],
//     returnSequences: true,
//     units: 128,
// }));

// model.add(tf.layers.dropout({ rate: 0.2 }));

// model.add(tf.layers.lstm({
//     returnSequences: false,
//     units: 128
//   }));
// model.add(tf.layers.dropout({ rate: 0.2 }));
// model.add(tf.layers.dense({ units: hobos.length, activation: 'softmax' }));

// model.compile({loss: 'categoricalCrossentropy', optimizer: tf.train.rmsprop(0.002)});
