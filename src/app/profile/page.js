import { currentUser } from "@clerk/nextjs/server";
import { NoUser } from "../components/NoUser";
import { ProfileForm } from "../components/ProfileForm";
import { db } from "@/lib/db";
import { UserButton } from "@clerk/nextjs";

export default async function ProfilePage() {
  const clerk = await currentUser();

  // if the user ISN'T signed in with clerk, don't carry on, just tell them to sign in
  if (!clerk) {
    return <NoUser />;
  }

  // check the database to see if there is a profile with this clerk_id
  const response = await db.query(
    `SELECT * FROM profiles WHERE clerk_id = $1`,
    [clerk.id]
  );

  // if we don't have a profile, give the form to add one
  if (response.rowCount === 0) {
    return <ProfileForm />;
  }

  // if we DO have a profile, show the details
  const profile = response.rows[0];

  return (
    <div className="prof">
      <h1>
        <UserButton />
      </h1>
      <h2>{profile.username}</h2>
      <p>{profile.bio}</p>
    </div>
  );
}
