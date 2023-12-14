import { CardHeader, CardContent, Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GaugeIcon, AppWindowIcon, UsersIcon } from 'lucide-react'

export default function Features() {
  return (
    <section className="w-full py-10 px-6 md:px-12">
      <div className="container mx-auto space-y-6">
        <h2 className="text-3xl font-semibold text-center text-stone-700 dark:text-stone-200">
          Features
        </h2>
        <p className="text-lg text-center text-stone-600 dark:text-stone-300">
          We provide high quality features that meet your needs
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <GaugeIcon className="w-12 h-12 mb-4" />
              <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200">
                Fast
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 [text-wrap:balance]">
                Built on NextJS 14 App router to move fast to not just keep up
                with you — it races ahead. Our platform is engineered for speed,
                ensuring swift and responsive performance in every interaction.
              </p>
            </CardContent>
            <Button className="mt-4" variant="link">
              Learn more
            </Button>
          </Card>
          <Card>
            <CardHeader>
              <UsersIcon className="w-12 h-12 mb-4" />
              <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200">
                Collaborative
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 [text-wrap:balance]">
                Stay in sync with your team or collaborators effortlessly.
                Update lists in real-time, ensuring everyone has the latest
                information at their fingertips.
              </p>
            </CardContent>
            <Button className="mt-4" variant="link">
              Learn more
            </Button>
          </Card>
          <Card>
            <CardHeader>
              <AppWindowIcon className="w-12 h-12 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-stone-200 [text-wrap:balance]">
                Clean design
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Enjoy a clean and intuitive design that makes creating, editing,
                and collaborating on lists a breeze. Our user-friendly interface
                ensures a smooth and efficient experience for all users.
              </p>
            </CardContent>
            <Button className="mt-4" variant="link">
              Learn more
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}
