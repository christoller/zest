import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import {
    ChartBarIcon,
    ClipboardListIcon,
    LibraryIcon,
    DesktopComputerIcon,
} from '@heroicons/react/outline';
import homefeaturebg from '../assets/home-feature-bg.jpg';

const features = [
    {
        name: 'Easy to read recipes',
        description:
            'Zest displays recipes in a simple, easy to read format, no matter who is creating it. ',
        icon: ClipboardListIcon,
    },
    {
        name: 'One database for everything',
        description:
            'Store all your recipes, ingredients and costs all in one place. Easily edit and delete as you go.',
        icon: LibraryIcon,
    },
    {
        name: 'Useable on any device',
        description:
            "In the office, the kitchen or on the road: Zest works seamlessly, no matter what device you're using.",
        icon: DesktopComputerIcon,
    },
    {
        name: 'Up to date analytics (Coming Soon)',
        description:
            "Food prices are volatile. Zest will insure sure you're making profits by tracking and analysing costs as ingredient costs change.",
        icon: ChartBarIcon,
    },
];

export function Home() {
    return (
        <div>
            <div className='relative bg-white overflow-hidden'>
                <div className='max-w-7xl mx-auto'>
                    <div className='relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32'>
                        <svg
                            className='hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2'
                            fill='currentColor'
                            viewBox='0 0 100 100'
                            preserveAspectRatio='none'
                            aria-hidden='true'>
                            <polygon points='50,0 100,0 50,100 0,100' />
                        </svg>

                        <Popover>
                            <Transition
                                as={Fragment}
                                enter='duration-150 ease-out'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='duration-100 ease-in'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'>
                                <Popover.Panel
                                    focus
                                    className='absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'>
                                    <div className='rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden'>
                                        <div className='px-5 pt-4 flex items-center justify-between'>
                                            <div>
                                                <img
                                                    className='h-8 w-auto'
                                                    src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                                                    alt=''
                                                />
                                            </div>
                                            <div className='-mr-2'>
                                                <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                                                    <span className='sr-only'>
                                                        Close main menu
                                                    </span>
                                                    <XIcon
                                                        className='h-6 w-6'
                                                        aria-hidden='true'
                                                    />
                                                </Popover.Button>
                                            </div>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>

                        <main className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
                            <div className='sm:text-center lg:text-left'>
                                <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
                                    <span className='block xl:inline'>
                                        Costing and
                                    </span>{' '}
                                    <span className='block text-lime-600 xl:inline'>
                                        Recipe Management
                                    </span>{' '}
                                    <span className='block xl:inline'>
                                        Made Easy
                                    </span>
                                </h1>
                                <p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
                                    Struggling to manage menu costings? Zest
                                    allows you to create, store and cost recipes
                                    all at once. Your own personal database of
                                    recipes, ingredients and costs - all in one
                                    easy to use app.
                                </p>
                                <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
                                    <div className='rounded-md shadow'>
                                        <a
                                            href='/signup'
                                            className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-lime-600 hover:bg-lime-500 md:py-4 md:text-lg md:px-10'>
                                            Get started
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2'>
                    <img
                        className='h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full'
                        src={homefeaturebg}
                        alt=''
                    />
                </div>
            </div>
            <div className='py-12 bg-white'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='lg:text-center'>
                        <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
                            Bring your costing habits into the 21st century
                        </p>
                        <p className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto'>
                            Writing recipes and calculating costs doesn't need
                            to be a chore. Just input the information you need
                            and Zest will automatically do the rest.
                        </p>
                    </div>

                    <div className='mt-10'>
                        <dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10'>
                            {features.map((feature) => (
                                <div key={feature.name} className='relative'>
                                    <dt>
                                        <div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-lime-600 text-white'>
                                            <feature.icon
                                                className='h-6 w-6'
                                                aria-hidden='true'
                                            />
                                        </div>
                                        <p className='ml-16 text-lg leading-6 font-medium text-gray-900'>
                                            {feature.name}
                                        </p>
                                    </dt>
                                    <dd className='mt-2 ml-16 text-base text-gray-500'>
                                        {feature.description}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
            <div className='bg-gray-50'>
                <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:flex-col lg:gap-5 lg:items-center lg:justify-between'>
                    <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
                        <span className='block'>Ready to dive in?</span>
                        <span className='block text-lime-600'>
                            Sign up to Zest today.
                        </span>
                    </h2>
                    <div className='mt-8 flex justify-center lg:mt-0 lg:flex-shrink-0'>
                        <div className='inline-flex rounded-md shadow'>
                            <a
                                href='/signup'
                                className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-lime-600 hover:bg-lime-500'>
                                Get started
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
