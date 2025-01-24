# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.5] - 2024-03-19

### Changed

- Upgraded `ic-use-siwe-identity` to v0.0.11. 
  - fix: A state handling bug prevented the promise returned by login() from working on first call to function. 

## [0.0.4] - 2024-03-19

### Added 

- Custom connect and account dialog components using wagmi directly instead of using RainbowKit.

### Changed

- Upgraded wagmi to v2.5.7. This introduces TanStack Query as an additional dependency.
- Upgraded viem to v2.8.4

### Removed

- Removed RainbowKit as a dependency.


## [0.0.3] - 2024-01-31

### Changed
- Use new convenience state variables from [ic-use-siwe-identity](https://www.npmjs.com/package/ic-use-siwe-identity).
```
  isPreparingLogin: state.prepareLoginStatus === "preparing",
  isPrepareLoginError: state.prepareLoginStatus === "error",
  isPrepareLoginSuccess: state.prepareLoginStatus === "success",
  isPrepareLoginIdle: state.prepareLoginStatus === "idle",
  isLoggingIn: state.loginStatus === "logging-in",
  isLoginError: state.loginStatus === "error",
  isLoginSuccess: state.loginStatus === "success",
  isLoginIdle: state.loginStatus === "idle",  
```
- Use v0.0.4 of the [ic_siwe_provider](https://github.com/kristoferlund/ic-siwe/tree/main/packages/ic_siwe_provider) canister.


## [0.0.2] - 2024-01-16

### Added

- Preloading of SIWE messages! When a users wallet is connected, a SIWE message is requested from the provider canister. This
  means, when user clicks on the "Login" button, the SIWE message is already there and the user can sign it immediately. No
  more waiting for the message to be fetched from the provider canister.

### Changed

- Upgraded to `ic-use-siwe-identity` version `0.0.4` and refactored some code to reflect the changes in the new version.

## [0.0.1] - 2024-01-08

### Added

- First released.
