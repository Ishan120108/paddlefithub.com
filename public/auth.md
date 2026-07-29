# Auth.md

## Agent Registration & Authentication Guidelines

PaddleFitHub provides 100% free, public, unauthenticated access to all 7 pickleball calculator tools and API endpoints.

## Authentication Overview

- **Authentication Required**: None (Open Access)
- **Rate Limit**: 100 requests per minute
- **Registration Endpoint**: `https://paddlefithub.com/auth/register-agent`
- **Supported Identity Types**: `anonymous`, `verified_agent`
- **Supported Credential Types**: `api_key`, `bearer_token`

## Well-Known OAuth & Auth Specs

- **OpenID Configuration**: `https://paddlefithub.com/.well-known/openid-configuration`
- **OAuth Authorization Server**: `https://paddlefithub.com/.well-known/oauth-authorization-server`
- **Protected Resource**: `https://paddlefithub.com/.well-known/oauth-protected-resource`
