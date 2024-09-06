import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import "../page.module.css";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function ReviewForm() {
  async function handleAddReview(formData) {
    "use server";

    console.log("review action done");

    const game_id = formData.get("game_id");
    const username = formData.get("username");
    const review = formData.get("review");

    await db.query(
      `INSERT INTO reviews (username, review, game_id) VALUES ($1, $2, $3)`,
      [username, review, game_id]
    );

    revalidatePath("/post");
    redirect("/post");
  }
  return (
    <div className="game">
      <h2 className="gameTitle">Add Review </h2>
      <SignedIn>
        <form action={handleAddReview}>
          <div className="gameForm">
            <input
              className="gameId"
              placeholder="ID Of Game"
              type="number"
              name="game_id"
            />
            <input
              className="username"
              placeholder="Username"
              name="username"
            />
            <input className="review" placeholder="Review" name="review" />
            <button className="submitBtn">Submit</button>
          </div>
        </form>
      </SignedIn>

      <SignedOut>
        <p>
          You Must <SignInButton /> to add a review
        </p>
      </SignedOut>
    </div>
  );
}
