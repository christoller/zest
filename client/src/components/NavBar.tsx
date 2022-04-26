import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Button, styled } from '@mui/material';
import logo from '../assets/logo.png';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}
const StyledButton = styled(Button)(({ theme, color = 'primary' }) => ({
    backgroundColor: 'rgb(101 163 13)',
    ':hover': {
        backgroundColor: 'rgb(132 204 22)',
    },
}));

export function NavBar(props: any) {
    const navigate = useNavigate();
    const navigationList = [
        { name: 'Home', href: '/', current: true, authRequired: false },
        {
            name: 'Dashboard',
            href: '/dashboard',
            current: true,
            authRequired: true,
        },
        { name: 'About', href: '/about', current: false, authRequired: false },
        {
            name: 'Recipes',
            href: '/recipes',
            current: false,
            authRequired: true,
        },
        { name: 'Pantry', href: '/pantry', current: false, authRequired: true },
        { name: 'Help', href: '/help', current: false, authRequired: true },
        {
            name: 'Signup',
            href: '/signup',
            current: false,
            authRequired: false,
        },
    ];
    const [navigation, setNavigation] = useState<any>([]);
    const id = localStorage.getItem('user_id');
    const { pathname } = useLocation();

    useEffect(() => {
        navigationList.forEach((nav) => {
            if (pathname === nav.href) {
                nav.current = true;
            } else {
                nav.current = false;
            }
        });
    }, [pathname]);

    useEffect(() => {
        if (id) {
            let navigationItems = navigationList.filter(
                (nav: any) => nav.authRequired === true
            );
            setNavigation(navigationItems);
        } else {
            let navigationItems = navigationList.filter(
                (nav: any) => nav.authRequired === false
            );
            setNavigation(navigationItems);
        }
    }, [id]);

    return (
        <Disclosure as='nav' className='bg-white py-3'>
            {({ open }) => (
                <>
                    <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:pl-8 lg:pr-0 '>
                        <div className='relative flex items-center justify-between md:h-16'>
                            <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                                {/* Mobile menu button*/}
                                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                                    <span className='sr-only'>
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XIcon
                                            className='block h-6 w-6'
                                            aria-hidden='true'
                                        />
                                    ) : (
                                        <MenuIcon
                                            className='block h-6 w-6'
                                            aria-hidden='true'
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className='flex-1 flex items-center justify-center sm:justify-start'>
                                <div className='flex-shrink-1 flex items-center'>
                                    {id ? (
                                        <Link to='/dashboard'>
                                            <img
                                                className='sm:h-12 md:h-12 w-auto '
                                                src={logo}
                                                alt=''
                                            />
                                        </Link>
                                    ) : (
                                        <Link to='/'>
                                            <img
                                                className='sm:h-12 md:h-20 w-auto '
                                                src={logo}
                                                alt=''
                                            />
                                        </Link>
                                    )}
                                </div>
                                <div className='hidden sm:block sm:ml-6 md:flex md:items-center'>
                                    <div className='flex space-x-4'>
                                        {navigation.map((item: any) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-lime-600 text-white '
                                                        : 'text-black hover:bg-gray-300 hover:text-black',
                                                    'px-3 py-2 rounded-md text-lg font-medium '
                                                )}
                                                aria-current={
                                                    item.current
                                                        ? 'page'
                                                        : undefined
                                                }>
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className=''>
                                <StyledButton
                                    className='flex-shrink-0 flex items-center lg:w-30'
                                    variant='contained'
                                    onClick={() => {
                                        id
                                            ? navigate('logout')
                                            : navigate('/login');
                                    }}>
                                    {id ? 'Logout' : 'Login'}
                                </StyledButton>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className='sm:hidden'>
                        <div className='px-2 pt-2 pb-3 space-y-1'>
                            {navigation.map((item: any) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as='a'
                                    href={item.href}
                                    className={classNames(
                                        item.current
                                            ? 'bg-lime-600 text-white'
                                            : 'text-black hover:bg-gray-300 hover:text-black',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={
                                        item.current ? 'page' : undefined
                                    }>
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

// export function NavBar(props: any) {
//     return (
//         <nav className='nav-bar'>
//             <ul className='nav-bar-list'>
//                 <li>
//                     <Link to='/'>Home</Link>
//                 </li>
//                 <li>
//                     <Link to='/about'>About</Link>
//                 </li>
//                 {props.auth ? (
//                     <div className='nav-links'>
//                         <li>
//                             <Link to='/recipes'>Recipes</Link>
//                         </li>
//                         <li>
//                             <Link to='/pantry'>Pantry</Link>
//                         </li>
//                         <li>
//                             <Link to='/help'>Help</Link>
//                         </li>
//                         <li>
//                             <Link to='/logout'>Logout</Link>
//                         </li>
//                     </div>
//                 ) : (
//                     <div className='nav-links'>
//                         <li>
//                             <Link to='/login'>Login</Link>
//                         </li>

//                         <li>
//                             <Link to='/signup'>Signup</Link>
//                         </li>
//                     </div>
//                 )}
//             </ul>
//         </nav>
//     );
// }
