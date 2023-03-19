


# react-textra  ![example workflow](https://github.com/hosein2398/react-textra/actions/workflows/ci.yml/badge.svg)

 Animate text in react. [demo](https://hosein2398.github.io/react-textra/)
- Simple
- No dependency
- Multiple effects
## Installing
```
npm i react-textra
```
### Examples:
```js
import Textra from 'react-textra'

function MyComponent() {
   return (
     <div>
       <Textra effect='flash' data={['one', 'two', 'three']} />
     </div>
   ) 
}
```

If you want to stop longer:
```html
<Textra 
  effect='flash' 
  stopDuartion={4000} 
  data={['one', 'two', 'three']} />
```


If you want to change animation duration:
```html
<Textra 
  effect='flash'
  duration={1000} 
  data={['one', 'two', 'three']} />
```
## Props

| Prop        | Detail           | Type  | Default
| :------------- |:-------------| :-----:| :-----: |
| data (required)      | Array of data to be animated | Array | null
| effect      | Animation effect      |   String | simple
| stopDuration | How long should it stop while showing each item     |    Number | 3000ms
| duration | Animation duration     |    Number | 500ms
| onUpdate | Will be called on every update, giving the index of animated item. | (index: number) => void | -

## Effects
There are 9 types of effects available:
| effect |
| :------- |
| simple |
| rightLeft |
| leftRight |
| topDown |
| downTop |
| flash |
| flip |
| press | 
| scale |

## A11y concerns

We do not provide any aria attributes by default. But if you see updates important and you want to let screen reader users know of them, you can use [aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) and [aria-relevant](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-relevant).

Here is an example of how you can use these attributes alongside this library:
```html
<Textra
  duration={2000}
  data={['one', 'two']}
  aria-live='polite'
  aria-relevant='text removals'/>
```
