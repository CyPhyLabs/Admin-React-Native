# **Admin-React-Native**

## **Table of Contents**

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Project Structure](#project-structure)
- [Running the App](#running-the-app)
- [Building the App](#building-the-app)
- [EAS (Expo Application Services)](#eas)
- [Running on a Physical Device](#running-on-a-physical-device)
- [Cleanup and Debugging](#cleanup-and-debugging)
- [Common Issues and Fixes](#common-issues-and-fixes)

---

## **Introduction**

This repository contains the code for the **Admin React Native application** using **Expo**. This guide will walk you through **setting up**, **running**, **building**, and **cleaning up** the environment, covering both **Android and iOS** workflows.

---

## **Prerequisites**

Ensure you have the following installed:

- **Node.js** (>= 14.x, recommended: 18.x)
- **npm** (>= 6.x) or **yarn** (>= 1.x)
- **Expo CLI**
  ```bash
  npm install -g expo-cli
  ```
- **EAS CLI**
  ```bash
  npm install -g eas-cli
  ```
- **Android Setup:**
  - **Android Studio**
  - **Java Development Kit (JDK) 11 or later**
  - **Android Emulator or a Physical Device with USB Debugging enabled**
- **iOS Setup (Mac users only):**
  - **Xcode** (Latest version recommended)
  - **CocoaPods**
    ```bash
    sudo gem install cocoapods
    ```
  - **iOS Simulator or a Physical iOS Device**

---

## **Setup**

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-repo/admin-react-native.git
   cd admin-react-native/t2t-admin
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   OR

   ```bash
   yarn install
   ```

3. **Create an environment file**

   ```bash
   cp .env.example .env
   ```

   - Update `.env` with your API keys, Firebase credentials, and other necessary configurations.

4. **Verify the installation**

   ```bash
   npx expo doctor
   ```

   If any dependencies are missing, install them.

---

## **Project Structure**
### Key Directories and Files:

- **/src**: Main source code directory
  - **/components**: Reusable UI components
  - **/screens**: Screen components for navigation
  - **/navigation**: Navigation configuration
  - **/services**: API and external service integrations
  - **/utils**: Helper functions and utilities
  - **/context**: React Context providers
  - **/styles**: Global styles and themes

- **/assets**: Static files
  - **/images**: Image assets
  - **/fonts**: Custom font files

- **/android**: Native Android configuration
  - Build configurations
  - Native modules
  - Android-specific settings

- **/ios**: Native iOS configuration
  - Xcode project files
  - CocoaPods dependencies
  - iOS-specific settings

- **Root Files**:
  - **.env**: Environment variables
  - **app.json**: Expo configuration
  - **package.json**: Project dependencies
  - **babel.config.js**: Babel settings
  - **metro.config.js**: Metro bundler settings


---

## **Running the App**

### **1. Run the app using Expo**

```bash
npx expo start
```

- Scan the **QR Code** using **Expo Go** on your mobile device.
- Press `` to open on an Android emulator.
- Press `` to open on an iOS simulator.

### **2. Run on an Emulator/Simulator**

#### **Android**

```bash
npx expo start --android
```

- Ensure **Android Studio** is running with an **emulator** open.

#### **iOS** (Mac only)

```bash
npx expo start --ios
```

- Ensure **Xcode** is installed and **iOS Simulator** is running.

#### **Web**

```bash
npx expo start --web
```

- Runs the app in a web browser.

---

## **Building the App**

### **1. Android Build**

1. Open Android Studio and ensure all SDKs are installed.
2. Run:
   ```bash
   npx expo run:android
   ```
   OR
   ```bash
   eas build --platform android
   ```

### **2. iOS Build (Mac only)**

1. Navigate to the iOS folder:
   ```bash
   cd ios
   pod install
   cd ..
   ```
2. Run:
   ```bash
   npx expo run:ios
   ```
   OR
   ```bash
   eas build --platform ios
   ```

---

## **EAS (Expo Application Services)**

### **1. Development Build**

```bash
eas build --profile development --platform all
```

### **2. Preview Build**

```bash
eas build --profile preview --platform all
```

### **3. Production Build**

```bash
eas build --profile production --platform all
```

### **4. Submit to App Stores**

```bash
eas submit --platform all
```

- Ensure **App Store** and **Google Play credentials** are set up.

---

## **Running on a Physical Device**

### **Android (ADB Debugging)**

1. Connect your Android device via USB.
2. Enable **USB Debugging** in Developer options.
3. Run:
   ```bash
   npx expo run:android --device
   ```

### **iOS (Physical Device)**

1. Ensure your device is connected to the same Wi-Fi as your Mac.
2. Use the following:
   ```bash
   npx expo run:ios --device
   ```
3. If you encounter issues, use **Xcode** to run the project directly.

---

## **Cleanup and Debugging**

### **1. Clear Expo Cache**

```bash
expo start -c
```

### **2. Remove and Reinstall Dependencies**

```bash
rm -rf node_modules package-lock.json
npm install
```

OR

```bash
yarn install
```

### **3. Reset npm Cache**

```bash
npm cache clean --force
```

### **4. Remove and Reinstall Pods (iOS)**

```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

### **5. Force Rebuild**

```bash
expo r -c
```

---

## **Common Issues and Fixes**

### **Issue: “Command Not Found” for Expo**

Fix:

```bash
npm install -g expo-cli
```

### **Issue: Metro Bundler stuck on “Starting project...”**

Fix:

```bash
rm -rf .expo
expo start -c
```

### **Issue: Emulator Not Found**

- Ensure **Android Studio** is open and an emulator is running.

### **Issue: iOS Build Fails**

Fix:

```bash
cd ios
pod install --verbose
cd ..
```

### **Issue: Debugging with React Native Debugger**

1. Install React Native Debugger:
   ```bash
   brew install --cask react-native-debugger
   ```
2. Open **Developer Menu** in Expo (Shake device or `Ctrl + m`) → Enable **Remote JS Debugging**.

---

This README provides **detailed setup, run, build, and debugging instructions** for React Native development using **Expo and EAS**.

