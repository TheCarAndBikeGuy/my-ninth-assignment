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

      {reviews.map(function (review) {
        return (
          <div key={review.id} className="reviewsOutput">
            <div>
              {review.game_id} - {review.username} - {review.review}{" "}
            </div>
          </div>
        );
      })}
    </div>
  );
}
