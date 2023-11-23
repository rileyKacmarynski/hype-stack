'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useStore from '@/lib/hooks/use-store'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const DEFAULT_WIDTH = 200
const MIN_WIDTH = DEFAULT_WIDTH - 50
const MAX_WIDTH = DEFAULT_WIDTH + 100
// don't change this or things wont be centered
export const COLLAPSED_WIDTH = 44

export type SideNavState = {
  collapsed: boolean
  lastFullWidth: number
  currentWidth: number
  openNav: () => void
  closeNav: () => void
  toggleNav: () => void
}

// TODO: This is not ideal
// SSR default and load local storage on hydrate
// leads to icky experience
const useSideNav = create<SideNavState>()(
  persist(
    (set, get) => ({
      collapsed: false,
      lastFullWidth: DEFAULT_WIDTH,
      currentWidth: DEFAULT_WIDTH,
      openNav: () =>
        set({ collapsed: false as boolean, currentWidth: get().lastFullWidth }),
      closeNav: () =>
        set({
          collapsed: true as boolean,
          lastFullWidth: get().currentWidth,
          currentWidth: COLLAPSED_WIDTH,
        }),
      // this is just repeat of open and close
      // not sure how to share this code, meh, it works
      toggleNav: () => (get().collapsed ? get().openNav() : get().closeNav()),
    }),
    {
      name: 'hype-stack-panel',
    }
  )
)

// I don't want to expose this guy to clients
function setCurrentWidth(width: number) {
  return useSideNav.setState(() => ({ currentWidth: width }))
}

export default function SidePanel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const [dragging, setDragging] = useState(false)
  const sideNavStore = useStore(useSideNav, (state) => state)

  const mouseMoveHandler = (e: MouseEvent) => {
    if (!ref.current) return

    // only allow resize when uncollapsed
    if (sideNavStore?.collapsed) return

    setDragging(true)

    ref.current.style.userSelect = 'none'
    ref.current.style.transitionDuration = '0ms'

    if (e.clientX < MAX_WIDTH && e.clientX > MIN_WIDTH) {
      ref.current.style.width = `${e.clientX}px`
    }
  }

  const mouseUpHandler = (e: MouseEvent) => {
    if (!ref.current) return

    if (dragging) {
      setCurrentWidth(e.clientX)
      setDragging(false)
      ref.current.style.removeProperty('user-select')
      ref.current.style.transitionDuration = '250ms'
    }
  }

  return (
    <aside
      ref={ref}
      style={{ width: sideNavStore?.currentWidth ?? DEFAULT_WIDTH }}
      className="relative bg-stone-100 dark:bg-stone-900 group transition-[width] duration-250"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              onTap={mouseUpHandler}
              onDrag={mouseMoveHandler}
              drag="x"
              dragConstraints={{
                left: 0,
                right: 0,
              }}
              dragElastic={0}
              onDoubleClick={sideNavStore?.toggleNav}
              className="absolute hover:cursor-col-resize z-10 -right-1.5 h-full w-3 group/handle flex justify-center"
            >
              <div className="group-hover/handle:w-1 group-active/handle:w-1 dark:group-active/handle:bg-stone-700  group-active/handle:bg-stone-300 origin-center duration-250 bg-stone-200 dark:bg-stone-800 transition-all w-[1px] h-full " />
            </motion.div>
          </TooltipTrigger>
          <TooltipContent className="absolute w-[175px] top-4 left-4">
            <div className="text-xs font-medium text-stone-500 dark:text-stone-300">
              {sideNavStore?.collapsed ? (
                <p>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    double-click
                  </span>{' '}
                  to expand
                </p>
              ) : (
                <>
                  <p>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      drag
                    </span>{' '}
                    to resize
                  </p>
                  <p>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      double-click
                    </span>{' '}
                    to collapse
                  </p>
                </>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className={cn('h-full flex flex-col truncate', className)}>
        {children}
      </div>
    </aside>
  )
}
