import React from 'react'
import { routes } from '../../routes'
import CustomCard from '../../components/UI/CustomCard'
import { Box } from '@mui/material'

const MiniProjects = () => {
  return (
    <Box
      height={'100%'}
      display={'flex'}
      justifyContent={'space-around'}
      alignItems={'center'}
    >
      {routes.miniProjects.map(
        (route) =>
          route.isVisible && (
            <CustomCard key={route.url} title={route.label} url={route.url} />
          )
      )}
    </Box>
  )
}

export default MiniProjects
