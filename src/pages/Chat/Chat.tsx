import { Card, Grid, Container, Typography } from '@mui/material'
import { ChatList, ChatSection } from '../../components'
import { useContext } from 'react'
import { AppContext } from '../../context/App.context'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

export const Chat = (): JSX.Element => {
  const userName = useSelector((state: RootState) => state.user.name)

  if(!userName) {
    return (
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Please, log in
        </Typography>
      </Container>
    );
  }

  return (
      <Grid container spacing={2} component={'section'}>
        <Grid item xs={4}>
          <Card>{<ChatList />}</Card>
        </Grid>
        <Grid item xs={8}>
          {/*// @ts-ignore*/}
          <ChatSection />
        </Grid>
      </Grid>
  );
}
