export default function Footer() {
    return (
      <footer className="pb-4 text-teal-200">
        <div className="max-w-5xl xl:max-w-5xl mx-auto divide-y divide-gray-900 px-4 sm:px-6 md:px-8">
         
            <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
              <a
                href="/"
                className="text-md text-teal-200 hover:text-teal-600 transition-colors duration-300 hover:text-deep-purple-accent-400 font-semibold tracking-tight"
              >
                © 2021 Company Inc.
              </a>
            </ul>
          </div>
      </footer>
    );
  }
  