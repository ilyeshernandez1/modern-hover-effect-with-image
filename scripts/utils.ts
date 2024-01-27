export function getMousePos(event: MouseEvent): { x: number; y: number } {
  return {
    x: event.clientX,
    y: event.clientY,
  };
}

export function showImageFromCountry(
  country: "italy" | "france" | "germany" | "england" | "spain"
) {
  Array.from(document.querySelectorAll<HTMLElement>("img")).forEach((image) => {
    image.classList.remove("visible");
  });

  const image = document.querySelector<HTMLElement>(
    `img.${country}-image`
  );
  if (image) {
    image.classList.add("visible");
  }
}
