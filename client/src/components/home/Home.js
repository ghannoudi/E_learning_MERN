import React, { useEffect, useState } from "react";
import "./style.css";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
function Home() {
  const navigate = useNavigate();

  const [getDept, setGetDept] = useState([]);
  const getAllDeppartement = () => {
    axios.get(`/deppartement/getAllDeppartement`).then((res) => {
      setGetDept(res.data);
    });
  };

  useEffect(() => {
    getAllDeppartement();
  }, []);
  return (
    <div>
      <div className="p2">
        <img className="i1" src="/imgs/home3.jpg" alt="" />
        <div className="quotes">
          <p>
            Transform your life <br></br>through learning
          </p>
          <Link to="/register">
            <button className="btn btn-primary inscrit">
              Register for free
            </button>
          </Link>
        </div>
      </div>
      <div>
        <div>
          <p className="take">
            Take the next step <br></br>to achieve your goals
          </p>
          <img src="/imgs/home5.jpg" className="i5" />
        </div>
        <div className="carousel">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-10 hight"
                src="./imgs/home1.jpg"
                alt="First slide"
              />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-10 hight"
                src="./imgs/home4.png"
                alt="Second slide"
              />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-10 hight"
                src="./imgs/home2.webp"
                alt="Third slide"
              />

              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="deptss">
          <h3 className="explore">Explore our deppartements</h3>
          {getDept.map((el) => (
            <div className="depart">{el.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
