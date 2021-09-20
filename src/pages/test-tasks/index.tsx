import React from 'react'
import CustomCard from '../../components/UI/CustomCard'
import { routes } from '../../routes'
import { Box } from '@mui/material'

const TestTasks = () => {
  return (
    <Box
      height={'100%'}
      display={'flex'}
      justifyContent={'space-around'}
      alignItems={'center'}
    >
      {routes.testTasks.map(
        (route) =>
          route.isVisible && (
            <CustomCard key={route.url} title={route.label} url={route.url} />
          )
      )}
    </Box>
  )
}

export default TestTasks
