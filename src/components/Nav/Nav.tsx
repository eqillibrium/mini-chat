import { SyntheticEvent, useState, MouseEvent } from 'react';
import { Tab, TabProps, Tabs } from '@mui/material'
import { Home, Chat, Person } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

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
    const [value, setValue] = useState(0);

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
          <LinkTab aria-label="favorite" icon={<Person />} iconPosition="end" label={'Login'} href={'/auth'}/>
          {/*<Tab icon={<PhoneIcon />} aria-label="phone"/>*/}
          {/*<Tab icon={<FavoriteIcon />} aria-label="favorite" href={'/'}/>*/}
          {/*<Tab icon={<PersonPinIcon />} aria-label="person" href={'/chat'}/>*/}
        </Tabs>
    );
};