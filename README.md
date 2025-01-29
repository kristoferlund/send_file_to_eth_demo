> [!IMPORTANT]
> Work in progress. Better README etc coming.

# Send encrypted files to any Ethereum address

This demo application allows you to send encrypted files to any Ethereum address. It uses [Identity-based encryption (IBE)](https://en.wikipedia.org/wiki/Identity-based_encryption) together with the [vetKeys](https://internetcomputer.org/docs/current/references/vetkeys-overview/) Internet Computer feature.

## Run locally

```bash
dfx start --clean --background
pnpm i
make deploy-all
```
