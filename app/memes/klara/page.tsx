"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const dataSchema = z.object({
  question: z
    .string()
    .transform((val) =>
      !val || val === "" ? "Systém varující před nebezpečím" : val,
    ),
  answer: z
    .string()
    .transform((val) =>
      !val || val === ""
        ? "Na to nejsem odborník, ale bylo to na Slacku."
        : val,
    ),
});

export default function Home() {
  const [data, setData] = useState<z.infer<typeof dataSchema>>({
    question: "Systém varující před nebezpečím",
    answer: "Na to nejsem odborník, ale bylo to na Slacku.",
  });

  const { register, handleSubmit } = useForm<z.infer<typeof dataSchema>>({
    resolver: zodResolver(dataSchema),
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<z.infer<typeof dataSchema>> = async (data) => {
    setData(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 pt-16">
      <img
        className="w-full max-w-[700px]"
        src={`/api/memes/klara?question=${encodeURIComponent(
          data.question,
        )}&answer=${encodeURIComponent(data.answer)}`}
        alt="Klara"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 flex w-full max-w-[700px] flex-col gap-4"
      >
        <label htmlFor="question" className="text-sm">
          Question
        </label>
        <input
          id="question"
          type="text"
          className="placeholder:text-gray-400 h-14 w-full rounded-xl border bg-black bg-opacity-5 px-4 text-xl"
          {...register("question")}
          placeholder="Systém varující před nebezpečím"
        />
        <label htmlFor="answer" className="text-sm">
          Answer
        </label>
        <input
          id="answer"
          type="text"
          className="placeholder:text-gray-400 h-14 w-full rounded-xl border bg-black bg-opacity-5 px-4 text-xl"
          {...register("answer")}
          placeholder="Na to nejsem odborník, ale bylo to na Slacku."
        />
        <button
          className="btn-primary mt-8 flex h-12 items-center justify-center rounded-xl border px-4 font-semibold"
          type="submit"
        >
          Vygeneruj mi to!
        </button>
      </form>
    </main>
  );
}
