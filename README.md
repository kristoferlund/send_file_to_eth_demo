![](media/header.png)

> [!NOTE]  
> This version of the demo features a backend canister built in Rust. There is also a [TypeScript version](https://github.com/kristoferlund/ic-siwe-react-demo-ts) built using [Azle](https://github.com/demergent-labs/azle).

✅ Sign in with Ethereum to interact with smart contracts (canisters) on the [Internet Computer](https://internetcomputer.org) (IC)!

✅ Establish a one-to-one relationship between an Ethereum wallet and an IC identity.

✅ Access the IC capabilities from Ethereum dapp frontends, create cross-chain dapps! Some of the features IC provide are:

- Native integration with BTC and ETH
- Twin tokens (ckBTC, ckETH)
- Fast finality
- Low transaction fees
- HTTPS outcalls
- Store large amounts of data cheaply
- etc

This React demo application and template demonstrates how to login Ethereum users into an IC canister using the [ic-use-siwe-identity](https://github.com/kristoferlund/ic-siwe/tree/main/packages/ic-use-siwe-identity) hook and [ic-siwe-provider](https://github.com/kristoferlund/ic-siwe/tree/main/packages/ic_siwe_provider) canister.

The goal of the [ic-siwe](https://github.com/kristoferlund/ic-siwe) project is to enhance the interoperability between Ethereum and the Internet Computer platform, enabling developers to build applications that leverage the strengths of both platforms.

## 👀 Try the live demo: <https://shtr2-2iaaa-aaaal-qckva-cai.icp0.io>

## Key features

The demo is buit using [Vite](https://vitejs.dev/) to provide a fast development experience. It also uses:

- TypeScript
- TailwindCSS
- Wagmi/Viem Ethereum libraries
- RainbowKit for Ethereum wallet integration

## Table of contents

- [👀 Try the live demo: https://shtr2-2iaaa-aaaal-qckva-cai.icp0.io](#-try-the-live-demo-httpsshtr2-2iaaa-aaaal-qckva-caiicp0io)
- [Key features](#key-features)
- [Table of contents](#table-of-contents)
- [App components](#app-components)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [IC SIWE Provider](#ic-siwe-provider)
- [How it works](#how-it-works)
- [Run locally](#run-locally)
- [Details](#details)
  - [IC SIWE Provider](#ic-siwe-provider-1)
  - [Backend](#backend-1)
  - [Frontend](#frontend-1)
    - [SiweIdentityProvider](#siweidentityprovider)
    - [AuthGuard](#authguard)
    - [useSiweIdentity](#usesiweidentity)
- [Updates](#updates)
- [Contributing](#contributing)
- [License](#license)

## App components

If you are new to IC, please read the [Internet Computer Basics](https://internetcomputer.org/basics) before proceeding.

For a detailed description of the SIWE concepts, see the [SIWE specification, EIP-4361](https://eips.ethereum.org/EIPS/eip-4361).

This app consists of three main components:

### Backend

The backend is a Rust based canister that, for demonstration purposes, implements some basic functionality for managing user profiles.

### Frontend

The frontend is a React application that interacts with the backend canister. To be able to make authenticated calls to the backend canister, the frontend needs to have an identity.

### IC SIWE Provider

The pre-built IC Siwe Provider is used to create an identity for the user. It is a a Rust based canister that implements the SIWE login flow. The flow starts with a SIWE message being generated and ends with a Delegate Identity being created for the user. The Delegate Identity gives the user access to the backend canister.

## How it works

This is the high-level flow between the app components when a user logs in:

1. The application requests a SIWE message from the `ic_siwe_provider` canister on behalf of the user.
2. The application displays the SIWE message to the user who signs it with their Ethereum wallet.
3. The application sends the signed SIWE message to the `ic_siwe_provider` canister to login the user. The canister verifies the signature and creates an identity for the user.
4. The application retrieves the identity from the `ic_siwe_provider` canister.
5. The application can now use the identity to make authenticated calls to the app canister.

![Sign in with Ethereum - Login flow](/media/flow.png)

## Run locally

```bash
dfx start --clean --background
make deploy-all
```

## Details

### IC SIWE Provider

The `ic_siwe_provider` canister is pre-built and added to the project as a dependency in the [dfx.json](/dfx.json) file.

```json
{
  "canisters": {
    "ic_siwe_provider": {
      "type": "custom",
      "candid": "https://github.com/kristoferlund/ic-siwe/releases/download/v0.1.1/ic_siwe_provider.did",
      "wasm": "https://github.com/kristoferlund/ic-siwe/releases/download/v0.1.1/ic_siwe_provider.wasm.gz"
    },
    ...
  },
  ...
}
```

Its behavior is configured and passed as an argument to the canister `init` function. Below is an example of how to configure the canister using the `dfx` command line tool in the project [Makefile](/Makefile):

```makefile
dfx deploy ic_siwe_provider --argument "( \
    record { \
        domain = \"127.0.0.1\"; \
        uri = \"http://127.0.0.1:5173\"; \
        salt = \"salt\"; \
        chain_id = opt 1; \
        scheme = opt \"http\"; \
        statement = opt \"Login to the app\"; \
        sign_in_expires_in = opt 300000000000; /* 5 minutes */ \
        session_expires_in = opt 604800000000000; /* 1 week */ \
        targets = opt vec { \
            \"$$(dfx canister id ic_siwe_provider)\"; \
            \"$$(dfx canister id backend)\"; \
        }; \
    } \
)"
```

For more information about the configuration options, see the [ic-siwe-provider](https://github.com/kristoferlund/ic-siwe/tree/main/packages/ic_siwe_provider) documentation.

### Backend

The backend is a Rust based canister that, for demonstration purposes, implements some basic functionality for managing user profiles. It is also given an init argument - the `ic_siwe_provider` canister id - to be able to verify the identity of the user.

```makefile
dfx deploy backend --argument "$$(dfx canister id ic_siwe_provider)"
```

### Frontend

The frontend is a React application that interacts with the backend canister. To be able to make authenticated calls to the backend canister, the frontend needs an identity. The identity is retrieved from the `ic_siwe_provider` canister.

The frontend uses two other packages from the `ic-siwe` project to simplify logging in users and making authenticated calls to canisters:

- [ic-use-siwe-identity](https://github.com/kristoferlund/ic-siwe/tree/main/packages/ic-use-siwe-identity) - React hook and context provider for easy frontend integration with SIWE enabled Internet Computer canisters.
- [ic-use-actor](https://github.com/kristoferlund/ic-use-actor) - A React context provider for managing Internet Computer (IC) actors with enhanced features like type safety and request/response interceptors.

#### [SiweIdentityProvider](src/frontend/src/main.tsx)

The application's root component is wrapped with `SiweIdentityProvider` to provide all child components access to the SIWE identity context.

```jsx
// main.tsx

import { SiweIdentityProvider } from 'ic-use-siwe-identity';
import { _SERVICE } from "../../declarations/ic_siwe_provider/ic_siwe_provider.did";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    // ...
    <SiweIdentityProvider<_SERVICE>
      canisterId={canisterId}
      idlFactory={idlFactory}
    >
      // ... app components
    </SiweIdentityProvider>
    // ...
  </React.StrictMode>,
);
```

#### [AuthGuard](src/frontend/src/AuthGuard.tsx)

An `AuthGuard` component is used to protect routes that require the user to be logged in. It also makes sure to log out the user if they change ethereum wallet etc.

#### [useSiweIdentity](src/frontend/src/components/login/LoginButton.tsx)

To initiate the login flow, the `login` function is called on the Use the `useSiweIdentity` hook.

```jsx
// LoginButton.tsx

import { useSiweIdentity } from "ic-use-siwe-identity/react";

function LoginButton() {
  const { login, clear, identity, ... } = useSiweIdentity();
  // ...
}
```

## Updates

See the [CHANGELOG](CHANGELOG.md) for details on updates.

## Contributing

Contributions are welcome. Please submit your pull requests or open issues to propose changes or report bugs.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
