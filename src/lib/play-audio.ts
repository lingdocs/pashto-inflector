export default function playAudio(a: string) {
    if (!a) return;
    let audio = new Audio(`https://verbs.lingdocs.com/sounds/${a}.mp3`);
    audio.addEventListener("ended", () => {
        audio.remove();
        audio.srcObject = null;
    });
    audio.play().catch((e) => {
        console.error(e);
    });
}