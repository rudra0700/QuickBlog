import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        {/* Ai button starts */}
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-blue-600/40 bg-blue-600/10 rounded-full text-sm text-blue-600">
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} alt="star-icon" className="w-2.5" />
        </div>
        {/* Ai button ends */}
        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700">
          Your own <span className="text-blue-600">Blogging</span> <br />{" "}
          platform.
        </h1>
        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500">
          This is your space to think out loud, to share what matters and to
          write without filters. Wheather its one word or thousand, your story
          starts right here
        </p>

        {/* Blog search input starts */}
        <form className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden">
          <input
            required
            className="w-full pl-4 outline-none"
            type="text"
            placeholder="Searching for blog"
          />
          <button className="bg-blue-600 text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer">
            Search
          </button>
        </form>
        {/* Blog search input ends */}
      </div>
      <img
        src={assets.gradientBackground}
        alt="gradient background"
        className="absolute -top-50 -z-50 opacity-50"
      />
    </div>
  );
};

export default Header;
