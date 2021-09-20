import React, { FC, useEffect, useState } from 'react'
import { Box, Button } from '@material-ui/core'
import { CustomTable } from '../../components/UI/CustomTable'

const CryptoCurrency: FC = () => {
  const [state] = useState<Array<{}>>([])
  let socket: any
  useEffect(() => {
    socket = new WebSocket('wss://ws.blockchain.info/inv')
    socket.onopen = function (e: Event) {
      socket.send(
        JSON.stringify({
          op: 'ping',
        })
      )
      socket.send(
        JSON.stringify({
          op: 'unconfirmed_sub',
        })
      )
    }
    socket.onmessage = function (event: any) {
      const result = JSON.parse(event.data)
      const data = {
        value: result?.x?.out[0]?.value,
        out: [result?.x?.out[0]?.addr, result?.x?.out[1]?.addr],
      }
      const test = data || {}
      console.log(result, 'RESUUUUUULT')

      // setState((prevState) => {
      //   if (state.length > 20) {
      //     prevState.pop()
      //   } else {
      //     return [test, ...prevState]
      //   }
      // })
    }
  }, [])

  return (
    <Box height={'100%'}>
      <Box
        mt={2}
        display={'flex'}
        justifyContent={'space-around'}
        alignItems={'center'}
      >
        <Button size={'large'} variant={'contained'} color={'primary'}>
          Запуск
        </Button>
        <Button size={'large'} variant={'contained'} color={'secondary'}>
          Остановка
        </Button>
        <Button size={'large'} variant={'contained'}>
          Сброс
        </Button>
      </Box>
      <Box height={'100%'} mt={4}>
        <CustomTable info={state} />
      </Box>
    </Box>
  )
}

export default CryptoCurrency
