import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { isBoolean } from 'lodash'
import { forwardRef, useImperativeHandle, useState } from 'react'

const Modal = (props, ref) => {
    const { title, children, trigger, className } = props

    let [isOpen, setIsOpen] = useState(false)

    function open(e) {
        e.stopPropagation();
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
    }))

    return (
        <>
            <div
                onClick={open}
            >
                {trigger}
            </div>

            <Dialog open={isBoolean(trigger) ? trigger : isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
                <div className="fixed inset-0 z-10 w-screen bg-black/30 overflow-y-auto">
                    <div className="flex z-20 min-h-full items-start justify-center p-4 py-6">
                        <DialogPanel
                            transition
                            className={`w-[40vw] space-y-6 rounded-xl bg-white p-11 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 ${className}`}
                        >
                            <DialogTitle as="h3" className="text-2xl font-semibold text-black">
                                {title}
                            </DialogTitle>
                            {children}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default forwardRef(Modal)