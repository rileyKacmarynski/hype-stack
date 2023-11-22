import EmptyIllustration from '@/app/app/(empty-state)/empty-illustration'
import { createList } from '@/app/app/actions'
import { Button } from '@/components/ui/button'
import { currentUser } from '@clerk/nextjs'
import { PlusIcon } from 'lucide-react'

export default async function EmptyState() {
  return (
    <div className="flex h-full flex-col justify-center items-center gap-6">
      <div className="w-[clamp(200px,70%,300px)] h-auto">
        <EmptyIllustration />
      </div>
      <p className="text-stone-700 dark:text-stone-300">
        Doesn&apos;t look like there are any lists here.
      </p>
      <form action={createList}>
        <Button type="submit">
          <PlusIcon className="mr-2 h-4 w-4" /> Create a new one
        </Button>
      </form>
    </div>
  )
}
