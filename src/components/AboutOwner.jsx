import ownerImg from "../assets/images/ownerr.jpg";
import "../stars.css"; // We'll add our star animation here

export default function AboutOwner() {
  return (
    <section className="relative py-16 px-4 bg-pink-50 text-center overflow-hidden">
      {/* Background Stars */}
      <div className="absolute inset-0 stars z-0"></div>
      <div className="absolute inset-0 twinkling z-0"></div>

      <div className="relative z-10">
        <h2 className="text-3xl font-heading text-pink-600 mb-8">
          About the Owner
        </h2>
        <img
          src={ownerImg}
          alt="PourByKay"
          className="w-40 h-40 rounded-full mx-auto mb-4 object-cover shadow-lg border-4 border-pink-200"
        />
        <p className="font-sans text-gray-700 max-w-xl mx-auto leading-relaxed">
          Hi! I’m <span className="font-bold text-pink-500">Kaveri Verma</span>, an artist with
          a passion for crafting one-of-a-kind handmade creations.  
          From delicate resin art to vibrant mixed media pieces, I put my heart into every detail.  
          I believe that art should not just be seen—it should be felt, experienced, and treasured.
        </p>
        <p className="font-sans text-gray-700 max-w-xl mx-auto leading-relaxed mt-4">
          Whether it’s a statement centerpiece for your home or a heartfelt gift for a loved one,
          each of my works is made with love, premium materials, and a dash of imagination.
        </p>
        <p className="font-script text-pink-500 mt-4 text-lg">
          “Every piece tells a story — let me help tell yours.”
        </p>
      </div>
    </section>
  );
}
