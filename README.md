# Description

This project was created with react, tailwind and typescript. It is about sending notification using firebase. It stores all notification related data in firebase database.

Create a `.env` file in the root directory of project and add the following environment variables:

# Firebase configuration

```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGE_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

# Other environment variables

```
SOME_OTHER_VARIABLE=your-value
```

## Prerequisites (only for firebase emulator)

- [Java 8 or higher](https://www.oracle.com/in/java/technologies/downloads/)

Ensure that you have Java installed on your machine to run firebase emulator. You can check your Java version with the following command:

```sh
java -version
```

## Installation

### `npm install`

## Usage

To start the project, you need to run the Firebase emulators first, then start the application.

1. Start Firebase emulators:

   ### `firebase emulators:start`

2. In another terminal, start the application:

   ### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
