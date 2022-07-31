import { NavLink } from 'react-router-dom';

export const AsideLink = ({icon, title, ...props}) => {
    return (
        <NavLink {...props}
            className={({isActive}) => isActive ? 'active-navlink' : undefined}
        >
            {icon}
            <span className="links-name">{title}</span>
        </NavLink>
    );
}