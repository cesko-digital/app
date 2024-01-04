import localFont from "next/font/local";

const mk2 = localFont({
  src: [
    {
      path: "../../public/memes/fonts/mk2.ttf",
      weight: "400",
    },
  ],
  variable: "--mk2-font",
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 pt-16">
      <h1
        className={`text-center text-6xl text-it drop-shadow-lg ${mk2.className}`}
      >
        Choose your fighter
      </h1>
      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        <a href="/memes/yen">
          <img
            src="/memes/images/yen-transparent.png"
            alt="Yen"
            className="aspect-square w-96 object-cover"
          />
        </a>
        <a href="/memes/klara">
          <img
            src="/memes/images/klara-transparent.png"
            alt="Yen"
            className="aspect-square w-96 object-cover"
          />
        </a>
      </div>
    </main>
  );
}
