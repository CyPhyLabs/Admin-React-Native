# Admin-React-Native

## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the App](#running-the-app)
- [Building the App](#building-the-app)
- [EAS](#eas)
- [Cleanup](#cleanup)

## Introduction
This repository contains the code for the Admin React Native application using Expo. Follow the steps below to set up and run the project.

## Prerequisites
- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android builds)
- Xcode (for iOS builds)
- EAS CLI (`npm install -g eas-cli`)

## Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/admin-react-native.git
    cd admin-react-native/t2t-admin
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file from the example:
    ```bash
    cp .env.example .env
    ```

4. Update the `.env` file with your API base URLs if necessary.

## Running the App
### Expo Go Mode
To run the app in Expo Go mode:
```bash
npx expo start
```
This will start the Expo development server. You can scan the QR code with the Expo Go app on your device.

### Development Mode
To run the app in development mode on a simulator or device:

#### Android
```bash
npx expo start --android
```

#### iOS
```bash
npx expo start --ios
```

#### Web
```bash
npx expo start --web
```

## Building the App
### Android
1. Open Android Studio and load the `android` directory.
2. Ensure you have the necessary SDKs installed.
3. Run the following command to install dependencies:
    ```bash
    npx expo run:android
    ```

### iOS
1. Open the `ios` directory in Xcode.
2. Install CocoaPods dependencies:
    ```bash
    cd ios
    pod install
    cd ..
    ```
3. Run the following command to build the app:
    ```bash
    npx expo run:ios
    ```

## EAS
### Building with EAS
To build the app using EAS, you need to have the EAS CLI installed and configured.

#### Development Build
```bash
eas build --profile development --platform all
```

#### Preview Build
```bash
eas build --profile preview --platform all
```

#### Production Build
```bash
eas build --profile production --platform all
```

### Submitting to App Stores
To submit your app to the app stores, use the following command:
```bash
eas submit --platform all
```

## Cleanup
To clean up the project, you can use the following commands:

### Clear Expo Cache
```bash
expo start -c
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Remove node_modules and reinstall
```bash
rm -rf node_modules
npm install
```

### Remove Pods and reinstall (iOS)
```bash
cd ios
rm -rf Pods
pod install
cd ..
```

## When to Use Different Build Commands
- Use `npm start` for quick testing with Expo Go.
- Use `npm run android` or `npm run ios` for development on simulators or devices.
- Use EAS build commands for generating production-ready builds or internal testing builds.