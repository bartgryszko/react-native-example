react-native-example
=====================

Example of using [ReactNative](https://facebook.github.io/react-native/) to build simple iOS app, that fetches your `current location` and display `Intstagram` photos that where made near to you. It's using [Instagram API](https://instagram.com/developer/endpoints/media/) to fetch photos, [MapView](https://facebook.github.io/react-native/docs/mapview.html#content) for displaying location on the map and [Animated](https://facebook.github.io/react-native/docs/animated.html#content) for simple animations.

### Usage

1. Register new client on [Instagram  Developer](https://instagram.com/developer/clients/manage/).
2. Open `src/MediaList.jsx` and set `INSTAGRAM_CLIENT_ID` to your client ID.
3. Type in terminal:

    npm instal

    npm start

4. Open `AroundMe.xcodeproj` in XCode and run it.


### Screenshot
![Screenshot](https://cdn.rawgit.com/bgryszko/react-native-example/master/preview.gif)
