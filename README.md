<p align="center">
  <a href="http://adonisjs.com"><img src="https://cloud.githubusercontent.com/assets/2793951/21009311/3d5dd062-bd46-11e6-9f01-a1c2ff6fad37.png" alt="AdonisJs WebSocket"></a>
</p>

[![Coverage Status](https://coveralls.io/repos/github/NortonPerson/adonis-websocket/badge.svg?branch=master)](https://coveralls.io/github/NortonPerson/adonis-websocket?branch=master)
[![Build Status](https://travis-ci.org/NortonPerson/adonis-websocket.svg?branch=master)](https://travis-ci.org/NortonPerson/adonis-websocket)

<br>
Adonis Websocket is the official **websockets** provider for AdonisJs. It lets you easily setup/authenticate channels and rooms with elegant syntax and power of ES2015 generators.:rocket:

<br>
<hr>
<br>

<br>
## <a name="requirements"></a>Setup
Follow the below instructions to setup this provider

### Install
```bash
npm i --save adonis-websocket
```

### Setting up the provider
All providers are registered inside `start/app.js` file.

```javascript
const providers = [
  'adonis-websocket/providers/WsProvider'
]
```

### Setting up the alias
Aliases makes it easier to reference a namespace with a short unique name. Aliases are also registered inside `start/app.js` file.

```javascript
const aliases = {
  Ws: 'Adonis/Addons/Ws'
}
```

Setup process is done. Let's use the **Ws** provider now.


#### Create file `socket.js` and `ws.js`
* In folder `start` create file `socket.js` and `ws.js`
```bash
touch start/socket.js
touch start/ws.js
```

- `socket.js` register chanel
- `ws.js` kennel of websocket, i be can config middleware in here

### Chanel Base
* Create Channel base listen connection to path of websocket, in file `socket.js`

```js
const Ws = use('Ws')

// Ws.channel('/chat', function (contextWs) {
Ws.channel('/chat', function ({ socket }) {
  // here you go
})

```

### Add Middleware
* Config in file `ws` name and global

#### Middlleware global
```js
const Ws = use('Ws')

const globalMiddlewareWs = [
  'Adonis/Middleware/AuthInitWs'
]

const namedMiddlewareWs = {
  auth: 'Adonis/Middleware/AuthWs'
}

Ws.global(globalMiddlewareWs)
Ws.named(namedMiddlewareWs)
```

#### Middleware Channel

* we have two middleware default is `Adonis/Middleware/AuthInitWs` and `Adonis/Middleware/AuthWs` using authentication is compatible with `Adonis Auth`

```js
Ws.channel('/chat', function ({ socket }) {
  // here you go
}).middleware(<name middleware | function>)
```
* middleware function
```js
Ws.channel('/chat', function ({ socket }) {
  // here you go
}).middleware(async fuction(context, next) {
  ....
  await next();
})
```

### Create ControllerWs
Create controller websocket is a Chanel

```bash
  adonis make:controller <Name>
```
and select

```bash
> For Websocket channel
```
### Struct Controller Ws
* You can see controller in folder `app\Controllers\Ws`

```js
'use strict'

class LocationController {
  // constructor (ContextWs) {
  constructor ({ socket, request }) {
    console.log('constructor');
    this.socket = socket
    this.request = request
  }

  // listion event `ready`
  onReady () {
    console.log('ready');
    this.socket.toMe().emit('my:id', this.socket.socket.id)
  }

  joinRoom(ContextWs, payload) {

  }

  leaveRoom(ContextWs, payload) {

  }
}

module.exports = LocationController
```

### Structs `ContextWs`
* Structs object ContextWs

#### Attribute `socket`
- `auth` is Object AddonisSocket

##### `AddonisSocket`
- attribute `io` of socket.io
- attribute `socket` of socket.io when client connect to Chanel
- method `id` is `id` of socket
- method `rooms` get list room
- method `on` is `socket.on`
- method `to` get socket of `id` connect
- method `join` and `leave` is room
- method `disconnect` disconnect chanel

#### Attribute `auth`
- `auth` is `Adonis Auth`

#### Attribute `request`
- `request` is `Adonis request`




<br>
<br>
<br>
<br>
<hr>
In favor of active development we accept contributions from everyone. You can contribute by submitting a bug, creating pull requests or even improving documentation.

You can find a complete guide to be followed strictly before submitting your pull requests in the [Official Documentation](http://adonisjs.com/docs/contributing).
