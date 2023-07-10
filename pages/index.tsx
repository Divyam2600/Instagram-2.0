import Feed from "../src/components/Feed/Feed";
import Copyright from "../src/components/Feed/SideSection/Copyright";
import MiniProfile from "../src/components/Feed/SideSection/MiniProfile";
import Suggestions from "../src/components/Feed/SideSection/Suggestions";
import useUser from "../src/hooks/use-user";

const Home = () => {
  const user = useUser();
  return user ? (
      <main className="ml-20 grid w-full grid-cols-2 justify-between gap-4 overflow-y-auto p-1.5 py-4 scrollbar-hide lg:grid-cols-4 xs:ml-0 xs:my-16">
        <Feed id={user?.id} userId={user?.userId} following={user?.following} />
        <section className="fixed right-4 col-span-1 hidden w-80 space-y-4 divide-y overflow-y-scroll px-4 scrollbar-hide lg:inline">
          <MiniProfile
            username={user?.username}
            name={user?.name}
            imageUrl={user?.imageUrl}
          />
          <Suggestions
            userId={user?.userId}
            following={user?.following}
            activeUserDocId={user?.id}
          />
          <Copyright />
        </section>
      </main>
  ) : null;
};

export default Home;
