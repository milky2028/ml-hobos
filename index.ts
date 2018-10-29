import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';
import hobos from './hobos';

const allChars = hobos.flatMap((hobo: string) => hobo.split(''));
const uniqueChars = [...new Set(allChars)];
const charIndex = uniqueChars.map((char: string, i: number) => {
    return { [char]: i++ };
});

const stringToInt = (input: string): number[] => {
    return input.split('').map((item) => {
      const val = charIndex.find((char) => item === Object.keys(char)[0])!;
      return val[item];
    });
};

const intToString = (ints: number[]): string => {
    return ints.map((int) => {
      const val = charIndex.find((char) => int === Object.values(char)[0])!;
      return Object.keys(val)[0];
    }).join('');
  };

const seqLength = 30;
// const hoboLen = hobos.map((hobo) => hobo.length);
const numHobos = hobos.map((hobo) => {
    return (stringToInt(hobo).length > 30) ? stringToInt(hobo).slice(0, 30) : false;
});

console.log(numHobos);
