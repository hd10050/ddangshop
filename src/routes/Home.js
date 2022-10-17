import { Carousel } from 'react-bootstrap';

function Home() {
    return (
        <div className="container">
            {/* add slider */}
            <Carousel variant="dark">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="img/shopLogo.png"
                        alt="First slide"
                    />
                </Carousel.Item>
            </Carousel>

            {/* item */}
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <img src={"https://codingapple1.github.io/shop/shoes1.jpg"} width="80%" />
                        <h4>제목</h4>
                        <p>가격</p>
                    </div>
                    <div className="col-md-4">
                        <img src={"https://codingapple1.github.io/shop/shoes1.jpg"} width="80%" />
                        <h4>제목</h4>
                        <p>가격</p>
                    </div>
                    <div className="col-md-4">
                        <img src={"https://codingapple1.github.io/shop/shoes1.jpg"} width="80%" />
                        <h4>제목</h4>
                        <p>가격</p>
                    </div>
                    <div className="col-md-4">
                        <img src={"https://codingapple1.github.io/shop/shoes1.jpg"} width="80%" />
                        <h4>제목</h4>
                        <p>가격</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;