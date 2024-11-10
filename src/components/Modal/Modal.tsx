import { FC, useContext, useEffect, useRef } from "react";
import { AppContext, AppContextType } from "../../AppContext";

interface IModalProps {
  title: string;
}

const Modal: FC<IModalProps> = () => {
  const { overlays, setOverlays } = useContext(AppContext) as AppContextType;
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  if (!overlays?.modal) {
    return null;
  }
  const { title } = overlays.modal;
  const closeModal = () => {
    setOverlays({ ...overlays, modal: null });
  };

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <h2>{title}</h2>
        <button className="close-btn" onClick={closeModal}>
          x
        </button>
      </div>
    </div>
  );
};

export default Modal;
