import { db } from "@/lib/db";
import Link from "next/link";
import ReviewDisplay from "../components/ReviewDisplay";
import Footer from "../footer/page";

export default async function Home({ searchParams }) {
  console.log("searchParams", searchParams);
  const result = await db.query("SELECT * FROM games");
  const games = result.rows;

  if (searchParams.sort === "desc") {
    games.reverse();
  }

  return (
    <div>
      <h1 className="title">Games Posts</h1>
      <br />
      <div className="dropdown">
        <button className="dropbtn">Dropdown</button>
        <Link className="order" href="/?sort=asc">
          Sort asc
        </Link>
        <br />
        <Link className="order" href="/?sort=desc">
          Sort desc
        </Link>
      </div>
      {games.map(function (game) {
        return (
          <div className="gameOutput">
            <p key={game.id}>
              {game.name} - {game.creator} - {game.rating}/10 -{" "}
            </p>
            <ReviewDisplay gameID={game.id} />
          </div>
        );
      })}
      <Footer />
    </div>
  );
}
