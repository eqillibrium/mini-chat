import { Card, CardHeader, CardActions, CardContent, Avatar, List, ListItem, ListItemButton, ListItemText, TextField, IconButton } from '@mui/material'
import { Send } from '@mui/icons-material'

export const ChatSection = () => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            R
          </Avatar>
        }
        title="interlocutor name"
        subheader="interlocutor ID"
      />
      <CardContent>
        <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Trash" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemText primary="Spam" />
          </ListItemButton>
        </ListItem>
      </List>
      </CardContent>
      <CardActions>
        <TextField fullWidth label="fullWidth" id="fullWidth">

        </TextField>
        <IconButton>
          <Send />
        </IconButton>
      </CardActions>
    </Card>
  )
};