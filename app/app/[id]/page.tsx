export default function Page({ params }: { params: { id: number } }) {
  return <div>this is list {params.id}</div>
}
