// eslint-disable-next-line no-use-before-define
import React, { useEffect, useRef, useState, useCallback } from 'react'
import animationStyles from './animationStyles'
import type { AnimateObject, Effect } from './animationStyles'

type TextraProps = {
  data: string[];
  effect?: Effect;
  duration?: number;
  stopDuration?: number;
  className?: string;
};

const Textra = (props: TextraProps) => {
  const selectedAnimation = props.effect || 'simple'
  const animationRef = useRef<number | null>(null)
  const [style, setStyle] = useState<AnimateObject>(
    animationStyles[selectedAnimation][0]
  )
  const textArrIndex = useRef(0)
  const [text, setText] = useState<string>(props.data[textArrIndex.current])
  const previousTime = useRef<number | null>(null)
  const duration = props.duration || 500
  const stopDuration = props.stopDuration || 3000
  const initialRound = stopDuration + duration
  const currentRoundTime = useRef(initialRound)
  const singleRoundTime = stopDuration + 2 * duration
  const hasUpdatedText = useRef(false)
  const easeOutQuad = (t: number): number => t * (2 - t)

  useEffect(() => {
    setStyle(animationStyles[selectedAnimation][0])
  }, [selectedAnimation])

  useEffect(() => {
    setText(props.data[textArrIndex.current])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textArrIndex.current, props.data])

  const runShowTextAnimation = (elapsed:number) => {
    const showingTranlateInitial = animationStyles[selectedAnimation][1].translate.value
    const showingTranlateDiffrence = animationStyles[selectedAnimation][1].translate.value - animationStyles[selectedAnimation][0].translate.value
    // const showingOpacityInitial = animationStyles[selectedAnimation][1].opacity
    // const showingOpacityDiffrence = animationStyles[selectedAnimation][1].opacity - (animationStyles[selectedAnimation][1].opacity - animationStyles[selectedAnimation][0].opacity)
    const showingTiming = easeOutQuad((elapsed - currentRoundTime.current) / duration)
    setStyle((s) => ({
      translate: {
        ...s.translate,
        value:
          showingTranlateInitial - showingTranlateDiffrence * showingTiming
      },
      opacity: showingTiming
    }))
  }

  const runHideTextAnimation = (elapsed:number) => {
    const hidingTraslateInitial = animationStyles[selectedAnimation][0].translate.value
    const hidingTranslateDiffrence = animationStyles[selectedAnimation][0].translate.value - animationStyles[selectedAnimation][1].translate.value
    const hidingOpacityInitial = animationStyles[selectedAnimation][0].opacity
    // const hidingOpacityDiffrence = animationStyles[selectedAnimation][1].opacity - (animationStyles[selectedAnimation][0].opacity - animationStyles[selectedAnimation][1].opacity)
    const hidingTiming = easeOutQuad((elapsed - (currentRoundTime.current - duration)) / duration)
    setStyle((s) => ({
      translate: {
        ...s.translate,
        value:
        hidingTraslateInitial - hidingTranslateDiffrence * hidingTiming
      },
      opacity: hidingOpacityInitial - hidingTiming
    }))
  }

  const updateTextIndex = () => {
    if (textArrIndex.current === (props.data.length - 1)) {
      textArrIndex.current = 0
    } else {
      textArrIndex.current = textArrIndex.current + 1
    }
  }

  const runAnimation = useCallback(
    (timestamps) => {
      if (previousTime.current === null) previousTime.current = timestamps
      const elapsed = timestamps - (previousTime.current as number)

      if (
        elapsed > currentRoundTime.current &&
        elapsed < currentRoundTime.current + duration
      ) {
        runShowTextAnimation(elapsed)
      }
      if (
        elapsed > currentRoundTime.current - duration &&
        elapsed < currentRoundTime.current
      ) {
        runHideTextAnimation(elapsed)
      }

      if (elapsed > currentRoundTime.current) {
        if (!hasUpdatedText.current) {
          updateTextIndex()
          hasUpdatedText.current = true
        }
      }

      if (elapsed > currentRoundTime.current + duration) {
        hasUpdatedText.current = false
        currentRoundTime.current += singleRoundTime
      }

      animationRef.current = window.requestAnimationFrame(runAnimation)
    },
    [selectedAnimation, props.data.length, singleRoundTime, duration]
  )

  useEffect(() => {
    animationRef.current = window.requestAnimationFrame(runAnimation)

    return () => window.cancelAnimationFrame(animationRef.current as number)
  }, [runAnimation, props.effect])

  return (
    <>
      <span
        style={{
          display: 'inline-block',
          transform: `${style.translate.type}(${style.translate.value}${style.translate.unit})`,
          opacity: style.opacity
        }}
        {...props}
      >
        {text}
      </span>
    </>
  )
}

export default Textra
