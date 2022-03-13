import Head from "next/head";
import Image from "next/image";
import styles from "styles/Home.module.css";
import { GetServerSideProps } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface HomeProps {
  post: Post;
}

export default function Home({ post }: HomeProps) {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <h1 className="text-3xl font-bold underline bg-gray-400">{post?.title}</h1>
        <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages/index.js</code>
        </p>

        {!session ? (
          // <Link href="/api/auth/signIn">
          //   <a
          //     onClick={e => {
          //       e.preventDefault();
          //       signIn();
          //     }}
          //   >
          //     Sign In
          //   </a>
          // </Link>
          <button onClick={() => signIn("google")}>login</button>
        ) : (
          <>
            <div>{session.user.name}</div>
            <button onClick={() => signOut()}>logout</button>
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");

  const post: Post = await res.json();

  return {
    props: {
      post,
    },
  };
};
