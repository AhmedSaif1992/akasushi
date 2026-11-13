import Image from "next/image";
import styles from "./OurStorySections.module.css";

interface StorySectionItem {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
}

const STORY_SECTIONS: StorySectionItem[] = [
  {
    id: "origins",
    eyebrow: "The ORIGINS",
    title: "Born in The Ancient Kyoto,\nJapan",
    body: "Long before AKA became a destination, it was an idea born in the heart of Japan. It was inspired by a culture where the energy of modern cities lives in harmony with the silence of ancient temples, and where every detail, however small, carries meaning.",
    image: "/our-story-images/kyoto.webp",
  },
  {
    id: "craft",
    eyebrow: "THE CRAFT",
    title: "Honoring Japanese Culture and Craft",
    body: "To master sushi is to master patience. Our chefs follow the techniques of Japan’s old masters: the precise cut, the gentle press of seasoned rice, the respect for every ingredient. Each piece is shaped by hand, one at a time.",
    image: "/our-story-images/chef.webp",
  },
  {
    id: "dubai",
    eyebrow: "A New Home",
    title: "A New Chapter in Dubai",
    body: "Every tradition must travel to grow. AKA carried the soul of Japanese craft to Dubai, a city of ambition and endless diversity, and found its home at Mileo The Palm on West Beach, Palm Jumeirah. Step inside and taste Japan in Dubai.",
    image: "/our-story-images/dubai.webp",
  },
];

export default function OurStorySections() {
  return (
    <>
      {STORY_SECTIONS.map((section) => (
        <section
          key={section.id}
          className={styles.storySection}
          aria-label={section.eyebrow}
        >
          {/* Desktop Background */}
          <div className={styles.desktopBg} aria-hidden="true">
            <Image
              src={section.image}
              alt=""
              fill
              quality={90}
              sizes="100vw"
              className={styles.desktopBgImage}
            />
            <div className={styles.desktopOverlay} />
          </div>

          {/* Centered container with max-width 1250px and max-width 350px text box */}
          <div className={styles.container}>
            <div className={styles.textBox}>
              <p className={styles.eyebrow}>{section.eyebrow}</p>
              <h2 className={styles.title}>{section.title}</h2>
              <p className={styles.body}>{section.body}</p>
            </div>
          </div>

          {/* Mobile standalone image under text box with height 186.5vw */}
          <div className={styles.mobileImageWrapper} aria-hidden="true">
            <Image
              src={section.image}
              alt={section.title.replace("\n", " ")}
              fill
              quality={90}
              sizes="100vw"
              className={styles.mobileImage}
            />
          </div>
        </section>
      ))}
    </>
  );
}
