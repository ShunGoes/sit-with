import ProgramDetailsClient from "@/components/pages/programs/program-details-client";

export default async function ProgramDetailsPage({params}: {params: {id: string}}) {
    const {id} = await params;
    return (
        <div><ProgramDetailsClient id={id} /></div>
    )
}
