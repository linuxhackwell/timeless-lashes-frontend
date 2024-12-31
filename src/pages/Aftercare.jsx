import React from 'react';
import './Aftercare.css'; // Custom styles
import 'bootstrap/dist/css/bootstrap.min.css';

const Aftercare = () => {
  return (
    <div className="aftercare-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Eyelash Extension Aftercare & Maintenance</h2>
        <p className="text-center lead">
          Follow these tips to ensure your eyelash extensions last as long as possible and remain in great condition.
        </p>

        <div className="row mt-5">
          {/* Things to Do Section */}
          <div className="col-md-6 mb-4">
            <div className="card shadow h-100">
              <div className="card-header text-white bg-primary">
                <h4 className="card-title mb-0">Things You Should Do</h4>
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <strong>Research Qualified Lash Technicians:</strong> Always choose a trained and qualified lash
                    technician to avoid infections or poor results.
                  </li>
                  <li className="mb-3">
                    <strong>Take Breaks for Natural Lash Health:</strong> Periodically let your lashes breathe by
                    avoiding extensions. Use lash serums and oils to keep them healthy.
                  </li>
                  <li className="mb-3">
                    <strong>Brush Your Lashes Regularly:</strong> Use a clean or disposable mascara wand to prevent
                    matting or clumping.
                  </li>
                  <li className="mb-3">
                    <strong>Use Lash-Safe Cleansers:</strong> Clean your lashes every other day with a cleanser
                    specially formulated for eyelash extensions to avoid dirt buildup.
                  </li>
                  <li className="mb-3">
                    <strong>Protect Your Lashes from Heat:</strong> Wear sunglasses in sunny environments to prevent
                    glue from melting and lashes from falling out prematurely.
                  </li>
                  <li className="mb-3">
                    <strong>Schedule Regular Refills:</strong> Book lash fills every 2-3 weeks to maintain your
                    extensions and avoid needing a full set.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Things Not to Do Section */}
          <div className="col-md-6 mb-4">
            <div className="card shadow h-100">
              <div className="card-header text-white bg-danger">
                <h4 className="card-title mb-0">Things You Should Not Do</h4>
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <strong>Don’t Wear Makeup to Your Appointment:</strong> Clean your eye area thoroughly to ensure
                    the glue sets properly.
                  </li>
                  <li className="mb-3">
                    <strong>Don’t Get Lashes Wet for 24-48 Hours:</strong> Avoid water, steam, or sweat during this
                    period to let the glue fully cure.
                  </li>
                  <li className="mb-3">
                    <strong>Don’t Use Oil-Based Products:</strong> Switch to oil-free makeup and skincare products to
                    prevent breaking down the lash glue.
                  </li>
                  <li className="mb-3">
                    <strong>Don’t Pull or Pick Your Lashes:</strong> If removal is needed, visit your technician to
                    avoid damaging your natural lashes.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aftercare;
