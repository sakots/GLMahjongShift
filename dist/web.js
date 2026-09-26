import { convert } from "./converter.js";
const source = document.querySelector("#source");
const result = document.querySelector("#result");
const direction = document.querySelector("#direction");
const error = document.querySelector("#error");
function update() {
    try {
        result.value = convert(source.value, direction.value);
        error.textContent = "";
    }
    catch (reason) {
        result.value = "";
        error.textContent = reason instanceof Error ? reason.message : "変換に失敗しました。";
    }
}
source.addEventListener("input", update);
direction.addEventListener("change", update);
document.querySelector("#copy").addEventListener("click", async () => {
    await navigator.clipboard.writeText(result.value);
    error.textContent = "コピーしました。";
});
update();
