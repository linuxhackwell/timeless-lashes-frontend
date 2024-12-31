import React from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/Timeless.jpg';
const Course1 = () => {

  const courseDetails = {
    title: "Classic Lash Fundamentals",
    price: "Kes 38,000",
    description:
      "This is the ideal place to begin or review your prior lash training. With Classic Lash foundations, you can learn the foundations and lay a solid foundation that will help you succeed in the lash industry. Get set to explore theory, practical application, mapping methodologies, styling, business, direction, and much more. This course is certain to put you on the road to success with one of our Lead Educators.",
    duration: "6 days – 3 days theory and practical, 3 days practice with a model",
    modules: [
      "Lash 101",
      "Lash Cycle",
      "Eye Conditions",
      "Glues",
      "Reactions",
      "Cleansing",
      "Primer",
      "Tweezers",
      "Disinfecting & Sanitizing",
      "Curl Theory",
      "Lengths of Lashes",
      "Diameter of Lashes",
      "Assessing Natural Lash Strength",
      "Flat Lashes",
      "Emphasis Area",
      "Understanding Eye Shapes",
      "Face Shape Theory",
      "Layers",
      "Mapping",
      "Under Eye Pads",
      "Isolation",
      "Lighting",
      "Application",
      "Direction",
      "Feathering",
      "Stickies",
      "Fills",
      "Retention",
      "Aftercare",
      "Removal",
      "Workplace Setup",
      "Product Knowledge",
      "Growing Your Business",
      "Artist Health",
      "Workshops",
    ],
  };

  return (
    <div className="container py-5">
      {/* Header Section */}
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold">{courseDetails.title}</h1>
        <p className="lead text-muted">{courseDetails.price}</p>
      </header>

      {/* Course Details Section */}
      <section className="mb-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4">
            <img
              src={image}
              alt="Classic Lash Course"
              className="img-fluid rounded shadow h-200"
            />
          </div>
          <div className="col-md-6">
            <h2 className="mb-3">Why Take This Course?</h2>
            <p>{courseDetails.description}</p>
            <p>
              <strong>Duration:</strong> {courseDetails.duration}
            </p>
            <Link to = "/classes/booking">
            <button className="btn btn-primary btn-lg mt-3">Enroll Now</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Course Modules Section */}
      <section className="mb-5">
        <h2 className="text-center mb-4">What You’ll Learn</h2>
        <div className="row">
          {courseDetails.modules.map((module, index) => (
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

      {/* Call-to-Action Section */}
      <section className="text-center">
        <h2 className="mb-4">Ready to Elevate Your Lash Skills?</h2>
        <p className="lead">
          Join the Classic Lash Fundamentals course and start your journey toward becoming a successful lash artist.
        </p>
        <Link to = '/classes/booking'>
        <button className="btn btn-success btn-lg">Book Your Spot Now</button>
        </Link>
        <div>
          <Link to = "/classes">Go back to classes</Link>
        </div>
      </section>
    </div>
  );
};

export default Course1;
