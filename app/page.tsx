import {Header} from "@/components/layouts/header";
import InfluencersList from "@/components/pages/influencers/influencersList";

export default function Home() {
  return (
    <>
      <div className="min-h-full">
        <Header pageTitle="Influencers List" />
        <main>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <InfluencersList/>
          </div>
        </main>
      </div>
    </>
  );
}
