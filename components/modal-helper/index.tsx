import AdminBlogEditor from "../forms/admin/blog/add-blog";
import { BlogPost } from "@/lib/api/services/admin/blog.services";
import EditBlogEditor from "../forms/admin/blog/edit-blog";
import AddProgramForm from "../forms/admin/program/add-program";
import EditProgramForm from "../forms/admin/program/edit-program";
import AddConsultationServiceForm from "../forms/admin/consultation/add-consultation-service";
import EditConsultationServiceForm from "../forms/admin/consultation/edit-consultation-service";
import AddCampModal from "../forms/admin/camps/add-camp";
import EditCampModal from "../forms/admin/camps/edit-camp";
import AddCampTierModal from "../forms/admin/camps/add-camp-tier";
import EditCampTierModal from "../forms/admin/camps/edit-camp-tier";
import { ConsultationService } from "@/lib/api/services/consultations/consultation-services.services";
import { Camp } from "@/lib/api/services/camps/camps.services";
import { CampTier } from "@/types/camps.types";
import { useModalStore } from "../store/use-modal-store";
import CampSuccessModal from "../pages/camps/camp-success";
import UpdateCaptionForm from "../forms/admin/camps/update-caption";

const openModal = useModalStore.getState().openModal;

//>>>>>>>>>>>>>>>>>>> PROGRAMS <<<<<<<<<<<<<<<<<<<<<<<<<<
export function addNewProgram() {
  openModal("add-new-program", <AddProgramForm />);
}
export function editProgram(id: string) {
  openModal("add-new-program", <EditProgramForm id={id} />);
}

//>>>>>>>>>>>>>>>>>>> CONSULTATION SERVICES <<<<<<<<<<<<<<<<<<<<<<<<<<
export function addConsultationService() {
  openModal("add-consultation-service", <AddConsultationServiceForm />);
}
export function editConsultationService(service: ConsultationService) {
  openModal(
    `edit-consultation-service-${service.id}`,
    <EditConsultationServiceForm service={service} />,
  );
}

//>>>>>>>>>>>>>>>>>>> CAMPS <<<<<<<<<<<<<<<<<<<<<<<<<<
export function addCamp() {
  openModal("add-camp", <AddCampModal />);
}

export function addCampTierWithId(campId: string) {
  openModal(`add-camp-tier-${campId}`, <AddCampTierModal campId={campId} />);
}

export function editCampTier(campId: string, tier: CampTier) {
  openModal(
    `edit-camp-tier-${tier.id}`,
    <EditCampTierModal campId={campId} tier={tier} />,
  );
}

export function editCamp(camp: Camp) {
  openModal(`edit-camp-${camp.id}`, <EditCampModal camp={camp} />);
}

export function handleCampSuccessModal(data: SuccessBannerProps) {
  openModal("success", <CampSuccessModal camp={data} />);
}

export const handleEditFileCaption = (campId: string, imageId: string, order: number | undefined) => {
  openModal("edit-image-caption", <UpdateCaptionForm campId={campId} imqgeId={imageId} order={order} />);
};

//>>>>>>>>>>>>>>>>>>> BLOG <<<<<<<<<<<<<<<<<<<<<<<<<
export const handleAddBlog = () => {
  openModal("add-new-blog", <AdminBlogEditor />);
};

export const handleEditBlog = (blog: BlogPost) => {
  openModal(
    "open-edit-blog",
    <EditBlogEditor blog={blog} />,
  );
};
