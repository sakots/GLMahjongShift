import { convert, type Direction } from "./converter.js";

const source = document.querySelector<HTMLTextAreaElement>("#source")!;
const result = document.querySelector<HTMLTextAreaElement>("#result")!;
const direction = document.querySelector<HTMLSelectElement>("#direction")!;
const error = document.querySelector<HTMLElement>("#error")!;

function update(): void {
  try {
    result.value = convert(source.value, direction.value as Direction);
    error.textContent = "";
  } catch (reason) {
    result.value = "";
    error.textContent = reason instanceof Error ? reason.message : "変換に失敗しました。";
  }
}

source.addEventListener("input", update);
direction.addEventListener("change", update);
document.querySelector<HTMLButtonElement>("#copy")!.addEventListener("click", async () => {
  await navigator.clipboard.writeText(result.value);
  error.textContent = "コピーしました。";
});
update();
