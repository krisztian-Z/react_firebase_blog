import React from 'react';
import './About.css'; // Import the CSS file

const AboutPage = () => {
  return (
    <div className="about-container">
      <header>
        <h1>About Solent Students Blogs App</h1>
      </header>

      <div className="about-section">
        <h2>Welcome to our platform!</h2>
        <p>
          Solent Students Blogs App is a place where students can share their thoughts, experiences,
          and insights. Our platform provides a creative space for learning and collaboration.
        </p>
      </div>

      <div className="features-section">
        <h2>Key Features</h2>
        <ul>
          <li>Share your blogs and experiences.</li>
          <li>Discover a variety of topics and categories.</li>
          <li>Connect with fellow students.</li>
        </ul>
      </div>

      <div className="get-started-section">
        <h2>Get Started</h2>
        <ol>
          <li>Create an account on our platform.</li>
          <li>Start writing and sharing your blogs.</li>
          <li>Explore blogs from other students.</li>
        </ol>
      </div>

      <div className="contact-section">
        <h2>Contact Information</h2>
        <p>
          General enquiries<br />
          Telephone: 023 8201 3000<br />
          Solent University, East Park Terrace, Southampton, SO14 0YN
        </p>
        <p>
          Clearing enquiries<br />
          Telephone: 023 8189 2556<br />
          Email: clearing@solent.ac.uk
        </p>
        <p>
          Admissions enquiries<br />
          Telephone: 023 8201 5066<br />
          Email: admissions@solent.ac.uk
        </p>
        <p>
          Alumni, business and local community enquiries<br />
          Telephone: 023 8201 6002<br />
          Email: engagement@solent.ac.uk
        </p>
        <p>
          Press enquiries<br />
          Telephone: 023 8201 3040<br />
          Email: news@solent.ac.uk
        </p>
        <p>
          Solent Students' Union<br />
          Telephone: 023 8201 3389<br />
          Web: www.solentsu.co.uk
        </p>
        <p>
          Warsash Maritime School<br />
          General enquiries: 023 8201 3000<br />
          Short course enquiries and booking: 023 8001 3074<br />
          Email: wms.shortcoursesales@solent.ac.uk<br />
          Seniors course enquiries and booking: 023 8201 5066<br />
          Email: admissions@solent.ac.uk<br />
          Officer cadet enquiries: admissions@solent.ac.uk<br />
          Warsash campus: Newtown Road, Warsash, Southampton SO31 9ZL<br />
          St Mary's campus: St Mary's campus, Chapel Road, Southampton, SO14 5GL
        </p>
        <p>
          Other enquiries<br />
          For all other enquiries, please use the general enquiries line above.
        </p>
      </div>

      <footer>
        &copy; 2023 Solent Students Blogs App
      </footer>
    </div>
  );
};

export default AboutPage;
