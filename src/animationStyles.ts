export type AnimateObject = {
  translate: {
    type: string
    value: number
    unit: string
  }
  opacity: number
}

export type Effect = 'simple' | 'rightLeft' | 'leftRight' | 'topDown' | 'downTop' | 'flash' | 'flip' | 'scale' | 'press'

const animationStyles: Record<Effect, AnimateObject[]> = {
  simple: [{
    translate: {
      type: 'translateX',
      value: 0,
      unit: 'px'
    },
    opacity: 1
  }, {
    translate: {
      type: 'translateX',
      value: 0,
      unit: 'px'
    },
    opacity: 0
  }],
  rightLeft: [{
    translate: {
      type: 'translateX',
      value: 0,
      unit: 'px'
    },
    opacity: 1
  }, {
    translate: {
      type: 'translateX',
      value: 10,
      unit: 'px'
    },
    opacity: 0
  }],
  leftRight: [{
    translate: {
      type: 'translateX',
      value: 10,
      unit: 'px'
    },
    opacity: 1
  }, {
    translate: {
      type: 'translateX',
      value: 0,
      unit: 'px'
    },
    opacity: 0
  }],
  topDown: [{
    translate: {
      type: 'translateY',
      value: 0,
      unit: 'px'
    },
    opacity: 1
  }, {
    translate: {
      type: 'translateY',
      value: -10,
      unit: 'px'
    },
    opacity: 0
  }],
  downTop: [{
    translate: {
      type: 'translateY',
      value: 0,
      unit: 'px'
    },
    opacity: 1
  }, {
    translate: {
      type: 'translateY',
      value: 10,
      unit: 'px'
    },
    opacity: 0
  }],
  flash: [{
    translate: {
      type: 'skewX',
      value: 0,
      unit: 'deg'
    },
    opacity: 1
  }, {
    translate: {
      type: 'skewX',
      value: -100,
      unit: 'deg'
    },
    opacity: 1
  }],
  flip: [{
    translate: {
      type: 'rotateX',
      value: 0,
      unit: 'deg'
    },
    opacity: 1
  }, {
    translate: {
      type: 'rotateX',
      value: -180,
      unit: 'deg'
    },
    opacity: 1
  }],
  scale: [{
    translate: {
      type: 'scale',
      value: 1,
      unit: ''
    },
    opacity: 1
  }, {
    translate: {
      type: 'scale',
      value: 0.9,
      unit: ''
    },
    opacity: 1
  }],
  press: [{
    translate: {
      type: 'scaleX',
      value: 1,
      unit: ''
    },
    opacity: 1
  }, {
    translate: {
      type: 'scaleX',
      value: 1.3,
      unit: ''
    },
    opacity: 1
  }]
}

export default animationStyles
