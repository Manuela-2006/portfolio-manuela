// Inicializar Lenis para smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true
});

// Configurar el loop de animación para Lenis
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Función para inicializar los gráficos de Chart.js
function initializeCharts() {
  // Gráfico 1: Componentes (Gráfico circular)
  const ctx1 = document.getElementById('chart1');
  if (ctx1) {
    new Chart(ctx1, {
      type: 'doughnut',
      data: {
        labels: ['Sensores', 'Micrófonos', 'Cámaras', 'Procesador', 'Otros'],
        datasets: [{
          data: [25, 20, 15, 30, 10],
          backgroundColor: [
            '#ad5cff',
            '#7c4dff',
            '#4ecdc4',
            '#a463f2',
            '#5d3f75'
          ],
          borderColor: 'rgba(20, 20, 20, 0.8)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                family: 'Poppins',
                size: 12
              },
              color: '#ffffff'
            }
          },
          title: {
            display: true,
            text: 'Componentes',
            color: '#ffffff',
            font: {
              family: 'Poppins',
              size: 22,
              weight: 'normal'
            }
          }
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });
  }

  // Gráfico 2: Comparativa de materiales (Gráfico de barras)
  const ctx2 = document.getElementById('chart2');
  if (ctx2) {
    new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['Titanio', 'Carbono', 'Aluminio reciclado', 'Silicona', 'Plástico Bio'],
        datasets: [{
          label: 'Durabilidad',
          data: [95, 85, 70, 65, 50],
          backgroundColor: '#ad5cff',
          borderColor: '#7c4dff',
          borderWidth: 1
        }, {
          label: 'Ligereza',
          data: [60, 90, 75, 85, 95],
          backgroundColor: '#4ecdc4',
          borderColor: '#3dafab',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#ffffff'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#ffffff'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#ffffff',
              font: {
                family: 'Poppins'
              }
            }
          },
          title: {
            display: true,
            text: 'Durabilidad vs Ligereza',
            color: '#ffffff',
            font: {
              family: 'Poppins',
              size: 22,
              weight: 'normal'
            }
          }
        }
      }
    });
  }

  // Gráfico 3: Opciones de personalización (Gráfico radar)
  const ctx3 = document.getElementById('chart3');
  if (ctx3) {
    new Chart(ctx3, {
      type: 'radar',
      data: {
        labels: ['Velocidad de reacción', 'Interacción', 'Comportamiento', 'Velocidad de aprendizaje'],
        datasets: [{
          label: 'Personalización',
          data: [90, 85, 95, 80, 90, 100],
          backgroundColor: 'rgba(173, 92, 255, 0.3)',
          borderColor: '#ad5cff',
          pointBackgroundColor: '#4ecdc4',
          pointBorderColor: '#ffffff',
          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: '#4ecdc4',
          borderWidth: 2,
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              color: 'rgba(255, 255, 255, 0.2)'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)'
            },
            pointLabels: {
              color: '#ffffff',
              font: {
                family: 'Poppins',
                size: 14
              }
            },
            ticks: {
              backdropColor: 'transparent',
              color: 'rgba(255, 255, 255, 0.7)'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Caracteristicas',
            color: '#ffffff',
            font: {
              family: 'Poppins',
              size: 22,
              weight: 'normal'
            }
          }
        }
      }
    });
  }
}

// Esperar a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  // Registrar ScrollTrigger primero, antes de usarlo
  gsap.registerPlugin(ScrollTrigger);
  
  // Inicializar el segundo slider inmediatamente para evitar parpadeos
  const secondSlider = document.querySelector('.slider_2 .carousel-custom');
  if (secondSlider) {
    // Asegurarse de que el segundo slider comienza en la posición correcta
    setTimeout(() => {
      secondSlider.scrollLeft = secondSlider.scrollWidth - secondSlider.clientWidth;
    }, 100);
  }
  
  // Mostrar el contenido después de 6 segundos
  setTimeout(() => {
    const content = document.querySelector(".video-content");
    const overlay = document.querySelector(".video-overlay");
    const ctaButton = document.querySelector(".cta-button");

    // Mostrar el contenido
    if (content) {
      content.classList.remove("hidden-content");
      content.classList.add("show-content");
    }

    // Oscurecer el fondo del video
    if (overlay) {
      overlay.style.background = "rgba(0, 0, 0, 0.3)";
    }

    // Animación con GSAP
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

    tl.from(".logo", { opacity: 0, y: -30 })
      .from(".navigation", { opacity: 0, y: -30 }, "-=0.8")
      .from(".gen-text", { opacity: 0, x: -50 }, "-=0.6")
      .from(".title", { opacity: 0, x: -50 }, "-=0.5")
      .from(".info-title", { opacity: 0, y: 30 }, "-=0.4")
      .from(".info-desc", { opacity: 0, y: 30 }, "-=0.4")
      .from(".subtitle", { opacity: 0, x: 50 }, "-=0.6")
      .from(".description", { opacity: 0, x: 50 }, "-=0.6");
      
    // Asegurarse de que el botón existe antes de animarlo
    if (ctaButton) {
      tl.fromTo(".cta-button", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 }, "-=0.4");
    }

  }, 6000);
  
  // Inicializar carruseles y animaciones
  initializeCarousel();
  initializeOtherAnimations();
  
  // Inicializar los gráficos
  initializeCharts();
});

// Función para inicializar los carruseles
function initializeCarousel() {
  const allSliders = document.querySelectorAll('.slider, .slider_2');
  
  allSliders.forEach((slider, index) => {
    const carousel = slider.querySelector('.carousel-custom');
    if (!carousel || !slider) return;

    const slides = carousel.querySelectorAll('.slide');
    if (slides.length === 0) return;

    // Calcular el ancho total del carrusel para el scrolling
    let totalWidth = 0;
    slides.forEach(slide => {
      const slideWidth = slide.offsetWidth;
      const style = window.getComputedStyle(slide);
      const marginRight = parseInt(style.marginRight) || 0;
      totalWidth += slideWidth + marginRight;
    });

    // Determinar si es el primer o segundo slider
    const isSecondSlider = slider.classList.contains('slider_2');
    
    // Forzar un reflow para asegurar que los cálculos de anchura son correctos
    carousel.offsetWidth;
    
    // Preparar el carrusel del segundo slider para scroll en dirección contraria
    if (isSecondSlider) {
      // Posicionar inicialmente el segundo carrusel al final (después de forzar un reflow)
      setTimeout(() => {
        carousel.scrollLeft = carousel.scrollWidth - carousel.clientWidth;
      }, 0);
    }

    // Crear ScrollTrigger para el carrusel
    try {
      // Configuración específica para cada tipo de slider
      const scrollerConfig = {
        trigger: slider,
        start: "top top",
        end: () => `+=${totalWidth}px`,
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        pinSpacing: true,
        onUpdate: self => {
          if (self && carousel) {
            const scrollProgress = self.progress;
            const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
            
            // Dirección diferente para el segundo slider
            if (isSecondSlider) {
              // Forzar dirección inversa desde el inicio
              carousel.scrollLeft = maxScrollLeft - (scrollProgress * maxScrollLeft);
            } else {
              carousel.scrollLeft = scrollProgress * maxScrollLeft;
            }
          }
        },
        onRefresh: self => {
          // Asegurarse de que el segundo slider comienza invertido al refrescar
          if (isSecondSlider && carousel) {
            const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
            // Establecer posición inicial correcta
            carousel.scrollLeft = maxScrollLeft;
          }
        }
      };
      
      const sliderScroller = ScrollTrigger.create(scrollerConfig);

      // Eventos para el slider
      slider.addEventListener('wheel', (e) => {
        if (sliderScroller.isActive) {
          e.preventDefault();
        }
      }, { passive: false });

      // Variables para touch events
      let touchStartX;
      let isTouching = false;
      
      // Touch event handlers
      slider.addEventListener('touchstart', (e) => {
        if (sliderScroller.isActive) {
          touchStartX = e.touches[0].clientX;
          isTouching = true;
        }
      }, { passive: true });

      slider.addEventListener('touchmove', (e) => {
        if (sliderScroller.isActive && isTouching) {
          const touchX = e.touches[0].clientX;
          const deltaX = touchStartX - touchX;
          const scrollPosition = window.pageYOffset;
          window.scrollTo({
            top: scrollPosition + deltaX * 0.5,
            behavior: 'auto'
          });
          touchStartX = touchX;
        }
      }, { passive: true });

      slider.addEventListener('touchend', () => {
        isTouching = false;
      });

      // Animaciones para cada slide
      slides.forEach((slide) => {
        const isSecondSliderSlide = slide.closest('.slider_2');
        
        if (isSecondSliderSlide) {
          // Para sliders con gráficos
          const chartContainer = slide.querySelector('.chart-container');
          const text = slide.querySelector('.text');
          
          if (chartContainer) {
            gsap.fromTo(chartContainer, 
              { scale: 0.9, opacity: 0.7 },
              { 
                scale: 1, 
                opacity: 1, 
                duration: 0.8,
                scrollTrigger: {
                  trigger: slide,
                  start: "center bottom",
                  end: "center center",
                  scrub: true
                }
              }
            );
          }
          
          if (text) {
            gsap.fromTo(text, 
              { y: 30, opacity: 0 },
              { 
                y: 0, 
                opacity: 1, 
                duration: 0.8,
                scrollTrigger: {
                  trigger: slide,
                  start: "top 60%",
                  end: "center center",
                  scrub: true
                }
              }
            );
          }
        } else {
          // Para sliders con imágenes
          const img = slide.querySelector('img');
          const text = slide.querySelector('.text');
          
          if (img) {
            gsap.fromTo(img, 
              { scale: 0.9, opacity: 0.7 },
              { 
                scale: 1, 
                opacity: 1, 
                duration: 0.8,
                scrollTrigger: {
                  trigger: slide,
                  start: "center bottom",
                  end: "center center",
                  scrub: true
                }
              }
            );
          }
          
          if (text) {
            gsap.fromTo(text, 
              { y: 30, opacity: 0 },
              { 
                y: 0, 
                opacity: 1, 
                duration: 0.8,
                scrollTrigger: {
                  trigger: slide,
                  start: "top 60%",
                  end: "center center",
                  scrub: true
                }
              }
            );
          }
        }
      });
    } catch (error) {
      console.error("Error al inicializar ScrollTrigger:", error);
    }
  });
}

// Animaciones adicionales para las demás secciones
function initializeOtherAnimations() {
  // Animaciones para títulos y elementos principales
  if (document.querySelector('.main-content .title')) {
    gsap.from('.main-content .title', {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.main-content',
        start: 'top 80%',
        end: 'center center',
        scrub: true
      }
    });
  }

  // Animación del carrusel de palabras
  if (document.querySelector('.word-carousel-container')) {
    gsap.from('.word-carousel-container', {
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.word-carousel-container',
        start: 'top bottom',
        end: 'top center',
        scrub: true
      }
    });
  }

  // Animaciones para la sección "Sobre Mí"
  if (document.querySelector('.about-section .about-title')) {
    gsap.from('.about-section .about-title', {
      x: -50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%',
        end: 'top 30%',
        scrub: true
      }
    });
  }

  if (document.querySelector('.about-section .about-description')) {
    gsap.from('.about-section .about-description', {
      y: 30,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 60%',
        end: 'center center',
        scrub: true
      }
    });
  }

  if (document.querySelector('.about-section .foto-robot')) {
    gsap.from('.about-section .foto-robot', {
      x: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 70%',
        end: 'top 30%',
        scrub: true
      }
    });
  }
  
  // Animaciones para la sección de contacto
  if (document.querySelector('.contact-section .title')) {
    gsap.from('.contact-section .title', {
      y: 30,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
        end: 'top 40%',
        scrub: true
      }
    });
  }
  
  if (document.querySelector('#contact-form')) {
    gsap.from('#contact-form', {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 60%',
        end: 'center center',
        scrub: true
      }
    });
  }
  
  // Añadir animación para los contenedores de gráficos cuando entran en vista
  const chartContainers = document.querySelectorAll('.chart-container');
  if (chartContainers.length > 0) {
    chartContainers.forEach((container, index) => {
      gsap.from(container, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'center center',
          scrub: true
        }
      });
    });
  }
}