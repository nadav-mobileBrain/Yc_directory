import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams)?.query;

  try {
    const posts = await client.fetch(STARTUPS_QUERY);
    console.log("🚀 ~ posts:", JSON.stringify(posts, null, 2));

    return (
      <>
        <section className="pink_container">
          <h1 className="heading">
            Pitch Your Startup <br /> Connect With Entrepreneurs
          </h1>
          <p className="sub-heading !max-w-3xl">
            Submit Ideas, Vote on Pitches , and Get Noticed in Virtual
            Competitions
          </p>
          <SearchForm query={query} />
        </section>
        <section className="section_container">
          <p className="text-30-semibold">
            {query ? `Search results for "${query}"` : "All StartUps"}
          </p>
          <ul className="mt-7 card_grid">
            {posts?.length > 0 ? (
              posts.map((post: StartupCardType, index: number) => (
                <StartupCard key={post?._id} post={post} />
              ))
            ) : (
              <p className="no-results">No Startups Found</p>
            )}
          </ul>
        </section>
      </>
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return (
      <p className="error-message">
        Failed to load startups. Please try again later.
      </p>
    );
  }
}
