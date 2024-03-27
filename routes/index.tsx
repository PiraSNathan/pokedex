export default function Home() {
  return (
    <div className="flex min-h-screen justify-center items-center content-center">
      <div class="px-4 py-8 mx-auto bg-[#3D6FBA] w-3/4 md:w-1/5 rounded-xl p-2 space-y-2">
        <h1 class="text-4xl font-bold text-white">Welcome!</h1>
        <p class="text-lg text-white">
          In this Pokédex you will find detailed information on the first 1000
          Pokémons. You can browse through the Pokémons, search for a specific
          Pokémon and filter them by type. Click on any Pokémon to get more
          detailed information about it. With the navigation buttons on the
          bottom right you can check out the previous/next Pokémon.
        </p>
        <p>
          <a href={`/pokemons`} className="underline text-white">
            Let's checkout the Pokémons!
          </a>
        </p>
      </div>
    </div>
  );
}
