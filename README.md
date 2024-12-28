# Expo Camera: Multiple `onBarCodeScanned` Triggers

This repository demonstrates a bug in Expo's Camera API where the `onBarCodeScanned` callback is triggered multiple times for a single barcode scan. This can lead to issues such as duplicate data entries and performance degradation.

The `bug.js` file showcases the problem. The `bugSolution.js` file demonstrates a solution to mitigate the issue by debouncing the callback.

## How to reproduce

1. Clone this repository.
2. Run `npm install`.
3. Run `expo start`.
4. Scan a barcode multiple times. Observe the console output for duplicate barcode data.

## Solution

The solution involves debouncing the `onBarCodeScanned` callback using a timer.  This ensures that the callback is only triggered once within a specified time window.