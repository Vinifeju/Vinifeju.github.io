'use strict';

class tooltipHelper {

    constructor(element) {
        this.element = element;
        this.div = document.createElement('div');

        this.div.classList.add('tooltipHelper');
        this.div.textContent = this.element.dataset.tooltipText;
    }


    _showtooltip() {

        this.element.append(this.div);
        this.div.style.display = 'none';

    }

    _hidetooltip() {

        this.element.addEventListener('mouseout', e => {

            let tooltip = document.querySelector('.tooltipHelper')

            if (tooltip) {
                tooltip.parentNode.removeChild(tooltip);
            }
        });
    }

    _animatetooltip() {

        modal(this.div);

        function modal(projectWindow) {
            let handler = function() {
                projectWindow.classList.remove('tooltipHelper-enter-active');
                projectWindow.removeEventListener('transitionend', handler);
            }

            projectWindow.style.display = 'block';
            projectWindow.classList.add('tooltipHelper-enter');

            anim(() => {
                projectWindow.classList.add('tooltipHelper-enter-active');
                projectWindow.classList.remove('tooltipHelper-enter')
            });

            projectWindow.addEventListener('transitionend', handler);
        }

        function anim(fn) {
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    fn();
                })
            });
        }
    }

    eventHandl() {
        this.element.addEventListener('mouseover', e => {
            this._showtooltip();
            this._animatetooltip();
            this._hidetooltip();
        });
    }

}