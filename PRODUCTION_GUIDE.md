# Production Deployment Guide

This project has been upgraded to be production-ready. Follow these steps to deploy and publish.

## 1. Prerequisites
- Node.js installed.
- Expo CLI (`npm install -g expo-cli`).
- EAS CLI (`npm install -g eas-cli`).
- Firebase CLI (`npm install -g firebase-tools`).

## 2. Configuration

### Mobile App (`mobile/`)
1.  **Environment Variables:**
    Create a `.env` file in `mobile/` with your production Firebase keys:
    ```env
    FIREBASE_API_KEY=your_api_key
    FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    FIREBASE_PROJECT_ID=your_project_id
    FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    FIREBASE_APP_ID=your_app_id
    API_URL=https://your-backend-api.com/api
    ```

2.  **Assets:**
    Replace the placeholder images in `mobile/assets/` with your actual brand assets:
    - `icon.png` (1024x1024)
    - `splash.png` (1242x2436)
    - `adaptive-icon.png` (1024x1024)

3.  **Set EAS Secrets:**
    Since `.env` files are ignored by Git and EAS, you must set these variables as secrets in your Expo project:
    ```bash
    eas secret:create --name FIREBASE_API_KEY --value your_api_key
    eas secret:create --name FIREBASE_AUTH_DOMAIN --value your_project.firebaseapp.com
    eas secret:create --name FIREBASE_PROJECT_ID --value your_project_id
    eas secret:create --name FIREBASE_STORAGE_BUCKET --value your_project.appspot.com
    eas secret:create --name FIREBASE_MESSAGING_SENDER_ID --value your_sender_id
    eas secret:create --name FIREBASE_APP_ID --value your_app_id
    eas secret:create --name API_URL --value https://your-backend-api.com/api
    ```
    Alternatively, you can add them via the Expo Dashboard.

4.  **Build with EAS:**
    Login to Expo and build:
    ```bash
    cd mobile
    eas login
    eas build --platform android
    ```
    For iOS, run `eas build --platform ios`.

### Backend (`backend/`)
1.  **Environment Variables:**
    Set these on your production server (e.g., Render, Heroku, Railway):
    ```env
    PORT=5000
    NODE_ENV=production
    FIREBASE_PROJECT_ID=your_project_id
    FIREBASE_CLIENT_EMAIL=your_service_account_email
    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
    FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    ```

2.  **Deploy:**
    Deploy the backend code to your preferred Node.js hosting provider.

### Database (Firestore)
1.  **Deploy Rules:**
    Deploy the security rules to secure your data:
    ```bash
    firebase login
    firebase deploy --only firestore:rules
    ```

## 3. Post-Deployment Checks
- Verify that the mobile app can connect to the production backend (check `API_URL`).
- Verify that users can register and login.
- Test ticket creation and image uploads.
- Ensure Firestore rules are enforced (e.g., users can only see their own data or community data).

## 4. Updates
- To update the app over the air (OTA), run:
  ```bash
  eas update --branch production --message "Update description"
  ```
- To update the native binary (e.g. new permissions), rebuild with `eas build`.
