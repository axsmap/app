# app | AXS Map web application

[![styled with airbnb](https://img.shields.io/badge/styled%20with-airbnb-ff5a5f.svg?style=flat-square)](https://github.com/airbnb/javascript)
[![formatted with prettier](https://img.shields.io/badge/formatted_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![built with webpack](https://img.shields.io/badge/built%20with-webpack-blue.svg?style=flat-square)](https://github.com/webpack/webpack)

AXS Map web application

## Getting started
* ```npm install```
* ```npm start```

Dev Notes:
Change *.env in both repos to local ip address. Make sure to have ```npm start``` for api repo running.

## Structure
The project leverages:
* [Styled components](https://www.styled-components.com/) 
* [Material UI Grid](https://material-ui.com/components/grid/)


## How to Deploy
1. Make sure you have an ```.env``` file in the root path with all the variables for the production environment.
2. Go into the root path and run the following command: ```npm run build```. This way you will have a production build of the app.
3. Follow the AWS deployment steps [here](docs/AWS-DEPLOYMENT.md).
Alternatively for local development: 
The build folder is ready to be deployed.
4. You may serve it with a static server:
    ```npm install -g serve```
    ```serve -s build```


