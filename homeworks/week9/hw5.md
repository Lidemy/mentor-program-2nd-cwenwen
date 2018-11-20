## What is CSS preprocessor? Do we have to use it?

A CSS preprocessor is a scripting language that extends CSS by allowing developers to write code in one language and then compile it into CSS.  

It allows developers to create more readable and maintainable CSS styles by its features such as mixin, nesting selector, inheritance selector, and so on. 

These are commonly used CSS preprocessors:

- SASS
- LESS
- Stylus

## Give a HTTP header about cache and explain the usage

- `Expires`  
  The Expires header contains the date/time after which the response is considered stale.  
  If there is a `Cache-Control` header with the "max-age" or "s-maxage" directive in the response, the `Expires` header is ignored.

Read more: 

1. [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

2. [循序漸進理解 HTTP Cache 機制](https://blog.techbridge.cc/2017/06/17/cache-introduction/)

## What is the difference between stack and queue?

|  | stack | queue |
| - | - | - |
| Working principle | LIFO (last in first out) | FIFO (first in first out) |
| Structure | Same end is used to insert and delete objects | It is open at both the ends – one end to insert the object and the other to remove the object
| Operations performed | Push and pop | Enqueue and dequeue |

Read more: [Difference Between Stack and Queue](http://www.differencebetween.net/technology/difference-between-stack-and-queue/#ixzz5WufFBPue)

## Explain the CSS specificity hierarchy

If there are two or more conflicting CSS rules that point to the same element, the browser follows some rules to determine which one is most specific and therefore wins out.  

Every selector has its place in the specificity hierarchy. There are four categories which define the specificity level of a selector:  

- 0 - 0 - 0 - 0 - 1  
  **Elements and pseudo-elements**  
  `h1`, `div`, `:before`, `:after`

- 0 - 0 - 0 - 1 - 0  
  **Classes, attributes and pseudo-classes**
   `.classes`, `[attributes]`, `:hover`, `:focus`

- 0 - 0 - 1 - 0 - 0  
  **IDs**  
  `#navbar`

- 0 - 1 - 0 - 0 - 0  
  **Inline styles**  
  `<h1 style="color: #ffffff;">`

- 1 - 0 - 0 - 0 - 0  
  `!important`

Read more: [CSS Specificity](http://cssspecificity.com/)