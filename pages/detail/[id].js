import Axios from "axios"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Loader } from "semantic-ui-react"
import Item from "../../src/component/Item"

const Post = ({ item, name }) => {
    const router = useRouter()

    console.log(router.isFallback)
    if (router.isFallback) {
        return <div style={{ padding: "100px 0" }}>
            <Loader active inline="centered">
                Loading
            </Loader>
        </div>
    }

    return (
        <>
            {item && (
                <>
                    <Head>
                        <title>{item.name}</title>
                        <meta name="description" content={item.description} />
                    </Head>
                    {name}환경입니다.
                    <Item item={item} />
                </>
            )}
        </>
    )
}

export default Post;

export async function getStaticPaths() {
    const apiUrl = process.env.apiUrl
    const res = await Axios.get(apiUrl)
    const data = res.data
    return {
        // paths: [
        //     { params: { id: '740' } },
        //     { params: { id: '730' } },
        //     { params: { id: '729' } }
        // ],
        paths: data.slice(0, 9).map(item => ({
            params: {
                id: item.id.toString()
            },
        })),
        fallback: true //없는 페이지 대응을 안함
    }
}

export async function getStaticProps(context) {
    const id = context.params.id
    const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`
    const res = await Axios.get(apiUrl)
    const data = res.data

    return {
        props: {
            item: data,
            name: process.env.name
        }
    }

};
