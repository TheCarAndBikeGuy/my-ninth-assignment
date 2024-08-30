import { db } from "@/lib/db";
import Link from "next/link";
import ReviewDisplay from "../components/ReviewDisplay";
import Footer from "../footer/page";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home({ searchParams }) {
  console.log("searchParams", searchParams);
  const result = await db.query("SELECT * FROM games order by id");
  const games = result.rows;
  const user = await currentUser();

  if (searchParams.sort === "desc") {
    games.reverse();
  }

  return (
    <div>
      <h1 className="title">Games Posts</h1>
      <br />
      <div className="dropdown">
        <button className="dropbtn">Dropdown</button>
        <Link className="order" name="order" href="post/?sort=asc">
          Sort asc
        </Link>
        <br />
        <Link className="order" name="order" href="post/?sort=desc">
          Sort desc
        </Link>
      </div>
      {games.map(function (game) {
        return (
          <div key={game.id} className="gameOutput">
            <h6>{game.username ? game.username : "Annonymous"}</h6>
            <p>
              {game.id} - {game.name} - {game.creator} - {game.rating}/10 -{" "}
            </p>
            <ReviewDisplay gameID={game.id} />
          </div>
        );
      })}
      <Footer />
    </div>
  );
}
