
# 🚀 React Native Project Template

A modern, scalable, and CLI-enhanced React Native starter — optimized for speed, maintainability, and developer productivity.

---

## 🛠️ Project Initialization

### 1️⃣ Create a New Project

#### 📦 From GitHub:

```bash
npx @react-native-community/cli@latest init YourAppName --template  https://github.com/SolankiYogesh/react-native-template --skip-install
```



---

### 2️⃣ Install Dependencies

#### ✅ Recommended (Yarn):

```bash
yarn
```

#### Or use NPM:

```bash
npm install
```

---

### 3️⃣ iOS Setup (CocoaPods)

```bash
cd ios && pod install
```

---

## ⚡ Generate Components & Screens in Seconds

This template includes [Plop.js](https://plopjs.com/) for fast, consistent scaffolding of components and screens.

### 🧩 Generate Using CLI:

```bash
yarn generate
```

You'll be prompted with the following generator options:

* **Common Component** (auto-exported, created at `src/components/ComponentName`)
* **Screen** (auto-exported, created at `src/screens/ScreenName`)
* **Screen-Specific Component** (created inside respective screen directory)

---

## 🧰 Key Featured Libraries & Benefits

| Library                              | Purpose & Benefit                               |
| ------------------------------------ | ----------------------------------------------- |
| **dayjs**                            | Lightweight, performant date/time manipulation  |
| **zustand**                          | Minimalistic, flexible state management         |
| **react-native-mmkv**                | Ultra-fast, encrypted key-value storage         |
| **react-native-keyboard-controller** | Robust keyboard event management & animations   |
| **react-hook-form**                  | Simple, performant form management              |
| **yup**                              | Schema validation and type-safe form validation |
| **rn-ripple-button**                 | Highly customizable ripple feedback buttons     |

These carefully picked libraries ensure smooth performance, better developer experience, and maintainability out-of-the-box.

---

## 🖼️ Screenshots Preview

| 🔐 Login                              | 🏠 Dashboard                  |
| ------------------------------------- | ----------------------------- |
| ![Login](./preview/login.png) | ![Dashboard](./preview/dashboard.png) |

---

## 🎨 Features Included

* 🧱 Atomic folder structure
* ⚛️ React Native + TypeScript
* 🧩 Plop.js generators for components & screens
* 🌈 Centralized theming system
* 🚀 Optimized for fast development and performance

---

## 🧭 Folder Structure

```
├── Assets
│   ├── Fonts
│   │   ├── Inter-Bold.ttf
│   │   ├── Inter-ExtraBold.ttf
│   │   ├── Inter-Medium.ttf
│   │   ├── Inter-Regular.ttf
│   │   └── Inter-SemiBold.ttf
│   └── Images
│       └── user.png
├── Components
│   ├── AppButton.tsx
│   ├── AppContainer.tsx
│   ├── AppDropDown
│   ├── AppHeader.tsx
│   ├── AppInput.tsx
│   ├── AppLoader
│   │   ├── AppLoader.tsx
│   │   └── Loader.ts
│   └── index.ts
├── Config
│   └── Config.ts
├── Helpers
│   ├── AppStorage.ts
│   ├── Constant.ts
│   ├── index.ts
│   ├── Responsive.ts
│   ├── Screens.ts
│   ├── SVGByteCode.ts
│   └── Utility.ts
├── Hooks
│   ├── index.ts
│   ├── useNavigation.ts
│   └── useParams.ts
├── Network
│   ├── APICall.ts
│   ├── EndPoints.ts
│   └── index.ts
├── Router
│   ├── AppNavigation.tsx
│   ├── AuthNavigation.tsx
│   ├── HomeNavigation.tsx
│   ├── index.ts
│   └── RootNavigation.ts
├── Screens
│   ├── Auth
│   │   └── LoginScreen
│   │       └── LoginScreen.tsx
│   ├── index.ts
│   ├── Main
│   │   └── DashBoardScreen
│   │       └── DashBoardScreen.tsx
│   └── Yogesh
├── Store
│   ├── index.ts
│   ├── useMulti.ts
│   └── useUserStore.ts
├── Theme
│   ├── Colors.ts
│   ├── CommonStyle.ts
│   ├── Fonts.ts
│   └── index.ts
└── Types
    ├── allTypes.d.ts
    ├── index.ts
    ├── screen.types.ts
    └── types.ts

```

---

## 💡 Pro Tip

Run `yarn generate` often to boost productivity and keep your code consistent!
