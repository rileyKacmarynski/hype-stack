import Main from '@/app/(marketing)/_components/main'
import Features from '@/app/(marketing)/_components/features'

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <Main />
      <Features />
    </div>
  )
}
