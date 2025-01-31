#!/bin/bash

set -e          # Exit immediately if a command exits with a non-zero status
set -u          # Treat unset variables as an error
set -o pipefail # Ensure errors propagate in pipelines

dfx canister create --all --ic

dfx deploy chainkey_testing_canister --ic

dfx deploy ic_siwe_provider --ic --argument "(
    record {
        domain = \"$(dfx canister id frontend --ic).icp0.io\";
        uri = \"https://$(dfx canister id frontend --ic).icp0.io\";
        salt = \"salt\";
        chain_id = opt 1;
        scheme = opt \"https\";
        statement = opt \"Login to the vetKeys demo app\";
        sign_in_expires_in = opt 300000000000; /* 5 minutes */
        session_expires_in = opt 604800000000000; /* 1 week */
        targets = opt vec {
            \"$(dfx canister id ic_siwe_provider --ic)\";
            \"$(dfx canister id backend --ic)\";
        };
    }
)"

rm -rf src/backend/src/declarations # Delete the declarations folder to retrigger build.rs
dfx deploy backend --ic

dfx deploy frontend --ic
