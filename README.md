![Boxfish Logo](https://raw.github.com/bxfsh/generator-boxfish-spring-microservice/master/res/boxfish-logo.jpg)

By [Boxfish](http://www.boxfish.com)

[![Build Status](https://travis-ci.org/bxfsh/generator-boxfish-spring-microservice.svg?branch=master)](https://travis-ci.org/bxfsh/generator-boxfish-spring-microservice)

# Spring Java REST Microservice scaffolder from BOXFISH

Based on a specs file, generate CRUD components (with Service, Repository, Entity, DTO) with validation, exposition, queryability, sortability and testing (unit and integration) for all of it.

## Installation
Created with [Yeoman](http://yeoman.io/).
Install the Yeoman in order to generate microservices

```bash
npm install --global generator-boxfish-spring-microservice
```

## Usage

* Create a base folder where all your microservices will be placed

```bash
mkdir ~/Workspaces/boxfish && cd $
```

* Create a GIT repo with all your specification files and clone that in your workspace

```bash
mkdir micoservice-specs && cd $ && git init
```

* Create your YML specification using our [Boxfish Microservice DSL](https://github.com/bxfsh/generator-boxfish-spring-microservice/wiki/Boxfish-Microservice-DSL)

```bash
vim 'boxfish-youtube-channels-curation.yml'
```

* Keep your spec files always committed and pushed to your remote server.

* Run the command:

```bash
yo boxfish-spring-microservice
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/bxfsh/generator-boxfish-spring-microservice. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License
The gem is available as open source under the terms of the [GPL-3.0 License](http://opensource.org/licenses/GPL-3.0).
