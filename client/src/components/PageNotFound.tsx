import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XIcon } from '@heroicons/react/outline';

export function PageNotFound() {
    const id = localStorage.getItem('user_id');
    return (
        <div className='p-0 m-0 h-full'>
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
                        <div className='flex justify center'>
                            <main className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
                                <div className='sm:text-center lg:text-left'>
                                    <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
                                        <span className='block xl:inline'>
                                            404
                                        </span>{' '}
                                        <span className='block text-lime-600 xl:inline'>
                                            Page Not Found
                                        </span>{' '}
                                    </h1>
                                    <p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
                                        The page you are trying to access is
                                        either unavailable or does not exist.
                                    </p>
                                    <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
                                        <div className='rounded-md shadow'>
                                            {id ? (
                                                <a
                                                    href='/dashboard'
                                                    className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-lime-600 hover:bg-lime-500 md:py-4 md:text-lg md:px-10'>
                                                    Return To Dashboard
                                                </a>
                                            ) : (
                                                <a
                                                    href='/'
                                                    className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-lime-600 hover:bg-lime-500 md:py-4 md:text-lg md:px-10'>
                                                    Return Home
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
