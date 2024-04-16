import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { faqs } from '../../utilities/faq'
import Navbar from '../ui/Navbar/Navbar'
import Footer from '../ui/Footer/Footer'

export default function Help() {
    return (
        <div onLoad={() => window.scrollTo(0, 0)}>
            <Navbar />
            <main className="bg-white">
                <div className="mx-auto max-w-7xl px-6 pt-24 sm:pt-32 lg:pt-40 lg:px-8">
                    <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                        <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Preguntas frecuentes</h2>
                        <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                            {faqs.map((faq) => (
                                <Disclosure as="div" key={faq.question} className="pt-6">
                                    {({ open }) => (
                                        <>
                                            <dt>
                                                <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                    <span className="text-base font-semibold leading-7">{faq.question}</span>
                                                    <span className="ml-6 flex h-7 items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-6 w-6 duration-300 ease-in-out" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="h-6 w-6 duration-300 ease-in-out" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </dt>
                                            <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                                <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            ))}
                        </dl>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
