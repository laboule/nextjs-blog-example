import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import fetch from 'isomorphic-unfetch'
import Link from "next/link"

export default function Home({ users, posts }) {

    console.log(users);

    return (
        <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
          Amazing ! Add text from feature branch
        </p>
      </section>
      <div>

      <ul>
        {users.map(user => (<li key={user.id}>{user.name}</li>))}
       </ul>
       <ul>
        {posts.map(post => (<li key={post.id}>      
          <Link href="/post/[slug]" as={`/post/${post.id}`}>
            <a>{post.title}</a>
          </Link>
      </li>))}
       </ul>
      </div>
    </Layout>
    )
}


export async function getStaticProps() {
    // let users = [{"name": "toto"}];
    let posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(response => response.json());
    let users = await fetch("https://jsonplaceholder.typicode.com/users").then(response => response.json());
    return {
        props: {
            users,
            posts
        }, // will be passed to the page component as props
    }
}



// export async function g