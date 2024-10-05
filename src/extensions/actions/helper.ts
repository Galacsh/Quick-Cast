import type { Message, Response } from '@/types'

export function payloadRequester<IN, OUT = void>(id: string) {
  async function _requester(payload: IN) {
    const message = { id, payload } as Message<IN>

    const response = await chrome.runtime.sendMessage<
      Message<IN>,
      Response<OUT>
    >(message)

    return elseThrow(response) as OUT extends void ? void : OUT
  }

  return _requester
}

export function requester<OUT = void>(id: string) {
  async function _requester() {
    const message = { id } as Message
    const response = await chrome.runtime.sendMessage<Message, Response<OUT>>(
      message
    )

    return elseThrow(response) as OUT extends void ? void : OUT
  }

  return _requester
}

function elseThrow<OUT>(response: Response<OUT>) {
  if (response.status === 'fail') {
    throw new Error(response.error)
  }

  if ('data' in response) {
    return response.data
  }
}
