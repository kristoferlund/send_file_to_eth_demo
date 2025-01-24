create-canisters:
	dfx canister create --all

deploy-chainkey-testing-canister:
	dfx deploy chainkey_testing_canister
	dfx generate chainkey_testing_canister

deploy-provider:
	dfx deploy ic_siwe_provider --argument "( \
	    record { \
	        domain = \"127.0.0.1\"; \
	        uri = \"http://127.0.0.1:5173\"; \
	        salt = \"salt\"; \
	        chain_id = opt 1; \
	        scheme = opt \"http\"; \
	        statement = opt \"Login to the SIWE/IC demo app\"; \
	        sign_in_expires_in = opt 300000000000; /* 5 minutes */ \
	        session_expires_in = opt 604800000000000; /* 1 week */ \
	        targets = opt vec { \
	            \"$$(dfx canister id ic_siwe_provider)\"; \
	            \"$$(dfx canister id backend)\"; \
	        }; \
	    } \
	)"
	dfx generate ic_siwe_provider

upgrade-provider:
	dfx canister install ic_siwe_provider --mode upgrade --upgrade-unchanged --argument "( \
	    record { \
	        domain = \"127.0.0.1\"; \
	        uri = \"http://127.0.0.1:5173\"; \
	        salt = \"salt\"; \
	        chain_id = opt 1; \
	        scheme = opt \"http\"; \
	        statement = opt \"Login to the SIWE/IC demo app\"; \
	        sign_in_expires_in = opt 300000000000; /* 5 minutes */ \
	        session_expires_in = opt 604800000000000; /* 1 week */ \
	        targets = opt vec { \
	            \"$$(dfx canister id ic_siwe_provider)\"; \
	            \"$$(dfx canister id backend)\"; \
	        }; \
	    } \
	)"
	dfx generate ic_siwe_provider

deploy-backend:
	dfx deploy backend
	dfx generate backend

deploy-frontend:
	pnpm install
	dfx deploy frontend

deploy-all: create-canisters deploy-chainkey-testing-canister deploy-provider deploy-backend deploy-frontend

run-frontend:
	pnpm install
	pnpm run dev

clean:
	rm -rf .dfx
	rm -rf dist
	rm -rf node_modules
	rm -rf src/declarations
	rm -f .env
	cargo clean
