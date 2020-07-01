import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import Layout from "../../components/layout";


const Post = ({post}) =>
{
  const router = useRouter()
  const { slug } = router.query

   if (router.isFallback) {
    return <div>Loading...</div>
  }
  else
  { 
  	return (
		<Layout><div>This is a post : { post.title } </div></Layout>)

  }
  // console.log(props);

	

}




export async function getStaticPaths() {
    let posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(response => response.json());

    let paths = posts.map(post => { return { params: { slug: post.id.toString() } } });
   	
   	paths = paths.slice(0,10);

    return {
        paths,
        fallback: true // See the "fallback" section below
    };
}

export async function getStaticProps({params}) {
    // let users = [{"name": "toto"}];

    let post = await fetch("https://jsonplaceholder.typicode.com/posts/"+params.slug).then(response => response.json());
   	
    // let users = await fetch("https://jsonplaceholder.typicode.com/users").then(response => response.json());
    return {
        props: {
            post
        }, // will be passed to the page component as props
    }
}
export default Post;

