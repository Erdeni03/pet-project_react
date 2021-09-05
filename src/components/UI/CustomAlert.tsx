import React from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { connect } from 'react-redux'
import { RootState } from '../../store/reducers'
import { Color } from '../../store/reducers/alertReducer'
import { hideAlert } from '../../store/action-creators/alert'

interface HomeProps {
  isOpen: boolean
  text: string
  variant: Color | undefined
  autoHideTime?: number
}

type Props = HomeProps & typeof mapDispathToProps

const CustomAlert = ({
  isOpen,
  text,
  variant,
  autoHideTime,
  hideAlert,
}: Props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={autoHideTime}
      open={isOpen}
      onClose={() => hideAlert()}
      key={'top' + 'right'}
    >
      <Alert onClose={() => hideAlert()} severity={variant}>
        {text}
      </Alert>
    </Snackbar>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    isOpen: state.alert.isOpen,
    text: state.alert.text,
    variant: state.alert.variant,
    autoHideTime: state.alert.autoHideTime,
  }
}

const mapDispathToProps = {
  hideAlert,
}
export default connect(mapStateToProps, mapDispathToProps)(CustomAlert)
