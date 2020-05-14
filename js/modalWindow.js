class ModalWindow {
    constructor(elem, modal = document.querySelector('.modal-block')) {
        this.element = elem;
        this.modal = modal;
        this.closeButton = modal.querySelector('.modal-h-close-btn');

        this._animation = function(fn) {
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    fn();
                })
            });
        }
    }

    _showModal() {

        let modal = (projectWindow) => {
            let handler = function() {
                projectWindow.classList.remove('modal-block-enter-active');
                projectWindow.removeEventListener('transitionend', handler);
            }

            projectWindow.style.display = 'block';
            projectWindow.classList.add('modal-block-enter');

            this._animation(() => {
                projectWindow.classList.add('modal-block-enter-active');
                projectWindow.classList.remove('modal-block-enter')
            });

            projectWindow.addEventListener('transitionend', handler);
        }

        modal(this.modal);
    }

    _hideModal() {
        let modalHide = (projectWindow) => {
            let handler = function() {
                projectWindow.style.display = 'none';
                projectWindow.classList.remove('modal-block-leave-active');
                projectWindow.classList.remove('modal-block-leave-to');

                projectWindow.removeEventListener('transitionend', handler);
            }

            projectWindow.classList.add('modal-block-leave');

            this._animation(() => {
                projectWindow.classList.add('modal-block-leave-active');
                projectWindow.classList.add('modal-block-leave-to')
                projectWindow.classList.remove('modal-block-leave')
            });

            projectWindow.addEventListener('transitionend', handler);
        }

        modalHide(this.modal);
    }
    
    eventHandle() {
        this.element.addEventListener('click', e => {
            this._showModal();
        });

        this.closeButton.addEventListener('click', e => {
            this._hideModal()
        });
    }
}
