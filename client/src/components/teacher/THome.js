import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import Header from "./Header";
import { CurrentUser } from "../../api/UserApi";
import axios from "axios";
import Swal from "sweetalert2";

const THome = () => {
  const [user, setUser] = useState({});
  const isUser = async () => {
    const lg = await CurrentUser();
    setUser(lg);
  };
  const [msg, setMsg] = useState({
    name: "",
    email: "",
    message: "",
  });

  //Handle Input
  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setMsg({ ...msg, [name]: value });
  };
 
const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post('/api/message/create',msg)
      console.log(res.status)
      if(res.status === 400 || !res){
        window.alert("Message Not Sent. Try Again Later")
      }
      else if(msg.message.length<3){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'invalid message!',
      
        })
      }
      else{
        Swal.fire(
          'Good job!',
          'Message Sent!',
          'success'
        )
      
       setMsg({
          message : "",   
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    isUser();
  }, [user._id]);
  return (
    <div >
      <div>
        <Header />
      </div>

      <div className="homeT1">
        <div className="quoteT1">
          <p>
            A good teacher is like a candle<br></br> it consumes itself to light
            <br></br> the way for others.
          </p>
        </div>
        <div className="Questions">
        {/* <a href="#contact">Have Some questions?</a> */}
        </div>
        <div>
          <img className="imgteacher1" src="/imgs/Teacher1.png" alt="" />
        </div>
      </div>
      <div className="homeT2">
        <p className="quoteT2">
          " You can’t teach people<br></br> everything they need to know.
          <br></br>
          The best you can do is position them<br></br> where they can find what
          <br></br>
          they need to know<br></br> when they need to know it. "<br></br>
          <br></br>
          <i className="auteur">by Seymour Papert</i>
        </p>
        <img src="/imgs/Teacher2.jpg" alt="" />
      </div>
      <div>
      <section>
        <div className="container my-5 py-5">
          <div className="row mb-5">
            <div className="col-12">
              <h3 className="fd-5 text-center mb-0">Contact Us</h3>
              <h1 className="display-6 text-center mb-4">
                Have Some <b>Questions?</b>
              </h1>
              <hr className="w-25 mx-auto" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img src="/imgs/contact.png" alt="Contact" className="w-75" />
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label for="name" className="form-label">
                  Your Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder={user.name}
                  name="name"
                  value={msg.name}
                  disabled
              
                />
              </div>

              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder={user.email}
                  name="email"
                  value={msg.email}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label">
                  Your Message
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  name="message"
                  value={msg.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button
                type="button"
                onClick={(e) => handleSubmit(e)}
                className="btn btn-outline-primary rounded-pill px-4"
              >
                Send Message
                <i className="fa fa-paper-plane ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
     
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default THome;
