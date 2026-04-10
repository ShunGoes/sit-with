
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'swiper/css*';

interface ProgramColumn {
    name: string,
    type: "Leaders" | "Professionals" | "Students",
    enrolled: string,
    price: number,
    status: "Active" | "Inactive",
    id: string
}

interface ConsultationColumn{
    participant: string,
    program: string,
    date: string,
    status: "pending" | "completed"
}

interface ParticipantColumn {
    participant: string,
    program: string,
    dateJoined: string,
    status: "Active" | "Inactive"
}

interface BlogListItem {
    id: string;
    title: string;
    excerpt: string;
    status: "Published" | "Draft";
    category: string;
    author: string;
    date: string;
}