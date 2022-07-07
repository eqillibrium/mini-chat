import { HeaderProps } from './Header.props'
import { useStyles } from './Header.styles'

export const Header = ({ children }: HeaderProps): JSX.Element => {
    const styles = useStyles()
    return (
        <header className={styles.header}>
          {children}
        </header>
    );
};