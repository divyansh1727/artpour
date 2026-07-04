import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

export default function LoginModal({ onClose }) {
  const handleLogin = async () => {
    try {
      console.log("CLICK DETECTED");

      const result = await signInWithPopup(auth, provider);

      console.log("LOGIN SUCCESS:", result.user);
      onClose();
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-white text-black p-8 rounded-xl text-center">
        <h2 className="text-xl mb-4">Login to continue</h2>

        <button
          onClick={handleLogin}
          className="border px-6 py-2"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}