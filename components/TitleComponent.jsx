import Head from "next/head"

const TitleComponent = (props) => {
    const { title } = props

    return (
        <Head>
            <title>
                {title ? `${title} | Next App` : `Next App`}
            </title>
        </Head>
    )
}

export default TitleComponent
