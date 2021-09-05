import React, { useEffect, useRef, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
import Brush from './tools/Brush'
import CustomModal from '../UI/CustomModal'
import TextField from '@material-ui/core/TextField'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    bg: {
      background: 'black',
    },
    toolbar: {
      minHeight: 40,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    mr: {
      marginLeft: 'auto',
    },
    title: {
      flexGrow: 1,
    },
    canvas: {
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    inlineCanvas: {
      border: '1px solid black',
      boxShadow: '1px 1px 10px',
    },
  })
)

const PaintCanvas = () => {
  const classes = useStyles()

  const [open, setOpen] = useState(true)
  const userInputRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const params = useParams<{ id: string }>()

  const canvasRef = React.useRef() as React.MutableRefObject<HTMLCanvasElement>
  const { userName } = useTypedSelector((state) => state.paintCanvas)
  const {
    setCanvas,
    setTool,
    pushUndo,
    setCtx,
    setUsername,
    setSocket,
    setSessionId,
  } = useActions()

  useEffect(() => {
    setCanvas(canvasRef.current)
    setCtx(canvasRef.current.getContext('2d'))
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userName) {
      const socket = new WebSocket(`ws://localhost:5000/`)
      setSocket(socket)
      setSessionId(params.id)
      setTool(new Brush(canvasRef.current, socket, params.id))
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            id: params.id,
            username: userName,
            method: 'connection',
          })
        )
      }
      socket.onmessage = (e) => {
        const msg = JSON.parse(e.data)
        switch (msg.method) {
          case 'connection':
            console.log(`пользователь ${msg.username} присоединился`)
            break
          case 'draw':
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            drawHandler(msg)
            break
        }
      }
    }
    // eslint-disable-next-line
  }, [userName]);

  const drawHandler = (msg: any) => {
    const figure = msg.figure
    const ctx = canvasRef.current.getContext('2d')
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y)
        break
      case 'finish':
        if (ctx) {
          ctx.beginPath()
        }

        break
    }
  }

  const mouseDownHandler = () => {
    pushUndo(canvasRef.current.toDataURL())
  }
  const connectHandler = () => {
    setUsername(userInputRef.current.value)

    setOpen(false)
  }
  return (
    <>
      <CustomModal
        open={open}
        label={'Введите имя пользователя'}
        setOpen={setOpen}
        actionBtn={connectHandler}
      >
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Пользователь"
          type="text"
          fullWidth
          inputRef={userInputRef}
        />
      </CustomModal>
      <div className={classes.canvas}>
        <canvas
          onMouseDown={() => mouseDownHandler()}
          ref={canvasRef}
          className={classes.inlineCanvas}
          width={1000}
          height={400}
        />
      </div>
    </>
  )
}

export default PaintCanvas
