## Why we need Redux?

When the app continues to increase in complexity, every new feature makes it more challenging to think about how our Views and Models interact. Redux is a predictable state container for JavaScript apps.  

**[You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)**  
 An article written by Dan Abramov - the author of Redux

## What is Redux?

Redux makes it easy to manage the state of an application.  

Redux lets developers to
- Describe application state as plain objects and arrays
- Describe changes in the system as plain objects
- Describe the logic for handling changes as pure functions

## What is SPA? Is there any kind of web app needs to be a SPA?

A single-page application (SPA) is a web application or web site that interacts with the user by dynamically rewriting the current page rather than loading entire new pages from a server. It makes the application behave more like a desktop application.  

The page does not reload at any point in the process, nor does control transfer to another page, although the location hash or the HTML5 History API can be used to provide the perception and navigability of separate logical pages in the application.  

The recent SPA redesigns of streaming music site [Pandora](https://www.pandora.com/) and Google’s Gmail platform are great examples of this in practice.  
 
When it comes to music streaming websites, it is interrupting to reload the whole page and make the music stopped while user wants to see another pages. Under the circumstances developers have no choice except using SPA.  

## How does Redux deal with asynchronous actions such as making API calls?

Without middleware, Redux store only supports synchronous data flow.  

Asynchronous middleware like [redux-thunk](https://github.com/reduxjs/redux-thunk) or [redux-promise](https://github.com/redux-utilities/redux-promise) wraps the store's `dispatch()` method and allows you to dispatch something other than actions, for example, functions or Promises.  

Read more: [Async Actions](https://redux.js.org/advanced/asyncactions)
