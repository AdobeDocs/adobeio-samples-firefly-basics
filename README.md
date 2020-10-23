# Basic Code Snippets for Project Firefly

These code snippets will help you to quickly start developing your Firefly apps. The below components and features are covered:
- Caching HTTP responses
- Firefly Files SDK
- Firefly State SDK
- I/O Events handler
- Real-time data from Adobe Analytics API 1.4

## Setup

- You should have a project in Adobe Developer Console set up with Project Firefly template
- Download the json spec of the project
- Run this command so that the project credentials are applied in this app: `aio app use path/to/console.json`

## Local Dev

- `aio app run` to start your local Dev server
- While in developing, saving a code file would automatically re-deploy the actions

## Deploy & Cleanup

- `aio app deploy` to build and deploy all actions on Runtime and static files to CDN
- `aio app undeploy` to undeploy the app
