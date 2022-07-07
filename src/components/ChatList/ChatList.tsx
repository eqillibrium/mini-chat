import { List, ListItem, ListItemButton, ListItemText, ListItemIcon, ListSubheader } from '@mui/material'
import { Inbox, Drafts } from '@mui/icons-material'

export const ChatList = () => {
  return (
    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Chats
        </ListSubheader>
      }
    >
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Drafts />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
      </ListItem>
    </List>
  )
};