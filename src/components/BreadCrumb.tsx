import * as React from 'react'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'

import { useLocation, Link, useHistory } from 'react-router-dom'
import MaterialLink from '@material-ui/core/Link'
import { routes } from '../routes'
import { formatPathNameRoute } from '../helpers/utils'

interface BreadCrumbProps {
  handleGoHome: () => void
}

export default function BreadCrumb({ handleGoHome }: BreadCrumbProps) {
  const location = useLocation()
  const history = useHistory()
  const pathName = formatPathNameRoute(location.pathname)

  return (
    <div role="presentation" style={{ marginTop: 90, marginLeft: 25 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <MaterialLink
          style={{ cursor: 'pointer' }}
          underline="hover"
          color="textPrimary"
          onClick={handleGoHome}
        >
          Главная
        </MaterialLink>
        {pathName.map((url, index) => {
          const last = index === pathName.length - 1
          // const to = `/${pathName.slice(0, index + 1).join('/')}`
          const item =
            index === 0
              ? routes[pathName[0]][0]
              : routes[pathName[0]].find(
                  (route) => route.url === location.pathname
                )

          return last ? (
            <Typography key={url} color={'darkgray'}>
              {item?.label}
            </Typography>
          ) : (
            item && (
              <MaterialLink
                style={{ cursor: 'pointer' }}
                underline="hover"
                color="textPrimary"
                key={item.url}
                onClick={() => history.push(item.url)}
              >
                {item.label}
              </MaterialLink>
            )
          )
        })}
      </Breadcrumbs>
    </div>
  )
}
