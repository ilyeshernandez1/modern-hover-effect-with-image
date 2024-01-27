import { getMousePos, showImageFromCountry } from "./utils";

export class Cursor {
  public cursorRoot: HTMLElement;
  private targetX: number = 0;
  private targetY: number = 0;
  private easeAmount: number = 0.2; // Adjust the ease amount here

  constructor(cursorRoot: HTMLElement) {
    this.cursorRoot = cursorRoot;
    document.addEventListener("mousemove", (e) => {
      const { x, y } = getMousePos(e);

      this.targetX = x;
      this.targetY = y;

      requestAnimationFrame(this.updateCursor.bind(this));
    });

    const links = document.querySelectorAll(".link-item");

    Array.from(links).forEach((link) => {
      const country = link.getAttribute("data-country");
      console.log(link)
      link.addEventListener("mouseenter", () => {
        showImageFromCountry(country as "italy" | "france" | "germany" | "england" | "spain");
        this.cursorRoot.classList.add("active");
      });
      link.addEventListener("mouseleave", () => {
        this.cursorRoot.classList.remove("active");
      });
    });
  }

  private updateCursor() {
    const dx = this.targetX - parseInt(this.cursorRoot.style.left || "0", 10);
    const dy = this.targetY - parseInt(this.cursorRoot.style.top || "0", 10);
    const vx = dx * this.easeAmount;
    const vy = dy * this.easeAmount;

    this.cursorRoot.style.left = `${
      parseInt(this.cursorRoot.style.left || "0", 10) + vx
    }px`;
    this.cursorRoot.style.top = `${
      parseInt(this.cursorRoot.style.top || "0", 10) + vy
    }px`;

    if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
      requestAnimationFrame(this.updateCursor.bind(this));
    }
  }
}
