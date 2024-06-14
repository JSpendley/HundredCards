# HundredCards

Hello and thank you for reviewing my code! :D

I answer questions at the bottom of this README.

## Requirements

If you are on Windows, you may need to set your Execution Policy to run commands Powershell. In this case, run this command in any Powershell terminal: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

- [node v18+](https://nodejs.org/en/blog/release/v18.12.0)

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

- Follow the instuctions [here to install the Angular CLI](https://v17.angular.io/cli)

## First build

- clone the repository

- Navigate to the app root folder in a terminal and run `npm install`

- Run `ng serve -o` for a dev server that will automatically launch in a browser tab. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Q & A

### Why is it safe (or not safe) to use JWT tokens?

This type of token-based auth is great for verifying the source of a request because they contain a unique signiture that is used by an API endpoint to determine if the payload has been tampered with.
It does not however conceal the contents of the payload, you would need to run encryption on top of signing to hide the data.

### Describe two attack vectors bad actors might try to abuse via HTML in data packets? And how would you mitigate these vectors?

Two great examples are SQL/Code injection and cross-site scripting (XSS). Both are used by injecting code of different varieties into an app via HTML (mostly form inputs). SQL injection targets user data stored in a database where XSS is used more to override the application functions or changing domain information. Most modern frameworks cater for XSS defence, but making sure your HTML is escaped against injection is still a good practice to prevent attacks. SQL injection on the other hand can be prevented by putting a layer between the web app and access to your DB. This can be done by using well constructed stored procedures or prepared statements that parse parameters.

### Explain the difference between mutable and immutable objects.

The main difference between these two is that mutable objects can be changed (mutated) after creation whereas immutable objects cannot.

**What is an example of an immutable object in JavaScript?**

An object declared as `const` and/or `readonly` (more for properties in TS)

an example:

```
const b = function(){
    const name = 'Jarrod';
    const surname = 'Spendley';
    return {name, surname}
}

const a = { ...b()}
```

**Pros and cons of immutability**

pros:

- far less unwanted or unexpected changes made to object/value references in other areas of the app.
- Objects will not change over time
- less error prone code that is easier to debug
- easier to optimise your code and implement caching because you can safely reuse object references.

cons:

- performance issues. Creating a lot more objects takes a lot more memory allocation.
- lack of awareness
- it's slower to design for immutability

**How can you achieve immutability in your own code?**

- make use of the spread operator
- make use of the `const` keyword
- make use of the `readonly` keyword
- freeze objects with `Object.freeze()`

### If you would have to speed up the loading of a web-application, how would you do that?

- reduce image sizes and formats where possible
- optimize bundling (lower overall size of bundles) through lazy loading, tree shaking and minification.
- reduce inline CSS and JS
- employ a caching strategy
- load components asynchronously
- reduce the amount and size of HTTP requests
- use AOT or Server-side rendering where possible
