"use client";

import { useId, useLayoutEffect, useRef } from "react";
import EducacionSection from "./EducacionSection";
import ContactoSection from "./ContactoSection";
import styles from "./EducationContactJourney.module.css";

export default function EducationContactJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const revealRef = useRef<SVGPathElement>(null);
  const maskRef = useRef<SVGMaskElement>(null);
  const maskId = `journey-reveal-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const ballRef = useRef<SVGGElement>(null);
  const trailRef = useRef<SVGGElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current!;
    const svg = svgRef.current!;
    const path = pathRef.current!;
    const reveal = revealRef.current!;
    const mask = maskRef.current!;
    const ball = ballRef.current!;
    const trail = trailRef.current!;
    const education = container.querySelector<HTMLElement>(".educacion-nueva-section")!;
    const timeline = container.querySelector<HTMLElement>(".educacion-timeline")!;
    const contact = container.querySelector<HTMLElement>(".contact-content")!;
    const dots = [...container.querySelectorAll<HTMLElement>(".educacion-dot")];
    const particles = [...trail.querySelectorAll("circle")];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pulses = new Map<HTMLElement, Animation>();
    let frame = 0, disposed = false, measureNeeded = true;
    let length = 0, start = 0, end = 1, floor = 0, previous = -1;
    let renderedDistance = 0, lastFrameTime = 0;
    let contactVisible = true;
    let dotLengths: number[] = [];
    let drop: { y: number; velocity: number; bounces: number; fade: number; time: number } | null = null;

    const measure = () => {
      measureNeeded = false;
      const bounds = container.getBoundingClientRect();
      const educationBounds = education.getBoundingClientRect();
      const timelineBounds = timeline.getBoundingClientRect();
      const contactBounds = contact.getBoundingClientRect();
      svg.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
      mask.setAttribute("width", String(bounds.width));
      mask.setAttribute("height", String(bounds.height));
      const matrix = svg.getScreenCTM();
      if (!matrix || dots.length !== 3) { length = 0; return; }
      const inverse = matrix.inverse();
      const anchors = dots.map((dot) => {
        // offset sizes ignore the decorative pulse while measuring the route.
        const parent = dot.offsetParent!.getBoundingClientRect();
        const x = parent.left + dot.offsetLeft;
        const y = parent.top + dot.offsetTop;
        return new DOMPoint(x, y).matrixTransform(inverse);
      });
      const [first, second, third] = anchors;
      const left = timelineBounds.left - bounds.left;
      const centerX = left + timelineBounds.width / 2;
      const offset = timelineBounds.top - bounds.top;
      const boundary = educationBounds.bottom - bounds.top;
      const heading = education.querySelector(".educacion-left")!.getBoundingClientRect();
      const stacked = heading.bottom <= timelineBounds.top;
      const entranceStart = stacked ? offset : 0;
      const entranceHandle = (first.y - entranceStart) * 0.65;
      const firstHandle = (second.y - first.y) * 0.65;
      const secondHandle = (third.y - second.y) * 0.65;
      const exitHandle = (boundary - third.y) * 0.65;
      const entrance = stacked
        ? `M ${left} 0 L ${left} ${offset} C ${left} ${offset + entranceHandle} ${first.x} ${first.y - entranceHandle} ${first.x} ${first.y}`
        : `M ${centerX} 0 C ${centerX} ${entranceHandle} ${first.x} ${first.y - entranceHandle} ${first.x} ${first.y}`;
      const segments = [entrance,
        `C ${first.x} ${first.y + firstHandle} ${second.x} ${second.y - firstHandle} ${second.x} ${second.y}`,
        `C ${second.x} ${second.y + secondHandle} ${third.x} ${third.y - secondHandle} ${third.x} ${third.y}`,
        `C ${third.x} ${third.y + exitHandle} ${centerX} ${boundary - exitHandle} ${centerX} ${boundary}`];

      // The existing contact divider is hidden at this breakpoint.
      contactVisible = window.matchMedia("(min-width: 481px)").matches;
      if (contactVisible) {
        const x = contactBounds.left - bounds.left + contactBounds.width / 2;
        const y = contactBounds.top - bounds.top;
        const handle = Math.max(0, y - boundary) * 0.5;
        segments.push(`C ${centerX} ${boundary + handle} ${x} ${y - handle} ${x} ${y}`);
        segments.push(`L ${x} ${contactBounds.bottom - bounds.top}`);
      }
      path.setAttribute("d", segments.join(" "));
      reveal.setAttribute("d", segments.join(" "));
      length = path.getTotalLength();
      // The curve increases vertically, so a binary search locates each marker.
      dotLengths = anchors.map((anchor) => {
        let low = 0, high = length;
        for (let i = 0; i < 18; i++) {
          const mid = (low + high) / 2;
          if (path.getPointAtLength(mid).y < anchor.y) low = mid;
          else high = mid;
        }
        return (low + high) / 2;
      });
      const endpoint = path.getPointAtLength(length);
      const documentTop = bounds.top + window.scrollY;
      start = documentTop - window.innerHeight * 0.75;
      // The final point must be reachable even when contact is the page footer.
      end = Math.max(start + 1, Math.min(
        document.documentElement.scrollHeight - window.innerHeight,
        documentTop + endpoint.y - window.innerHeight * 0.4
      ));
      const radius = dots[0].offsetWidth / 2;
      ball.querySelector("circle")!.setAttribute("r", String(radius));
      floor = bounds.height - radius - 2;
      previous = -1;
      lastFrameTime = 0;
      drop = null;
    };

    const schedule = () => {
      if (!frame && !disposed) frame = requestAnimationFrame(render);
    };
    const invalidate = () => { measureNeeded = true; schedule(); };
    const render = (time: number) => {
      frame = 0;
      if (disposed) return;
      if (measureNeeded) measure();
      if (!length) return;
      const targetProgress = reduced.matches ? 1 : Math.max(0, Math.min(1, (window.scrollY - start) / (end - start)));
      const targetDistance = targetProgress * length;
      if (reduced.matches || !contactVisible || !lastFrameTime) {
        renderedDistance = targetDistance;
      } else {
        const dt = Math.min((time - lastFrameTime) / 1000, 0.032);
        const difference = targetDistance - renderedDistance;
        // Follow scroll gently, with a speed limit even on large wheel jumps.
        const step = Math.min(Math.abs(difference) * (1 - Math.exp(-dt / 0.45)), 280 * dt);
        renderedDistance = Math.abs(difference) < 0.4
          ? targetDistance : renderedDistance + Math.sign(difference) * step;
      }
      lastFrameTime = time;
      const distance = renderedDistance;
      const progress = distance / length;
      // Reveal the dashed route only up to the actual (smoothed) ball position.
      reveal.setAttribute("stroke-dashoffset", String(1 - progress));
      if (distance !== targetDistance) schedule();
      const point = path.getPointAtLength(distance);
      ball.style.visibility = contactVisible ? "visible" : "hidden";
      trail.style.visibility = contactVisible && !reduced.matches && progress < 1 ? "visible" : "hidden";
      ball.style.opacity = "1";

      if (!reduced.matches && contactVisible && previous >= 0) {
        dotLengths.forEach((marker, index) => {
          if ((previous < marker && distance >= marker) || (previous > marker && distance <= marker)) {
            pulses.get(dots[index])?.cancel();
            const pulse = dots[index].animate([
              { scale: "1", boxShadow: "0 0 0 rgba(139,47,47,0)" },
              { scale: "1.3", boxShadow: "0 0 18px rgba(139,47,47,0.65)", offset: 0.4 },
              { scale: "1", boxShadow: "0 0 0 rgba(139,47,47,0)" },
            ], { duration: 550, easing: "ease-out" });
            pulses.set(dots[index], pulse);
          }
        });
      }

      if (targetProgress < 1 || progress < 1 || reduced.matches || !contactVisible) {
        drop = null;
      } else {
        if (!drop) drop = { y: point.y, velocity: 0, bounces: 0, fade: 0, time };
        const dt = Math.min((time - drop.time) / 1000, 0.032);
        drop.time = time;
        if (drop.bounces < 3) {
          drop.velocity += 900 * dt;
          drop.y += drop.velocity * dt;
          if (drop.y >= floor) {
            drop.y = floor;
            drop.velocity *= -0.48;
            drop.bounces++;
          }
        } else {
          drop.fade = Math.min(1, drop.fade + dt / 0.75);
        }
        point.y = drop.y;
        ball.style.opacity = String(1 - drop.fade);
        if (drop.fade < 1) schedule();
      }
      ball.setAttribute("transform", `translate(${point.x} ${point.y})`);
      const direction = previous < 0 || distance >= previous ? 1 : -1;
      particles.forEach((particle, index) => {
        const position = path.getPointAtLength(Math.max(0, Math.min(length, distance - direction * (index + 1) * 9)));
        particle.setAttribute("cx", String(position.x));
        particle.setAttribute("cy", String(position.y));
      });
      previous = distance;
    };

    const observer = new ResizeObserver(invalidate);
    [container, education, timeline, contact, ...dots.map((dot) => dot.parentElement!)].forEach((element) => observer.observe(element));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", invalidate);
    const onMotionChange = () => {
      pulses.forEach((pulse) => pulse.cancel());
      invalidate();
    };
    reduced.addEventListener("change", onMotionChange);
    void document.fonts.ready.then(() => { if (!disposed) invalidate(); });
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", invalidate);
      reduced.removeEventListener("change", onMotionChange);
      pulses.forEach((pulse) => pulse.cancel());
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.journey}>
      <EducacionSection />
      <ContactoSection />
      <svg ref={svgRef} className={styles.route} preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <mask ref={maskRef} id={maskId} maskUnits="userSpaceOnUse" x="0" y="0">
            <path ref={revealRef} fill="none" stroke="#fff" strokeWidth="6" pathLength="1" strokeDasharray="1 1" strokeDashoffset="1" />
          </mask>
        </defs>
        <path ref={pathRef} mask={`url(#${maskId})`} fill="none" stroke="var(--accent-primary, #8B2F2F)" strokeWidth="2" strokeDasharray="14 10" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <g ref={trailRef} className={styles.trail}>
          {[0.28, 0.18, 0.1].map((opacity, index) => <circle key={index} r={5 - index} opacity={opacity} />)}
        </g>
        <g ref={ballRef} className={styles.ball}><circle r="11" /></g>
      </svg>
    </div>
  );
}
