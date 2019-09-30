# Pajé Front-end

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

## Running (Arch and similar distros)

1. Install the `npm`
  * For arch linux
  ```sh
  yay -S npm
  ```
2. Install the Angular framework
	```sh
	npm install -g @angular/cli
	```
3. Install all required dependencies (inside paje-web/frontend/ folder)
	```sh
	npm install
	```

4. Builds and serves the Pajé web app, rebuilding on file changes
	```sh
	ng serve
	```

5. Access the server on `http://localhost:4200/`

## Running (Ubuntu Mint and similar distros)
1. Install the `npm`
  ```sh
  sudo apt install npm
  ```
2. Install the Angular framework
	```sh
	npm install -g @angular/cli
	```
3. Install all required dependencies (inside paje-web/frontend/ folder)
	```sh
	sudo apt-get install curl python-software-properties
	curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
	sudo apt-get install nodejs
	npm install
	```

4. Builds and serves the Pajé web app, rebuilding on file changes
	```sh
	ng serve
	```

5. Access the server on `http://localhost:4200/`


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
