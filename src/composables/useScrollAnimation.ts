import { onMounted, nextTick } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations() {
	onMounted(async () => {
		await nextTick();

		// Timeline animations (adjust selectors if needed)
		const tl = gsap.timeline({
			defaults: { duration: 0.5, ease: "power1.out" },
		});

		tl.to(".hero__div", {
			clipPath: "inset(0% 0 0 0)",
			stagger: 0.03,
			ease: "power3.inOut",
			duration: 0.8,
		})
			.to(".hero__title", { y: 0, opacity: 1, stagger: 0.1 })
			.to(".hero__p", { y: 0, opacity: 1, stagger: 0.1 });

		// Scroll-based animations
		animateOnScroll(".t__reveal__animate", {
			opacity: 0,
			y: 60,
			stagger: 0.05,
			ease: "power1.inOut",
		});

		animateOnScroll(".t__fade__animate", {
			opacity: 0,
			stagger: 0.05,
			ease: "power1.inOut",
			duration: 1,
		});

		document.querySelectorAll(".t__clip__animate").forEach((image) => {
			gsap.fromTo(
				image,
				{
					clipPath: "inset(100% 0 0 0)", // hidden from top
				},
				{
					clipPath: "inset(0% 0 0 0)",
					ease: "power3.inOut",
					duration: 0.8,
					scrollTrigger: {
						trigger: image,
						start: "center bottom",
						toggleActions: "play none none none",
					},
				}
			);
		});
	});
}

function animateOnScroll(
	selector: string,
	animation: gsap.TweenVars,
	options?: ScrollTrigger.Vars
) {
	document.querySelectorAll(selector).forEach((el) => {
		gsap.from(el, {
			...animation,
			scrollTrigger: {
				trigger: el,
				start: "bottom bottom",
				toggleActions: "play none none none",
				...options,
			},
		});
	});
}
