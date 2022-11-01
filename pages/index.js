import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import utilStyle from "../styles/utils.module.css";
import { getPostsdata } from '../lib/post'

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsdata(); //id, title, date, thumbnail

  return {
    props: {
      allPostsData,
    },
  };
}

//SSRの場合
//contextはユーザーが更新したデータ
//SSRと同じページでは使用不可（ページごとにそれぞれ指定可能）
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       //コンポーネントに使うためのprops
//     }
//   }
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p className={utilStyle.headingMd}>私はフロントエンドエンジニアです。好きなフレームワークはNext.jsです。</p>
      </section>
      <section className={styles.blogs}>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => {
            return (
              <article key={id}>
                <Link href={`/posts/${id}`}>
                  <img src={`${thumbnail}`} alt="" className={styles.thumbnailImage} />
                </Link>
                <Link href={`/posts/${id}`}>
                  <a className={utilStyle.boldText}>{title}</a>
                </Link>
                <br />
                <small className={utilStyle.lightText}>{date}</small>
              </article>
            );
          })}
        </div>
      </section>
    </Layout>
  )
}
