# ZiMS GP
![Discord](https://img.shields.io/discord/807533216520863784?label=Discord)
![Image](images/ZimsUI.png)

## Current features:
1. Multi-party
2. Audio mute
3. Video mute
4. Content sharing
5. Grid layout

## Requirements
1. Node
2. Install Firebase CLI
```
npm i -g firebase-tools
```
3. Firebase project (from console)

## Local Development Environment
You need to create a firebase account for local dev environment .

1. Clone the repo:
```
git clone https://github.com/yzia2000/zims-mesh.git
```

2. Login to firebase
```
firebase login
```

3. Add existing firebase project id
```
firebase use --add
```
4. Serve application locally
```
firebase emulators:start
```
<b>For permission issues, update firestore rules</b>
Access application at outputted URL.

## Firebase Deployment
```
firebase deploy
```

## Contributing
Please refer to [CONTRIBUTING.md](CONTRIBUTING.md)

## License
MIT
