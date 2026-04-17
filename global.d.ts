
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'swiper/css*';

interface ProgramColumn {
    id: string;
    title: string;
    category: string;
    price: number;
    isPublished: boolean;
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