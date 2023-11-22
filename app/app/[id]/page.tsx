export default function Page({ params }: { params: { id: number } }) {
  console.log(params.id)
  return <div>this is list {params.id}</div>
}
