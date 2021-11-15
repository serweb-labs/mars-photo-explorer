# Mars Photo Explorer
Framework: Angular v9.1.0

## Architecture and organization

Built following of Clean Architecture principles and domain-driven design
### Key points
 - Fairly clear layer boundaries and direction: infrastructure -> domain -> application -> presentation
 - More independent of the framework
 - More testable
 - Dependency Inversion Principle to ensure the three previous points
 - Behavior-oriented services (use cases)


### Layers
 - domain: entities (interfaces), repositories ports (abstract)
 - application: use cases and other business services
 - presentation: angular components and BLoc (state management services)
 - infrastructure: reposiries adapters (concrete implementation).


### Organization

 - /src/app
     - app/app.module:
         - layer: presentation / infrastructure
         - contains: component, router
         - description: here is app router that follows lazy loading practices and root component

     - /core:  
         - layers: domain / application / infrastructure
         - contains: entities, use cases, repos (ports & adapters)
         - description: aka bounded contexts, containing core modules  (covering an aspect / point of view of the business)
         and shared artifacts that don't know angular,
         provides some services called use cases (business-oriented  services) for the presentation layer

     - /features: 
         - layer: presentation
         - contains: features components and state managment (folow BLoC's pattern)
         - follow Angular's features modules pattern, use lazy loading, each module depends on one or more core modules
___
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Author
Luciano Rodriguez