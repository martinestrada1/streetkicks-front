import { Popover } from '@headlessui/react'
import { classNames } from '../../../utilities/classNames'
import { navigation } from '../../../utilities/navigation'
import { Link } from 'react-router-dom'
import Nav from './Nav'

export default function Navbar() {
    return (
        <>
            <Popover
                as="header"
                className={({ open }) =>
                    classNames(
                        open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
                        'bg-white shadow-sm lg:static lg:overflow-y-visible'
                    )
                }
            >
                {({ open }) => (
                    <>
                        <Nav open={open} />
                        <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
                            <div className="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
                                {navigation.map((item) => (
                                    <Link key={item.name} to={item.href} aria-current={item.current ? 'page' : undefined}
                                        className={classNames(
                                            item.current ? 'bg-gray-100 text-gray-900 mt-32' : 'hover:bg-gray-50',
                                            'block rounded-md py-2 px-3 text-base font-medium'
                                        )}
                                    >{item.name}</Link>
                                ))}
                            </div>
                        </Popover.Panel>
                    </>
                )}
            </Popover>
        </>
    )
}