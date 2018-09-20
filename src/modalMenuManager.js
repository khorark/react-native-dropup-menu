export const modalMenuManager = {
    modalMenuPopup: null,
    registerModalMenuPopup(component) {
        this.modalMenuPopup = component;
    },
    unregisterModalMenuPopup() {
        this.modalMenuPopup = null;
    },
    showModalMenuPopup(data) {
        this.modalMenuPopup.showModalMenu(data);
    },
};