# Auth.md

> Agent Registration and Authentication Specifications for PaddleFitHub

## Overview

PaddleFitHub provides open, unauthenticated access to all 7 pickleball equipment fitting tools, calculators, and API endpoints for AI agents. Registration is optional for basic usage and enabled for high-capacity or verified agent workflows.

## Agent Registration Instructions

To register an AI agent or request dedicated API quota:
1. Submit an HTTP `POST` request to the registration endpoint below with your agent metadata (agent name, contact email, intended use case).
2. Upon registration, an `api_key` or `bearer_token` will be issued for verified agent requests.
3. Include the key in your HTTP request headers as `Authorization: Bearer <token>` or `X-API-Key: <key>`.

## Registration Metadata & Endpoints

- **Registration Endpoint**: `https://paddlefithub.com/auth/register-agent`
- **Claim Endpoint**: `https://paddlefithub.com/auth/claim`
- **Revocation Endpoint**: `https://paddlefithub.com/auth/revoke`
- **Supported Identity Types**: `anonymous`, `verified_agent`
- **Supported Credential Types**: `api_key`, `bearer_token`
- **Authentication Requirement**: Optional / Open Access
- **Rate Limit (Unauthenticated)**: 100 requests per minute

## Discovery & OAuth Metadata

- **OAuth Protected Resource**: `https://paddlefithub.com/.well-known/oauth-protected-resource`
- **OAuth Authorization Server**: `https://paddlefithub.com/.well-known/oauth-authorization-server`
- **OpenID Configuration**: `https://paddlefithub.com/.well-known/openid-configuration`
- **A2A Agent Card**: `https://paddlefithub.com/.well-known/agent-card.json`
- **DNS-AID Metadata**: `https://paddlefithub.com/.well-known/dns-aid.json`
