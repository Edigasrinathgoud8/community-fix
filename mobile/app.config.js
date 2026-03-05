import 'dotenv/config';

export default {
  expo: {
    name: "CommunityFix",
    slug: "community-fix",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      "supportsTablet": true,
      "bundleIdentifier": "com.communityfix.app",
      "buildNumber": "1"
    },
    android: {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.communityfix.app",
      "versionCode": 1,
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "INTERNET"
      ]
    },
    web: {
      "favicon": "./assets/favicon.png"
    },
    plugins: [
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      ],
      "expo-secure-store",
      "expo-updates"
    ],
    updates: {
      url: `https://u.expo.dev/0e330560-75f9-41c6-9d7f-c3e08f30a364`
    },
    runtimeVersion: {
      policy: "appVersion"
    },
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      apiUrl: process.env.API_URL || "http://10.0.2.2:5000/api",
      eas: {
        "projectId": "0e330560-75f9-41c6-9d7f-c3e08f30a364"
      }
    }
  }
};
