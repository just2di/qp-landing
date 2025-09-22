import { register } from 'swiper/element';
import { Navigation } from 'swiper/modules';


// Register Swiper web component
register();

export function initSwiper() {
    const swiperEl = document.querySelector('.feedback-swiper');
    const counterCurrent = document.querySelector('.fb-counter-current');
    const counterTotal = document.querySelector('.fb-counter-total');
    
    if (!swiperEl) {
        return null;
    }

    Object.assign(swiperEl, {
        modules: [Navigation],
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: '.fb-button-next',
            prevEl: '.fb-button-prev',
        },
        on: {
            init: function(swiper) {
             
                const total = Array.from(swiper.slides).filter(
                    (el) => !el.classList.contains('swiper-slide-duplicate')
                ).length;
                
                if (counterTotal) {
                    counterTotal.textContent = total.toString().padStart(2, '0');
                }
                if (counterCurrent) {
                    counterCurrent.textContent = (swiper.realIndex + 1).toString().padStart(2, '0');
                }
            },
            slideChange: function(swiper) {
                if (counterCurrent) {
                    counterCurrent.textContent = (swiper.realIndex + 1).toString().padStart(2, '0');
                }
            }
        }
    });

    swiperEl.initialize();
    return swiperEl;
}