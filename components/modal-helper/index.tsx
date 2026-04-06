import AddProgramForm from "../forms/admin/program/add-program";
import { useModalStore } from "../store/use-modal-store";

const openModal = useModalStore.getState().openModal

export function addNewProgram(){
    openModal("add-new-program", <AddProgramForm />)
}