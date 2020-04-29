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

    _modalEffects(switchValue) {

        this.modal.addEventListener('transitionend', () => {
            hideHeader();
            hideOverflow();
        })

        function hideHeader() {
            if (switchValue) {
                document.querySelector('.header').style['min-height'] = 0 + 'px';
                document.querySelector('.header').style['max-height'] = 0 + 'px';
            } else {
                document.querySelector('.header').style['min-height'] = 100 + 'px';
                document.querySelector('.header').style['max-height'] = 100 + 'px';
            }
        }

        function hideOverflow() {
            if (switchValue) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }

    }

    eventHandle() {
        this.element.addEventListener('click', e => {
            this._showModal();
            this._modalEffects(true);
        });

        this.closeButton.addEventListener('click', e => {
            this._hideModal()
            this._modalEffects(false);
        });
    }
}