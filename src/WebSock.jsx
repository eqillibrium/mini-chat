import { useRef, useState, useEffect } from 'react';
import {
    TextField,
    Container,
    Box,
    Typography,
    Grid,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemText, Alert
} from '@mui/material';

const WebSock = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const socket = useRef()
    const [connected, setConnected] = useState(false);
    const [alert, setAlert] = useState(false);
    const [username, setUsername] = useState('')

    function connect(e) {
        e.preventDefault()
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }
        socket.current.onclose= () => {
            console.log('Socket закрыт')
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
        }
    }

    const sendMessage = async (e) => {
        e.preventDefault()
        const message = {
            username,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(message));
        setAlert(true)
        setValue('')
    }

    useEffect(() => {
        if(alert) {
            setTimeout(() => {
                setAlert(false)
            }, 2000)
        }
    }, [alert]);

    if(!connected) {
        return (
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Войти в чат
                    </Typography>
                    <Box component="form" noValidate onSubmit={connect} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="userName"
                                    label="Ваше имя"
                                    name="userName"
                                    autoComplete="Ваше имя"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    autoFocus
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Войти
                        </Button>
                    </Box>
                </Box>
            </Container>
        );
    }

    return (
        <Container component="main" maxWidth="xs">
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5">
                Отправить сообщение
            </Typography>
            <Box component="form" noValidate onSubmit={sendMessage} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="message"
                            label="Введите сообщение"
                            autoComplete="Ваше имя"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            autoFocus
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Войти
                </Button>
                <List>
                    {messages.map(el => (
                        <ListItem disablePadding key={el.id}>
                            {el.event === 'connection'
                                ? <ListItemButton>
                                    <ListItemText primary={`Пользователь ${el.username} подключился`} />
                                  </ListItemButton>
                                : <ListItemButton>
                                    <ListItemText primary={el.message} />
                                  </ListItemButton>
                            }
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
        { alert && <Alert>Сообщение успешно добавлено!</Alert> }
    </Container>
    );
};

export default WebSock;