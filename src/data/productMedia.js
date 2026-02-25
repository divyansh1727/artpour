import a2 from "../assets/images/a2.jpg";
import a3 from "../assets/images/a3.jpg";
import p1 from "../assets/products/p1.jpg";
import p2 from "../assets/products/p2.jpg";
import V1 from "../assets/products/v1.mp4";
import p7 from "../assets/images/p7.jpg";
import p9 from "../assets/images/p9.jpg";
import w1 from "../assets/images/az.jpg";
import w2 from "../assets/images/b.jpg";
import w4 from "../assets/images/b1.jpg";
import p10 from "../assets/images/p10.jpg";
import p11 from "../assets/images/p11.jpg";
import p12 from "../assets/images/p12.jpg";
import p13 from "../assets/images/p13.jpg";
import h1 from "../assets/images/h1.jpg";
import h2 from "../assets/images/h2.jpg";
import k2 from "../assets/images/k2.jpg";
import k1 from "../assets/images/k1.jpg";
import q1 from "../assets/images/q1.jpg";
import q3 from "../assets/images/q3.jpg";
import q2 from "../assets/images/q2.jpg";
import V2 from "../assets/images/v2.mp4";
import p15 from "../assets/images/p15.jpg";
import p16 from "../assets/images/p16.jpg";
import z4 from "../assets/images/z4.jpg";
import z2 from "../assets/images/z2.jpg";
import z3 from "../assets/images/z3.jpg";
import z1 from "../assets/images/z1.jpg";

const normalizeName = (name) => name?.trim().toLowerCase();

export const productMedia = {
  [normalizeName("Karan Aujla Phone Case")]: { images: [a2, a3] },
  [normalizeName("Spiritual Polaroid")]: { image: p7 },
  [normalizeName("Personal Polaroid")]: { image: w4 },
  [normalizeName("Hamper")]: { images: [h1, h2] },
  [normalizeName("Birthday Hamper")]: { images: [w1, w2] },
  [normalizeName("Rakhi")]: { image: p1 },
  [normalizeName("Customised Photo holder")]: { image: p2 },
  [normalizeName("Customised Photo keychain")]: { image: V1 },
  [normalizeName("Customised Phone Cover")]: { image: p9 },
  [normalizeName("Seashell keychain")]: { image: p10 },
  [normalizeName("Phone Cover")]: { image: p11 },
  [normalizeName("Phone Charm")]: { image: p12 },
  [normalizeName("Kitchen Resin Tray")]: { image: p13 },
  [normalizeName("Bookmark")]: { image: k2 },
  [normalizeName("Keychain")]: { image: q1 },
  [normalizeName("Dashboard Decor")]: { image: q3 },
  [normalizeName("Love Letter")]: { image: q2 },
  [normalizeName("Galaxy Wall Clock")]: { image: V2 },
  [normalizeName("Hair barrette clips")]: { image: p15 },
  [normalizeName("Om wall hanging")]: { image: p16 },
  [normalizeName("Alphabet Keychain")]: { images: [z4, z2, z3, z1] },
};