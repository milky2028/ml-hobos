import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';
import hobos from './hobos';

const allChars = hobos.flatMap((hobo: string) => hobo.split(''));
const uniqueChars = [...new Set(['reserved', ...allChars])];
const charIndex = uniqueChars.map((char: string, i: number) => {
    return { [char]: i++ };
});

const stringToInt = (input: string): number[] => {
    return input
        .split('')
        .map((item) => {
            const val = charIndex.find((char) => item === Object.keys(char)[0])!;
            return val[item];
        });
};

const intToString = (ints: number[]): string => {
    return ints
        .filter((item) => item !== 0)
        .map((int) => {
            const val = charIndex.find((char) => int === Object.values(char)[0])!;
            return Object.keys(val)[0];
        })
        .join('');
  };

const seqLength = 31;
// const hoboLen = hobos.map((hobo) => hobo.length);
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

console.log(numHobos);
