import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const AccordionMenu = ({ children, title }) => {
    return (
        <Accordion type="single" collapsible className="w-full border-t-2 border-white border-opacity-5">
            <AccordionItem value="item-1" className='bg-mapi-neutral-2'>
                <AccordionTrigger className='bg-mapi-neutral-2 px-4 flex-row-reverse justify-end gap-2 hover:no-underline'>{title} </AccordionTrigger>
                <AccordionContent className=''>
                    {children}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default AccordionMenu