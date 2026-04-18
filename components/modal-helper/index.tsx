import AdminBlogEditor from "../forms/admin/blog/add-blog";
import EditBlogEditor from "../forms/admin/blog/edit-blog";
import AddProgramForm from "../forms/admin/program/add-program";
import EditProgramForm from "../forms/admin/program/edit-program";
import AddConsultationServiceForm from "../forms/admin/consultation/add-consultation-service";
import EditConsultationServiceForm from "../forms/admin/consultation/edit-consultation-service";
import { ConsultationService } from "@/lib/api/services/consultations/consultation-services.services";
import { useModalStore } from "../store/use-modal-store";

const openModal = useModalStore.getState().openModal;

//>>>>>>>>>>>>>>>>>>> PROGRAMS <<<<<<<<<<<<<<<<<<<<<<<<<<
export  function addNewProgram() {
  openModal("add-new-program", <AddProgramForm />);
}
export  function editProgram(id: string) {
  openModal("add-new-program", <EditProgramForm id={id}/>);
}


//>>>>>>>>>>>>>>>>>>> CONSULTATION SERVICES <<<<<<<<<<<<<<<<<<<<<<<<<<
export function addConsultationService() {
  openModal("add-consultation-service", <AddConsultationServiceForm />);
}
export function editConsultationService(service: ConsultationService) {
  openModal(`edit-consultation-service-${service.id}`, <EditConsultationServiceForm service={service} />);
}


//>>>>>>>>>>>>>>>>>>> BLOG <<<<<<<<<<<<<<<<<<<<<<<<<<
export  const handleAddBlog = () => {
    openModal("add-new-blog", <AdminBlogEditor />);
  };


export const handleEditBlog = () => {
  openModal(
    "open-edit-blog",
    <EditBlogEditor
      blog={{
        id: "",
        title: "Favour",
        author: "",
        excerpt: "",
        coverImage: "",
        content: "",
      }}
    />,
  );
};
