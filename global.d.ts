
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
  id: string
  status: string
  firstName: string
  lastName: string
  email: string
  serviceTitle: string
  price: number
  date: string
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