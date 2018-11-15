## What is the deference between gulp and webpack? Do we have to use them?

**Gulp** is a task runner. It is used to automate the time-consuming and repetitive tasks.  

**Webpack** is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser. It allows us to modular program like Node.js does and makes the structure of the code explicit.  

Both of them can be used to do the same things such as compiling ES6 to ES5 via babel or compiling SCSS to CSS. Since they have been made for different purposes, webpack can bundle the module while gulp can't, and gulp can run the custom task in sequence while webpack can't.  

There is a good way to use them collaboratively: define webpack as a task being run in gulp. They are not necessary but it's good to use them because of the efficiency and convenience they've provided.  

## What are pros and cons of CSS sprites and data URI?

**CSS Sprites**  
| | CSS Sprites | Data URI |
| - | - | - |
| Description | A collection of images put into a single image | A method for embedding images directly in the HTML or CSS code using base64 encoding |
| Pros | Reduce the number of server requests and save bandwidth | Save HTTP requests since the images are directly in the codes |
| Cons | It takes developers loads of time to handle images | The browser can not cache the images, and developers need to re-encode when updating the images |

## hw3 把 todo list 這樣改寫，可能會有什麼問題？

網頁中某些沒改變的部分，不斷重新 render，沒什麼效率。