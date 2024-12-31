import React from "react";
import { Link } from 'react-router-dom';
import image from "../assets/Timeless.jpg";

const Course3 = () => {
  const courseDetails = {
    title: "Advanced Techniques – Refining Your Skills",
    price: "Kes 55,000",
    description:
      "This advanced course is designed to help lash artists refine their skills and master advanced eyelash extension techniques. Perfect for those who already have foundational training, this course will elevate your artistry and confidence to new heights.",
    benefits:
      "Gain hands-on experience with complex techniques and learn how to provide customized lash solutions for every client. The 4-day course includes theory, practical application, and personalized feedback from our expert educators.",
    curriculum: [
      "Mastering Lash Mapping",
      "Customizing Lash Styles for Clients",
      "Advanced Isolation Techniques",
      "Volume Fan Perfection",
      "Troubleshooting Retention Issues",
      "Speed and Efficiency Practices",
      "Understanding Eye Shape Variations",
      "Safe Removal Techniques",
      "Business Growth Strategies",
      "Social Media Marketing for Lash Artists",
    ],
    perks: [
      "Certificate of Completion",
      "Access to Advanced Lash Resources",
      "Exclusive Discounts on Lash Products",
      "Lifetime Mentorship with Educators",
    ],
  };

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold">{courseDetails.title}</h1>
        <p className="lead text-primary fw-semibold">{courseDetails.price}</p>
      </header>

      {/* Course Overview Section */}
      <section className="mb-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4">
            <img
              src={image}
              alt="Advanced Techniques Course"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <h2 className="mb-3">Why Enroll in Advanced Techniques?</h2>
            <p>{courseDetails.description}</p>
            <p>{courseDetails.benefits}</p>
            <Link to = "/classes/booking">
            <button className="btn btn-primary btn-lg mt-3">Enroll Now</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="mb-5">
        <h2 className="text-center mb-4">What You’ll Learn</h2>
        <div className="row">
          {courseDetails.curriculum.map((module, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card shadow h-100">
                <div className="card-body">
                  <h5 className="card-title">Module {index + 1}</h5>
                  <p className="card-text">{module}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Perks Section */}
      <section className="mb-5">
        <h2 className="text-center mb-4">What You’ll Get</h2>
        <div className="row justify-content-center">
          {courseDetails.perks.map((perk, index) => (
            <div className="col-md-3 text-center mb-3" key={index}>
              <div className="bg-light p-4 rounded shadow h-100">
                <h5 className="fw-bold">{perk}</h5>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="text-center">
        <h2 className="mb-4">Ready to Master Advanced Lash Techniques?</h2>
        <p className="lead">
          Enroll today to refine your skills and unlock the potential to grow your lash artistry and business.
        </p>
        <Link to = '/classes/booking'>
        <button className="btn btn-success btn-lg">Book Your Spot Now</button>
        </Link>        
        <div className="mt-4">
          <Link to = "/classes">Go back to classes</Link>
        </div>
      </section>
    </div>
  );
};

export default Course3;
