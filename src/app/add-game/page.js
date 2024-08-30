import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function AddGamePage() {
  const gameResult = await db.query(`SELECT 
    games.id, 
    games.rating,
    games.name, 
    games.creator,
    profiles.username 
    FROM games
    LEFT JOIN profiles ON games.clerk_id = profiles.clerk_id`);

  const games = gameResult.rows;

  console.log(games);
  async function handleAddGame(formData) {
    "use server";
    const name = formData.get("name");
    const creator = formData.get("creator");
    const rating = formData.get("rating");

    const user = await currentUser();

    await db.query(
      `INSERT INTO games (name, creator, rating, clerk_id) VALUES ($1, $2, $3, $4)`,
      [name, creator, rating, user?.id]
    );

    revalidatePath("/post");
    redirect("/post");
  }

  return (
    <div className="game">
      <h2 className="gameTitle">Add Game</h2>
      <SignedIn>
        <form action={handleAddGame}>
          <div className="gameForm">
            <input className="name" placeholder="Name" name="name" />
            <input className="creator" placeholder="Creator" name="creator" />
            <input
              className="rating"
              placeholder="Rating"
              type="number"
              name="rating"
            />
            <button className="submitBtn">Submit</button>
          </div>
        </form>
      </SignedIn>

      <SignedOut>
        <p>
          You must <SignInButton /> to add games
        </p>
      </SignedOut>

      {games.map(function (game) {
        return (
          <div key={game.id} className="gameOutput">
            <h6>{game.username ? game.username : "Annonymous"}</h6>
            <p>
              {game.id} - {game.name} - {game.creator} - {game.rating}/10
            </p>
          </div>
        ); 
      })}
    </div>
  );
}
