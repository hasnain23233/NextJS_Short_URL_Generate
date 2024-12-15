import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-Color bg-backdrop-blur flex items-center justify-center w-full">
      <div>
        <section className="backdrop-blur-md bg-opacity-50 bg-purple-500 p-20 rounded-md text-white ">
          <div className="text-center">
            <p className="font-bold text-3xl">
              The best URL Shortener in the market
            </p>
            <p className="font-bold">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
            <div className="w-full flex justify-center mt-10 gap-7">
              <button className="bg-purple-700 p-5 rounded-md cursor-pointer hover:bg-purple-600 font-bold">
                Try Now
              </button>
              <button className="bg-purple-700 p-5 rounded-md cursor-pointer hover:bg-purple-600 font-bold">
                GitHub
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
