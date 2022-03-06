export default function Footer() {
  return (
    <footer className="pb-4 text-teal-200">
      <div className="max-w-5xl xl:max-w-5xl mx-auto divide-y divide-gray-900 px-4 sm:px-6 md:px-8">
        <ul className="flex flex-col  items-center justify-center mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
          <span className="text-[#1D3558] font-semibold">
            ☻ Made with love in 2022, from Team Maxima, for{" "}
            <a
              className="text-md text-[#457B9D] hover:text-teal-600 transition-colors duration-300 hover:text-deep-purple-accent-400 font-semibold tracking-tight"
              href="https://www.web3con.dev/hackathon"
              target="_blank"
            >
              web3con hackathon
            </a>{" "}
            ☻
          </span>
        </ul>
      </div>
    </footer>
  );
}
