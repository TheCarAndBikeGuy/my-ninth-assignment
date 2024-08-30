import { db } from "@/lib/db";

export default async function ReviewDisplay({ gameID }) {
  const review = await db.query("SELECT * FROM reviews WHERE game_id = $1", [
    gameID,
  ]);
  const reviews = review.rows;
  console.log(reviews.rows);

  return (
    <div>
      <p>Reviews: </p>

      <SignedOut>
        <p>
          You must <SignInButton /> to add candles
        </p>
      </SignedOut>

      {reviews.map(function (review) {
        return (
          <div key={review.id} className="reviewsOutput">
            <h3>{review.username ? review.username : "Annonymous"}</h3>
            <p>
              {review.username} - {review.review} -{" "}
            </p>
          </div>
        );
      })}
    </div>
  );
}
