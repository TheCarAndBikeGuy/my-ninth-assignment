import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import "../page.module.css";

export default function AddGamePage() {
  async function handleAddGame(formData) {
    "use server";

    console.log("form action done");

    const name = formData.get("name");
    const creator = formData.get("creator");
    const rating = formData.get("rating");

    await db.query(
      `INSERT INTO games (name, creator, rating) VALUES ($1, $2, $3)`,
      [name, creator, rating]
    );

    revalidatePath("/post");
    redirect("/post");
  }

  return (
    <div className="game">
      <h2 className="gameTitle">Add Game</h2>
      <form action={handleAddGame}>
        <div className="gameForm">
          <input className="name" placeholder="Name" />
          <input className="creator" placeholder="Creator" />
          <input className="rating" placeholder="Rating" type="number" />
          <button className="submitBtn">Submit</button>
        </div>
      </form>
    </div>
  );
}
