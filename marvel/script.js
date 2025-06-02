// Initialize background images
const bgImages = document.querySelectorAll("#back img");
let currentBgIndex = 0;
bgImages[0].classList.add("active");

// Initialize Shery.js image effects
Shery.imageEffect("#back", {
    style: 5,
    config: {
        a: { value: 2, range: [0, 30] },
        b: { value: -0.98, range: [-1, 1] },
        zindex: { value: -999699999999, range: [-9999999, 9999999] },
        aspect: { value: 1.9597938773558312 },
        ignoreShapeAspect: { value: true },
        shapePosition: { value: { x: 0, y: 0 } },
        shapeScale: { value: { x: 0.5, y: 0.5 } },
        shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
        shapeRadius: { value: 0, range: [0, 2] },
        currentScroll: { value: 0 },
        scrollLerp: { value: 0.07 },
        gooey: { value: true },
        infiniteGooey: { value: true },
        growSize: { value: 4, range: [1, 15] },
        durationOut: { value: 1, range: [0.1, 5] },
        durationIn: { value: 1.5, range: [0.1, 5] },
        displaceAmount: { value: 0.5 },
        masker: { value: true },
        maskVal: { value: 1.24, range: [1, 5] },
        scrollType: { value: 0 },
        geoVertex: { range: [1, 64], value: 1 },
        noEffectGooey: { value: false },
        onMouse: { value: 1 },
        noise_speed: { value: 0.53, range: [0, 10] },
        metaball: { value: 0.2, range: [0, 2], _gsap: { id: 3 } },
        discard_threshold: { value: 0.5, range: [0, 1] },
        antialias_threshold: { value: 0, range: [0, 0.1] },
        noise_height: { value: 0.43, range: [0, 2] },
        noise_scale: { value: 10.69, range: [0, 100] },
    },
    gooey: true,
});

// Text animation elements
const elems = document.querySelectorAll(".elem");
let animating = false;

// Click event for the background image
document.querySelector("#back").addEventListener("click", function() {
    if (!animating) {
        animating = true;
        
        // Change background image
        bgImages[currentBgIndex].classList.remove("active");
        currentBgIndex = (currentBgIndex + 1) % bgImages.length;
        bgImages[currentBgIndex].classList.add("active");
        
        // Animate text elements
        elems.forEach(function(elem, i) {
            const h1s = elem.querySelectorAll("h1");
            let index = parseInt(elem.getAttribute("data-index") || 0);
            
            // Create timeline for each element
            const tl = gsap.timeline({
                onComplete: function() {
                    if (i === elems.length - 1) {
                        animating = false;
                    }
                }
            });
            
            // Animate current text out
            tl.to(h1s[index], {
                top: "-100%",
                duration: 0.8,
                ease: "power3.inOut",
                opacity: 0,
                onComplete: function() {
                    gsap.set(this._targets[0], { top: "100%", opacity: 0 });
                }
            });
            
            // Update index
            index = (index + 1) % h1s.length;
            elem.setAttribute("data-index", index);
            
            // Animate new text in
            tl.to(h1s[index], {
                top: "0%",
                duration: 0.8,
                ease: "power3.out",
                opacity: 1,
                delay: -0.4
            }, "-=0.4");
        });
    }
});

// Auto-cycle every 5 seconds if no interaction
setInterval(function() {
    if (!animating) {
        document.querySelector("#main").click();
    }
}, 5000);