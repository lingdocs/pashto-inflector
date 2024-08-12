export default function playAudio(a: string) {
  if (!a) return;
  const audio = new Audio(
    `https://pashto-inflector.lingdocs.com/sounds/${a}.mp3`
  );
  audio.addEventListener("ended", () => {
    audio.remove();
    audio.srcObject = null;
  });
  audio.play().catch((e) => {
    console.error(e);
  });
}
