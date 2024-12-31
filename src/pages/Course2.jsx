import React from "react";
import { Link } from 'react-router-dom';
import image from '../assets/Timeless.jpg'
const Course2 = () => {
  const courseDetails = {
    title: "Advanced Masterclass – Mega Volume Lashes",
    price: "Kes 65,000",
    description:
      "Improve Your Skills. Grow Your Business. When you enroll in the George Lashes Mega Volume Course, you will learn 5 Mega Volume lashing techniques. Mega Volume lash sets are created by placing an 8D+ lash extension fan to a single natural eyelash. This course is for those who are already proficient in Classic and Volume lashing techniques.",
    benefits:
      "Students will gain invaluable experience, polished lash skills, and the confidence they need to further build their lash empire. This course includes 5-day training on advanced techniques and hands-on practice. After certification, students receive access to a complimentary refresher course, discounts, and continued support from our Master Educators.",
    curriculum: [
      "Mega Volume Lashing Theory",
      "Lash Artist Body Care Practices",
      "How to Set Your Mega Volume Pricing",
      "Product and Tool Expertise",
      "Advanced Tweezer Practices",
      "Advanced Application Techniques",
      "Preparation Before Appointments",
      "Creating the Perfect Mega Volume Fan",
      "George Lashes Fanning Methods",
      "Advanced Lash Styling",
      "Advanced Lash Mapping",
      "Advanced Adhesive Troubleshooting",
      "Maintaining Healthy Natural Lashes",
      "Mega Volume Aftercare Techniques",
      "Client Case Studies",
      "Retailing",
      "Marketing and Social Media",
    ],
    perks: [
      "Lash Certification from George Lashes",
      "Complimentary refresher course",
      "Exclusive student discounts",
      "Continued support from Master Educators",
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
              alt="Mega Volume Course"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <h2 className="mb-3">Why Enroll in this Course?</h2>
            <p>{courseDetails.description}</p>
            <p>{courseDetails.benefits}</p>
            <Link to = "/classes/booking">
            <button className="btn btn-primary btn-lg mt-3">Enroll Now</button>
            </Link>          </div>
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
        <h2 className="mb-4">Ready to Take Your Lash Game to the Next Level?</h2>
        <p className="lead">
          Join the Advanced Masterclass and master Mega Volume Lashing with George Lashes. Secure your spot today!
        </p>
        <Link to = '/classes/booking'>
        <button className="btn btn-success btn-lg">Book Your Spot Now</button>
        </Link>        <div className="mt-4">
          <Link to = "/classes">Go back to classes</Link>
        </div>
      </section>
    </div>
  );
};

export default Course2;
