import { useActiveListings, useContract } from "@thirdweb-dev/react";
import Header from "~/components/Header";
import ListingCard from "~/components/ListingCard";
import SkeletonCard from "~/components/SkeletonCard";
import ListingsGridContainer from "../components/ListingsGridContainer";

const Home = () => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    "marketplace"
  );

  const { data: listings, isLoading: loadingListings } =
    useActiveListings(contract);

  const skeletonCards = Array(4).fill(0);

  return (
    <div>
      <Header />
      {/* Grid of listings */}
      <main className='p-6'>
        {loadingListings ? (
          <ListingsGridContainer>
            {skeletonCards.map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </ListingsGridContainer>
        ) : (
          <ListingsGridContainer>
            {listings?.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </ListingsGridContainer>
        )}
      </main>
    </div>
  );
};

export default Home;
