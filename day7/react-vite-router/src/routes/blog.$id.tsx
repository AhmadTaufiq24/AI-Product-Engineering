import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/blog/$id"!</div>
}
