// eslint-disable-next-line no-use-before-define
import React from 'react'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import '@testing-library/jest-dom'
import Textra from '../src/Textra'

beforeEach(() => {
  jest.setTimeout(15000)
})

it('should render properly with default props', async () => {
  render(
    <div>
      <Textra effect='flash' data={['one', 'two', 'three']} />
    </div>
  )

  await screen.findByText('one', {}, { timeout: 200 })
  await waitForElementToBeRemoved(() => screen.queryByText('one'), { timeout: 4100 })
  await screen.findByText('two', {}, { timeout: 4200 })
  await waitForElementToBeRemoved(() => screen.queryByText('two'), { timeout: 5500 })
  /*
  * Note: This is NOT equal to above statement
  */
  // await waitFor(() => {
  //   expect(screen.queryByText('kk Helloooo asdfdsf as fsdf ')).not.toBeInTheDocument()
  // }, { timeout: 5500 })
  await screen.findByText('three', {}, { timeout: 10900 })
})

it('should get back to first element when loop ends', async () => {
  render(
    <div>
      <Textra effect='rightLeft' data={['one', 'two']} />
    </div>
  )
  /*
  * first round: 4s
  * another rounds: 5s
  */
  await screen.findByText('one', {}, { timeout: 200 })
  await waitForElementToBeRemoved(() => screen.queryByText('one'), { timeout: 4100 })
  await screen.findByText('two', {}, { timeout: 4200 })
  await waitForElementToBeRemoved(() => screen.queryByText('two'), { timeout: 5500 })
  await screen.findByText('one', {}, { timeout: 200 })
})

it('should render properly with duration', async () => {
  render(
    <div>
      <Textra effect='rightLeft' duration={2000} data={['one', 'two']} />
    </div>
  )
  /*
  * first round: 5s
  * another rounds: 7s
  */
  await screen.findByText('one', {}, { timeout: 200 })
  await waitForElementToBeRemoved(() => screen.queryByText('one'), { timeout: 5100 })
  await screen.findByText('two', {}, { timeout: 200 })
  await waitForElementToBeRemoved(() => screen.queryByText('two'), { timeout: 7200 })
})

it('should render properly with stopDuration', async () => {
  render(
    <div>
      <Textra effect='rightLeft' stopDuration={1000} data={['one', 'two']} />
    </div>
  )
  /*
  * first round: 2s
  * other rounds: 3s
  */

  await screen.findByText('one', {}, { timeout: 200 })
  await waitForElementToBeRemoved(() => screen.queryByText('one'), { timeout: 2200 })
  await screen.findByText('two', {}, { timeout: 200 })
  await waitForElementToBeRemoved(() => screen.queryByText('two'), { timeout: 32000 })
})

it('should render properly with duration and stopDuration', async () => {
  render(
    <div>
      <Textra effect='rightLeft' duration={1000} stopDuration={1000} data={['one', 'two']} />
    </div>
  )
  /*
  * first round: 2s
  * other rounds: 3s
  */

  await screen.findByText('one', {}, { timeout: 200 })
  await waitForElementToBeRemoved(() => screen.queryByText('one'), { timeout: 2200 })
  await screen.findByText('two', {}, { timeout: 200 })
  await waitForElementToBeRemoved(() => screen.queryByText('two'), { timeout: 32000 })
})
