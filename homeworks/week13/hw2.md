## How does React Router work?

React Router is a collection of **navigational components**.  

`<Router>` is a component that you can use to bundle your navigations.   

And you use `<Route>` to assign which component to be render.  
Here is an example:  

```js
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Header = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/topics">Topics</Link>
    </li>
  </ul>
);

const AppRouter = () => (
  <Router>
    <div>
      <Header />

      <Route path="/" exact component={Index} />
      <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} />
    </div>
  </Router>
);

export default AppRouter;
```

## What's the difference between an API and an SDK?

- API == Application Programming Interface  
- SDK == Software Development Kit

An **API** is simply an interface that allows software to interact with other software. It's like the specification of the telephone system or the electrical wiring in your house. Anything can use it as long as it knows how to interface.  

An **SDK** or ***devkit*** is implementation tooling. It provides a set of tools, libraries, relevant documentation, code samples, processes, and or guides that allow developers to create software applications on a specific platform. 

- SDKs usually contain APIs; no APIs contain SDKs.
- SDKs allow for the creation of applications, as a foundation allows for the creation of a house;
- APIs allow for the functioning of applications within the SDKs defined parameters, like the phone lines of a house.

Read more:  
[API ? SDK? 傻傻分清楚](https://blog.jyny.tw/2013/01/api-sdk.html)  
[What is the Difference Between an API and an SDK?](https://nordicapis.com/what-is-the-difference-between-an-api-and-an-sdk/)

## It will not include cookies by default when sending AJAX requests. How to use cookie from AJAX?

AJAX calls only send Cookies if the url you're calling is on the same domain as your calling script. This may be a Cross Domain Problem.  

#### Client side

With `withCredentials` setting to `true`, the browser will pass cookies (credentials) to the server.  

```js
xhrFields: { withCredentials: true }
```

Here is a full example of what the basic AJAX request should look like in jQuery:

```js
$.ajax({
  url : 'http://my-domain.com/corsrequest',
  data : data,
  dataType: 'json',
  type : 'POST',
  xhrFields: {
    withCredentials: true
  },
  crossDomain: true,
  contentType: "application/json",
  ...
```

#### Server side

This header needs to be set to true in the scenario:

```
Access-Control-Allow-Credentials: true
```

And the header `Access-Control-Allow-Origin` can not be `*`.  
It needs to be set as so:

```
Access-Control-Allow-Origin: http://my-domain.com
```
