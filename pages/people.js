import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useDrupalJSONAPI } from "react-drupal-json-api";

export default function people({ persons, headshots }) {
  return (
    <div>
      <Head>
        <title>Create Next App + Tailwind</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="prose mx-auto py-16 flex flex-col items-center justify-center">
        <Link href="/">
          <a>Home</a>
        </Link>
        <div className="divide-y-4 divide-gray-200 space-y-4 py-12">
          <h1>People</h1>
          {persons?.map((person, index) => {
            return (
              <article key={person.id} className="prose py-4">
                <h3>{person.attributes.title}</h3>
                <Image
                  src={
                    "https://dev-drupal-api-testing.pantheonsite.io" +
                    headshots[index].attributes.uri.url
                  }
                  alt={person.relationships.field_headshot.data.meta.alt}
                  width={1000}
                  height={1000}
                  priority
                />
                <p>{person.attributes.field_biography}</p>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  let personsData = await useDrupalJSONAPI({
    baseURL: "https://dev-drupal-api-testing.pantheonsite.io/",
    collection: "person",
    include: ["field_headshot"],
  });
  const { data: persons, included: headshots } = personsData;

  return {
    props: { persons, headshots },
  };
}
