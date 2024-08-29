import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import "../page.module.css";

export default function ReviewForm() {
  async function handleAddReview(formData) {
    "use server";

    console.log("review action done");

    const game_id = formData.get("game_id");
    const username = formData.get("username")
    const review = formData.get("review");

    await db.query(
      `INSERT INTO reviews (username, review, game_id, clerk_id) VALUES ($1, $2, $3, $4)`,
      [username, review, game_id, clerk?.id], 
    );

    revalidatePath("/post");
    redirect("/post");
  }

  return (
    <div className="game">
      <h2 className="gameTitle">Add Review </h2>
      <form action={handleAddReview}>
        <div className="gameForm">
          <input className="gameId" placeholder="ID Of Game" type="number" />
          <input className="username" placeholder="Username" />
          <input className="review" placeholder="Review" />
          <button className="submitBtn">Submit</button>
        </div>
      </form>
    </div>
  );
}
