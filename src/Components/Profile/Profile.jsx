import React, { useState } from 'react';
import './Profile.css';

const StudentProfile = () => {
  const [studentProfile, setStudentProfile] = useState({
    personalInformation: {
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      email: '',
      phoneNumber: '',
      address: '',
      profilePicture: null,
    },
    academicDetails: {
      collegeName: '',
      course: '',
      yearOfStudy: '',
      cgpa: '',
    },
    skills: '',
    interests: '',
    socialLinks: {
      linkedin: '',
      github: '',
    },
  });

  const [message, alert] = useState('');
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  const handleChange = (section, name, value) => {
    if (section) {
      setStudentProfile((prevProfile) => ({
        ...prevProfile,
        [section]: {
          ...prevProfile[section],
          [name]: value,
        },
      }));
    } else {
      setStudentProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Set the profile picture in state
    handleChange('personalInformation', 'profilePicture', file);
    // Generate a preview URL for the selected image
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl); // Set image preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(studentProfile.personalInformation).forEach(([key, value]) => {
        formData.append(key, value);
      });
      Object.entries(studentProfile.academicDetails).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('skills', studentProfile.skills);
      formData.append('interests', studentProfile.interests);
      formData.append('linkedin', studentProfile.socialLinks.linkedin);
      formData.append('github', studentProfile.socialLinks.github);

      const response = await fetch('http://localhost:9090/user-profiles/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert('Profile created successfully!');
        console.log(result);
      } else {
        alert('Error creating profile. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please check your connection and try again.');
    }
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1>Student Profile</h1>
      </header>
      <main className="profile-content">
        <form className="profile-form" onSubmit={handleSubmit}>
          {/* Profile Logo */}
          <div className="profile-logo-container">
            {/* Display the uploaded image if it exists, otherwise display a placeholder */}
            <img
              src={imagePreview || "/profile-logo.png"} // Default logo if no image uploaded //https://www.iconfinder.com/search?q=profile+picture
              alt="Profile Preview"
              className="profile-logo"
            />
          </div>

          <section>
            <h2>Personal Information</h2>
            <label>
              First Name:
              <input
                type="text"
                value={studentProfile.personalInformation.firstName}
                onChange={(e) => handleChange('personalInformation', 'firstName', e.target.value)}
                required
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={studentProfile.personalInformation.lastName}
                onChange={(e) => handleChange('personalInformation', 'lastName', e.target.value)}
                required
              />
            </label>
            <label>
              Date of Birth:
              <input
                type="date"
                value={studentProfile.personalInformation.dob}
                onChange={(e) => handleChange('personalInformation', 'dob', e.target.value)}
                required
              />
            </label>
            <label>
              Gender:
              <select
                value={studentProfile.personalInformation.gender}
                onChange={(e) => handleChange('personalInformation', 'gender', e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Email:
              <input
                type="email"
                value={studentProfile.personalInformation.email}
                onChange={(e) => handleChange('personalInformation', 'email', e.target.value)}
                required
              />
            </label>
            <label>
              Phone Number:
              <input
                type="tel"
                value={studentProfile.personalInformation.phoneNumber}
                onChange={(e) => handleChange('personalInformation', 'phoneNumber', e.target.value)}
                required
              />
            </label>
            <label>
              Address:
              <textarea
                value={studentProfile.personalInformation.address}
                onChange={(e) => handleChange('personalInformation', 'address', e.target.value)}
                required
              />
            </label>
            <label>
              Profile Picture:
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </section><hr></hr>

          <section>
            <h2>Academic Details</h2>
            <label>
              College/University Name:
              <input
                type="text"
                value={studentProfile.academicDetails.collegeName}
                onChange={(e) => handleChange('academicDetails', 'collegeName', e.target.value)}
                required
              />
            </label>
            <label>
              Course:
              <input
                type="text"
                value={studentProfile.academicDetails.course}
                onChange={(e) => handleChange('academicDetails', 'course', e.target.value)}
                required
              />
            </label>
            <label>
              Year of Study:
              <input
                type="number"
                value={studentProfile.academicDetails.yearOfStudy}
                onChange={(e) => handleChange('academicDetails', 'yearOfStudy', e.target.value)}
                required
              />
            </label>
            <label>
              CGPA:
              <input
                type="number"
                value={studentProfile.academicDetails.cgpa}
                onChange={(e) => handleChange('academicDetails', 'cgpa', e.target.value)}
              />
            </label>
          </section><hr></hr>

          <section>
            <h2>Additional Information</h2>
            <label>
              Skills:
              <textarea
                value={studentProfile.skills}
                onChange={(e) => handleChange(null, 'skills', e.target.value)}
              />
            </label>
            <label>
              Interests:
              <textarea
                value={studentProfile.interests}
                onChange={(e) => handleChange(null, 'interests', e.target.value)}
              />
            </label>
          </section><hr></hr>

          <section>
            <h2>Social Links</h2>
            <label>
              LinkedIn:
              <input
                type="url"
                value={studentProfile.socialLinks.linkedin}
                onChange={(e) => handleChange('socialLinks', 'linkedin', e.target.value)}
              />
            </label>
            <label>
              GitHub:
              <input
                type="url"
                value={studentProfile.socialLinks.github}
                onChange={(e) => handleChange('socialLinks', 'github', e.target.value)}
              />
            </label>
          </section>

          <button type="submit" className="save-button">Create Profile</button>
        </form>
        {message && <p className="message">{message}</p>}
      </main>
    </div>
  );
};

export default StudentProfile;
