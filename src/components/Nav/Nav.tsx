import { SyntheticEvent, useState, MouseEvent } from 'react';
import { Tab, TabProps, Tabs } from '@mui/material'
import { Home, Chat, Person } from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

interface LinkTabProps extends TabProps{
  label?: string;
  href?: string;
}

const LinkTab = (props: LinkTabProps) => {
  const navigate = useNavigate()

  return (
    <Tab
      component="a"
      // @ts-ignore
      onClick={(event: MouseEvent<HTMLLIElement, MouseEvent>) => {
        event.preventDefault()
        const target: string = event.currentTarget.getAttribute('href') || '/'
        navigate(target)
      }}
      {...props}
    />
  );
}

export const Nav = () => {
  const routes = ['/', '/chat', '/auth']
  const userName = useSelector((state: RootState) => state.user.profile.name)
  const { pathname } = useLocation()
  const [value, setValue] = useState(routes.indexOf(pathname));

    const handleChange = (event: SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon tabs example"
        textColor="secondary"
        indicatorColor="secondary"
      >
        <LinkTab aria-label="favorite" icon={<Home />} iconPosition="end" label={'Home'} href={'/'}/>
        <LinkTab aria-label="favorite" icon={<Chat />} iconPosition="end" label={'Chat'} href={'/chat'}/>
        <LinkTab aria-label="favorite" icon={<Person />} iconPosition="end" label={userName ? String(userName) : 'Login'} href={'/auth'}/>
      </Tabs>
    );
};