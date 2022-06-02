import Paragraph from './paragraph'

function App() {
    const paragraphs = Array.from(Array(10).keys())

    return (
        <div>
            <h1>hi there!</h1>
            {
                paragraphs.map((count) => (
                    <div key={"id-"+count}>
                        <Paragraph count={count}></Paragraph>
                    </div>
                ))
            }
        </div>
    )
}

export default App