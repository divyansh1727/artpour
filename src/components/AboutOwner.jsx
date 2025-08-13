import ownerImg from "../assets/images/owner.jpg"

export default function AboutOwner() {
  return (
    <section className="py-16 px-4 bg-pink-50 text-center">
      <h2 className="text-3xl font-heading text-pink-600 mb-8">About the Owner</h2>
      <img
        src={ownerImg}
        alt="PourByKay"
        className="w-40 h-40 rounded-full mx-auto mb-4 object-cover shadow-lg"
      />
      <p className="font-sans text-gray-700 max-w-xl mx-auto">
  Hi! I am PourByKay, passionate about creating unique handmade art & craft pieces.
</p>
<p className="font-script text-pink-500 mt-2">
  “Every piece tells a story”
</p>
    </section>
  );
}
