#!/bin/bash

set -e          # Exit immediately if a command exits with a non-zero status
set -u          # Treat unset variables as an error
set -o pipefail # Ensure errors propagate in pipelines

dfx canister create --all

dfx deploy chainkey_testing_canister

dfx deploy ic_siwe_provider --argument "(
    record {
        domain = \"127.0.0.1\";
        uri = \"http://127.0.0.1:5173\";
        salt = \"salt\";
        chain_id = opt 1;
        scheme = opt \"http\";
        statement = opt \"Login to the vetKeys demo app\";
        sign_in_expires_in = opt 300000000000; /* 5 minutes */
        session_expires_in = opt 604800000000000; /* 1 week */
        targets = opt vec {
            \"$(dfx canister id ic_siwe_provider)\";
            \"$(dfx canister id backend)\";
        };
    }
)"

rm -rf src/backend/src/declarations # Delete the declarations folder to retrigger build.rs
dfx deploy backend

dfx deploy frontend
