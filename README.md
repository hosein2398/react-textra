

# react-textra  

 Animate text in react. [demo](https://hosein2398.github.io/react-textra/)
- simple
- no dependency
- multiple effects
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
  <Textra effect='flash' stopDuartion={4000} data={['one', 'two', 'three']} />
```


If you want animation to take longer:
```html
 <Textra effect='flash' duration={1000} data={['one', 'two', 'three']} />
```
This one will loop around for ever.
## Props

| Prop        | Detail           | Type  | Default
| :------------- |:-------------| :-----:| :-----: |
| data      | Array of data to be animated | Array | null
| effect      | Animation effect      |   String | simple
| stopDuration | How long should it stop while showing each item     |    Number | 3000ms
| duration | animation duration     |    Number | 500ms

## Effects
There are 8 types of effects available:
| effect |
| :------- |
| rightLeft |
| leftRight |
| topDown |
| downTop |
| flash |
| flip |
| press | 
| scale |
