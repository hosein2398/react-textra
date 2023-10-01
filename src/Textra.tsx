// eslint-disable-next-line no-use-before-define
import React, { useEffect, useRef, useState, useCallback, ReactElement } from 'react'
import animationStyles from './animationStyles'
import type { AnimateObject, Animations } from './animationStyles'

type TextraProps = {
  data: string[] | ReactElement[];
  effect?: Animations;
  duration?: number;
  stopDuration?: number;
  className?: string;
  onUpdate?: (index: number) => void
};

const Textra = (props: TextraProps) => {
  const {
    duration: animationDuration = 500,
    effect,
    stopDuration = 3000,
    data,
    onUpdate,
    ...rest
  } = props
  const selectedAnimation = effect || 'simple'
  const animationRef = useRef<number | null>(null)
  const [style, setStyle] = useState<AnimateObject>(
    animationStyles[selectedAnimation][0]
  )
  const textArrIndex = useRef(0)
  const previousTime = useRef<number | null>(null)
  const currentRoundStartTime = useRef(0)
  const singleRoundDuration = stopDuration + 2 * animationDuration
  const easeOutQuad = (t: number): number => t * (2 - t)
  const text = data[textArrIndex.current]

  useEffect(() => {
    setStyle(animationStyles[selectedAnimation][0])
  }, [selectedAnimation])

  const runShowTextAnimation = (elapsed: number) => {
    const showingTranlateInitial =
      animationStyles[selectedAnimation][1].translate.value
    const showingTranlateDiffrence =
      animationStyles[selectedAnimation][1].translate.value -
      animationStyles[selectedAnimation][0].translate.value
    const showingTiming = easeOutQuad(
      (elapsed - currentRoundStartTime.current) / animationDuration
    )
    setStyle((s) => ({
      translate: {
        ...s.translate,
        value: showingTranlateInitial - showingTranlateDiffrence * showingTiming
      },
      opacity: showingTiming
    }))
  }

  const runHideTextAnimation = (elapsed: number) => {
    const hidingTraslateInitial =
      animationStyles[selectedAnimation][0].translate.value
    const hidingTranslateDiffrence =
      animationStyles[selectedAnimation][0].translate.value -
      animationStyles[selectedAnimation][1].translate.value
    const hidingOpacityInitial = animationStyles[selectedAnimation][0].opacity
    const hidingTiming = easeOutQuad(
      (elapsed - (currentRoundStartTime.current + singleRoundDuration - animationDuration)) /
        animationDuration
    )
    setStyle((s) => ({
      translate: {
        ...s.translate,
        value: hidingTraslateInitial - hidingTranslateDiffrence * hidingTiming
      },
      opacity: hidingOpacityInitial - hidingTiming
    }))
  }

  const updateTextIndex = () => {
    if (textArrIndex.current === data.length - 1) {
      textArrIndex.current = 0
    } else {
      textArrIndex.current = textArrIndex.current + 1
    }
  }
  const updateRoudStartTime = () => { currentRoundStartTime.current += singleRoundDuration }
  const handlePropEvents = () => { onUpdate && onUpdate(textArrIndex.current) }

  const runAnimation = useCallback(
    (timestamps) => {
      if (previousTime.current === null) previousTime.current = timestamps
      const elapsed = timestamps - (previousTime.current as number)

      if (
        elapsed > currentRoundStartTime.current &&
        elapsed < currentRoundStartTime.current + animationDuration
      ) {
        runShowTextAnimation(elapsed)
      }

      if (
        elapsed > currentRoundStartTime.current + singleRoundDuration - animationDuration &&
        elapsed < currentRoundStartTime.current + singleRoundDuration
      ) {
        runHideTextAnimation(elapsed)
      }

      if (elapsed > currentRoundStartTime.current + singleRoundDuration) {
        updateRoudStartTime()
        updateTextIndex()
        handlePropEvents()
      }

      animationRef.current = window.requestAnimationFrame(runAnimation)
    },
    [selectedAnimation, data.length, singleRoundDuration, animationDuration]
  )

  useEffect(() => {
    animationRef.current = window.requestAnimationFrame(runAnimation)

    return () => window.cancelAnimationFrame(animationRef.current as number)
  }, [runAnimation, effect])

  return (
    <>
      <span
        style={{
          display: 'inline-block',
          transform: `${style.translate.type}(${style.translate.value}${style.translate.unit})`,
          opacity: style.opacity
        }}
        {...rest}
      >
        {text}
      </span>
    </>
  )
}

export default Textra
