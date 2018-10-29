import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';
import hobos from './hobos';

const allChars = hobos.flatMap((hobo: string) => hobo.split(''));
const uniqueChars = [...new Set(allChars)];
const charIndex = uniqueChars.map((char: string, i: number) => {
    return { [char]: i++ };
});

const stringToInt = (input: string) => {
    return input.split('').map((item) => {
      const val = charIndex.find((char) => item === Object.keys(char)[0])!;
      return val[item];
    });
};
const numHobos = hobos.map((hobo) => stringToInt(hobo));
