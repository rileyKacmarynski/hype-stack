import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PlusIcon } from 'lucide-react'

export interface PanelItemProps extends ButtonProps {
  // TODO: I'll have to figure something out if we want emojis here too
  Icon: typeof PlusIcon
}

export function PanelItem({
  children,
  Icon,
  asChild,
  ...buttonProps
}: PanelItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        'w-full rounded-sm py-1 px-2 hover:bg-stone-200 hover:text-stone-500 group gap-2 justify-start h-auto',
        buttonProps?.className
      )}
      {...buttonProps}
    >
      <Icon className="h-5 w-5 group-hover:text-stone-400 text-stone-400" />
      <span className="truncate sr-only @[100px]:not-sr-only">{children}</span>
    </Button>
  )
}
