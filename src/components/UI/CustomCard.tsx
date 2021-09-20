import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

interface CustomCardProps {
  title?: string
  decription?: string
  url?: string
}

export default function CustomCard({
  title,
  decription,
  url,
}: CustomCardProps) {
  return (
    <Card sx={{ width: 275, minHeight: 200 }}>
      <CardContent>
        <Typography variant="h4" component="div">
          {title}
        </Typography>

        <Typography variant="body2">{decription}</Typography>
      </CardContent>
      <CardActions>
        {url && (
          <Link to={url}>
            <Button size="small">Посмотреть</Button>
          </Link>
        )}
      </CardActions>
    </Card>
  )
}
