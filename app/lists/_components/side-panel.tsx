'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { create } from 'zustand'

const DEFAULT_WIDTH = 200
const MIN_WIDTH = DEFAULT_WIDTH - 50
const MAX_WIDTH = DEFAULT_WIDTH + 100
// TODO: Lets try to do a container query or something to make things work
export const COLLAPSED_WIDTH = 56

export type SideNavState = {
  collapsed: boolean
  lastFullWidth: number
  currentWidth: number
}

const useSideNav = create<SideNavState>()((set) => ({
  collapsed: false,
  lastFullWidth: DEFAULT_WIDTH,
  currentWidth: DEFAULT_WIDTH,
}))

export const openNav = () =>
  useSideNav.setState(({ lastFullWidth }) => ({
    collapsed: false,
    currentWidth: lastFullWidth,
  }))

export const closeNav = () =>
  useSideNav.setState(({ currentWidth }) => ({
    collapsed: true,
    lastFullWidth: currentWidth,
    currentWidth: COLLAPSED_WIDTH,
  }))

export const toggleNav = () => {
  const { collapsed, currentWidth, lastFullWidth } = useSideNav.getState()

  console.log('toggling nav', collapsed, currentWidth, lastFullWidth)

  if (collapsed) {
    openNav()
  } else {
    console.log('closing nav')
    closeNav()
  }
}

const setCurrentWidth = (width: number) =>
  useSideNav.setState(() => ({ currentWidth: width }))

export default function SidePanel({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  const { collapsed, currentWidth } = useSideNav()
  // const [currentWidth, setCurrentWidth] = useState(DEFAULT_WIDTH)
  // set this shit while dragging
  const [dragging, setDragging] = useState(false)

  const mouseMoveHandler = (e: MouseEvent) => {
    if (!ref.current) return

    // only allow resize when uncollapsed
    if (collapsed) return

    setDragging(true)

    ref.current.style.userSelect = 'none'
    ref.current.style.transitionDuration = '0ms'

    if (e.clientX < MAX_WIDTH && e.clientX > MIN_WIDTH) {
      ref.current.style.width = `${e.clientX}px`
      // will we run into problems here?
      // setCurrentWidth(e.clientX)
    }
  }

  const mouseUpHandler = (e: MouseEvent) => {
    if (!ref.current) return

    console.log('end drag', e)

    console.log('collapsed', collapsed)
    if (dragging) {
      setCurrentWidth(e.clientX)
      setDragging(false)
      ref.current.style.removeProperty('user-select')
      ref.current.style.transitionDuration = '250ms'
    }
  }

  const mouseDownHandler = (e: any) => {
    if (!ref.current) {
      return
    }
  }

  // const toggleNav = () => {
  //   if (!ref.current) return

  //   if (!collapsed) {
  //     setCollapsed(true)
  //     ref.current.style.width = `${COLLAPSED_WIDTH}px`
  //   } else {
  //     setCollapsed(false)
  //     ref.current.style.width = `${currentWidth}px`
  //   }
  // }

  return (
    <aside
      ref={ref}
      style={{ width: currentWidth }}
      className="relative bg-stone-100 dark:bg-stone-900 group transition-[width] duration-250"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              onTapStart={mouseDownHandler}
              onTap={mouseUpHandler}
              onDrag={mouseMoveHandler}
              drag="x"
              dragConstraints={{
                left: 0,
                right: 0,
              }}
              dragElastic={0}
              onDoubleClick={toggleNav}
              className="absolute -right-1 h-full w-2 group/handle flex justify-center"
            >
              <div className="group-hover/handle:w-1 group-active/handle:w-1 group-hover/handle:cursor-col-resize dark:group-active/handle:bg-stone-700  group-active/handle:bg-stone-300 origin-center duration-250 bg-stone-200 dark:bg-stone-800 transition-all w-[1px] h-full " />
            </motion.div>
          </TooltipTrigger>
          <TooltipContent className="absolute w-[175px] top-4 left-4">
            <div className="text-xs font-medium text-stone-500 dark:text-stone-300">
              {collapsed ? (
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
      <div className="px-3 h-full flex flex-col truncate">{children}</div>
    </aside>
  )
}
