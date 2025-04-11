import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover'
import { Event } from '@/types'
import React from 'react'
import { Info } from 'lucide-react' // Make sure to import the Info icon

export default function EventDescriptionPopover({ event }: { event: Event }) {

    // the descriptin is like this when empty: <p><br></p>
    //if its <p><br></p> then its empty , render ''
    const description = event?.description === '<p><br></p>' ? '' : event?.description;
  return (
    <Popover>
      <PopoverTrigger>
        <Info size={18} className={`${!description ? 'hidden' : ''} text-gray-400 mt-1 cursor-pointer`} />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <span dangerouslySetInnerHTML={{__html: description || ''}}></span>
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
