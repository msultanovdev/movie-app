import { createPortal } from "react-dom";
import Modal from "../../components/Modal/Modal";
import { useContext } from "react";
import { AppContext, AppContextType } from "../../AppContext";
const mountElement = document.querySelector("#overlays");

const Overlays = () => {
  const { overlays } = useContext(AppContext) as AppContextType;
  if (!mountElement) {
    return null;
  }
  return createPortal(overlays?.modal && <Modal title="" />, mountElement);
};

export default Overlays;
