import EditProgramFormClient from '@/components/forms/admin/program/edit-program'


type Props = {
    params: Promise<{id: string}>
}

export default async function EditProgramPage({params}: Props) {
    const {id} = await params
  return (
    <div><EditProgramFormClient id={id}/></div>
  )
}
