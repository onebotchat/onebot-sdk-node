<div align="center">
	<h1>OneBot Client SDK for Node</h1>
	<p>
		<b>A simple and easy client for the <a href="https://docs.onebot.chat">OneBot API</a></b>
	</p>
	<br>
</div>

![Build status](https://github.com/onebotchat/onebot-sdk-node/actions/workflows/ci.yml/badge.svg)
[![npm version](https://badge.fury.io/js/%40onebotchat%2Fclient.svg)](https://www.npmjs.com/package/@onebotchat/onebot-node)

## Installation

```
npm install @onebotchat/onebot-node
```

## Usage

> Use OneBot's [Getting Started Guide](https://docs.onebot.chat/getting-started) to get set up to use OneBot's API.

Import and initialize a client using an **integration token** or an OAuth **access token**.

```js
const Client = require('@onebotchat/onebot-node');

// Initializing a client
const client = new Client(process.env.ACCESS_TOKEN, {});
```

Make a request to any OneBot API endpoint.

> See the complete list of endpoints in the [API reference](https://docs.onebot.chat/reference).

```js
(async () => {
  const response = await client.listIMAccounts({});
})();
```

Each method returns a `Promise` which resolves the response.

```js
console.log(response);
```

```json
[
  {
    "id": "Sax3MES_sIdvV0sQO9-co",
    "user": {
      "id": "douyin|8b3f7f39-d27b-4e73-8290-d2949a79bc21",
      "connection_id": "F7-I0jScfZ0pa2_Y76Q9x",
      "user_id": "8b3f7f39-d27b-4e73-8290-d2949a79bc21"
      // ...
    },
    "presence": 0
  }
  // ...
]
```

Endpoint parameters are grouped into a single object. You don't need to remember which parameters go in the path, query, or body.

```js
const response = await client.listContacts({
  im_account_id: '897e5a76-ae52-4b48-9fdf-e71f5945d1af',
  limit: 50,
});
```

Send accounts' commands to OneBot API

> See the complete list of commands in the [API reference](https://docs.onebot.chat/reference).

```js
await client.sendPrivateMessage({
  account_id: '897e5a76-ae52-4b48-9fdf-e71f5945d1af@douyin',
  user_id: '897e5a76-ae52-4b48-9fdf-e71f5945d1af@douyin',
  message: {
    type: MessageType.Text,
    body: {
      content: 'hello',
    },
  },
});
```

Handle accounts' events from OneBot API.

> See the complete list of events in the [API reference](https://docs.onebot.chat/reference).

```js
client.onNewMessageReceived((evt: MessageReceivedEvent) => {
  console.log(`new message id: ${evt.data.id}`);
});
```

### Handling errors

If the API returns an unsuccessful response, the returned `Promise` rejects with a `APIResponseError`.

The error contains properties from the response, and the most helpful is `code`. You can compare `code` to the values in the `APIErrorCode` object to avoid misspelling error codes.

```js
const { Client, APIErrorCode } = require('@onebotchat/onebot-node');

try {
  const response = await client.listContacts({
    account_id: '897e5a76-ae52-4b48-9fdf-e71f5945d1af',
  });
} catch (error) {
  if (error.code === APIErrorCode.ObjectNotFound) {
    //
    // For example: handle by asking the user to select a different database
    //
  } else {
    // Other error handling code
    console.error(error);
  }
}
```

### Logging

The client emits useful information to a logger. By default, it only emits warnings and errors.

If you're debugging an application, and would like the client to log response bodies, set the `logLevel` option to `LogLevel.DEBUG`.

```js
const { Client, LogLevel } = require('@onebotchat/onebot-node');

const client = new Client(process.env.ACCESS_TOKEN, {
  logLevel: LogLevel.DEBUG,
});
```

You may also set a custom `logger` to emit logs to a destination other than `stdout`. A custom logger is a function which is called with 3 parameters: `logLevel`, `message`, and `extraInfo`. The custom logger should not return a value.

### Client options

The `Client` supports the following options on initialization. These options are all keys in the single constructor parameter.

| Option      | Default value                         | Type         | Description                                                                                                                                                  |
| ----------- | ------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `logLevel`  | `LogLevel.WARN`                       | `LogLevel`   | Verbosity of logs the instance will produce. By default, logs are written to `stdout`.                                                                       |
| `timeoutMs` | `60_000`                              | `number`     | Number of milliseconds to wait before emitting a `RequestTimeoutError`                                                                                       |
| `baseUrl`   | `"https://api.onebot.chat/client/v1"` | `string`     | The root URL for sending API requests. This can be changed to test with a mock server.                                                                       |
| `logger`    | Log to console                        | `Logger`     | A custom logging function. This function is only called when the client emits a log that is equal or greater severity than `logLevel`.                       |
| `agent`     | Default node agent                    | `http.Agent` | Used to control creation of TCP sockets. A common use is to proxy requests with [`https-proxy-agent`](https://github.com/TooTallNate/node-https-proxy-agent) |

### TypeScript

This package contains type definitions for **all request parameters and responses**.

Because errors in TypeScript start with type `any` or `unknown`, you should use
the `isOneBotClientError` type guard to handle them in a type-safe way. Each
`OneBotClientError` type is uniquely identified by its `error.code`. Codes in
the `APIErrorCode` enum are returned from the server. Codes in the
`ClientErrorCode` enum are produced on the client.

```ts
try {
  const response = await client.listContacts({
    /* ... */
  });
} catch (error: unknown) {
  if (isOneBotClientError(error)) {
    // error is now strongly typed to OneBotClientError
    switch (error.code) {
      case ClientErrorCode.RequestTimeout:
        // ...
        break;
      case APIErrorCode.ObjectNotFound:
        // ...
        break;
      case APIErrorCode.Unauthorized:
        // ...
        break;
      // ...
      default:
        // you could even take advantage of exhaustiveness checking
        assertNever(error.code);
    }
  }
}
```

## Requirements

This package supports the following minimum versions:

- Runtime: `node >= 12`
- Type definitions (optional): `typescript >= 4.2`

Earlier versions may still work, but we encourage people building new applications to upgrade to the current stable.

## Getting help

If you want to submit a feature request for OneBot's API, or are experiencing any issues with the API platform, please email us at `contact@onebot.chat`.

To report issues with the SDK, it is possible to [submit an issue](https://github.com/onebotchat/onebot-sdk-node/issues) to this repo. However, we don't monitor these issues very closely. We recommend you reach out to us at `contact@onebot.chat` instead.
